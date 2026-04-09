const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 3001;
const LOG_FILE = path.join(__dirname, 'logs.json');

function ensureLogFile() {
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, '[]', 'utf8');
  }
}

function readLogs() {
  ensureLogFile();
  try {
    return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeLogs(logs) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf8');
}

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data, null, 2);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

function sendHtml(res, html) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': Buffer.byteLength(html)
  });
  res.end(html);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error('Body too large'));
        req.destroy();
      }
    });

    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', reject);
  });
}

function avg(values) {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function round(n) {
  return Math.round(n * 100) / 100;
}

function computeMetrics(logs) {
  const total_events = logs.length;
  const blocked_count = logs.filter(x => x.action === 'blocked').length;
  const released_count = logs.filter(x => x.action === 'released').length;
  const block_rate = total_events ? blocked_count / total_events : 0;
  const release_rate = total_events ? released_count / total_events : 0;

  const reworkValues = logs
    .map(x => Number(x.rework_minutes))
    .filter(v => Number.isFinite(v));

  const acceptedVals = logs.filter(x => typeof x.accepted_first_touch === 'boolean');
  const acceptedTrue = acceptedVals.filter(x => x.accepted_first_touch === true).length;

  const driftCount = logs.filter(x => x.drift_flag === true).length;

  return {
    total_events,
    blocked_count,
    released_count,
    block_rate: round(block_rate),
    release_rate: round(release_rate),
    avg_rework_minutes: round(avg(reworkValues)),
    accepted_first_touch_rate: round(acceptedVals.length ? acceptedTrue / acceptedVals.length : 0),
    drift_flag_rate: round(total_events ? driftCount / total_events : 0)
  };
}

const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>my-system</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; background: #f6f7fb; color: #111; }
    h1, h2 { margin-bottom: 12px; }
    .card { background: white; border-radius: 12px; padding: 16px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,.06); }
    .grid { display: grid; gap: 10px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
    input, select, button { padding: 10px; font-size: 14px; }
    button { cursor: pointer; }
    table { width: 100%; border-collapse: collapse; background: white; }
    th, td { text-align: left; padding: 10px; border-bottom: 1px solid #ddd; vertical-align: top; }
  </style>
</head>
<body>
  <h1>my-system</h1>

  <div class="card">
    <h2>Neue Entscheidung</h2>
    <div class="grid">
      <input id="order_ref" placeholder="order_ref" />
      <input id="prediction_id" placeholder="prediction_id" />
      <select id="db_found">
        <option value="true">DB found</option>
        <option value="false">DB not found</option>
      </select>
      <input id="rework_minutes" type="number" step="0.1" placeholder="rework_minutes" />
      <select id="accepted_first_touch">
        <option value="">accepted_first_touch leer</option>
        <option value="true">accepted_first_touch true</option>
        <option value="false">accepted_first_touch false</option>
      </select>
      <select id="drift_flag">
        <option value="false">drift_flag false</option>
        <option value="true">drift_flag true</option>
      </select>
    </div>
    <div style="margin-top:12px;">
      <button onclick="submitDecision()">Speichern</button>
      <span id="result" style="margin-left:10px;"></span>
    </div>
  </div>

  <div class="card">
    <h2>Metrics</h2>
    <pre id="metrics"></pre>
  </div>

  <div class="card">
    <h2>Logs</h2>
    <table>
      <thead>
        <tr>
          <th>ts</th>
          <th>order_ref</th>
          <th>prediction_id</th>
          <th>db_check</th>
          <th>action</th>
          <th>rework</th>
          <th>aft</th>
          <th>drift</th>
        </tr>
      </thead>
      <tbody id="logsBody"></tbody>
    </table>
  </div>

  <script>
    async function loadLogs() {
      const res = await fetch('/api/logs');
      const logs = await res.json();
      const body = document.getElementById('logsBody');
      body.innerHTML = logs.map(log => \`
        <tr>
          <td>\${log.ts}</td>
          <td>\${log.order_ref}</td>
          <td>\${log.prediction_id}</td>
          <td>\${log.db_check}</td>
          <td>\${log.action}</td>
          <td>\${log.rework_minutes ?? ''}</td>
          <td>\${log.accepted_first_touch ?? ''}</td>
          <td>\${log.drift_flag ?? ''}</td>
        </tr>
      \`).join('');
    }

    async function loadMetrics() {
      const res = await fetch('/api/metrics');
      const metrics = await res.json();
      document.getElementById('metrics').textContent = JSON.stringify(metrics, null, 2);
    }

    function optBool(v) {
      if (v === 'true') return true;
      if (v === 'false') return false;
      return null;
    }

    function optNum(v) {
      if (v === '') return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    }

    async function submitDecision() {
      const payload = {
        order_ref: document.getElementById('order_ref').value.trim(),
        prediction_id: document.getElementById('prediction_id').value.trim(),
        db_found: document.getElementById('db_found').value === 'true',
        rework_minutes: optNum(document.getElementById('rework_minutes').value),
        accepted_first_touch: optBool(document.getElementById('accepted_first_touch').value),
        drift_flag: document.getElementById('drift_flag').value === 'true'
      };

      const res = await fetch('/api/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      document.getElementById('result').textContent = data.ok ? 'gespeichert' : ('Fehler: ' + data.error);

      await loadLogs();
      await loadMetrics();
    }

    loadLogs();
    loadMetrics();
  </script>
</body>
</html>
`;

ensureLogFile();

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'GET' && url.pathname === '/') {
      return sendHtml(res, html);
    }

    if (req.method === 'GET' && url.pathname === '/api/logs') {
      return sendJson(res, 200, readLogs().sort((a, b) => new Date(b.ts) - new Date(a.ts)));
    }

    if (req.method === 'GET' && url.pathname === '/api/metrics') {
      return sendJson(res, 200, computeMetrics(readLogs()));
    }

    if (req.method === 'POST' && url.pathname === '/api/decision') {
      const body = await parseBody(req);

      if (
        typeof body.order_ref !== 'string' ||
        typeof body.prediction_id !== 'string' ||
        typeof body.db_found !== 'boolean'
      ) {
        return sendJson(res, 400, {
          ok: false,
          error: 'Erwartet: order_ref(string), prediction_id(string), db_found(boolean)'
        });
      }

      const event = {
        ts: new Date().toISOString(),
        order_ref: body.order_ref,
        prediction_id: body.prediction_id,
        db_check: body.db_found ? 'found' : 'not_found',
        action: body.db_found ? 'released' : 'blocked',
        reason: body.db_found ? 'db confirmation found' : 'missing db confirmation',
        rework_minutes: body.rework_minutes ?? null,
        accepted_first_touch: body.accepted_first_touch ?? null,
        drift_flag: body.drift_flag ?? false
      };

      const logs = readLogs();
      logs.push(event);
      writeLogs(logs);

      return sendJson(res, 201, { ok: true, decision: event });
    }

    return sendJson(res, 404, { ok: false, error: 'Not found' });
  } catch (err) {
    return sendJson(res, 500, { ok: false, error: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
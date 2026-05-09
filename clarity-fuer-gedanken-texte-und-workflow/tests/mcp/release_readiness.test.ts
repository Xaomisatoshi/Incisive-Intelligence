import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(__dirname, "../..");

describe("Release readiness guardrails", () => {
  it("enthält keine Next/React dependencies", () => {
    const packageJson = JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"));
    const deps = { ...(packageJson.dependencies ?? {}), ...(packageJson.devDependencies ?? {}) };

    expect(deps.next).toBeUndefined();
    expect(deps.react).toBeUndefined();
    expect(deps["react-dom"]).toBeUndefined();
  });

  it("enthält keine alten Webapp-Verzeichnisse", () => {
    expect(fs.existsSync(path.join(repoRoot, "src/app"))).toBe(false);
    expect(fs.existsSync(path.join(repoRoot, "src/components"))).toBe(false);
  });
});

// The plugin has no code, so the test is the manifests: they must parse, agree with each
// other, point at the hub's MCP door, and every skill must carry the frontmatter Claude Code
// reads to decide when to load it.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const json = (p) => JSON.parse(readFileSync(join(ROOT, p), "utf8"));

test("plugin.json and marketplace.json name the same plugin", () => {
  const plugin = json(".claude-plugin/plugin.json");
  const market = json(".claude-plugin/marketplace.json");
  assert.match(plugin.name, /^[a-z0-9-]+$/);
  assert.match(plugin.version, /^\d+\.\d+\.\d+$/);
  assert.equal(market.plugins.length, 1);
  assert.equal(market.plugins[0].name, plugin.name);
  assert.equal(market.plugins[0].source, "./");
});

test(".mcp.json points at the hub's MCP door over HTTP", () => {
  const { mcpServers } = json(".mcp.json");
  assert.deepEqual(Object.keys(mcpServers), ["manyhands"]);
  assert.deepEqual(mcpServers.manyhands, { type: "http", url: "https://hub.pavilion.markets/mcp" });
});

test("every skill has a SKILL.md whose name matches its directory", () => {
  const dirs = readdirSync(join(ROOT, "skills"));
  assert.ok(dirs.length > 0);
  for (const d of dirs) {
    const p = join(ROOT, "skills", d, "SKILL.md");
    assert.ok(existsSync(p), `${d} has no SKILL.md`);
    const fm = /^---\n([\s\S]*?)\n---\n/.exec(readFileSync(p, "utf8"));
    assert.ok(fm, `${d}: no frontmatter`);
    assert.match(fm[1], new RegExp(`^name: ${d}$`, "m"), `${d}: name must be ${d}`);
    assert.match(fm[1], /^description: \S.{20,}$/m, `${d}: description missing or too short`);
  }
});

test("no em or en dashes in shipped text", () => {
  const files = [".claude-plugin/plugin.json", ".claude-plugin/marketplace.json", "README.md",
    ...readdirSync(join(ROOT, "skills")).map((d) => `skills/${d}/SKILL.md`)];
  for (const f of files) assert.doesNotMatch(readFileSync(join(ROOT, f), "utf8"), /[–—]/, f);
});

/** Offline stdio smoke test: spawn the built server, list tools, call each. */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = new Client({ name: "smoke", version: "0.0.0" });
await client.connect(
  new StdioClientTransport({ command: "node", args: ["dist/index.js"] }),
);

const { tools } = await client.listTools();
const names = tools.map((t) => t.name).sort();
console.log("tools:", names.join(", "));
if (
  JSON.stringify(names) !==
  JSON.stringify(["get_proof_index", "get_sources", "get_tla_benchmarks"])
) {
  throw new Error("unexpected tool list");
}

for (const name of names) {
  const result = await client.callTool({ name, arguments: {} });
  const text = result.content?.[0]?.text ?? "";
  const parsed = JSON.parse(text);
  if (!parsed || typeof parsed !== "object") throw new Error(`${name}: bad payload`);
  console.log(`${name}: ok (${text.length} bytes)`);
}

console.log("smoke passed");
await client.close();
process.exit(0);

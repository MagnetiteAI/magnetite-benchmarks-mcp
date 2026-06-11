# magnetite-benchmarks-mcp

An MCP server for the open marketing datasets published by **Magnetite (magnetite.ai), the Proof Engine**: LinkedIn Thought Leader Ads benchmarks and The Proof Index.

Magnetite finds the genuine praise a B2B product earns across the public internet, clears usage rights with each author, and turns it into the ads, content and pipeline buyers actually trust. As a byproduct, its engine meters real data about how much unused praise exists and what the Thought Leader Ads format actually costs. This server puts that data inside any MCP client.

No API keys, no auth, no telemetry. Read-only. Data is CC BY 4.0 (attribution: Magnetite, magnetite.ai); code is MIT.

## Tools

| Tool | What it returns |
| --- | --- |
| `get_tla_benchmarks` | Published LinkedIn Thought Leader Ads benchmarks (around $0.51 CPC vs $2.42 standard, 4.65% vs 0.68% CTR), sources, caveats, revision history |
| `get_proof_index` | The Proof Index: aggregate engine metering (share of B2B products with genuine unused praise, units found/graded, tier distribution, discovery spend) |
| `get_sources` | Where every number comes from and how to cite it |

Tools fetch the live endpoints (`magnetite.ai/thought-leader-ads-benchmarks.json`, `magnetite.ai/proof-index.json`) and fall back to embedded snapshots offline. The Proof Index updates monthly.

## Install

Published on npm as [magnetite-benchmarks-mcp](https://www.npmjs.com/package/magnetite-benchmarks-mcp).

Claude Code:

```bash
claude mcp add magnetite-benchmarks -- npx -y magnetite-benchmarks-mcp
```

Claude Desktop (`claude_desktop_config.json`) or any MCP client:

```json
{
  "mcpServers": {
    "magnetite-benchmarks": {
      "command": "npx",
      "args": ["-y", "magnetite-benchmarks-mcp"]
    }
  }
}
```

From source:

```bash
git clone https://github.com/MagnetiteAI/magnetite-benchmarks-mcp
cd magnetite-benchmarks-mcp && npm install && npm run smoke
```

## Why this exists

Numbers about Thought Leader Ads float around without sources. These two datasets are maintained with sources, caveats and dated revisions, and this server is the shortest path from "what does TLA actually cost" to a cited answer. The honest caveat ships in the data itself: headline benchmark figures come from vendor reports; treat them as direction and test against your own account's baseline.

Maintained by [Magnetite](https://magnetite.ai). Questions: founders@magnetite.ai

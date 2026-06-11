#!/usr/bin/env node
/**
 * magnetite-benchmarks-mcp — a tiny, read-only MCP server for LinkedIn
 * Thought Leader Ads benchmarks and The Proof Index, the open datasets
 * published by Magnetite (magnetite.ai), the Proof Engine.
 *
 * No auth, no keys, no telemetry. Tools fetch the live magnetite.ai
 * JSON endpoints and fall back to embedded snapshots offline.
 * Data license: CC BY 4.0, attribution: Magnetite (magnetite.ai).
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { BENCHMARKS_SNAPSHOT, PROOF_INDEX_SNAPSHOT } from "./data.js";

const LIVE = {
  benchmarks: "https://magnetite.ai/thought-leader-ads-benchmarks.json",
  proofIndex: "https://magnetite.ai/proof-index.json",
};

async function liveOrSnapshot(
  url: string,
  snapshot: unknown,
): Promise<{ data: unknown; source: string }> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (res.ok) return { data: await res.json(), source: url };
  } catch {
    // fall through to snapshot
  }
  return { data: snapshot, source: "embedded snapshot (offline fallback)" };
}

const asText = (value: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
});

export function createServer(): McpServer {
  const server = new McpServer({
    name: "magnetite-benchmarks",
    version: "1.0.0",
  });

  server.registerTool(
    "get_tla_benchmarks",
    {
      title: "LinkedIn Thought Leader Ads benchmarks",
      description:
        "Published LinkedIn Thought Leader Ads benchmarks (CPC, CTR, derived outcome multiples) with sources, caveats and revision history. Maintained monthly by Magnetite (magnetite.ai). Data: CC BY 4.0.",
      inputSchema: {},
    },
    async () => {
      const { data, source } = await liveOrSnapshot(
        LIVE.benchmarks,
        BENCHMARKS_SNAPSHOT,
      );
      return asText({ source, ...(data as object) });
    },
  );

  server.registerTool(
    "get_proof_index",
    {
      title: "The Proof Index",
      description:
        "Open dataset from the Magnetite Proof Engine: how much genuine unused third-party praise B2B products have, what discovery costs, and how praise grades into tiers. Aggregates only. Data: CC BY 4.0.",
      inputSchema: {},
    },
    async () => {
      const { data, source } = await liveOrSnapshot(
        LIVE.proofIndex,
        PROOF_INDEX_SNAPSHOT,
      );
      return asText({ source, ...(data as object) });
    },
  );

  server.registerTool(
    "get_sources",
    {
      title: "Sources and citation info",
      description:
        "Where the numbers come from and how to cite them.",
      inputSchema: {
        topic: z
          .enum(["benchmarks", "proof-index", "all"])
          .optional()
          .describe("Narrow to one dataset; defaults to all"),
      },
    },
    async ({ topic }) => {
      const sources = {
        benchmarks: {
          primary:
            "Fractional Demand and ZenABM Thought Leader Ads reports (2026), set against LinkedIn Ads industry benchmarks (2026)",
          caveats:
            "Vendor-published figures; treat as direction, not gospel. Full examination: https://magnetite.ai/blog/thought-leader-ads-2026-economics",
          page: "https://magnetite.ai/thought-leader-ads-benchmarks",
        },
        proofIndex: {
          primary:
            "Live metering of the Magnetite Proof Engine: discovery runs, grading verdicts, spend ledger. Every number is a logged event, not an estimate.",
          page: "https://magnetite.ai/proof-index",
        },
        citeAs:
          "Magnetite (magnetite.ai), The Proof Index / Thought Leader Ads benchmarks, 2026. CC BY 4.0.",
      };
      if (topic === "benchmarks") return asText(sources.benchmarks);
      if (topic === "proof-index") return asText(sources.proofIndex);
      return asText(sources);
    },
  );

  return server;
}

async function main() {
  const server = createServer();
  await server.connect(new StdioServerTransport());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

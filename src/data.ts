/**
 * Embedded fallback snapshots (used when the live magnetite.ai
 * endpoints are unreachable). Refreshed at release time; the live
 * endpoints are always preferred and always fresher.
 */

export const BENCHMARKS_SNAPSHOT = {
  "name": "LinkedIn Thought Leader Ads benchmarks",
  "maintainer": "Magnetite (magnetite.ai), the Proof Engine",
  "license": "CC BY 4.0, attribution: Magnetite (magnetite.ai)",
  "datePublished": "2026-06-11",
  "dateModified": "2026-06-11",
  "benchmarks": [
    {
      "metric": "Cost per click (CPC)",
      "tla": "$0.51",
      "standard": "$2.42",
      "source": "Fractional Demand / ZenABM TLA reports, 2026; LinkedIn Ads industry benchmarks, 2026"
    },
    {
      "metric": "Click-through rate (CTR)",
      "tla": "4.65%",
      "standard": "0.68%",
      "source": "Fractional Demand / ZenABM TLA reports, 2026; LinkedIn Ads industry benchmarks, 2026"
    },
    {
      "metric": "Outcomes from the same budget",
      "tla": "4 to 6x",
      "standard": "baseline",
      "source": "Derived range we quote instead of the raw ratios, because of the caveats below"
    }
  ],
  "engineStats": [
    {
      "metric": "Cost of one full discovery sweep",
      "value": "$0.05",
      "note": "Live engine metering, LinkedIn discovery, June 2026"
    },
    {
      "metric": "Products swept that had genuine unused praise",
      "value": "18 of 18",
      "note": "Live engine metering, June 2026"
    },
    {
      "metric": "B2B ad accounts audited",
      "value": "20",
      "note": "Manual audit work, Aug 2025 to Jun 2026"
    },
    {
      "metric": "Product companies with unused praise found",
      "value": "100%",
      "note": "Same audit set; every company with a real user base"
    },
    {
      "metric": "Oldest unchanged ad found in an audited account",
      "value": "10 months",
      "note": "Same audit set"
    }
  ],
  "revisions": [
    {
      "date": "11 June 2026",
      "change": "Page created. Benchmark figures from the 2026 Fractional Demand and ZenABM Thought Leader Ads reports, set against 2026 LinkedIn Ads industry benchmarks."
    }
  ],
  "caveats": "Headline figures come from vendor reports (Fractional Demand, ZenABM, 2026); treat as direction, not gospel. Full caveats: https://magnetite.ai/blog/thought-leader-ads-2026-economics"
} as const;

export const PROOF_INDEX_SNAPSHOT = {
  "name": "The Proof Index",
  "description": "Aggregate metered output of the Magnetite Proof Engine: how much genuine, unused third-party praise B2B products have, what it costs to find, and how it grades. Aggregates only; no client or author data.",
  "maintainer": "Magnetite (magnetite.ai), the Proof Engine",
  "discoveryRuns": 60,
  "generatedAt": 1781194260891,
  "license": "CC BY 4.0, attribution: Magnetite (magnetite.ai)",
  "productsSwept": 19,
  "productsWithGenuinePraise": 19,
  "runsBySource": {
    "linkedin:harvestapi": 30,
    "linkedin:unipile": 30
  },
  "runsByStatus": {
    "skipped_unavailable": 30,
    "succeeded": 30
  },
  "shareOfSweptProductsWithPraise": 1,
  "spend": {
    "medianSweepCostUsd": 0.0001,
    "totalDiscoveryCostUsd": 0.31
  },
  "sweeps": 30,
  "units": {
    "duplicate": 59,
    "excluded": 589,
    "found": 950,
    "graded": 323,
    "new": 891,
    "tierDistribution": {
      "expert": 51,
      "gold": 101,
      "mention": 165,
      "review": 6
    }
  }
} as const;

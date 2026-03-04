---
id: intro
title: ContextPilot
sidebar_label: Overview
slug: /
---

<div style={{textAlign: 'center', margin: '1.5rem 0 2rem'}}>
  <img src="/img/contextpilot_logo.png" alt="ContextPilot" style={{width: '100%', maxWidth: '480px'}} />
</div>

# ContextPilot

ContextPilot is a context optimizer that sits before the inference engine. Long-context workloads often carry similar, overlapping, or redundant context blocks — wasting tokens and triggering unnecessary KV computation. ContextPilot applies [optimization primitives](reference/primitives) to input contexts before inference, improving token efficiency and cache utilization for faster execution, with no changes to your model or inference engine.

**4–12× cache hits · 1.5–3× faster prefill · ~36% token savings**

## Key Features

- **Higher Throughput & Cache Hits**: Boosts prefill throughput and cache hit ratio by improving token efficiency and cache utilization across long-context requests.

- **Cache-Aware Scheduling**: Groups requests with overlapping context blocks to run consecutively, maximizing prefix sharing across the entire batch.

- **Reduced Redundant Computation**: Detects and eliminates repeated content across requests, reducing redundant token transmission by ~36% per turn.

- **Drop-In Integration**: Hooks into SGLang and vLLM at runtime via a `.pth` import — set `CONTEXTPILOT_INDEX_URL` when launching your engine, no code changes required. Works with any OpenAI-compatible endpoint.

- **No Compromise in Reasoning Quality**: Preserves model accuracy with importance-ranked context annotation. With extremely long contexts, quality can even improve over the baseline.

## Getting Started

- [**Installation**](getting_started/installation) — System requirements and `pip install contextpilot`
- [**Quick Start**](getting_started/quickstart) — Your first ContextPilot pipeline in 5 minutes

## Guides

- [**Offline Usage**](guides/offline_usage) — Batch processing with `cp.optimize_batch()` and `cp.reorder()`
- [**Online Usage**](guides/online_usage) — Index server with stateless and stateful modes
- [**Multi-Turn Conversations**](guides/multi_turn) — Context deduplication across conversation turns
- [**PageIndex Integration**](guides/pageindex) — Tree-structured document scheduling
- [**mem0 Integration**](guides/mem0) — LoCoMo benchmark with mem0 memory backend

## Reference

- [**API Reference**](reference/api) — `ContextPilot`, `RAGPipeline`, HTTP endpoints
- [**Benchmarks**](reference/benchmarks) — GPU vs CPU performance analysis

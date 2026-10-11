# LoungeMesh

Spatial video lounge for informal online and hybrid events — move freely in a shared 2D space with proximity-based audio. Built for [Eventyay](https://eventyay.com) integration and self-hosted Jitsi.

**Documentation:** [docs.loungemesh.com](https://docs.loungemesh.com) — built with TypeDoc + VitePress, deployed via [GitHub Actions](.github/workflows/docs.yml) to GitHub Pages. See [Publishing docs](docs-site/guide/publishing-docs.md).

---

## Features

- **Spatial Video & Audio**: Move freely as an avatar in a 2D room with real-time audio attenuation computed off-thread via Web Audio API and Web Workers.
- **Collaborative Whiteboard**: Infinite canvas with pen, eraser, shapes, color palettes, pan/zoom navigation, and live multi-user synchronization.
- **Shared Session Notes**: Live collaborative markdown notes with optional templates, host broadcasting, and persistent state.
- **Live Polling**: Create instant single/multi-choice polls, collect anonymous votes, and publish real-time results.
- **Stage Presentation Mode**: Spotlight speakers on stage with elevated video resolution and full-screen desktop screensharing.
- **Room Access Control**: Configurable host claiming, moderator promotion, room join PIN protection, lobby admission, and participant permission grants.
- **Event Scheduling & Calendar Sync**: Schedule rooms with recurring rules and synchronize events directly to Google Calendar with AES-256 encrypted OAuth.
- **Ultra-Low Resource Scaling**:
  - Spatial viewport culling: only streams video for visible or on-stage peers; zero video bandwidth consumed for off-screen peers.
  - Efficient resolution budgeting: 360p avatar camera, 720p @ 15–30 fps screenshare.
  - Single-roundtrip `/api/meetings/state/:roomName/init` endpoint bundling room state, role verification, notes, polls, whiteboard, and background.
  - Nginx rate-limiting (50 r/s burst 100) with client real-IP forwarding (`X-Forwarded-For`).
  - Prosody rate limiting (128 kb/s) and expanded stanza buffer (25 unacked stanzas).
  - Database connection pooling configured for high concurrency.

---

## Architecture & Stack

| Layer | Technologies |
|---|---|
| **Frontend SPA** | Vue 3, TypeScript, Vite, Pinia, Web Audio API, Web Workers |
| **Media Engine** | `lib-jitsi-meet` (headless WebRTC, no iframe API) |
| **Backend API** | Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, Redis |
| **Media Server** | Jitsi Videobridge (JVB), Prosody XMPP, Jicofo |
| **Infrastructure** | Docker Compose, Nginx (reverse proxy, Brotli/gzip compression, CSP headers) |

---

## Quick Start

### Option 1: Full Docker Stack (Recommended)

Spins up the full stack: LoungeMesh SPA, Backend API, PostgreSQL, Redis, and Jitsi media containers.

```bash
# 1. Install dependencies and initialize environment
npm run setup

# 2. Start all Docker containers
npm run docker:up
```

- **LoungeMesh**: [http://127.0.0.1:8780](http://127.0.0.1:8780)
- **Jitsi Meet**: [http://127.0.0.1:8001](http://127.0.0.1:8001)

> **Note**: Use `127.0.0.1` for local smoke testing; some systems resolve `localhost` to IPv6 first which may reset mapped container ports.

### Option 2: Local Development Mode

Run the frontend SPA and backend API server locally with hot-reloading:

```bash
# Install root and backend dependencies
npm install
npm --prefix server install

# Initialize .env file (auto-detects local LAN IP)
npm run setup

# Run backend migrations
npm --prefix server run prisma:migrate -- --name init

# Start development servers
npm run dev                    # Frontend Vite dev server (port 5173)
npm --prefix server run dev    # Backend Express API server (port 5000)
```

---

## Scripts Reference

| Command | Description |
|---|---|
| `npm run dev` | Run Vite development server for the Vue SPA |
| `npm run build` | Build production SPA bundle to `dist/` |
| `npm test` | Run Vitest unit tests with 100% code coverage enforcement |
| `npm run typecheck` | Run `vue-tsc` type-check across `.ts` and `.vue` files |
| `npm run docs:dev` | Run local VitePress documentation server |
| `npm run docs:build` | Build TypeDoc API reference and VitePress documentation |
| `npm run docs:preview` | Preview built documentation site locally |
| `npm run test:e2e` | Run Playwright end-to-end integration tests |
| `npm run setup` | Generate `.env` from template and detect LAN IP (`loungemesh.sh dev`) |
| `npm run docker:up` | Launch full stack in Docker Compose |
| `npm run deploy` | Rebuild and deploy Docker stack on server (`loungemesh.sh deploy`) |
| `npm run fix:jvb` | Re-advertise public IP on a running JVB instance |

Production server provisioning uses `./scripts/loungemesh.sh bootstrap` — see [Deployment Guide](docs-site/guide/deployment.md).

---

## AI Agent & Automation Guidelines

This repository provides standardized agent skills and guidelines in:
- [`AGENTS.md`](AGENTS.md): Repository coding rules, security boundaries, and testing requirements.
- [`.agents/skills/`](.agents/skills/): Domain skills for architecture, scaling, security, deployment, and testing.

---

## License

See [LICENSE.md](LICENSE.md).

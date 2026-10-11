# GitHub Copilot Instructions for LoungeMesh

You are an expert pair programmer working on LoungeMesh. Follow these repository standards:

## Architecture & Code Boundaries
- Vue 3 + TypeScript + Pinia frontend; Express + Prisma + PostgreSQL + Redis backend.
- **Strict Adapter Boundary**: Components and stores MUST NOT import `lib-jitsi-meet` directly. Always use `MediaService.ts` via `useMediaEngine.ts`.
- Pure headless WebRTC (no Jitsi iframe embeds).
- Spatial distance math belongs in `src-vue/workers/proximityAudio.worker.ts`.

## Scaling & Performance
- Never introduce hardcoded memory limits (`mem_limit`) in `docker-compose.yml`. Maintain low baseline resource consumption (2 vCPU / 2 GB RAM target) by design.
- In `src-vue/utils/receiverConstraints.ts`, off-screen peers must receive zero video streams (`selectedSources = []`, `lastN = 0`).
- Avatar camera is capped at 360p ideal / 480p max @ 24 fps; screenshare is capped at 720p @ 15–30 fps.
- Use single-roundtrip `/api/meetings/state/:roomName/init` for room bootstrapping.

## Security
- NEVER return `joinPin` or internal raw database strings in config responses. Always use `sanitizeMeetingConfig` in `server/src/controllers/meetingController.ts`.
- Derive `meetingExists` directly from `data.role.hostId` (`this.meetingExists = !!data.role.hostId`).
- Encrypt third-party integration secrets with AES-256-GCM.

## Testing & Quality
- Strict 100% test coverage requirement across `src-vue/` (`npm test`).
- Server TypeScript compilation must pass cleanly (`npm --prefix server run build`).
- Documentation build must pass cleanly (`npm run docs:build`).

## Domain Skills
Detailed skills are located in `.agents/skills/`:
- `loungemesh-architecture`
- `loungemesh-scaling`
- `loungemesh-security`
- `loungemesh-eventyay-integration`
- `loungemesh-deployment`
- `loungemesh-features-and-testing`

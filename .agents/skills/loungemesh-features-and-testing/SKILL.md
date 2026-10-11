---
name: loungemesh-features-and-testing
description: >-
  User flows, feature implementations, and 100% test coverage standards for LoungeMesh, covering
  Vitest component/store tests, JitsiAdapter mocking, and Playwright E2E flows.
---

# LoungeMesh Features & Testing Skill

This skill outlines user flows and testing best practices for LoungeMesh, focusing on the strict **100% test coverage requirement**.

---

## 1. Feature User Flows

### 1. Room Joining & Entry
1. User lands on `/` or `/session/<roomName>`.
2. `useAccessGuard` checks for an Eventyay token or direct room access.
3. If PIN protection is active, user enters PIN.
4. `sessionFeaturesStore.fetchRoomConfigAndRole` loads `/api/meetings/state/:roomName/init`.
5. `useMediaEngine.connect()` joins the Jitsi room, binds tracks, and starts the proximity audio loop.

### 2. Spatial Interaction
- Dragging avatar or pressing arrow/WASD updates coordinates `(x, y)` in `localStore`.
- Coordinates broadcast via the XMPP/bridge data channel.
- Remote avatars update positions; Web Worker re-computes volume attenuation.

### 3. Stage & Presentation
- Host promotes participant to stage via `sessionStage.ts`.
- `isOnStage` becomes true; constraints escalate to 720p.
- Screensharing captured at 720p @ 15–30 fps via `JitsiAdapter.createLocalTracks({ devices: ['desktop'], ... })`.

---

## 2. 100% Test Coverage Requirement

Vitest is configured with `@vitest/coverage-v8` with strict thresholds:
```js
coverage: {
  statements: 100,
  branches: 100,
  functions: 100,
  lines: 100,
}
```

### Critical Rules
- Any new component, store method, composable, or utility in `src-vue/` **MUST** include comprehensive unit tests.
- Always run `npm test` before concluding any task.
- When writing tests that involve Pinia stores, always initialize:
  ```ts
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  ```
- When writing tests that involve `useMediaEngine` or `JitsiAdapter`, use the test harness helpers in `src-vue/tests/` (e.g., `connectAndJoinTestConference()`, `getJitsiTestContext()`).

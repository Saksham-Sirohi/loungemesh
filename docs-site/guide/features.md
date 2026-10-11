# Features & User Flows

This guide details the core features and user workflows available in LoungeMesh.

---

## 1. Spatial Lounge & Proximity Audio

LoungeMesh replaces traditional grid-based video tiles with an interactive 2D spatial canvas:

- **Free Movement**: Participants navigate their avatar using mouse dragging or keyboard arrow/WASD keys.
- **Proximity Audio Attenuation**: Sound volume dynamically fades as avatars move further apart. When two groups cluster in opposite corners of the lounge, they hear each other at whisper levels or silence, mimicking real-world mingling.
- **Off-Thread Audio Math**: Distance calculations are performed in a dedicated Web Worker (`proximityAudio.worker.ts`) and applied to Web Audio API `GainNode` audio instances with smooth exponential ramps to eliminate clipping.
- **Canvas Pan & Zoom**: Users can pan across the floorplan and zoom in/out with the mouse wheel or touch gestures to view the entire room.

---

## 2. Roles & Permission Control

LoungeMesh features a hierarchical role system:

### Role Tiers
- **Host**: Complete control over room settings, feature gating, lobby admissions, stage management, and whiteboard resets.
- **Moderator**: Can manage polls, promote participants to stage, and assist in moderation.
- **Attendee**: General participant with capabilities governed by host-defined room defaults.

### Host Claiming & Room PIN Protection
- Rooms can be secured with a **Join PIN**.
- Guests entering a PIN-protected room are prompted to enter the PIN before WebRTC media initialization occurs.
- Hosts can claim ownership using a host key or Eventyay authentication token.

### Feature Access Matrix
Hosts can dynamically enable or disable features for the entire room or grant per-user overrides:
- **Chat** (text messaging)
- **Whiteboard** (drawing & collaboration)
- **Shared Notes** (markdown document)
- **Live Polls** (voting)
- **Stage Mode** (presentation)

---

## 3. Interactive Collaborative Whiteboard

The built-in whiteboard provides a real-time collaborative workspace:

- **Vector Canvas**: High-precision vector stroke rendering supporting freehand pen, lines, rectangles, and circles.
- **Color & Size Palettes**: Curated color swatches and configurable stroke widths.
- **Real-Time Synchronization**: Strokes are broadcast over the bridge data channel and cached in Redis/PostgreSQL for instant recovery by new arrivals.
- **Pan & Zoom Navigation**: Dedicated pan controls to navigate expansive diagrams without losing drawing focus.

---

## 4. Collaborative Shared Notes

A shared markdown document for live meeting minutes:

- **Live Synchronization**: Edit notes collaboratively with automatic debounced synchronization.
- **Templates**: Hosts can define pre-configured meeting agendas or templates (`notesTemplate`) that load automatically on room start.
- **Export & Markdown Support**: Download notes as standard Markdown for archiving.

---

## 5. Live Interactive Polling

Engage attendees with instant polls:

- **Single & Multi-Choice Questions**: Create questions with customized response choices.
- **Anonymous Voting**: Attendees cast votes with live count aggregation.
- **Results Visibility**: Hosts can reveal results in real-time or hold until voting completes.

---

## 6. Stage Mode & Screensharing

For keynotes and presentations, participants can be promoted to the virtual stage:

- **Stage Spotlight**: Avatars on stage appear prominently in the viewport with elevated video resolution (720p).
- **High-Definition Screenshare**: Share entire screens, individual application windows, or browser tabs at 720p with system audio pass-through.
- **Stage Promotion**: Hosts can invite attendees onto the stage or return them to the general floor.

---

## 7. Event Scheduling & Google Calendar Integration

Schedule meetings in advance with automatic calendar syncing:

- **Recurring Schedules**: Daily, weekly, monthly, or custom recurrence patterns.
- **Guest Invitations**: Email invites with automatic invitation links and role assignment.
- **Google Calendar Sync**: Two-way integration via Google OAuth with AES-256-GCM encrypted token storage.

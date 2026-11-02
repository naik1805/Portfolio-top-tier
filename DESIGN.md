# DESIGN.md — Mohith S Portfolio Design System (Rivet Inspired)

> Visual specification and token contract inspired by Rivet (`rivet.design`), designed in alignment with VoltAgent/awesome-design-md, Taste Skill (Anti-Slop), and Impeccable standards.

---

## 1. Visual Theme & Atmosphere

- **Aesthetic**: Rivet-Inspired Industrial Design Studio & Developer Tooling.
- **Mood**: Authoritative, tactile, precision-tooled, restrained, and intelligent.
- **Density**: 5/10 (Architectural whitespace, high-density telemetry, scannable hierarchies).
- **Variance**: 7/10 (Signature parallel directions workbench, split hero, dynamic radar chart, interactive dossiers).
- **Motion Intensity**: 6/10 (Exponential deceleration `cubic-bezier(0.16, 1, 0.3, 1)`, interactive telemetry, zero linear or bounce easing).
- **Drafting Marks**: Technical corner registration ticks (`+`, `┌ ┐ └ ┘`) on canvases and interactive frames.
- **Theme Lock**: Cohesive light and dark modes with 100% token consistency across all components.

---

## 2. Color Palette & Roles

### Light Theme (Rivet Studio Canvas)
| Token | Value | Role |
| :--- | :--- | :--- |
| `--bg` | `#FAF7EE` | Signature Rivet warm drafting canvas |
| `--bg-elevated` | `#FFFFFF` | Crisp white elevated workbench cards |
| `--bg-panel` | `#F1EFE8` | Panels, sidebar drawers, tooltips |
| `--ink` | `#121316` | Deep obsidian display & heading text |
| `--text-muted` | `#565C69` | High-legibility body copy |
| `--text-dim` | `#7A8191` | Metadata, tags, line timings |
| `--line` | `rgba(18, 19, 22, 0.08)` | Refined hairline borders (0.5px - 1px) |
| `--line-strong`| `rgba(18, 19, 22, 0.16)` | Active outlines & workbench borders |
| `--accent` | `#E14017` | Rivet signature international vermilion orange |
| `--accent-dim` | `rgba(225, 64, 23, 0.08)` | Badge backgrounds & interactive focus rings |
| `--amber` | `#15803D` | Semantic live telemetry status indicator |

### Dark Theme (Rivet Obsidian Studio)
| Token | Value | Role |
| :--- | :--- | :--- |
| `--bg` | `#0D0E12` | Rich dark studio canvas base |
| `--bg-elevated` | `#16181D` | Elevated workbench surface |
| `--bg-panel` | `#1D2027` | Secondary panel elevations |
| `--ink` | `#F3F4F6` | Primary high-contrast display text |
| `--text-muted` | `#9CA3AF` | Body copy & description text |
| `--text-dim` | `#6B7280` | Captions, timings, subtle metadata |
| `--line` | `rgba(243, 244, 246, 0.08)` | Subtle card borders & dividers |
| `--line-strong`| `rgba(243, 244, 246, 0.16)` | Hover borders & active outlines |
| `--accent` | `#FF4D2E` | High-voltage vermilion accent |
| `--accent-dim` | `rgba(255, 77, 46, 0.14)` | Badge backgrounds & subtle glow tint |
| `--amber` | `#22C55E` | Semantic live status indicator |

---

## 3. Typography Rules

| Level | Family | Size / Leading | Tracking | Weight | Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Inter / Neo-Grotesque | `clamp(2.2rem, 5.5vw, 4.4rem)` / `1.08` | `-0.035em` | 700 | Primary brand headline |
| **Section Heading** | Inter / Display | `clamp(1.75rem, 4vw, 2.6rem)` / `1.15` | `-0.03em` | 700 | Section titles |
| **Workbench Title**| Inter | `1.25rem – 1.45rem` / `1.2` | `-0.025em` | 700 | Direction inspector headers |
| **Body** | Public Sans | `0.95rem – 1.05rem` / `1.6` | `0em` | 400 | Descriptions & summaries (max 68ch) |
| **Code / HUD / Tag**| IBM Plex Mono | `0.72rem – 0.82rem` / `1.4` | `0.04em` | 500 / 600 | Prompts, stack pills, timings, metrics |

---

## 4. Key Rivet Signature Components

### 1. The Interactive Parallel Directions Workbench
- Chrome top bar: `https://systems.mohith.dev/directions/...` address bar, traffic light dots, live status indicator, and Auto-Play / Pause switcher.
- Left column: List of production engineering directions (`01 / Scan Chain ATE Agent`, `02 / Offline AI Assistant`, `03 / Deepfake Video Guard`, `04 / Corrupt Watch`).
- Right column: Live interactive inspector canvas with real-time test vector injection, local LLM chat simulation, forensic frame scrubber, and streaming anomaly feed.

### 2. Multi-Platform Prompt Bar
- Quick CLI / agent installation bar with tabs for `[ Terminal ]`, `[ Claude Code ]`, `[ Cursor ]`, and `[ Codex ]`.
- One-click copy with instant confirmation state and keyboard shortcut indicator (`/` opens Command HUD).

### 3. Precision Corner Ticks
- Technical registration crosshairs and corner brackets (`CornerTicks`) framing cards and interactive canvases.

---

## 5. Motion & Accessibility

- Deceleration easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Reduced-motion compliance with system preference overrides.

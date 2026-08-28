# DESIGN.md — Mohith S Portfolio Design System

> Visual specification and token contract designed in alignment with VoltAgent/awesome-design-md, Taste Skill (Anti-Slop), and Impeccable standards.

---

## 1. Visual Theme & Atmosphere

- **Aesthetic**: Precision Instrument & Studio Engineering (Linear/Vercel-level high craft with scientific & systems depth).
- **Mood**: Confident, restrained, architectural, tactile, and intelligent.
- **Density**: 4/10 (Generous macro-spacing, high-density micro-data, scannable hierarchies).
- **Variance**: 7/10 (Asymmetric split hero, dynamic polygon radar, bento & timeline layouts).
- **Motion Intensity**: 6/10 (Spring physics, magnetic CTA pulls, interactive 3D WebGL neural scene, zero linear easing).
- **Theme Lock**: Cohesive light and dark modes with 100% token consistency across all components.

---

## 2. Color Palette & Roles

### Dark Theme (Obsidian Lab — Default)
| Token | Value | Role |
| :--- | :--- | :--- |
| `--bg` | `#090C10` | Canvas base background |
| `--bg-elevated` | `#121720` | Card & surface elevation 1 |
| `--bg-panel` | `#18202C` | Modals, floating drawers, tooltips |
| `--ink` | `#F0F4F8` | Primary display & heading text |
| `--text-muted` | `#8C9BB0` | Body copy & description text |
| `--text-dim` | `#5A687A` | Captions, timings, subtle metadata |
| `--line` | `rgba(240, 244, 248, 0.08)` | Subtle card borders & dividers |
| `--line-strong`| `rgba(240, 244, 248, 0.18)` | Hover borders & active outlines |
| `--accent` | `#FF4D2E` | High-voltage international signal orange (Primary CTA & highlights) |
| `--accent-dim` | `rgba(255, 77, 46, 0.12)` | Badge backgrounds & subtle glow tint |
| `--accent-secondary` | `#22C55E` | Semantic live status indicator |

### Light Theme (Cleanroom Wafer)
| Token | Value | Role |
| :--- | :--- | :--- |
| `--bg` | `#F4F6F8` | Clean ceramic wafer background |
| `--bg-elevated` | `#FFFFFF` | Crisp white elevated cards |
| `--bg-panel` | `#FAFBFD` | Modals & command palette |
| `--ink` | `#0B0F15` | Deep graphite display text |
| `--text-muted` | `#4B5565` | High-legibility body text |
| `--text-dim` | `#758195` | Metadata & labels |
| `--line` | `rgba(11, 15, 21, 0.08)` | Refined hairline borders |
| `--line-strong`| `rgba(11, 15, 21, 0.20)` | Active borders |
| `--accent` | `#EA3815` | High-contrast vermilion accent |
| `--accent-dim` | `rgba(234, 56, 21, 0.10)` | Chip & pill backgrounds |
| `--accent-secondary` | `#15803D` | Semantic live status indicator |

---

## 3. Typography Rules

| Level | Family | Size / Leading | Tracking | Weight | Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Bricolage Grotesque / Display | `clamp(2.75rem, 7vw, 5rem)` / `1.05` | `-0.035em` | 700 / 800 | Hero name & brand statement |
| **Section Heading** | Bricolage Grotesque | `clamp(1.85rem, 4vw, 2.75rem)` / `1.1` | `-0.03em` | 700 | Section titles |
| **Card Title** | Bricolage Grotesque | `1.25rem – 1.5rem` / `1.2` | `-0.02em` | 600 | Project & role titles |
| **Body** | Public Sans | `0.95rem – 1.05rem` / `1.65` | `0em` | 400 | Descriptions & summaries (max 68ch) |
| **Code / HUD / Tag** | IBM Plex Mono | `0.75rem – 0.85rem` / `1.4` | `0.04em` | 500 / 600 | Stack pills, dates, timings, metrics |

---

## 4. Component Stylings

### Buttons & Interactive Controls
- **Primary CTA**: High-contrast accent fill (`var(--accent)`), white text (`#FFFFFF`), rounded pill (`rounded-full`), spring scale feedback (`:active { transform: scale(0.98); }`), magnetic pull on hover.
- **Ghost CTA**: Hairline border (`var(--line-strong)`), `var(--ink)` text, hover background tint (`var(--accent-dim)`).
- **Pills & Chips**: Rounded `rounded-lg` or `rounded-full`, `0.75rem` font, subtle border, smooth hover lift (`translateY(-2px)`).
- **Navigation**: Single line desktop header, fixed height `64px`, glassmorphic backdrop (`backdrop-filter: blur(16px)`), keyboard shortcut badge `<kbd>/</kbd>`.

### Cards & Panels
- **Corner Radius**: Consistent `14px – 16px` (`rounded-2xl`).
- **Borders**: 1px crisp border `var(--line)` with soft hover accent refraction.
- **Shadows**: Multi-layer soft ambient shadow without heavy offset (`0 10px 30px -10px var(--shadow-ink)`).
- **Zero AI-slop rule**: No arbitrary nested cards, no purple glow meshes, no duplicate CTA labels.

---

## 5. Layout & Spacing

- **Container Width**: Max `1280px` (`max-w-7xl mx-auto`), padding `px-4 sm:px-6 lg:px-8`.
- **Section Spacing**: `py-20 md:py-28`.
- **Hero Viewport**: `min-h-[100dvh]` with top padding `pt-20 md:pt-24`, all hero elements visible above the fold on desktop.

---

## 6. Motion & Interaction

- **Framer Motion physics**: Spring transitions `{ type: "spring", stiffness: 260, damping: 24 }`.
- **Magnetic Buttons**: Native motion values tracking pointer offset.
- **Diagnostics Radar**: Animated SVG polygons with interactive nodes and real-time category filters.
- **Command HUD (`/`)**: Keyboard listener triggering blurred spotlight terminal for instant navigation.
- **Accessibility**: Strict reduced-motion fallback honoring `prefers-reduced-motion`.

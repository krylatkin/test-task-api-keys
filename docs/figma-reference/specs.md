# Screenshot-Derived Specs

These values are reconstructed from the cached Figma screenshots and local pixel sampling, not from Figma Dev Mode.

## Confidence Legend

- `Exact from screenshot`: measured directly from cached PNG dimensions or visible border transitions
- `Approx`: visually reconstructed from the screenshot and should be treated as a strong estimate

## Desktop Reference

Source:
- [desktop-reference.png](/Users/gennady/Documents/Projects/farlabs/docs/figma-reference/desktop-reference.png)
- Canvas size: `1440 x 900`

### Overall Window

- Outer page background: approx `#0A0A0A`
- App window fill: approx `#121212`
- App window border: approx `#2A2A2A`
- App window corner radius: approx `24px`
- Outer page padding around app window: approx `34px`

### Sidebar

- Sidebar width: exact from screenshot `255px`
- Divider line after sidebar: exact from screenshot around `x = 255/256`
- Sidebar background: approx `#121212`
- Sidebar active item background: approx `#262626`
- Section label color: approx `#8F8F8F`
- Main nav text color: approx `#F1F1F1`
- Sidebar internal horizontal padding: approx `12px`
- Active item radius: approx `16px`
- Logo row top padding from window edge: approx `16-18px`

### Top Bar

- Top bar height to divider: exact from screenshot `63px`
- Top bar divider color: approx `#2A2A2A`
- Right pills background: approx `#2A2A2A`
- Right pills text color: approx `#F2F2F2`
- Pill height: approx `36px`
- Balance pill radius: approx `18px`
- Avatar pill size: approx `48 x 48`

### Content Area

- Content left start after sidebar: exact from screenshot `x = 288px`
- Content horizontal padding inside main area: approx `32px`
- Title top offset below top bar divider: approx `36px`
- Title text: `API keys`
- Title size: approx `22-24px`
- Title weight: approx `700`
- Subtitle top gap under title: approx `8px`
- Subtitle color: approx `#9A9A9A`
- Subtitle size: approx `15px`

### Primary Button

- Fill color: sampled approx `#5462FC`
- Text color: approx `#F8F8FF`
- Height: approx `36px`
- Horizontal padding: approx `16-18px`
- Radius: approx `16px`
- Positioned on the same row as title block, right-aligned

### Table Container

- Table left border: exact from screenshot `x = 288`
- Table right border: exact from screenshot `x = 1407`
- Table width: exact from screenshot `1120px`
- Table top border: exact from screenshot `y = 164`
- Border color: approx `#2A2A2A`
- Background: approx `#121212`
- Corner radius: approx `14-16px`

### Table Header

- Header row height: exact from screenshot about `43px` (`164` to `207`)
- Divider under header: approx `#2A2A2A`
- Header text color: approx `#B5B5B5`
- Header text size: approx `15px`
- Header weight: approx `500`

### Table Rows

- Visible data row height: exact from screenshot about `52px`
- Row dividers appear around:
  - `y = 207/208`
  - `y = 259/260`
  - `y = 311/312`
  - `y = 363/364`
  - `y = 415/416`
- Divider color: approx `#2A2A2A`
- Row background: approx `#121212`
- Hover/selected state should be very subtle, not card-like
- Cell text color: approx `#F2F2F2`
- Body text size: approx `15px`

### Status Pills

- Active pill fill: sampled approx `#7D89FC`
- Active pill text: approx `#FAFAFF`
- Expired pill fill: approx `#262626`
- Expired pill text: approx `#F3F3F3`
- Pill height: approx `28-29px`
- Pill radius: approx `999px`
- Horizontal padding: approx `12px`

### Context Menu

- Trigger uses vertical dots icon
- Menu background: approx `#2D2D2D`
- Menu border: approx `#5D5D5D`
- Hover item fill: approx `#4A4A4A`
- Menu radius: approx `16px`
- Menu width: approx `140-152px`

## Mobile Reference

Source:
- [mobile-reference.png](/Users/gennady/Documents/Projects/farlabs/docs/figma-reference/mobile-reference.png)
- Canvas size: `375 x 812`

### Overall Screen

- Background: approx `#121212`
- Safe-area style top spacing included in screenshot

### Header

- Status bar time: `9:41`
- Status bar starts near top edge
- Screen title: `API keys`
- Title color: sampled approx `#FAFAFA`
- Title size: approx `18px`
- Left/right page padding: approx `16px`
- Top title block ends before first card list starts at around `y = 96`

### Cards

- First card left edge: exact from screenshot `x = 16`
- First card right edge: exact from screenshot `x = 358`
- Card width: exact from screenshot `343px`
- First card top edge: exact from screenshot around `y = 96`
- Card background: approx `#1C1C1C`
- Card border: approx `#2E2E2E`
- Card radius: approx `14px`
- Vertical gap between cards: approx `12px`
- Card internal padding: approx `12-14px`
- Card title color: approx `#F4F4F4`
- Card secondary text color: sampled approx `#787878` to `#A6A6A6`

### Mobile FAB

- Fill color: sampled approx `#5462FC`
- Size: approx `44 x 44`
- Radius: approx `14px`
- Positioned bottom-right above bottom nav

### Bottom Navigation

- Top divider line begins around exact screenshot `y = 714/715`
- Background: approx `#121212`
- Active nav item background: approx `#262626`
- Active nav item icon container is circular
- Badge on billing item uses muted red fill
- Home indicator visible near bottom:
  - top around exact screenshot `y = 799`
  - height approx `5px`
  - width approx `134px`

## Implementation Guidance

- Prefer flat surfaces over elevated cards on desktop
- Keep borders and dividers around `#2A2A2A`
- Avoid gradients, glows, glassmorphism, and extra info panels
- Favor compact spacing and restrained typography
- Treat these values as the current local source of truth until Figma MCP quota becomes available again

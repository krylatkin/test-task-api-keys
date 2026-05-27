# Figma Reference Cache

This folder stores the local design references already extracted from Figma so we can continue implementation without additional MCP calls.

## Source

- Original file: `https://www.figma.com/design/YhoPH0zecNGm7uUjgLOfE8/Test_task--Copy-`
- Root node used before rate limiting: `35002:2100`
- Desktop reference node: `35182:2201`
- Mobile reference node: `35182:2307`

## Cached Assets

- `desktop-reference.png`
  - Exact desktop screenshot captured from the Figma node `35182:2201`
  - Resolution: `1440 x 900`
- `mobile-reference.png`
  - Exact mobile screenshot captured from the Figma node `35182:2307`
  - Resolution: `375 x 812`

## Key Layout Notes

- Desktop shell:
  - Outer rounded dark application window on near-black page background
  - Left sidebar with grouped navigation sections: `Platform`, `Node`, `System`
  - Top right pills: balance `$145,20` and avatar `RG`
- Desktop content:
  - Title `API keys`
  - Subtitle `Manage your API keys to access all models`
  - Primary action button `Create API key`
  - Single flat table container with subtle border and rounded corners
  - No decorative gradients, glows, metrics blocks, or extra explanatory panels
- Desktop table:
  - Columns: `Name`, `API key`, `Status`, `Expires`, `Created`, `Last used`, actions
  - Visible rows:
    - `ai_inference_key`
    - `model_training_key`
    - `vision_model_key`
    - `vision_model_key_v1`
  - Status pills shown in screenshot: `Active`, `Expired`
  - Context menu items: `Edit`, `Disable`, `Delete`
- Mobile screen:
  - Status bar at top
  - Title `API keys`
  - Card list instead of table
  - Bottom navigation with five items
  - Floating create button
  - Only the expired card shows a status pill in the captured state

## Working Constraint

- Figma MCP rate limit was reached on the Starter plan after these captures.
- Prefer these local PNG references for further visual matching unless MCP quota becomes available again.

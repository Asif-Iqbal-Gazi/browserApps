# ElectronJS Property Enumerator

A simple script for enumerating natively exposed properties on the `window` object inside an ElectronJS application's renderer process. Useful for security research, CTF challenges, and understanding what APIs an Electron app exposes to the frontend.

## What It Does

When injected into an ElectronJS app's DevTools console, the script:

1. Iterates over all **own properties** of the `window` object (i.e., properties directly on `window`, not inherited from its prototype)
2. Logs each property name to the **DevTools console**
3. Renders each property name into a DOM element with `id="new"` on the page
4. Collects all properties into an array
5. Logs the **total count** of discovered properties

This lets you quickly see what Electron-specific or app-specific APIs (e.g., custom `contextBridge` preload bindings) are available in the renderer process.

## Usage

### Option 1: DevTools Console (Quickest)

1. Open the target ElectronJS application
2. Open the Developer Tools (`Ctrl+Shift+I` / `Cmd+Option+I`, or via the app's menu)
3. Navigate to the **Console** tab
4. Paste the contents of `propEmun.js` (the inner script body, without the `<script>` tags) and press `Enter`
5. Inspect the console output — each property name will be printed, followed by the total count

### Option 2: Injected into a Page

If you have access to inject an HTML file into the app's renderer:

1. Add an element with `id="new"` to your page:
   ```html
   <div id="new"></div>
   ```
2. Include `propEmun.js` as a `<script>` tag in the page
3. Load the page inside the Electron app — enumerated properties will appear both in the DOM and the console

## Example Output

```
"window"
"location"
"customElectronApi"
"myPreloadBinding"
...
42
```

The final number is the total count of own properties found on `window`.

## Why Own Properties?

Using `hasOwnProperty` filters out prototype-chain properties (inherited from `Window.prototype`), focusing only on properties **directly defined on the `window` instance** — which is where Electron preload scripts typically attach custom APIs via `contextBridge.exposeInMainWorld`.

## Files

| File | Description |
|------|-------------|
| `propEmun.js` | The enumeration script |

## Use Cases

- **Security research**: Identify what native Node.js or Electron APIs are exposed to the renderer (potential attack surface)
- **CTF / reverse engineering**: Quickly discover hidden or custom APIs in an Electron-based challenge
- **Development audit**: Verify that only intended APIs are exposed via `contextBridge`

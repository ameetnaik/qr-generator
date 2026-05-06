# QR Code Generator

A simple Electron app for generating QR codes.

## Setup

```bash
npm install
```

## Run

```bash
npm start
```

## Build

First, add your icon files to the `build/` folder:
- `build/icon.icns` for macOS (512x512 or larger)
- `build/icon.ico` for Windows (256x256)
- `build/icon.png` for Linux (512x512)

Then build for your platform:

```bash
# Build for current platform
npm run build

# Build for specific platforms
npm run build:mac
npm run build:win
npm run build:linux
```

The built app will be in the `dist/` folder.

## Creating Icons

You can use online tools to convert a PNG to the required formats:
- https://cloudconvert.com/png-to-icns (for macOS)
- https://cloudconvert.com/png-to-ico (for Windows)

Or use the `electron-icon-builder` package to generate all formats from a single PNG.

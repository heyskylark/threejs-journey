# Lesson 8: Debug UI
A lesson into adding a debug UI into ThreeJs using third party dependencies such as `dat.gui`, `control-panel`, `ControlKit`, `Uil`, `Tweakpane`, `Guify`, `Oui`. These debug panels help for quick and efficient prototyping and avoid the need to constantly change parameters in the code.

In this specific instance, I am using `dat.gui`.

## Lesson Results
A cube that can be modified by a custom made debug UI.

![A cube that is being moved, color changed, and spun by buttons and selectors on a debug UI](/08-debug-ui/readme-assets/debug-ui.gif)

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

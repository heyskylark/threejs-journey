# Lesson 33: Mixing HTML and ThreeJs
This lessons briefly goes into laying HTML elements over ThreeJs. I combines a mix of simple JavaScript techinques (such as CSS and style minipulations) and built in ThreeJs matrix conversions to translate 2D points to a 3D world. Then using raycasters from these 2D points to determine if the HTML point should be visible or not.

Generally layering HTML and ThreeJs is less peformant, but in same cases it could make for a cool little scene like this.

## Lesson Results
![HTML Points overlaying a 3D object.](/33-mixing-html-and-webgl/readme-assets/html-helmet-overlay.gif)

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

# Lesson 4: Animation
A lesson in basic animation within ThreeJs using different animation methods and `requestAnimationFrame`.
- Delta tracking using time difference of `Date.now()` timestamp.
- Time elapsed tracking using ThreeJs `Clock` class.
- Animation library methods with their own internal clock such as `GSAP`.

## Lesson Results
The end results is a cube that is rotated and moved based on an elapsed time counter and learning the very basics of using tweens in a library like `GSAP`.

![A red cube rotating on its X and Y axis and its position being moved by a sin and cos function](/04-animations/readme-assets/cube-rotating.gif)

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

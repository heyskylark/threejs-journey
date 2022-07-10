# Lesson 26: Shader Shapes and Patterns using Math
This lesson applies the information we learned in the past two lessons about shaders to create a shader the simulates a raging sea. To simulate the raging sea, the vertex shader uses a combination of sin and perlin noise to generate waves. The fragement shader then uses the wave elevation to determine the color mix.

26-shader-patterns/readme-assets/animated-water.mov
![Perlin noise raging sea.](/27-raging-sea/readme-assets/water-shader.gif)

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

# Lesson 28: Galaxy Spin Driven by Shaders
This lesson applies all our learnings about shaders and uses them to create a galaxy similar to the galaxy we created a few lessons back. The only difference is that this galaxy is much more efficient as the vertex movement is calculated by the GPU. CPU calculations of each of the 10's of thousands of vertexes had to happen sequentailly, while shader driven calculations can happen in parallel enabling the spin to be calculated for many more verteces without reducing peformance.

![Shader driven galaxy.](/28-animated-galaxy/readme-assets/shader-galaxy.gif)

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

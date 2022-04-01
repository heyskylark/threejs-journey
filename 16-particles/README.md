# Lesson 16: Shadows
This lesson goes into creating particles and dealing with transperency issues when having a lot of elements in a scene that have transperency.

## Lesson Results
A wave of multi-colored hearts moving through the scene. The particles use a very inefficient method to calculate particle positions over time. In the future we will create custom shaders to hand that job off to the GPU.

![A wave of multi-colored heart particles.](/16-particles/readme-assets/heart-particles.gif)

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

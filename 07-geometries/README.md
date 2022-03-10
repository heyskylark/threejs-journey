# Lesson 7: Geometries
A lesson in how ThreeJs treats geometries. Going into the different preset geometries ThreeJs has. How ThreeJs generates triangles from vertices. And how to create your own vertex points to pass into the shader `position` attribute to make your own geometries.

## Lesson Results
A cube of random triangles created by making my own Float32Array of (`x,y,z`) vertex points and passing it into the positions attribute of the shader.

![A cube of randomly created vertex triangles](/07-geometries/readme-assets/vertex-triangles.png)

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

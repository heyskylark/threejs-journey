# Lesson 14: Shadows
This lesson starts with showing how ThreeJs generates its own shadows efficiently by using a shadow map and cameras within each light to take a snapshot for the shadow map. By tuning the camera settings (`near, far, fov, size`) and the shadow map size, it is possible to make the ThreeJs shadows look better. These shadows are not physicaly accurate, so in circumstances where there are multiple shadows, they will overlap unrealistically.

For realstic shadows with bounce lighting, baked shadows as a texture using a `MeshBasicMaterial` is enough to get the job done.

For dyanmic shadows it is also possible to use a black or colored texture with an alpha map to fake a shadow. The mesh with this texture will follow the object and it's opacity will be calculated by the distance the object it is following is away from the ground. It should also be noted the fake shadow mesh should be slightly above the ground (e.g. 0.01) to avoid Z-fighting.

## Lesson Results
A ThreeJs website that showcases shadow maps, baked shadows, and fake dyanmic shadows using a texture.

![Ball bouncing around with a fake dynamic shadow.](/14-shadows/readme-assets/dynamic-shadow.gif)

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

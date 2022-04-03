# Lesson 20: Physics
In this lesson we go over the different physic engines that are available to use along with ThreeJs. This lesson specifically we used `cannon` and then later the much more updated version `cannon-es`.

There are many physic engines to choose from.

3D:
- Cannon.js / Cannon-es
- Ammo.js
- Oimo.js 

2D:
- Matter.js
- P2.js
- Planck.js
- Box2D.js

## Optimizations
Along with learning how to add items to the physics world and have them interact. We also spent some time looking into optimizations.

There are many ways to opimize the physics but the highlighted ways in this lessons include `object sleeping`, `broadphase heuristics`, and `workers/multithreading`. Libraries like `cannon` have a range of broadphase choices that can cut down the ammount of physics checks, sleeping to remove items that are not moving from physics checks, and multithreading to make use of the CPUs multiple threads.

(Note: Graphics processing is happening on the GPU, but Cannon's physics is being calculated on the CPU.)

![Testing physics with a bunch of boxes and spheres.](/20-physics/readme-assets/physics.gif)

### Workers
An excellent examples of using workers to put certain jobs in their own workers: [Cannons Workers example](https://schteppe.github.io/cannon.js/examples/worker.html)

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

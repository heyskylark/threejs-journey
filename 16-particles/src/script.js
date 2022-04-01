import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('textures/particles/10.png')

// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

/**
 * Particles
 */
//  const particleGeometry = new THREE.SphereBufferGeometry(1, 32, 32)
const particleGeometry = new THREE.BufferGeometry()
const pointCount = 20000

// Multiplied by 3 for (X,Y,Z) coords
const positions = new Float32Array(pointCount * 3)
const colors = new Float32Array(pointCount * 3)

// Adding random points in a (10, 10, 10) square
for (let i = 0; i < pointCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    // color: 0xff88cc,
    alphaMap: particleTexture,
    transparent: true,
    vertexColors: true,
    sizeAttenuation: true,

    // Can test these or combine with different results
    // Not much of a performance impact
    // Tells gpu not to render alpha less than given value
    // Causes artifacts where edge can still hide what's behind
    // Good fix if particles are moving a lot
    // alphaTest: 0.001

    // Depth test can create bugs if you have other objs in your scene
    // or particles with different colors.
    // e.g. particles behind a cube will show through.
    // depthTest: false

    depthWrite: false,

    // This is cool but has performance impact
    // Basic like photoshop blending methods
    blending: THREE.AdditiveBlending
})

 // Points
 const particles = new THREE.Points(particleGeometry, particlesMaterial)
 scene.add(particles)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update particles
    // particles.rotation.y = elapsedTime * 0.02

    // This is a bad idea as it's a lot of work for the device
    // Generally its better to use a custom shader (GPU driven)
    for (let i = 0; i < pointCount; i++) {
        const i3 = i * 3
        const x = particleGeometry.attributes.position.array[i3]
        particleGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime  + x)
    }
    particleGeometry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
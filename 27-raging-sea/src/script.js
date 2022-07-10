import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import waterVertexShader from './shaders/water/vertex.glsl';
import waterFragmentShader from './shaders/water/fragment.glsl';

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 })
const debugObject = {
    depthColor: '#186691',
    surfaceColor: '#9bd8ff'
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(2, 2, 512, 512)

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
        uTime: { value: 0 },
        uWaveSpeed: { value: 1 },
        uWaveElevation: { value: 0.15 },
        uWaveFrequency: { value: new THREE.Vector2(4, 1.5) },

        uSmallWaveElevation: { value: 0.15 },
        uSmallWaveFrequency: { value: 3 },
        uSmallWaveSpeed: { value: 0.2 },
        uSmallWaveIterations: { value: 4 },

        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        uColorOffset: { value: 0.08 },
        uColorMultiplier: { value: 5 }
    }
})

gui.add(waterMaterial.uniforms.uWaveElevation, 'value')
    .min(0).max(1).step(0.01).name('Wave Elevation')

gui.add(waterMaterial.uniforms.uWaveFrequency.value, 'x')
    .min(0).max(25).step(0.01).name('Wave Frequency X')

gui.add(waterMaterial.uniforms.uWaveFrequency.value, 'y')
    .min(0).max(25).step(0.01).name('Wave Frequency Y')

gui.add(waterMaterial.uniforms.uWaveSpeed, 'value')
    .min(0).max(4).step(0.01).name('Wave Speed')

gui.add(waterMaterial.uniforms.uSmallWaveElevation, 'value')
    .min(0).max(1).step(0.01).name('Small Wave Elevation')

gui.add(waterMaterial.uniforms.uSmallWaveFrequency, 'value')
    .min(0).max(10).step(0.01).name('Small Wave Frequency')

gui.add(waterMaterial.uniforms.uSmallWaveSpeed, 'value')
    .min(0).max(4).step(0.01).name('Small Wave Speed')

gui.add(waterMaterial.uniforms.uSmallWaveIterations, 'value')
    .min(0).max(5).step(1).name('Small Wave Iterations')

gui.add(waterMaterial.uniforms.uColorOffset, 'value')
    .min(0).max(1).step(0.01).name('Color Offset')

gui.add(waterMaterial.uniforms.uColorMultiplier, 'value')
    .min(0).max(10).step(0.01).name('Color Multiplier')

gui.addColor(debugObject, 'depthColor')
    .name('Depth Color')
    .onChange(() => {
        waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor)
    })

gui.addColor(debugObject, 'surfaceColor')
    .name('Surface Color')
    .onChange(() => {
        waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor)
    })

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

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
camera.position.set(1, 1, 1)
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

    waterMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
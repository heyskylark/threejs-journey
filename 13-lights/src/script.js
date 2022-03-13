import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

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
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const ambientFolder = gui.addFolder('Ambient')
ambientFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.01).name('ambient intensity')

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)
const direcitonalFolder = gui.addFolder('Directional')
direcitonalFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.01).name('directional intensity')

// Hemisphere light lights the top with one color and the bottom with another
// Great to look like the light is bouncing (blue sky and green grass floor)
const hemisphereLight = new THREE.HemisphereLight(0x0ff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)
const hemisphereFolder = gui.addFolder('Hemisphere')
hemisphereFolder.add(hemisphereLight, 'intensity').min(0).max(1).step(0.01).name('hemisphere intensity')

// Point light is inf small and illuminates in every direciton
// Params:
//  Distance: Anything past this won't get illuminated
//  Decay: How fast the light decays over distance
const pointLight = new THREE.PointLight(0xff9000, 0.5, 3)
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight)
const pointFolder = gui.addFolder('Point')
pointFolder.add(pointLight, 'intensity').min(0).max(1).step(0.01).name('point intensity')

// RectAreaLight only works with MeshStandardMaterial or MeshPhysicalMaterial
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3()) // Vector(0, 0, 0) center of scene
scene.add(rectAreaLight)
const rectFolder = gui.addFolder('RectArea')
rectFolder.add(rectAreaLight, 'intensity').min(0).max(10).step(0.01).name('rect intensity')
rectFolder.add(rectAreaLight, 'width').min(0).max(3).step(0.01).name('rect width')
rectFolder.add(rectAreaLight, 'height').min(0).max(3).step(0.01).name('rect height')

// Angle: is angle of cone
// Penumbra: fades the edges out
// Spotlight rotation is based on target (Spotlight will look at this Object3D object)
//  Must add spotlight target to the scene, then can move target
const spotlight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotlight.position.set(0, 2, 3)
scene.add(spotlight)
spotlight.target.position.x = -1.75
scene.add(spotlight.target)
const spotlightFolder = gui.addFolder('Spotlight')
spotlightFolder.add(spotlight, 'intensity').min(0).max(10).step(0.01).name('spot intensity')
spotlightFolder.add(spotlight, 'distance').min(0).max(100).step(0.01).name('spot distance')
spotlightFolder.add(spotlight, 'angle').min(0).max(Math.PI).step(0.01).name('spot angle')
spotlightFolder.add(spotlight, 'penumbra').min(0).max(1).step(0.01).name('spot penumbra')
spotlightFolder.add(spotlight, 'decay').min(0).max(1).step(0.01).name('spot decay')

/**
 * PERFORMANCE: Lights cost a lot of performance.
 * There is even a limit to the number of lights (something like 50)
 * 
 * Min Cost: Ambient and Hemisphere
 * Moderate Cost: Directional and Point
 * High Cost: Spot and RectArea
 * 
 * To really help with performance and even have light bounce there is BAKING
 *  Drawback: Can't move the light (static) and the textures are huge
 */

/**
 * Helpers
 */
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointlightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointlightHelper)

const spotlightHelper = new THREE.SpotLightHelper(spotlight)
scene.add(spotlightHelper)
// Weird bug, but spotlight helper needs to be updated to point in right direciton
// User requestAnimationFrame to update on the NEXT frame
window.requestAnimationFrame(() => {
    spotlightHelper.update()
})

// RectAreaLightHelper is imported from the examples folder for some reason
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
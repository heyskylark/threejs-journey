import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Debug
 */
const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false // Always good to deactivate when you can (good idea when using NearestFilter)

// Can upload HDRIs to matheowis.github.io/HDRI-to-CubeMap to make cubemaps
const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

/**
 * Objects
 */
// ShaderMaterial/RawShaderMaterial: When creating your own shaders
// PointsMaterials: Material for particles
// MeshPhysicalMaterial: Great for materials that have a clear coat over them (more calcs)

const material = new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    aoMap: doorAmbientOcclusionTexture,
    alphaMap: doorAlphaTexture,
    displacementMap: doorHeightTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    normalMap: doorNormalTexture,
    envMap: environmentMapTexture
})
// material.metalness = 0.7
// material.roughness = 0.2
material.displacementScale = 0.05
material.transparent = true
material.side = THREE.DoubleSide
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)

// const material = new THREE.MeshToonMaterial({
//     gradientMap: gradientTexture
// })

// No artifacts and has light bounce (less performant than lambert)
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 1000
// material.specular = new THREE.Color(0x1188ff)

// Very performant but has weird artifacts
// const material = new THREE.MeshLambertMaterial()

// Great for creating fogs, pre-processing, etc
// const material = new THREE.MeshDepthMaterial()

// Great for fake lighting and reflections
// const material = new THREE.MeshMatcapMaterial({
//     matcap: matcapTexture
// })

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshBasicMaterial({
//     map: doorColorTexture,
//     alphaMap: doorAlphaTexture
// })
// // material.opacity = 0.5
// material.transparent = true
// material.side = THREE.DoubleSide

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 64, 64),
    material
)
sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 100, 100),
    material
)
plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)

const tourus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
    material
)
tourus.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(tourus.geometry.attributes.uv.array, 2)
)
tourus.position.x = 1.5

scene.add(sphere, plane, tourus)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

scene.add(ambientLight, pointLight)

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
    sphere.rotation.y = elapsedTime * 0.1
    plane.rotation.y = elapsedTime * 0.1
    tourus.rotation.y = elapsedTime * 0.1

    sphere.rotation.x = elapsedTime * 0.15
    plane.rotation.x = elapsedTime * 0.15
    tourus.rotation.x = elapsedTime * 0.15

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
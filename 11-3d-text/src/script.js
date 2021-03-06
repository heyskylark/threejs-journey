import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes Helper
const axesHelper = new THREE.AxesHelper()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const bevelSize = 0.02
        const bevelThickness = 0.03

        const textGeometry = new TextGeometry(
            'HeySkylark',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: bevelThickness,
                bevelSize: bevelSize,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )

        // The manual way
        // textGeometry.computeBoundingBox()
        // // Translating to the half way mark of all maximum bounding box values
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - bevelSize) * 0.5,
        //     - (textGeometry.boundingBox.max.y - bevelSize) * 0.5,
        //     - (textGeometry.boundingBox.max.z - bevelThickness) * 0.5
        // )

        // Function way
        textGeometry.center()

        const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
        const matcapMaterial = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture
        })
        const text = new THREE.Mesh(textGeometry, matcapMaterial)
        scene.add(text)

        // Optimization tip! ONE mesh and ONE material for N meshes
        const doughtnutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
        for(let i = 0; i < 1000; i++) {
            const doughnut = new THREE.Mesh(doughtnutGeometry, matcapMaterial)

            doughnut.position.x = (Math.random() - 0.5) * 10
            doughnut.position.y = (Math.random() - 0.5) * 10
            doughnut.position.z = (Math.random() - 0.5) * 10

            doughnut.rotation.x = Math.random() * Math.PI
            doughnut.rotation.y = Math.random() * Math.PI

            const randomScale = Math.random()
            doughnut.scale.set(randomScale, randomScale, randomScale)

            scene.add(doughnut)
        }
    }
)

/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
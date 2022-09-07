import './style.css'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'

import firefliesVertexShader from './shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from './shaders/fireflies/fragment.glsl'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import { Mesh } from 'three'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI({
//     width: 400
// })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMap = cubeTextureLoader.load([
    './px.png',
    './nx.png',
    './py.png',
    './ny.png',
    './pz.png',
    './nz.png'
])
environmentMap.encoding = THREE.sRGBEncoding

scene.background = environmentMap
scene.environment = environmentMap

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

const bakedTexture = textureLoader.load('baked.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

const starryNight = textureLoader.load('animecloud.png')
starryNight.encoding = THREE.sRGBEncoding

const bakedMaterial = new THREE.MeshBasicMaterial({
    map: bakedTexture
})

const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xfcf7dc })
const portalMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 }
    },
    vertexShader: portalVertexShader,
    fragmentShader: portalFragmentShader
})

/**
 * Model
 */
gltfLoader.load(
    'baked.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (child.name === "Cube004" || child.name === "Cube042") {
                    child.material = poleLightMaterial
                } else if (child.name === "Circle") {
                    child.material = portalMaterial
                } else {
                    child.material = bakedMaterial
                    child.material.envMapIntensity = 2.5
                    child.material.needsUpdate = true
                }
            }
        })

        gltf.scene.rotation.y = Math.PI/6
        scene.add(gltf.scene)
    }
)

const skyboxGeo = new THREE.SphereGeometry(50, 100, 100)
const skyboxMaterial = new THREE.MeshBasicMaterial({
    map: starryNight,
    side: THREE.DoubleSide
})
const skybox = new Mesh(skyboxGeo, skyboxMaterial)
skybox.position.y = -20
scene.add(skybox)

/**
 * Fireflies
 */
const firefliesGeometry = new THREE.BufferGeometry()
const firefliesCount = 30
const positions = new Float32Array(firefliesCount * 3)

const sizeRandomness = new Float32Array(firefliesCount)

for (let i = 0; i < firefliesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 6
    positions[i * 3 + 1] = Math.random() * 3
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6

    sizeRandomness[i] = Math.random()
}

firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(sizeRandomness, 1))

// Material
const fireflyMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
    },
    blending: THREE.AdditiveBlending,
    transparent: true,
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    depthWrite: false
})

const fireflies = new THREE.Points(firefliesGeometry, fireflyMaterial)
scene.add(fireflies)

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

    fireflyMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height)
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 7
camera.position.y = 4
camera.position.z = 7
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Post-Processing
 */
 const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600,
    {
        samples: renderer.getPixelRatio() === 1 ? 2 : 0
    }
)

const effectComposer = new EffectComposer(renderer, renderTarget)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(sizes.width, sizes.height)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

const unrealBloomPass = new UnrealBloomPass()
unrealBloomPass.strength = 0.3
unrealBloomPass.radius = 1.3
unrealBloomPass.threshold = 0.8
effectComposer.addPass(unrealBloomPass)

const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
effectComposer.addPass(gammaCorrectionPass)

if (renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2) {
    // This is okay but idealy we want to use default AA if available
    const smaaPass = new SMAAPass()
    effectComposer.addPass(smaaPass)
}

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    fireflyMaterial.uniforms.uTime.value = elapsedTime
    portalMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    effectComposer.render()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
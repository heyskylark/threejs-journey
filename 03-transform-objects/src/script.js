import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()
scene.add(group)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube1 = new THREE.Mesh(geometry, material)

// Position
cube1.position.set(0.7, -0.2, 1)
// Scale
cube1.scale.set(1.2, 0.5, 0.2)
// Rotation
/*
Rotation order matters.
ie. If you rotate X first then Y, the Y axis is moved at an angle by
X rotation causing it to rotate at a diagnole.
*/
// Mesh rotation reorder changes which axis will get reordered first
cube1.rotation.reorder('YXZ')
cube1.rotation.x = Math.PI * .25
cube1.rotation.y = Math.PI * .25

group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube2.position.x = -2
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
) 
cube2.position.x = 2
group.add(cube3)

// Axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

group.position.y = 1
group.scale.y = 2
group.rotation.y = Math.PI * .25

// There are groups where we can put a bunch of 
//  meshes together and move them as one thing

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.lookAt(group.position)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
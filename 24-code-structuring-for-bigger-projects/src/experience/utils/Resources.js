import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from "./EventEmitter";

class Resources extends EventEmitter {
    constructor(sources) {
        super()

        this.sources = sources
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {
            gltfLoader: new GLTFLoader(),
            textureLoader: new THREE.TextureLoader(),
            cubeTextureLoader: new THREE.CubeTextureLoader()
        }
    }

    startLoading() {
        for (const source of this.sources) {
            if (source.type === "gltfModel") {
                this.loaders.gltfLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file)
                })
            } else if (source.type === "texture") {
                this.loaders.textureLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file)
                })
            } else if (source.type === "cubeTexture") {
                this.loaders.cubeTextureLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file)
                })
            } else {
                console.log("Source type not supported: ", source.type)
            }
        }
    }

    sourceLoaded(source, loadedFile) {
        this.items[source.name] = loadedFile
        this.loaded++

        if (this.loaded === this.toLoad) {
            this.trigger("resourcesLoaded")
        }
    }
}

export default Resources;

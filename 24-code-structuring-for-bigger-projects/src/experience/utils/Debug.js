import * as dat from 'lil-gui'

class Debug {
    constructor() {
        this.active = window.location.hash === '#debug'

        if (this.active) {
            this.ui = new dat.GUI()
        }
    }
}

export default Debug;

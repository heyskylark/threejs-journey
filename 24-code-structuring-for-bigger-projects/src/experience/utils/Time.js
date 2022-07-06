import EventEmitter from "./EventEmitter";

class Time extends EventEmitter {
    constructor() {
        super()

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        // Average delta bewtween frames
        this.delta = 16

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick() {
        const currentTime = Date.now()
        const delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        window.requestAnimationFrame(() => {

            this.tick()
        })
    }
}

export default Time;

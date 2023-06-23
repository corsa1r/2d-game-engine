import GameObject from "../gameObject"
import Physics from "../physics/physics"
import Camera from "./camera"

export default class Renderer {

    public canvas: HTMLCanvasElement = document.createElement('canvas')
    public offScreenCanvas: HTMLCanvasElement = document.createElement('canvas')

    public context: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext('2d')
    public offScreenContext: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.offScreenCanvas.getContext('2d')

    public scale: number = window.devicePixelRatio
    public camera: Camera = new Camera(this.canvas)

    constructor(
        public width: number = 800,
        public height: number = 600
    ) {
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.canvas.id = 'main'

        this.offScreenCanvas.width = this.width
        this.offScreenCanvas.height = this.height
        this.offScreenCanvas.id = 'offscreen'
    }

    setSize(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        // Get the DPR and size of the canvas
        const rect = canvas.getBoundingClientRect()

        // Set the 'actual' size of the canvas
        canvas.width = rect.width
        canvas.height = rect.height

        // Scale the context to ensure correct drawing operations
        context.scale(this.scale, this.scale)

        // Set the 'drawn' size of the canvas
        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`
    }

    init() {
        document.body.appendChild(this.offScreenCanvas)
        this.setSize(this.offScreenCanvas, this.offScreenContext)
        document.body.appendChild(this.canvas)
        this.setSize(this.canvas, this.context)

        this.context.setTransform(1, 0, 0, 1, 0, 0)
        this.offScreenContext.setTransform(1, 0, 0, 1, 0, 0)
    }

    render(gameObjects: GameObject[]) {
        this.context.clearRect(0, 0, this.width, this.height)
        this.offScreenContext.clearRect(0, 0, this.width, this.height)
        this.camera.update()

        for (let gameObject of gameObjects) {
            if (!gameObject.enabled) continue
            if (!Physics.detectRectInRectCollision(this.camera, gameObject)) continue

            // begin drawing
            this.offScreenContext.beginPath()
            this.offScreenContext.save()
            // translate to it's center
            this.offScreenContext.translate(gameObject.position.x >> 0, gameObject.position.y >> 0)
            this.offScreenContext.translate(-this.camera.position.x >> 0, -this.camera.position.y >> 0)
            // rotate in degrees
            this.offScreenContext.rotate((gameObject.rotation * Math.PI) / 180)
            // render 
            gameObject.render(this.offScreenContext)
            // restore canvas / context for next object
            this.offScreenContext.restore()
            this.offScreenContext.closePath()
        }

        this.context.drawImage(this.offScreenCanvas, 0, 0)
    }
}

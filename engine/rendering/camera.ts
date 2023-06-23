import GameObject from "../gameObject"

export default class Camera extends GameObject {

    public target: GameObject | null = null

    constructor(
        private canvas: HTMLCanvasElement
    ) {
        super()
        this.physicsProperties.enabled = false
    }

    follow(newTarget: GameObject) {
        this.target = newTarget
    }

    update() {
        this.size.x = this.canvas.width
        this.size.y = this.canvas.height
        if (this.target) {
            this.position.x = this.target.position.x + (this.target.size.x / 2) - (this.canvas.width / 2)
            this.position.y = this.target.position.y + (this.target.size.y / 2) - (this.canvas.height / 2)
        }
    }

    render(context: CanvasRenderingContext2D): void { }
}
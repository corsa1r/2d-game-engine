import GameObject from "../../engine/gameObject"
import rand from "../../engine/math/rand"
import Vector2D from "../../engine/math/vector"

export default class Baloon extends GameObject {

    constructor() {
        super()

        setInterval(() => {
            let force = new Vector2D(rand(-20, 20), rand(-20, 20))
            this.applyForce(force)
        }, 100)
    }

    update(delta: number): void {
    }

    // render(context: CanvasRenderingContext2D): void {
    //     context.rect(0, 0, this.size.x, this.size.y)
    //     context.fillStyle = '#ffff00'
    //     context.fill()
    // }

    onCollision(bb: GameObject): void {

    }

}
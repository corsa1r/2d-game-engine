import { Container } from "pixi.js"
import Vector2D from "./math/vector"
import PhysicsProperties from "./physics/physicsProperties"

export default abstract class GameObject extends Container {
    public tags: string[] = []
    public enabled: boolean = true
    // public position: Vector2D = new Vector2D(0, 0)
    // public size: Vector2D = new Vector2D(50, 50)
    public physicsProperties = new PhysicsProperties()

    applyForce(vector: Vector2D) {
        this.physicsProperties.force.add(vector)
    }

    get left() {
        return this.position.x
    }

    get right() {
        return this.position.x + this.width
    }

    get top() {
        return this.position.y
    }

    get bottom() {
        return this.position.y + this.height
    }

    // Handles Game Logic
    abstract update(delta: number): void

    onCollision(bb: GameObject) { }
}

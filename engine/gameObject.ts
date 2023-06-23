import { Container } from "pixi.js"
import Vector2D from "./math/vector"
import PhysicsProperties from "./physics/physicsProperties"
import Cooldown from "./time/cooldown"
import Flag from "./states/flag"
import { CollisionDirection, GeneralDirection } from "./physics/physicsConstants"

export default abstract class GameObject extends Container {

    public abilities: { [key: string]: Cooldown } = {}
    public flags: { [key: string]: Flag } = {}
    public tags: string[] = []
    public enabled: boolean = true
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

    abstract update(delta: number): void

    onCollision(bb: GameObject, collisionDirection: CollisionDirection, generalDirection?: GeneralDirection) { }
}

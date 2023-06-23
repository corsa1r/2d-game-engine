import Vector2D from "./math/vector"
import Physics from "./physics/physics"
import PhysicsProperties from "./physics/physicsProperties"

export default abstract class GameObject {
    public tags: string[] = []
    public enabled: boolean = true
    public position: Vector2D = new Vector2D(0, 0)
    public size: Vector2D = new Vector2D(50, 50)
    public physicsProperties = new PhysicsProperties()
    public rotation: number = 0

    center(): Vector2D {
        return new Vector2D(
            this.position.x + (this.size.x / 2),
            this.position.y + (this.size.y / 2),
        )
    }

    applyForce(vector: Vector2D) {
        this.physicsProperties.force.add(vector)
    }

    get left() {
        return this.position.x
    }

    get right() {
        return this.position.x + this.size.x
    }

    get top() {
        return this.position.y
    }

    get bottom() {
        return this.position.y + this.size.y
    }

    // Handles Game Logic
    abstract update(delta: number): void
    // Renders The Object 
    abstract render(context: CanvasRenderingContext2D): void
    onCollision(bb: GameObject) { }
}

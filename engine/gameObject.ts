import { Container } from "pixi.js"
import Vector2D from "./math/vector"
import PhysicsProperties from "./physics/physicsProperties"
import Cooldown from "./time/cooldown"
import Flag from "./states/flag"
import { CollisionDirection, GeneralDirection } from "./physics/physicsConstants"
import chance from "./math/chance"
import rand from "./math/rand"

export default abstract class GameObject extends Container {

    // RPG Like Stats
    public attack: number = 10
    public hp: number = 100
    public armor: number = 1
    public killable: boolean = true
    public abilities: { [key: string]: Cooldown } = {}
    public criticalChange: number = 10 // 10%

    // Engine Stats
    public flags: { [key: string]: Flag } = {}
    public tags: string[] = []
    public enabled: boolean = true

    // Physics Stats
    public physicsProperties = new PhysicsProperties()

    applyDamage(damage: number): [number, boolean] {
        if (!this.killable) return [0, false]
        damage = damage * (rand(80, 100) / 100)
        let isCrit = chance(this.criticalChange)
        if (isCrit) damage *= 2
        let resultDamage = damage - this.armor
        if (resultDamage <= 0) return [0, false]
        this.hp -= resultDamage
        if (this.hp <= 0) setTimeout(() => this.destroy())
        return [damage, isCrit]
    }

    get left() {
        return this.position.x
    }

    get right() {
        return this.position.x + this.physicsProperties.size.x
    }

    get top() {
        return this.position.y
    }

    get bottom() {
        return this.position.y + this.physicsProperties.size.y
    }

    abstract update(delta: number): void

    onCollision(bb: GameObject, collisionDirection: CollisionDirection, generalDirection?: GeneralDirection) { }
}

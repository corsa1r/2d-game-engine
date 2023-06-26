import { Sprite, Texture } from "pixi.js"
import GameObject from "../../engine/gameObject"
import rand from "../../engine/math/rand"
import { CollisionDirection, GeneralDirection } from "../../engine/physics/physicsConstants"
import Rect from "../rect"
import DamageText from "./damageText"
import Vector2D from "../../engine/math/vector"

export default class Bullet extends GameObject {

    constructor(
        public spawnDirection: Vector2D
    ) {
        super()
        this.tags.push('bullet')
        this.physicsProperties.isVolume = true
        this.physicsProperties.size.set(10, 10)
        this.physicsProperties.ignoreCollisionsWithTags.push('player', 'bullet', 'door')
        let sprite = Sprite.from(Texture.WHITE)
        sprite.width = 10
        sprite.height = 10
        this.addChild(sprite)
        setTimeout(() => this.destroy(), 4000)
    }

    onCollision(bb: GameObject, collisionDirection: CollisionDirection, generalDirection?: GeneralDirection | undefined): void {
        if (bb instanceof Rect) {
            let damage = bb.applyDamage(this.attack)
            let damageText = new DamageText(damage)
            damageText.position.x = this.position.x + rand(-20, 20)
            damageText.position.y = this.position.y
            this.parent.addChild(damageText)
        }
        if (!(bb instanceof Bullet)) {
            // destory itself on collide 
            setTimeout(() => this.destroy(), 100)
        }
    }

    update(delta: number): void {
        // this.position.x += this.physicsProperties.direction.x * delta * 300
        this.physicsProperties.direction.x = this.spawnDirection.x
        this.physicsProperties.direction.y = this.spawnDirection.y
        this.physicsProperties.speed.x += 10
        this.physicsProperties.speed.y += 10
    }
}
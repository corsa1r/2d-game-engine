import { Assets, Sprite, Text, Texture } from "pixi.js"
import GameObject from "../../engine/gameObject"
import rand from "../../engine/math/rand"
import { CollisionDirection, GeneralDirection } from "../../engine/physics/physicsConstants"
import Rect from "../rect"
import DamageText from "./damageText"

export default class Bullet extends GameObject {

    constructor() {
        super()
        this.tags.push('bullet')
        this.physicsProperties.friction.set(0, 0)
        this.physicsProperties.size.set(10, 10)
        // this.physicsProperties.bounce.x = 0
        // this.physicsProperties.bounce.y = 0
        this.physicsProperties.isVolume = true
        this.physicsProperties.mass = 1
        let sprite = Sprite.from(Texture.WHITE)
        sprite.width = 10
        sprite.height = 10
        this.addChild(sprite)
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

    }
}
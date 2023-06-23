import { Text } from "pixi.js"
import GameObject from "../../engine/gameObject"
import Cooldown from "../../engine/time/cooldown"

export default class DamageText extends GameObject {

    constructor(public result: [number, boolean]) {
        super()
        this.physicsProperties.enabled = false
        let damageText = new Text(this.result[0].toFixed(0), {
            fill: this.result[1] ? 'yellow' : 'white'
        })
        this.addChild(damageText)
        this.abilities.toDissapear = new Cooldown(1)
    }

    update(delta: number): void {
        this.scale.x += .5 * delta
        this.scale.y += .5 * delta
        this.alpha -= 1 * delta
        this.position.x -= 50 * delta * (this.result[1] ? 1 : -1)
        this.position.y -= 50 * delta

        if (this.abilities.toDissapear.ready) {
            setTimeout(() => this.destroy())
        }
    }

}
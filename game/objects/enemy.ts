import { Sprite, Texture } from "pixi.js";
import GameObject from "../../engine/gameObject"
import distance from "../../engine/math/distance"
import Game from "../game"

export default class Enemy extends GameObject {

    constructor() {
        super()
        const rectangle = Sprite.from(Texture.WHITE)
        rectangle.width = 40
        rectangle.height = 40
        rectangle.tint = 0xFF0000
        this.addChild(rectangle)
        this.physicsProperties.size.set(40, 40)
    }

    update(delta: number): void {
        let player = Game.level.children.find((gameObject) => gameObject.tags.includes('player'))
        if (player) this.moveTo(player.position)

        let nextPoint = this.movePoints[0]
        if (nextPoint) {
            let rad = Math.atan2(nextPoint.y - this.position.y, nextPoint.x - this.position.x)

            this.physicsProperties.direction.x = Math.cos(rad)
            this.physicsProperties.direction.y = Math.sin(rad)

            if (distance(this.position, nextPoint) < 10) {
                this.movePoints.shift()
            }
        }
    }

}
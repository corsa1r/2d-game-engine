import { Assets, Sprite } from "pixi.js"
import GameObject from "../../engine/gameObject"
import rand from "../../engine/math/rand"
import Cooldown from "../../engine/time/cooldown"

export default class Door extends GameObject {

    public open: boolean = false

    constructor() {
        super()
        this.physicsProperties.isStatic = true
        this.physicsProperties.isVolume = true
        this.tags.push('rock')
        this.init()

        this.abilities.toToggle = new Cooldown(.35)
    }

    async init() {
        let sprite = new Sprite(await Assets.load('./game/assets/test/door_closed.png'))
        sprite.width = 50
        sprite.height = 50
        this.addChild(sprite)
    }

    update(delta: number): void {

    }

    async toggle() {
        this.removeChildren()
        if (this.open) {
            let sprite = new Sprite(await Assets.load('./game/assets/test/door_closed.png'))
            sprite.width = 50
            sprite.height = 50
            this.addChild(sprite)
        } else {
            let sprite = new Sprite(await Assets.load('./game/assets/test/door_open.png'))
            sprite.width = 50
            sprite.height = 50
            this.addChild(sprite)
        }
        this.open = !this.open
        this.abilities.toToggle.activate()
    }
}
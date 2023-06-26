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
        this.physicsProperties.size.set(50, 50)
        this.tags.push('door')
        this.init()
        this.killable = false
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
            this.open = false
        } else {
            let sprite = new Sprite(await Assets.load('./game/assets/test/door_open.png'))
            sprite.width = 50
            sprite.height = 50
            this.addChild(sprite)
            this.open = true
        }

        this.abilities.toToggle.activate()
    }
}
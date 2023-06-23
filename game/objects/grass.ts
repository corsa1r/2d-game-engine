import { Assets, Sprite, Texture } from "pixi.js"
import GameObject from "../../engine/gameObject"
import rand from "../../engine/math/rand"
import Game from "../game"

export default class Grass extends GameObject {

    private textureName = ['floor', 'floor_mud_1', 'floor_mud_2'][rand(0, 2)]

    constructor() {
        super()
        this.physicsProperties.enabled = false
        this.physicsProperties.size.set(50, 50)
        this.tags.push('grass')

        this.init()
    }

    async init() {
        let sprite = new Sprite(await Assets.load('./game/assets/test/' + this.textureName + '.png'))
        sprite.width = 50
        sprite.height = 50
        this.addChild(sprite)
    }

    update(delta: number): void {

    }
}
import { Assets, Sprite, Texture, spritesheetAsset } from "pixi.js"
import GameObject from "../engine/gameObject"
import Game from "./game"

export default class Rect extends GameObject {

    public color: string = '#000000'

    constructor() {
        super()
        this.physicsProperties.isStatic = true
        this.tags.push('rock')
        this.init()
    }

    async init() {
        let sprite = new Sprite(await Assets.load('./game/assets/test/wall.png'))
        sprite.width = 50
        sprite.height = 50
        this.addChild(sprite)
    }

    update(delta: number): void { }
}
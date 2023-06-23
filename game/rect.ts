import { Assets, Sprite, Text } from "pixi.js"
import GameObject from "../engine/gameObject"

export default class Rect extends GameObject {

    public color: string = '#000000'
    public theSprite: Sprite | null = null
    public hpText: Text = new Text(this.hp.toString(), {
        fill: 'red',
        fontSize: 15
    })

    constructor() {
        super()
        this.physicsProperties.isStatic = true
        this.physicsProperties.size.set(50, 50)
        this.tags.push('rock')
        this.init()
        this.hp = 1000
        this.armor = 10
    }

    async init() {
        this.theSprite = new Sprite(await Assets.load('./game/assets/test/wall.png'))
        this.theSprite.width = 50
        this.theSprite.height = 50
        this.addChild(this.theSprite)
        this.hpText.x = 10
        this.addChild(this.hpText)
    }

    update(delta: number): void {
        let percentage = ((this.hp / 1000) * 100)
        this.hpText.text = percentage.toFixed(0) + '%'
        this.hpText.alpha = this.hp === 1000 ? 0 : 1
        if (this.theSprite) {
            this.theSprite.alpha = percentage / 10 / 10 * 2
        }
    }
}
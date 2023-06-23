import { Assets, Sprite, Texture } from "pixi.js";
import GameObject from "../engine/gameObject"
import { KeyboardInput } from "../engine/input/keyboardInput"
import Vector2D from "../engine/math/vector";
import Game from "./game";
import to from "../engine/utils/await";
import rand from "../engine/math/rand";

export default class Player extends GameObject {

    public moveSpeed: number = 5

    constructor() {
        super();
        this.tags.push('player')
        this.physicsProperties.mass = 0.8
        this.physicsProperties.friction.copy(new Vector2D(3, 3))
        this.init()
    }

    async init() {
        let sprite = new Sprite(await Assets.load('./game/assets/test/player.png'))
        sprite.width = 40
        sprite.height = 40
        sprite.name = 'texture'
        this.addChild(sprite)
    }

    update(delta: number): void {
        if (KeyboardInput.states.KeyD) {
            this.physicsProperties.force.x = this.moveSpeed
        }

        if (KeyboardInput.states.KeyA) {
            this.physicsProperties.force.x = -this.moveSpeed
        }

        if (KeyboardInput.states.KeyW) {
            this.physicsProperties.force.y = -this.moveSpeed
        }

        if (KeyboardInput.states.KeyS) {
            this.physicsProperties.force.y = this.moveSpeed
        }

        if (KeyboardInput.states.Space) {
            this.x = rand(100, 1000)
            this.y = rand(100, 1000)
        }
    }

    // render(context: CanvasRenderingContext2D): void {
    //     context.drawImage(<CanvasImageSource>Game.level.resources.textures.player.resource, 0, 0, 32, 32)
    // }

    onCollision(gameObject: GameObject): void {
        // console.warn(gameObject.tags)
    }
}
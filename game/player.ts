import GameObject from "../engine/gameObject"
import { KeyboardInput } from "../engine/input/keyboardInput"
import Vector2D from "../engine/math/vector";
import Game from "./game";

export default class Player extends GameObject {

    public moveSpeed: number = 5

    constructor() {
        super();
        this.tags.push('PLAYER')
        this.size.x = 32
        this.size.y = 32
        this.physicsProperties.mass = 0.8
        this.physicsProperties.friction.copy(new Vector2D(3, 3))
        this.physicsProperties.bounce.x = 0
        this.physicsProperties.bounce.y = 0
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
    }

    render(context: CanvasRenderingContext2D): void {
        context.drawImage(<CanvasImageSource>Game.level.resources.textures.player.resource, 0, 0, 32, 32)
    }

    onCollision(gameObject: GameObject): void {
        // console.warn(gameObject.tags)
    }
}
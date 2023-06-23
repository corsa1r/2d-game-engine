import { Assets, Sprite } from "pixi.js"
import GameObject from "../engine/gameObject"
import { KeyboardInput } from "../engine/input/keyboardInput"
import Vector2D from "../engine/math/vector"
import rand from "../engine/math/rand"
import Cooldown from "../engine/time/cooldown"
import { CollisionDirection, GeneralDirection } from "../engine/physics/physicsConstants"
import Door from "./objects/door"
import distance from "../engine/math/distance"

export default class Player extends GameObject {

    public moveSpeed: number = 25

    constructor() {
        super();
        this.tags.push('player')
        this.physicsProperties.mass = 5
        this.physicsProperties.friction.copy(new Vector2D(20, 20))
        this.physicsProperties.bounce.multiplyBy(0.1)
        this.init()

        this.abilities.teleport = new Cooldown(1)
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

        if (KeyboardInput.states.KeyT && this.abilities.teleport.ready) {
            this.abilities.teleport.activate()
            this.physicsProperties.velocity.multiplyBy(0)
            this.x = rand(100, 4000)
            this.y = rand(100, 4000)
        }
    }

    onCollision(bb: GameObject, collisionDirection: CollisionDirection, generalDirection?: GeneralDirection | undefined): void {
        if (bb instanceof Door) {
            if (KeyboardInput.states.KeyE && bb.abilities.toToggle.ready) {
                bb.toggle()
            }

            if (bb.open && distance(this.position, bb.position) <= 10) {
                bb.physicsProperties.enabled = false
                window.location.reload()
            }
        }
    }
}
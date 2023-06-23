import { Assets, Sprite, Text } from "pixi.js"
import GameObject from "../engine/gameObject"
import { KeyboardInput } from "../engine/input/keyboardInput"
import Vector2D from "../engine/math/vector"
import rand from "../engine/math/rand"
import Cooldown from "../engine/time/cooldown"
import { CollisionDirection, GeneralDirection } from "../engine/physics/physicsConstants"
import Door from "./objects/door"
import distance from "../engine/math/distance"
import Bullet from "./objects/bullet"

export default class Player extends GameObject {

    public moveSpeed: number = 25
    public orientation: Vector2D = new Vector2D(1, 0)
    public ammo: number = 100
    public ammoText: Text = new Text(this.ammo, {
        fill: 'yellow',
        fontSize: 10
    })

    constructor() {
        super();
        this.tags.push('player')
        this.physicsProperties.mass = 5
        this.attack = 168
        this.physicsProperties.size.set(40, 40)
        this.physicsProperties.friction.copy(new Vector2D(20, 20))
        this.physicsProperties.bounce.multiplyBy(0.1)
        this.init()

        this.abilities.teleport = new Cooldown(1)
        this.abilities.shoot = new Cooldown(.09)
    }

    async init() {
        let sprite = new Sprite(await Assets.load('./game/assets/test/player.png'))
        sprite.width = 40
        sprite.height = 40
        sprite.name = 'texture'
        this.addChild(sprite)

        this.ammoText.y = 50
        this.addChild(this.ammoText)
    }

    update(delta: number): void {
        this.ammoText.text = `Ammo: ${this.ammo}`
        if (KeyboardInput.states.KeyT && this.abilities.teleport.ready) {
            this.abilities.teleport.activate()
            this.physicsProperties.velocity.multiplyBy(0)
            this.x = rand(100, 4000)
            this.y = rand(100, 4000)
        }

        if (KeyboardInput.states.KeyI && this.abilities.shoot.ready && this.ammo) {
            this.abilities.shoot.activate()
            this.ammo -= 1
            let bullet = new Bullet()
            bullet.attack = this.attack
            bullet.position.x = this.position.x + (this.physicsProperties.size.x / 2) + (50 * this.orientation.x)
            bullet.position.y = this.position.y + (this.physicsProperties.size.y / 2)
            bullet.applyForce(new Vector2D(
                this.orientation.x * 30 + this.physicsProperties.velocity.x,
                this.physicsProperties.velocity.y * .1
            ))
            this.parent.addChild(bullet)
        }

        if (KeyboardInput.states.KeyD) {
            this.physicsProperties.force.x = this.moveSpeed
            this.orientation.x = 1
        }

        if (KeyboardInput.states.KeyA) {
            this.physicsProperties.force.x = -this.moveSpeed
            this.orientation.x = -1
        }

        if (KeyboardInput.states.KeyW) {
            this.physicsProperties.force.y = -this.moveSpeed
            // this.orientation.y = -1
        }

        if (KeyboardInput.states.KeyS) {
            this.physicsProperties.force.y = this.moveSpeed
            // this.orientation.y = 1
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
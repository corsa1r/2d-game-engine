import { Assets, Sprite, Text } from "pixi.js"
import GameObject from "../engine/gameObject"
import { KeyboardInput } from "../engine/input/keyboardInput"
import Vector2D from "../engine/math/vector"
import Cooldown from "../engine/time/cooldown"
import { CollisionDirection, GeneralDirection } from "../engine/physics/physicsConstants"
import Door from "./objects/door"
import distance from "../engine/math/distance"
import Bullet from "./objects/bullet"
import Physics from "../engine/physics/physics"
import Game from "./game"

export default class Player extends GameObject {
    public ammo: number = 10000
    public ammoText: Text = new Text(this.ammo, {
        fill: 'yellow',
        fontSize: 10
    })
    public lookDirectionX = 1
    public lookDirectionY = 1

    constructor() {
        super();
        this.tags.push('player')
        this.attack = 168
        this.physicsProperties.size.set(40, 40)

        this.abilities.teleport = new Cooldown(1)
        this.abilities.shoot = new Cooldown(0.05)

        this.init()
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

        if (KeyboardInput.states.KeyD) {
            this.physicsProperties.direction.x = 1
            this.lookDirectionX = 1
        } else if (KeyboardInput.states.KeyA) {
            this.physicsProperties.direction.x = -1
            this.lookDirectionX = -1
        } else if (KeyboardInput.states.KeyW || KeyboardInput.states.KeyS) {
            this.lookDirectionX = 0
        }

        if (KeyboardInput.states.KeyW) {
            this.physicsProperties.direction.y = -1
            this.lookDirectionY = -1
        } else if (KeyboardInput.states.KeyS) {
            this.physicsProperties.direction.y = 1
            this.lookDirectionY = 1
        } else if(KeyboardInput.states.KeyD || KeyboardInput.states.KeyA) {
            this.lookDirectionY = 0
        }

        if (KeyboardInput.states.KeyI && this.abilities.shoot.ready && this.ammo) {
            this.abilities.shoot.activate()
            this.ammo -= 1

            let bullet = new Bullet(new Vector2D(this.lookDirectionX, this.lookDirectionY))
            bullet.attack = this.attack
            bullet.position.x = this.position.x + (this.physicsProperties.size.x / 2) + (0 * this.lookDirectionX)
            bullet.position.y = this.position.y + (this.physicsProperties.size.y / 2) + (0 * this.lookDirectionY)
            this.parent.addChild(bullet)
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
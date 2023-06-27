import { Point } from "pixi.js"
import Bullet from "../../game/objects/bullet"
import Player from "../../game/player"
import GameObject from "../gameObject"
import distance from "../math/distance"
import Vector2D from "../math/vector"
import { CollisionDirection, GeneralDirection } from "./physicsConstants"
import PhysicsProperties from "./physicsProperties"

export class PseudoPhysicsGameObject {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public physicsProperties: PhysicsProperties,
        public ref: GameObject
    ) { }

    get right(): number {
        return this.x + this.width
    }

    get left(): number {
        return this.x
    }

    get top(): number {
        return this.y
    }

    get bottom(): number {
        return this.y + this.height
    }

    static from(gameObject: GameObject) {
        return new PseudoPhysicsGameObject(
            gameObject.position.x,
            gameObject.position.y,
            gameObject.physicsProperties.size.x,
            gameObject.physicsProperties.size.y,
            gameObject.physicsProperties,
            gameObject
        )
    }
}

export default class Physics {

    static detectRectInRectCollision(aa: GameObject | PseudoPhysicsGameObject, bb: GameObject): boolean {
        let fromLeft = aa.right > bb.left
        let fromRight = aa.left < bb.right
        let fromTop = aa.bottom > bb.top
        let fromBottom = aa.top < bb.bottom
        return fromLeft && fromRight && fromTop && fromBottom
    }

    static canBeThere(aa: PseudoPhysicsGameObject, gameObjects: GameObject[]) {
        for (let bb of gameObjects) {
            if (aa.ref === bb) continue
            if (!bb.physicsProperties.enabled) continue // if bb has disabled physics interactions that means aa can be there
            if (distance(new Point(aa.x, aa.y), bb.position) > 200) continue
            if (aa.physicsProperties.ignoreCollisionsWithTags.some((igoreTag) => bb.tags.includes(igoreTag))) continue // if aa ignores collisions with bb tags it can be there
            if (bb.physicsProperties.isVolume) continue
            if (Physics.detectRectInRectCollision(aa, bb)) return false
        }
        return true
    }

    static resolveRectInRectCollision(aa: GameObject, gameObjects: GameObject[], direction: CollisionDirection) {
        for (let bb of gameObjects) {
            if (aa === bb || !aa.physicsProperties.enabled || !bb.physicsProperties.enabled) continue
            if (distance(aa.position, bb.position) > 500) continue
            if (!Physics.detectRectInRectCollision(aa, bb)) continue
            if (aa.physicsProperties.ignoreCollisionsWithTags.some((igoreTag) => bb.tags.includes(igoreTag))) continue

            if (direction === CollisionDirection.HORIZONTAL) {
                if ((aa.physicsProperties.direction.x > 0 || bb.physicsProperties.isVolume) && aa.right > bb.left) {
                    aa.onCollision(bb, direction, GeneralDirection.RIGHT)
                    if (bb.physicsProperties.isVolume) continue

                    aa.position.x = bb.left - aa.physicsProperties.size.x
                }
                if ((aa.physicsProperties.direction.x < 0 || bb.physicsProperties.isVolume) && aa.left < bb.right) {
                    aa.onCollision(bb, direction, GeneralDirection.LEFT)
                    if (bb.physicsProperties.isVolume) continue

                    aa.position.x = bb.right
                }

            }

            if (direction === CollisionDirection.VERTICAL) {
                if ((aa.physicsProperties.direction.y > 0 || bb.physicsProperties.isVolume) && aa.bottom > bb.top) {
                    aa.onCollision(bb, direction, GeneralDirection.DOWN)
                    if (bb.physicsProperties.isVolume) continue

                    aa.position.y = bb.top - aa.physicsProperties.size.y
                }
                if ((aa.physicsProperties.direction.y < 0 || bb.physicsProperties.isVolume) && aa.top < bb.bottom) {
                    aa.onCollision(bb, direction, GeneralDirection.UP)
                    if (bb.physicsProperties.isVolume) continue

                    aa.position.y = bb.bottom
                }
            }
        }
    }

    static update(delta: number, gameObject: GameObject, gameObjects: GameObject[]) {
        if (!gameObject.physicsProperties.enabled) return
        if (gameObject.physicsProperties.isStatic) return

        let normal = gameObject.physicsProperties.direction.clone().normalize().absolute()

        gameObject.position.x += gameObject.physicsProperties.speed.x * delta * gameObject.physicsProperties.direction.x * normal.x
        Physics.resolveRectInRectCollision(gameObject, gameObjects, CollisionDirection.HORIZONTAL)

        gameObject.position.y += gameObject.physicsProperties.speed.y * delta * gameObject.physicsProperties.direction.y * normal.y
        Physics.resolveRectInRectCollision(gameObject, gameObjects, CollisionDirection.VERTICAL)

        gameObject.physicsProperties.direction.set(0, 0)
    }
}

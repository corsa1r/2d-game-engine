import Bullet from "../../game/objects/bullet"
import Player from "../../game/player"
import GameObject from "../gameObject"
import distance from "../math/distance"
import Vector2D from "../math/vector"
import { CollisionDirection, GeneralDirection } from "./physicsConstants"

export default class Physics {

    static detectRectInRectCollision(aa: GameObject, bb: GameObject): boolean {
        let fromLeft = aa.right > bb.left
        let fromRight = aa.left < bb.right
        let fromTop = aa.bottom > bb.top
        let fromBottom = aa.top < bb.bottom
        return fromLeft && fromRight && fromTop && fromBottom
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

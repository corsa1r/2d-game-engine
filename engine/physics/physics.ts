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
            // skip collisions with disabled physics for GameObject
            if (aa === bb || !aa.physicsProperties.enabled || !bb.physicsProperties.enabled) continue

            if (distance(aa.position, bb.position) < 500 && Physics.detectRectInRectCollision(aa, bb)) {

                if (direction === CollisionDirection.HORIZONTAL) {
                    let bounce_x = -aa.physicsProperties.bounce.x / aa.physicsProperties.mass
                    if (aa.physicsProperties.direction.x > 0 && aa.right > bb.left) {
                        aa.onCollision(bb, direction, GeneralDirection.RIGHT)
                        if (bb.physicsProperties.isVolume) continue;

                        aa.position.x = bb.left - aa.width
                        aa.physicsProperties.velocity.x *= bounce_x // stop acceleration in right and bounce
                        aa.physicsProperties.force.x = 0
                    }
                    if (aa.physicsProperties.direction.x < 0 && aa.left < bb.right) {
                        aa.onCollision(bb, direction, GeneralDirection.LEFT)
                        if (bb.physicsProperties.isVolume) continue;

                        aa.position.x = bb.right
                        aa.physicsProperties.velocity.x *= bounce_x // stop acceleration in left and bounce
                        aa.physicsProperties.force.x = 0
                    }

                } else if (direction === CollisionDirection.VERTICAL) {
                    let bounce_y = -aa.physicsProperties.bounce.y / aa.physicsProperties.mass
                    if (aa.physicsProperties.direction.y > 0 && aa.bottom > bb.top) {
                        aa.onCollision(bb, direction, GeneralDirection.DOWN)
                        if (bb.physicsProperties.isVolume) continue;

                        aa.position.y = bb.top - aa.height
                        aa.physicsProperties.velocity.y *= bounce_y // stop acceleration in top and bounce
                        aa.physicsProperties.force.y = 0
                    }
                    if (aa.physicsProperties.direction.y < 0 && aa.top < bb.bottom) {
                        aa.onCollision(bb, direction, GeneralDirection.UP)
                        if (bb.physicsProperties.isVolume) continue;

                        aa.position.y = bb.bottom
                        aa.physicsProperties.velocity.y *= bounce_y // stop acceleration in bottom and bounce
                        aa.physicsProperties.force.y = 0
                    }
                }
            }
        }
    }

    static update(delta: number, gameObject: GameObject, gameObjects: GameObject[]) {
        if (!gameObject.physicsProperties.enabled) return
        if (gameObject.physicsProperties.isStatic) return

        let force = gameObject.physicsProperties.force

        gameObject.physicsProperties.velocity.add(force)
        // Set directions
        gameObject.physicsProperties.direction.copy(gameObject.physicsProperties.velocity.dir())
        // x collisions
        gameObject.position.x += gameObject.physicsProperties.velocity.x * delta
        Physics.resolveRectInRectCollision(gameObject, gameObjects, CollisionDirection.HORIZONTAL)
        // y collisions
        gameObject.position.y += gameObject.physicsProperties.velocity.y * delta
        Physics.resolveRectInRectCollision(gameObject, gameObjects, CollisionDirection.VERTICAL)

        // apply surface friction to the object's velocity
        gameObject.physicsProperties.velocity.toZero(gameObject.physicsProperties.friction, .1) //todo madafaka
        gameObject.physicsProperties.force.toZero(
            new Vector2D(
                gameObject.physicsProperties.mass,
                gameObject.physicsProperties.mass,
            ),
            0.001
        )
    }
}

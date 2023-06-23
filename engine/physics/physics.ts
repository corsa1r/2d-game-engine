import GameObject from "../gameObject"
import distance from "../math/distance"
import Vector2D from "../math/vector"

export enum Directions {
    HORIZONTAL,
    VERTICAL
}

export default class Physics {

    static detectRectInRectCollision(aa: GameObject, bb: GameObject): boolean {
        let fromLeft = aa.right > bb.left
        let fromRight = aa.left < bb.right
        let fromTop = aa.bottom > bb.top
        let fromBottom = aa.top < bb.bottom
        return fromLeft && fromRight && fromTop && fromBottom
    }

    static resolveRectInRectCollision(aa: GameObject, gameObjects: GameObject[], direction: Directions) {
        for (let bb of gameObjects) {
            // skip collisions with disabled physics for GameObject
            if (aa === bb || !aa.physicsProperties.enabled || !bb.physicsProperties.enabled) continue

            if (distance(aa.position, bb.position) < 500 && Physics.detectRectInRectCollision(aa, bb)) {
                aa.onCollision(bb)

                if (bb.physicsProperties.isVolume) continue; // don't resolve if other object is a volume

                if (direction === Directions.HORIZONTAL) {
                    let bounce_x = -aa.physicsProperties.bounce.x / aa.physicsProperties.mass
                    if (aa.physicsProperties.direction.x > 0 && aa.right > bb.left) {
                        aa.position.x = bb.left - aa.width
                        aa.physicsProperties.velocity.x *= bounce_x // stop acceleration in right and bounce
                    }
                    if (aa.physicsProperties.direction.x < 0 && aa.left < bb.right) {
                        aa.position.x = bb.right
                        aa.physicsProperties.velocity.x *= bounce_x // stop acceleration in left and bounce
                    }

                } else if (direction === Directions.VERTICAL) {
                    let bounce_y = -aa.physicsProperties.bounce.y / aa.physicsProperties.mass
                    if (aa.physicsProperties.direction.y > 0 && aa.bottom > bb.top) {
                        aa.position.y = bb.top - aa.height
                        aa.physicsProperties.velocity.y *= bounce_y // stop acceleration in top and bounce
                    }
                    if (aa.physicsProperties.direction.y < 0 && aa.top < bb.bottom) {
                        aa.position.y = bb.bottom
                        aa.physicsProperties.velocity.y *= bounce_y // stop acceleration in bottom and bounce
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
        Physics.resolveRectInRectCollision(gameObject, gameObjects, Directions.HORIZONTAL)
        // y collisions
        gameObject.position.y += gameObject.physicsProperties.velocity.y * delta
        Physics.resolveRectInRectCollision(gameObject, gameObjects, Directions.VERTICAL)

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

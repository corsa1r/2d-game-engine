import GameObject from "./gameObject"
import Physics from "./physics/physics"
import Resources from "./resources/resources"

export default class Level {

    public gameObjects: GameObject[] = []

    constructor(
        public name: string,
        public resources: Resources = new Resources(),
    ) { }

    update(delta: number) {
        for (let gameObject of this.gameObjects) {
            if (!gameObject.enabled) continue

            // handle Input
            gameObject.update(delta)

            // Update positions
            Physics.update(delta, gameObject, this.gameObjects)
        }
    }
}

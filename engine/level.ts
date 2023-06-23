import { Container } from "pixi.js"
import GameObject from "./gameObject"
import Physics from "./physics/physics"
import Resources from "./resources/resources"

export default class Level extends Container<GameObject> {

    constructor(
        public name: string,
        public resources: Resources = new Resources(),
    ) {
        super()
    }

    update(delta: number) {
        this.children.forEach((gameObject) => {
            if (!gameObject.enabled) return

            // handle Input
            gameObject.update(delta)

            // Update positions
            Physics.update(delta, gameObject, this.children)
        })
    }
}

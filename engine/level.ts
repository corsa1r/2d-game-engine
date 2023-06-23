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
            // Update cooldowns
            Object.values(gameObject.abilities).forEach((cd) => cd.update(delta))
            // Handle Input
            gameObject.update(delta)
            // Correct positions
            Physics.update(delta, gameObject, this.children)
        })
    }
}

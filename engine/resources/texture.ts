import Vector2D from "../math/vector"
import Resource from "./resource"

export default class Texture extends Resource<HTMLImageElement> {

    constructor(
        protected resourcePath: string,
        public size: Vector2D = new Vector2D(100, 100)
    ) {
        super(resourcePath)
    }

    load(): Promise<Texture> {
        if (this.loaded)
            return Promise.resolve(this)

        this.loading = true
        this.resource = new Image()
        this.resource.width = this.size.x
        this.resource.height = this.size.y
        this.resource.src = this.resourcePath
        this.resource.onload = () => {
            this.loaded = true
            this.loading = false
        }

        return Promise.resolve(this)
    }

}

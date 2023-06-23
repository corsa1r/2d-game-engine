import GameObject from "../engine/gameObject"
import Game from "./game"

export default class Rect extends GameObject {

    public color: string = '#000000'

    constructor() {
        super()
        this.physicsProperties.isStatic = true
        this.tags.push('rock')
    }

    update(delta: number): void { }

    render(context: CanvasRenderingContext2D): void {
        if (Game.level.resources.textures.rect.resource) {
            context.drawImage(Game.level.resources.textures.rect.resource, 0, 0, 50, 50)
        }
    }
}
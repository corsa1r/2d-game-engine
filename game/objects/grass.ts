import GameObject from "../../engine/gameObject"
import rand from "../../engine/math/rand"
import Game from "../game"

export default class Grass extends GameObject {


    private textureName = ['floor', 'floor_mud_1', 'floor_mud_2'][rand(0, 2)]

    constructor() {
        super()
        this.tags.push('grass')
        this.physicsProperties.enabled = false
        // this.physicsProperties.isStatic = true
        // this.physicsProperties.isVolume = true
    }

    update(delta: number): void {

    }

    render(context: CanvasRenderingContext2D): void {
        let image = <CanvasImageSource>Game.level.resources.textures[this.textureName].resource
        context.drawImage(image, 0, 0, 50, 50)
    }

}
import Level from "../engine/level"
import Renderer from "../engine/rendering/renderer"
import GameLoop from "../engine/time/gameLoop"
import to from "../engine/utils/await"

export default class Game {

    static level: Level

    constructor(
        public level: Level,
        public renderer: Renderer
    ) {
        Game.level = this.level
    }

    public async load(): Promise<Game> {
        // a game requires a level
        if (!this.level) return Promise.reject('level_not_found')

        // Load the level resources (Textures & Sounds)
        let [errorLoadingGame] = await to(this.level.resources.load())
        if (errorLoadingGame) return Promise.reject(errorLoadingGame)

        return Promise.resolve(this)
    }

    public start() {
        this.renderer.init()
        GameLoop.tick = () => this.tick()
        GameLoop.start()
    }

    private tick() {
        this.level.update(GameLoop.delta)
        this.renderer.render(this.level.gameObjects)
    }
}
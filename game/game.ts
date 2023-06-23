import Level from "../engine/level"
import to from "../engine/utils/await"

export default class Game {

    static level: Level

    constructor(
        public level: Level,
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
}

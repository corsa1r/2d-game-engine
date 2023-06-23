import to from "../utils/await"
import Sound from "./sound"
import Texture from "./texture"

export default class Resources {

    // States
    public loaded: boolean = false
    public loading: boolean = false

    // Actual resources
    constructor(
        public textures: { [key: string]: Texture } = {},
        public sounds: { [key: string]: Sound } = {}
    ) { }

    // Actions
    async load(): Promise<Resources> {
        // Start loading
        this.loading = true

        // Load All Textures
        let [errorLoadTextures] = await to(Promise.all(Object.values(this.textures).map((texture) => texture.load())))
        if (errorLoadTextures) return Promise.reject(errorLoadTextures)
        let [errorLoadSounds] = await to(Promise.all(Object.values(this.sounds).map((sound) => sound.load())))
        if (errorLoadSounds) return Promise.reject(errorLoadSounds)

        // End loading
        this.loading = false
        this.loaded = true

        // Done
        return Promise.resolve(this)
    }
}


// Example Usage
// let sceneResources = new Resources();
// sceneResources.textures['player'] = new Texture('./assets/player.png', new Vector2D(100, 100))
// sceneResources.load().then(...)


// Scene class should have resources or GameObjects themselves ?
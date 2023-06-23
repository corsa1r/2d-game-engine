import Resource from "./resource"

export default class Sound extends Resource<HTMLAudioElement> {

    constructor(
        protected resourcePath: string
    ) {
        super(resourcePath)
    }

    load(): Promise<Sound> {
        if (this.loaded)
            return Promise.resolve(this)

        this.loading = true
        this.resource = new Audio(this.resourcePath)
        this.resource.onload = this.onLoad.bind(this)
        return Promise.resolve(this)
    }

}

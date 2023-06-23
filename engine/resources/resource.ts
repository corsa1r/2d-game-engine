export default abstract class Resource<T> {

    constructor(
        protected resourcePath: string
    ) { }

    public name: string = ''
    public loaded: boolean = false
    public loading: boolean = false
    public resource: T | null = null

    abstract load(): Promise<Resource<T>>
}

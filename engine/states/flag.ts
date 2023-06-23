export default class Flag {

    constructor(
        private state: boolean = true
    ) { }

    disable() {
        this.state = false
    }

    enable() {
        this.state = true
    }

    get value(): boolean {
        return this.state
    }
}
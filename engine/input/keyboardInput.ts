export class KeyboardInput {

    static states: { [key: string]: boolean } = {}

    constructor() {
        window.addEventListener('keydown', (e) => this.keydown(e))
        window.addEventListener('keyup', (e) => this.keyup(e))
    }

    keydown(event: KeyboardEvent) {
        KeyboardInput.states[event.code] = true
    }

    keyup(event: KeyboardEvent) {
        KeyboardInput.states[event.code] = false
    }
}
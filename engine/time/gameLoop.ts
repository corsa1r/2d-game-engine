export default class GameLoop {

    static delta: number = 0
    static lastTime: number = 0
    static tick: ((delta: number) => void) | null = null

    static update() {
        let now = Date.now()
        GameLoop.delta = (now - GameLoop.lastTime) / 1000
        GameLoop.lastTime = now
        GameLoop.tick && GameLoop.tick(GameLoop.delta)
        requestAnimationFrame(() => GameLoop.update())
    }

    static start() {
        GameLoop.lastTime = Date.now()
        requestAnimationFrame(() => GameLoop.update())
    }
}
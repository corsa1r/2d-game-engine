export default class Cooldown {

    private timer: number = 0

    constructor(
        public time: number,
    ) { }

    update(delta: number) {
        this.timer += delta
    }

    activate() {
        this.timer = 0
    }

    get ready(): boolean {
        return this.timer >= this.time
    }
}

/**
 * @example
 * GameObject {
 *  abilities: Container<Cooldown> {
 *    fire: new Cooldown(1000 ms),
 *    slide: new Cooldown(500 ms),
 *    heal: new Cooldown(10000 ms),
 *  }
 * 
 *  update() {
 *    if( Keyboard.states.KeyF && this.abilities.fire.ready ) {
 *      this.abilities.fire.activate()
 *    }
 *  }
 * }
 */
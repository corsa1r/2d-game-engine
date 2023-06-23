import Vector2D from "../math/vector"

export default class PhysicsProperties {
    // enable / disable physics interactions at all
    public enabled: boolean = true
    // if true the object can move and detect for collisions with others
    public isStatic: boolean = false
    // if true the object can move and detect for collisions with others but collision resolutions are skipped. 
    public isVolume: boolean = false
    // direction of the movement
    public direction: Vector2D = new Vector2D(0, 0)
    // size
    public size: Vector2D = new Vector2D(0, 0)
    // velocity directions
    public velocity: Vector2D = new Vector2D(0, 0)
    // force directions
    public force: Vector2D = new Vector2D(0, 0)
    // surface friction
    public friction: Vector2D = new Vector2D(1, 1)
    // bounce
    public bounce: Vector2D = new Vector2D(.3, .3)
    // mass
    public mass: number = 1
}
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
    // size
    public speed: Vector2D = new Vector2D(200, 200)
    // list of GameObject tags that this object ignores collisions with
    public ignoreCollisionsWithTags: string[] = []
}
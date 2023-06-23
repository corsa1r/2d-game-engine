export default class Vector2D {

    constructor(
        private _x: number = 0,
        private _y: number = 0,
        // min/max limits
        public minX: number = -Infinity,
        public maxX: number = Infinity,
        public minY: number = -Infinity,
        public maxY: number = Infinity,
    ) { }

    get x(): number {
        return this._x
    }

    get y(): number {
        return this._y
    }

    set x(v: number) {
        if (v >= this.maxX) v = this.maxX
        if (v <= this.minX) v = this.minX
        this._x = v
    }

    set y(v: number) {
        if (v >= this.maxY) v = this.maxY
        if (v <= this.minY) v = this.minY
        this._y = v
    }

    add(vector: Vector2D): Vector2D {
        this.x += vector.x
        this.y += vector.y
        return this
    }

    sub(vector: Vector2D): Vector2D {
        this.x -= vector.x
        this.y -= vector.y
        return this
    }

    toZero(vector: Vector2D, threshold: number): Vector2D {
        if (this.x < 0 - threshold) {
            this.x += vector.x
            if (this.x > 0 - threshold) this.x = 0
        } else if (this.x > 0 + threshold) {
            this.x -= vector.x
            if (this.x < 0 + threshold) this.x = 0
        } else if (this.x > 0 - threshold && this.x < 0 + threshold) {
            this.x = 0
        }

        if (this.y < 0 - threshold) {
            this.y += vector.y
            if (this.y > 0 - threshold) this.y = 0
        } else if (this.y > 0 + threshold) {
            this.y -= vector.y
            if (this.y < 0 + threshold) this.y = 0
        } else if (this.y > 0 - threshold && this.y < 0 + threshold) {
            this.y = 0
        }

        return this
    }

    multiplyBy(by: number): Vector2D {
        return this.multiplyWith(new Vector2D(by, by))
    }

    divideBy(by: number): Vector2D {
        if (by === 0) return this
        return this.divideWith(new Vector2D(by, by))
    }

    multiplyWith(vector: Vector2D): Vector2D {
        this.x *= vector.x
        this.y *= vector.y
        return this
    }

    divideWith(vector: Vector2D): Vector2D {
        this.x /= vector.x
        this.y /= vector.y
        return this
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalize(): Vector2D {
        return this.divideBy(this.magnitude())
    }

    absolute(): Vector2D {
        return new Vector2D(Math.abs(this.x), Math.abs(this.y), this.minX, this.maxX, this.minY, this.maxY)
    }

    clone() {
        return new Vector2D(this.x, this.y)
    }

    dir(): Vector2D {
        let x = this.x < 0 ? -1 : (this.x > 0 ? 1 : 0)
        let y = this.y < 0 ? -1 : (this.y > 0 ? 1 : 0)
        return new Vector2D(x, y)
    }

    copy(vector: Vector2D): Vector2D {
        this.x = vector.x
        this.y = vector.y
        return this
    }
}

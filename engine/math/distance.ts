import { Point } from "pixi.js"

export default function distance(a: Point, b: Point): number {
    return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2))
}

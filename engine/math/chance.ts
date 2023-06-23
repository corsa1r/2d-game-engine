import rand from "./rand"

export default function chance(procChange: number): boolean {
    let precision = 100
    let roll = rand(0, 100 * precision)
    if (procChange * precision <= roll) return true
    return false
}

import rand from "./rand"

export default function chance(procChange: number): boolean {
    let roll = rand(0, 100)
    if (roll <= procChange) return true
    return false
}

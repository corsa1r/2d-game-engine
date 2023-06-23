export default function rand(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min + 1))
}
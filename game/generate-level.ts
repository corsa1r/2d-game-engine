import GameObject from "../engine/gameObject"
import Level from "../engine/level"
import chance from "../engine/math/chance"
import rand from "../engine/math/rand"
import Door from "./objects/door"
import Grass from "./objects/grass"
import Player from "./player"
import Rect from "./rect"

export default function generateLevel(level: Level, player: Player): Door {

    // -------------------------------------------------------------------------------------

    let mapWidth = rand(50, 65)
    let mapHeight = rand(50, 65)
    let size = 50
    let map: number[][] = []

    for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
            if (!Array.isArray(map[x])) map[x] = []
            if (x === 0 || x === mapWidth - 1) {
                map[x][y] = 1
                continue
            }
            if (y === 0 || y === mapHeight - 1) {
                map[x][y] = 1
                continue
            }
            map[x][y] = 0
        }
    }


    for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
            if (map[x][y] === 0 && chance(45)) {
                map[x][y] = 1
            }
        }
    }

    let doorPosition = randomElementFromMatrix(map, 1)
    map[doorPosition[0]][doorPosition[1]] = 2

    let objectMap = [Grass, Rect, Door]
    let theDoor = null
    for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
            // if (map[x][y] === 0) continue
            let gameObject = new objectMap[map[x][y]]()
            if (map[x][y] === 2) theDoor = gameObject
            gameObject.x = x * size
            gameObject.y = y * size
            if (map[x][y] !== 2) {
                let grass = new Grass()
                grass.x = gameObject.x
                grass.y = gameObject.y
                level.addChild(grass)
            }
            level.addChild(gameObject)
        }
    }

    let playerPosition = randomElementFromMatrix(map, 0)
    player.x = playerPosition[0] * size
    player.y = playerPosition[1] * size

    // console.log(map)
    // console.warn('random', randomElementFromMatrix(map, 0))

    return <Door>theDoor
}

function randomElementFromMatrix(matrix: number[][], value: number) {
    let valueArray = [];

    // Find coordinates of $value elements in the matrix
    for (var row = 0; row < matrix.length; row++) {
        for (var col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === 0) {
                valueArray.push([row, col])
            }
        }
    }

    return valueArray[rand(0, valueArray.length)]
}
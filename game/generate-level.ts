import Level from "../engine/level"
import chance from "../engine/math/chance"
import rand from "../engine/math/rand"
import Grass from "./objects/grass"
import Player from "./player"
import Rect from "./rect"

export default function generateLevel(level: Level, player: Player) {

    // -------------------------------------------------------------------------------------

    let mapWidth = rand(100, 120)
    let mapHeight = rand(100, 140)

    let map: number[][] = []

    for (let row = 0; row < mapHeight; row++) {
        for (let col = 0; col < mapWidth; col++) {
            if (!Array.isArray(map[row])) map[row] = []
            if (row === 0 || row === mapHeight - 1) {
                map[row][col] = 1
                continue
            }
            if (col === 0 || col === mapWidth - 1) {
                map[row][col] = 1
                continue
            }

            if (chance(40)) {
                map[row][col] = 0
            } else {
                map[row][col] = 1
            }
        }
    }

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            switch (map[row][col]) {
                case 0: {
                    let grass = new Grass();
                    grass.position.x = col * 50
                    grass.position.y = row * 50
                    level.addChild(grass)
                    break
                }
                case 1:
                    let rock = new Rect();
                    rock.position.x = col * 50
                    rock.position.y = row * 50
                    level.addChild(rock)
                    break;
            }
        }
    }
    // -------------------------------------------------------------------------------------

    do {
        var x = rand(0, mapHeight - 1)
        var y = rand(0, mapWidth - 1)

        if (map[x][y] === 0) {
            player.position.x = y * 50
            player.position.y = x * 50
            break
        }

    } while (map[x][y] === 1)
}
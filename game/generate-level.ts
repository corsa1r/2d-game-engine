import Level from "../engine/level";
import chance from "../engine/math/chance";
import rand from "../engine/math/rand";
import Grass from "./objects/grass";
import Rect from "./rect";

export default function generateLevel(level: Level) {

    // -------------------------------------------------------------------------------------

    let mapWidth = rand(68, 68)
    let mapHeight = rand(68, 68)

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

            if (chance(11)) {
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
}
// import { KeyboardInput } from "../engine/input/keyboardInput"
// import Level from "../engine/level"
// import chance from "../engine/math/chance"
// import rand from "../engine/math/rand"
// import Camera from "../engine/rendering/camera"
// import Renderer from "../engine/rendering/renderer"
// import Resources from "../engine/resources/resources"
// import Texture from "../engine/resources/texture"
// import Game from "./game"
// import Baloon from "./objects/baloon"
// import Grass from "./objects/grass"
// import Player from "./player"
// import Rect from "./rect"

// let input = new KeyboardInput()
// let renderer = new Renderer()
// let level = new Level('default', new Resources({
//     rect: new Texture('./game/assets/test/wall.png'),
//     floor: new Texture('./game/assets/test/floor.png'),
//     floor_mud_1: new Texture('./game/assets/test/floor_mud_1.png'),
//     floor_mud_2: new Texture('./game/assets/test/floor_mud_2.png'),
//     player: new Texture('./game/assets/test/player.png'),
// }))

// /**
//  * @todo
//  * 
//  * 1. make a game plan / concept
//  * 2. choose the quadrants size that is good for the assets
//  * 3. find assets for that plan
//  * 4. make a coordination system
//  * 5. GLHFGGEZ
//  * 6. develop the game
//  */

// let myGame = new Game(level, renderer)


// let mapWidth = rand(68, 68)
// let mapHeight = rand(68, 68)

// let map: number[][] = []

// for (let row = 0; row < mapHeight; row++) {
//     for (let col = 0; col < mapWidth; col++) {
//         if (!Array.isArray(map[row])) map[row] = []
//         if (row === 0 || row === mapHeight - 1) {
//             map[row][col] = 1
//             continue
//         }
//         if (col === 0 || col === mapWidth - 1) {
//             map[row][col] = 1
//             continue
//         }

//         if (chance(1)) {
//             map[row][col] = 0
//         } else {
//             map[row][col] = 1
//         }
//     }
// }

// for (let row = 0; row < map.length; row++) {
//     for (let col = 0; col < map[row].length; col++) {
//         switch (map[row][col]) {
//             case 0: {
//                 let grass = new Grass();
//                 grass.position.x = col * 50
//                 grass.position.y = row * 50
//                 level.gameObjects.push(grass)
//                 break
//             }
//             case 1:
//                 let rock = new Rect();
//                 rock.position.x = col * 50
//                 rock.position.y = row * 50
//                 level.gameObjects.push(rock)
//                 break;
//         }
//     }
// }

// let rock = new Rect();
// rock.position.x = 50
// rock.position.y = 50
// level.gameObjects.push(rock)

// let player = new Player();
// player.position.x = 400
// player.position.y = 300
// level.gameObjects.push(player)
// renderer.camera.follow(player)


import { Application, Sprite, Assets, Renderer } from 'pixi.js'
import to from '../engine/utils/await'
import Game from './game'
import { KeyboardInput } from '../engine/input/keyboardInput'
import Level from '../engine/level'
import Player from './player'
import Rect from './rect'
import rand from '../engine/math/rand'
import chance from '../engine/math/chance'
import Grass from './objects/grass'
import { Viewport } from 'pixi-viewport'
import generateLevel from './generate-level'

(async () => {
    const app = new Application({
        width: window.innerWidth,
        height: window.innerHeight,
        resolution: window.devicePixelRatio,
        antialias: true,
    })

    let input = new KeyboardInput()
    let level = new Level('default')

    generateLevel(level)

    // The application will create a canvas element for you that you
    // can then insert into the DOM
    document.body.appendChild(<HTMLCanvasElement>app.view);

    let player = new Player()
    let rect = new Rect()

    player.position.x = 1000
    player.position.y = 1000

    // create viewport
    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: 1600,
        worldHeight: 1600,
        events: app.renderer.events
    });

    window.onresize = () => viewport.resize(window.innerWidth, window.innerHeight)


    app.stage.addChild(viewport)

    level.addChild(player)
    level.addChild(rect)

    viewport.addChild(level)
    viewport
        .drag()
        .pinch()
        .wheel({
            percent: 1
        })
        .decelerate()

    viewport.follow(player, {
        radius: 200,
        acceleration: .3,
        speed: .1
    })

    // Listen for frame updates
    app.ticker.add(() => {
        level.update(app.ticker.deltaMS / 1000)
    })
})()
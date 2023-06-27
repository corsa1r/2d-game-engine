import { Application, Sprite, Assets, Renderer, Texture, Point } from 'pixi.js'
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
import distance from '../engine/math/distance'
import Physics, { PseudoPhysicsGameObject } from '../engine/physics/physics'
import GameObject from '../engine/gameObject'

(async () => {
    const app = new Application({
        resolution: devicePixelRatio || 1,
        width: window.innerWidth,
        height: window.innerHeight,
    })

    let input = new KeyboardInput()
    Game.level = new Level('default')
    let player = new Player()

    let door = generateLevel(Game.level, player)

    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: 1000,
        worldHeight: 1000,
        events: app.renderer.events
    });

    window.addEventListener('resize', () => {
        viewport.resize(window.innerWidth, window.innerHeight, 1000, 1000)
    })

    document.body.appendChild(<HTMLCanvasElement>app.view);

    app.stage.interactive = false
    app.stage.addChild(viewport)

    viewport.addChild(Game.level)

    Game.level.addChild(player)
    viewport
    // .drag()
    // .pinch()
    // .wheel({
    //     percent: 1
    // })
    // .decelerate()

    // viewport.follow(door)

    // setTimeout(() => {
    viewport.follow(player)
    viewport.onmouseup = function (event) {
        // console.info({ x: player.position.x, y: player.position.y })
        // console.warn(viewport.toWorld(event.global.x, event.global.y))

        let worldPosition = viewport.toWorld(event.global.x, event.global.y)
        // player.moveTo(worldPosition, true)

        let grid = 50
        let playerPositionInGrid = new Point(Math.floor(player.position.x / grid), Math.floor(player.position.y / grid))
        let endpointPositionInGrid = new Point(Math.floor(worldPosition.x / grid), Math.floor(worldPosition.y / grid))

        let open: PathNode[] = []
        let closed: PathNode[] = []

        let startNode: PathNode = {
            x: playerPositionInGrid.x,
            y: playerPositionInGrid.y,
            width: grid,
            height: grid,
            obstacle: false,
            f_cost: distance(playerPositionInGrid, endpointPositionInGrid),
        }

        console.warn(playerPositionInGrid)

        function getNode(x: number, y: number, current: PathNode, represents: GameObject): PathNode {
            let at = PseudoPhysicsGameObject.from(represents)
            at.x = Math.floor((current.x + x) * grid)
            at.y = Math.floor((current.y + y) * grid)
            return {
                x: current.x + x,
                y: current.y + y,
                width: grid,
                height: grid,
                obstacle: !Physics.canBeThere(at, Game.level.children),
                f_cost: distance(new Point(current.x + x, current.y + y), endpointPositionInGrid),
            }
        }

        open.push(startNode)

        let deathEnd = 1000

        while (--deathEnd) {
            let current: PathNode = open
                // .filter((a) => !a.obstacle)
                .sort((a, b) => a.f_cost > b.f_cost ? 1 : -1)[0]
            open.splice(open.indexOf(current), 1)
            closed.push(current)

            if (current.x === endpointPositionInGrid.x && current.y === endpointPositionInGrid.y) break


            // Get neighbours from all direction
            let neighbours: PathNode[] = []


            neighbours.push(getNode(-1, 0, current, player)) // left
            neighbours.push(getNode(1, 0, current, player)) // right
            neighbours.push(getNode(0, -1, current, player)) // top 
            neighbours.push(getNode(0, 1, current, player)) // bottom
            // neighbours.push(getNode(-1, -1, current, player)) // top left
            // neighbours.push(getNode(1, -1, current, player)) // top right
            // neighbours.push(getNode(-1, 1, current, player)) // bottom left
            // neighbours.push(getNode(1, 1, current, player)) // bottom right

            // console.warn(neighbours)

            for (let neighbour of neighbours) {
                if (neighbour.obstacle) continue
                if (closed.includes(neighbour)) continue
                if (neighbour.parent === current) continue
                if (
                    (
                        distance(new Point(neighbour.x, neighbour.y), endpointPositionInGrid)
                        <
                        distance(new Point(current.x, current.y), endpointPositionInGrid)
                    )
                    || !open.includes(neighbour)
                ) {
                    neighbour.f_cost = distance(new Point(neighbour.x, neighbour.y), endpointPositionInGrid)
                    neighbour.parent = current

                    if (!open.includes(neighbour)) {
                        open.push(neighbour)
                    }
                }
            }

            // console.warn(open, closed, neighbours)

            // break
        }

        // TODO Continue
        // console.warn(playerPositionInGrid.x, playerPositionInGrid.y)
        // sort((a, b) => a.f_cost > b.f_cost ? 1 : -1)
        player.stopMoving()
        closed.forEach((step, i) => {
            // console.warn(step)
            player.moveTo(new Point(step.x * grid + 5, step.y * grid + 5))
            // console.warn({ x: step.x, y: step.y, h: step.h, obstacle: step.obstacle })

            let ppp = Sprite.from(Texture.WHITE)
            ppp.position.x = step.x * grid
            ppp.position.y = step.y * grid
            ppp.width = grid
            ppp.height = grid
            ppp.alpha = 0.1
            viewport.addChild(ppp)
        })

        // let futureMe = PseudoPhysicsGameObject.from(player)
        // futureMe.x = worldPosition.x
        // futureMe.y = worldPosition.y
        // console.warn(
        //     Physics.canBeThere(futureMe, Game.level.children)
        // )
    };
    // }, 3000)

    // Listen for frame updates
    app.ticker.maxFPS = 60

    app.ticker.add(() => {
        Game.level.update(app.ticker.deltaMS / 1000)
    })
})()

type PathNode = {
    x: number;
    y: number;
    width: number;
    height: number;
    obstacle: boolean;
    f_cost: number;
    parent?: PathNode;
}
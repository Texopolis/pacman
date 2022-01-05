
const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let squares = []
let score = 0
let winScore=200

// 0 - pacdots
// 1 - wall
// 2 - ghostHouse
// 3 - powerpellets
// 4 - empty
// 5 - portal**

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

function createBoard() {
    for(let i = 0; i <layout.length; i++){
        const square = document.createElement("div")
        grid.appendChild(square)
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add("pac-dot")
        }else if (layout[i] === 1) {
            squares[i].classList.add("wall")
        }else if (layout[i] === 2) {
            squares[i].classList.add("ghostHouse")
        }else if (layout[i] === 3) {
            squares[i].classList.add("power-pellet")
        } 
    }
}

createBoard()

//starting position of pacman
const pacmanStartIndex= 573
let pacmanCurrentIndex= pacmanStartIndex
squares[pacmanCurrentIndex].classList.add('pacman-right')

//control movement
function control(e){
    squares[pacmanCurrentIndex].classList.remove('pacman-left','pacman-right')

    switch(e.key){
        case 'Down':
        case 'ArrowDown':
        console.log('down')
        if (layout[pacmanCurrentIndex+width] !== 1 &&
            !squares[pacmanCurrentIndex+width].classList.contains("ghostHouse")){
            pacmanCurrentIndex=pacmanCurrentIndex+width
            console.log("position on grid", pacmanCurrentIndex)
            console.log("type of square", layout[pacmanCurrentIndex+width])
            }
            squares[pacmanCurrentIndex].classList.add('pacman-left')
        break

        case 'Up':
        case 'ArrowUp':
        console.log('up')
        if (layout[pacmanCurrentIndex-width] !== 1 &&
            !squares[pacmanCurrentIndex-width].classList.contains("ghostHouse")){
            pacmanCurrentIndex=pacmanCurrentIndex-width
            console.log("position on grid", pacmanCurrentIndex)
            console.log("type of square", layout[pacmanCurrentIndex-width])
            }
            squares[pacmanCurrentIndex].classList.add('pacman-left')
        break

        case 'Left':
        case 'ArrowLeft':
        console.log('left')
        if (layout[pacmanCurrentIndex-1] !== 1 &&
            !squares[pacmanCurrentIndex-1].classList.contains("ghostHouse")){
            pacmanCurrentIndex--
            if (pacmanCurrentIndex === 364){
                pacmanCurrentIndex= 390
            }
            console.log("position on grid", pacmanCurrentIndex)
            console.log("type of square", layout[pacmanCurrentIndex+1])
        }
        squares[pacmanCurrentIndex].classList.add('pacman-left')
        break

        case 'Right':
        case 'ArrowRight':
        console.log('right')
        if (layout[pacmanCurrentIndex+1] !== 1 &&
            !squares[pacmanCurrentIndex-width].classList.contains("ghostHouse")){
            pacmanCurrentIndex++
            if (pacmanCurrentIndex === 391){
                pacmanCurrentIndex= 365
            }
            console.log("position on grid", pacmanCurrentIndex)
            console.log("type of square", layout[pacmanCurrentIndex-1])
            }
            squares[pacmanCurrentIndex].classList.add('pacman-right')

        break

        case 'Escape':
        case 'Esc':
        console.log('reset')
        score=0
        createBoard()
        squares[pacmanCurrentIndex].classList.remove('pacman-right', 'pacman-left')
        pacmanCurrentIndex=pacmanStartIndex
        squares[pacmanCurrentIndex].classList.add('pacman-right')
        document.addEventListener('keydown', control)
        ghosts.forEach(ghost => {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            })
        }
        
    
    eatPacDot()
    eatPowerPellet()
    checkgameOver()
    checkForWin()

    }
document.addEventListener('keydown', control)

function eatPacDot(){
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")){
        squares[pacmanCurrentIndex].classList.remove("pac-dot")
        score++
        console.log("score=", score)
        scoreDisplay.textContent= score
    }
}

function eatPowerPellet(){
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
        score+=10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts , 10000)
        squares[pacmanCurrentIndex].classList.remove("power-pellet")


    }

}

function unScareGhosts(){
    ghosts.forEach (ghost => ghost.isScared = false)
}

class Ghost{
    constructor(className, startIndex, speed) {
        this.className=className
        this.startIndex=startIndex
        this.speed=speed
        this.currentIndex=startIndex
        this.isScared = false
        this.timerId = NaN
        // this.prevGhostIndex = prevGhostIndex
    }
}

const ghosts = [
    new Ghost('blinky', 348, 190),
    new Ghost('pinky', 404, 250),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 407, 270)
]


ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add("ghost")
})

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost){
    const directions = [+1, -1, +width, -width]
    let direction = directions[Math.floor(Math.random() *4)]
    console.log(direction)
    
    ghost.timerId = setInterval (function(){
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains("ghost")
        ){
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        ghost.currentIndex += direction
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
        }else direction = directions[Math.floor(Math.random() *4)]
        if (squares[ghost.currentIndex].classList.contains("pac-dot")){
            squares[ghost.currentIndex].classList.remove("pac-dot")
            squares[ghost.currentIndex - direction].classList.add("pac-dot")
        }
        if (ghost.isScared){
            squares[ghost.currentIndex].classList.add("scared-ghost")
        }

        function checkForEatScaredGhost(){
            if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman-left', 'pacman-right')) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = ghost.startIndex
                score +=50
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            }
        }
        

        checkForEatScaredGhost()
        checkgameOver()
        checkForWin()
    }, ghost.speed)
    
}

function checkgameOver(){
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
        ghosts.forEach ( ghost => clearInterval(ghost.timerId))
        scoreDisplay.textContent = 'You Lose'
        // document.removeEventListener('keydown', control)

    }
}

function checkForWin(){
    if (score>= winScore){
        ghosts.forEach ( ghost => clearInterval(ghost.timerId))
        scoreDisplay.textContent = 'YOU WIN'
        document.removeEventListener('keydown', control)

    }
}

// //reset game
// function reset(){
//     document.addEventListener('keydown', function(e) {
//         if (e.key==='Escape'){
            
        
alert('Instrucciones: si eres de celular toca la parte superior para ir hacia arriba, la inferior para ir para abajo y a los lados para ir a los lados, pero no toques las partes en esquina (no hacen nada). Si eres de pc toca los botones con las flechas')
let W = 1000
let H = 500
const cells = []
let mazeW = 50 //32
let mazeH = 25 //32
const stack = []
let pixelSize = 20 //16

//posicion jugador
let playerx = 0;
let playery = 0;

//posicion premio
px = Math.round(Math.random() * mazeW)
py = Math.round(Math.random() * mazeH)

function setup() {
    const canvas = createCanvas(W, H)
    canvas.parent('#canvasHolder')

    for (let y = 0; y < mazeH; y++) {
        const row = []
        for (let x = 0; x < mazeW; x++) {
            row.push(new Cell(x, y))
        }
        cells.push(row)
    }



    const rx = Math.round(Math.random() * mazeW)
    const ry = Math.round(Math.random() * mazeH)

    const first = cells[ry][rx]

    first.visited = true

    stack.push(first)
}

function draw() {

    background(0)

    //if / while  los 2 sirven
    while (stack.length > 0) {
        let current = stack[stack.length - 1]

        let valid = false
        let checks = 0

        while (!valid && checks < 10) {
            checks++
            let direction = Math.round(Math.random() * 4)

            switch (direction) {
                //west
                case 0:
                    if (current.x > 0) {
                        let next = cells[current.y][current.x - 1]

                        if (!next.visited) {
                            current.west = false
                            next.east = false

                            next.visited = true
                            stack.push(next)
                            valid = true
                        }
                    }
                    break;
                    //north
                case 1:
                    if (current.y > 0) {
                        let next = cells[current.y - 1][current.x]

                        if (!next.visited) {
                            current.north = false
                            next.south = false

                            next.visited = true
                            stack.push(next)
                            valid = true
                        }
                    }
                    break;
                    //east
                case 3:
                    if (current.x < (mazeW - 1)) {
                        let next = cells[current.y][current.x + 1]

                        if (!next.visited) {
                            current.east = false
                            next.west = false

                            next.visited = true
                            stack.push(next)
                            valid = true
                        }
                    }
                    break;
                    //south 
                case 4:
                    if (current.y < (mazeH - 1)) {
                        let next = cells[current.y + 1][current.x]

                        if (!next.visited) {
                            current.south = false
                            next.north = false

                            next.visited = true
                            stack.push(next)
                            valid = true
                        }
                    }
                    break;
            }
        }

        if (!valid) {
            stack.pop()
        }
    }

    for (let y = 0; y < mazeH; y++) {
        for (let x = 0; x < mazeW; x++) {
            cells[y][x].draw(pixelSize)
        }
    }
    for (let s = 0; s < stack.length; s++) {
        const el = stack[s]

        noStroke()
        fill('#EA7317')

        ellipse(
            el.x * pixelSize + (pixelSize / 2),
            el.y * pixelSize + (pixelSize / 2),
            pixelSize / 2,
            pixelSize / 2
        )
    }


    //dibujo de jugador
    noStroke()
    fill('#00ee00')
    ellipse(playerx * pixelSize + (pixelSize / 2), playery * pixelSize + (pixelSize / 2), pixelSize / 2, pixelSize / 2)

    //dibjo de premio

    noStroke()
    fill('yellow')
    ellipse(px * pixelSize + (pixelSize / 2), py * pixelSize + (pixelSize / 2), pixelSize / 2, pixelSize / 2)
}

function ganar() {
    //ganar
    if (playerx == px && playery == py) {
        alert('Ganaste!!!')
        playerx = 0
        playery = 0

        px = Math.round(Math.random() * mazeW)
        py = Math.round(Math.random() * mazeH)
    }
}

function keyPressed() {
    if (keyCode == LEFT_ARROW && playerx > 0) {
        if (!cells[playery][playerx].west) {
            playerx -= 1
        }
    }
    if (keyCode == RIGHT_ARROW && playerx < mazeW - 1) {
        if (!cells[playery][playerx].east) {
            playerx += 1
        }
    }
    if (keyCode == UP_ARROW && playery > 0) {
        if (!cells[playery][playerx].north) {
            playery -= 1
        }
    }
    if (keyCode == DOWN_ARROW && playery < mazeH - 1) {
        if (!cells[playery][playerx].south) {
            playery += 1
        }
    }
    ganar()
}

window.onload = function () {
    var el = document.querySelector("canvas");
    el.addEventListener("click", (e)=>{
        console.log(e.clientX +'  '+ e.clientY)
        if (e.clientX < 500 && e.clientY > 150 && e.clientY < 300 && playerx > 0) {
            if (!cells[playery][playerx].west) {
                playerx -= 1
            }
        }
        if (e.clientX > 500 && e.clientY > 150 && e.clientY < 300 && playerx < mazeW - 1) {
            if (!cells[playery][playerx].east) {
                playerx += 1
            }
        }
        if (e.clientY < 250 && e.clientX > 250 && e.clientX < 750 && playery > 0) {
            if (!cells[playery][playerx].north) {
                playery -= 1
            }
        }
        if (e.clientY > 250 && e.clientX > 250 && e.clientX < 750 && playery < mazeH - 1) {
            if (!cells[playery][playerx].south) {
                playery += 1
            }
        }
        ganar()
    });
}
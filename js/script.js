alert('Instrucciones: si eres de celular toca la parte superior para ir hacia arriba, la inferior para ir para abajo y a los lados para ir a los lados, pero no toques las partes en esquina (no hacen nada). Si eres de pc toca los botones con las flechas')
let W = 1000
let H = 500
const cells = []
let mazeW = 70 //50 
let mazeH = 34 //25
const stack = []
let pixelSize = 15 //20 

//posicion jugador
let playerx = 0;
let playery = 0;
//botones de nivel
document.getElementById('n1').addEventListener('click', () => {
    document.getElementById('n1').classList.add('activo')
    document.getElementById('n2').classList.remove('activo')
    document.getElementById('n3').classList.remove('activo')
    document.getElementById('n4').classList.remove('activo')

    mazeW = 26
    mazeH = 13
    pixelSize = 38

    px = Math.round(Math.random() * mazeW - 1)
    py = Math.round(Math.random() * mazeH - 1)
    if (px < 0 || px > mazeW) {
        px = 0
    }
    if (py < 0 || py > mazeH) {
        py = 0
    }

})
document.getElementById('n2').addEventListener('click', () => {
    document.getElementById('n1').classList.remove('activo')
    document.getElementById('n2').classList.add('activo')
    document.getElementById('n3').classList.remove('activo')
    document.getElementById('n4').classList.remove('activo')

    mazeW = 40
    mazeH = 20
    pixelSize = 25

    px = Math.round(Math.random() * mazeW - 1)
    py = Math.round(Math.random() * mazeH - 1)
    if (px < 0 || px > mazeW) {
        px = 0
    }
    if (py < 0 || py > mazeH) {
        py = 0
    }
})
document.getElementById('n3').addEventListener('click', () => {
    document.getElementById('n1').classList.remove('activo')
    document.getElementById('n2').classList.remove('activo')
    document.getElementById('n3').classList.add('activo')
    document.getElementById('n4').classList.remove('activo')

    mazeW = 50
    mazeH = 25
    pixelSize = 20

    px = Math.round(Math.random() * mazeW - 1)
    py = Math.round(Math.random() * mazeH - 1)
    if (px < 0 || px > mazeW) {
        px = 0
    }
    if (py < 0 || py > mazeH) {
        py = 0
    }
})
document.getElementById('n4').addEventListener('click', () => {
    document.getElementById('n1').classList.remove('activo')
    document.getElementById('n2').classList.remove('activo')
    document.getElementById('n3').classList.remove('activo')
    document.getElementById('n4').classList.add('activo')

    mazeW = 70
    mazeH = 34
    pixelSize = 15

    px = Math.round(Math.random() * mazeW - 5)
    py = Math.round(Math.random() * mazeH - 2)
    if (px < 0 || px > mazeW) {
        px = 0
    }
    if (py < 0 || py > mazeH) {
        py = 0
    }
})


//posicion premio
px = Math.round(Math.random() * mazeW - 1)
py = Math.round(Math.random() * mazeH - 1)
if (px < 0 || px > mazeW) {
    px = 0
}
if (py < 0 || py > mazeH) {
    py = 0
}

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

    //limites de puntero
    noStroke()
    fill('red')
    ellipse(300, 150, pixelSize / 2, pixelSize / 2)
    ellipse(500, 150, pixelSize / 2, pixelSize / 2)
    ellipse(700, 150, pixelSize / 2, pixelSize / 2)

    ellipse(300, 350, pixelSize / 2, pixelSize / 2)
    ellipse(500, 350, pixelSize / 2, pixelSize / 2)
    ellipse(700, 350, pixelSize / 2, pixelSize / 2)

    rect(300, 0, 1, 150)
    rect(700, 0, 1, 150)
    rect(300, 350, 1, 500)
    rect(700, 350, 1, 500)
    rect(500, 150, 1, 200)

    rect(0, 150, 1000, 1)
    rect(0, 350, 1000, 1)

    textSize(50);
    text('<', 300, 250)
    text('^', 500, 100)
    text('>', 700, 250)
    text('v', 500, 420)
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
    el.addEventListener("click", (e) => {
        console.log(e.clientX + '  ' + e.clientY);
        if (e.clientX < 657 && e.clientY > 186 && e.clientY < 386 && playerx > 0) {
            if (!cells[playery][playerx].west) {
                playerx -= 1
            }
        }
        if (e.clientX > 657 && e.clientY > 186 && e.clientY < 386 && playerx < mazeW - 1) {
            if (!cells[playery][playerx].east) {
                playerx += 1
            }
        }
        if (e.clientY < 186 && e.clientX > 458 && e.clientX < 858 && playery > 0) {
            if (!cells[playery][playerx].north) {
                playery -= 1
            }
        }
        if (e.clientY > 386 && e.clientX > 458 && e.clientX < 858 && playery < mazeH - 1) {
            if (!cells[playery][playerx].south) {
                playery += 1
            }
        }
        ganar()
    });
}
document.addEventListener('DOMContentLoaded', () => {
    var Aud = document.getElementById('MyAudio');
    Aud.play();
    var smlWin = document.getElementById('SmallWin');
    var WIN = document.getElementById('BigWin');
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const requireDisplay = document.getElementById('require')
    const moveDisplay = document.getElementById('move')
    const moveBoard = document.getElementById('moveboard');
    const levelDisplay = document.getElementById('Level');
    console.log(moveBoard)
    const width = 8
    const squares = []
    let score = 0;
    let name = localStorage.getItem("loginName");
    let level = localStorage.getItem("loginLevel");
    console.log(name)
    console.log(level)
    levelDisplay.innerHTML = level
        // let noOfMove = 0
    let level1 = { level: 1, targetScore: 100 }
    let level2 = { level: 2, targetScore: 120, noOfmove: 35 }
    if (level == 1) {
        admin = {
            level: level1.level,
            targetScore: level1.targetScore
        }
        moveBoard.style.display = "none"

    } else if (level == 2) {
        admin = {
            level: level2.level,
            targetScore: level2.targetScore,
            noOfmove: level2.noOfmove
        }
        moveDisplay.innerHTML = admin.noOfmove
    }
    // console.log(admin.noOfmove)

    requireDisplay.innerHTML = admin.targetScore
    const candyColors = [
        // 'url(images/red-candy.png)',
        // 'url(images/yellow-candy.png)',
        // 'url(images/orange-candy.png)',
        // 'url(images/purple-candy.png)',
        // 'url(images/green-candy.png)',
        // 'url(images/blue-candy.png)'
        'url(alternative-images/alternative-red.png)',
        'url(alternative-images/alternative-yellow.png)',
        'url(alternative-images/alternative-orange.png)',
        'url(alternative-images/alternative-purple.png)',
        'url(alternative-images/alternative-green.png)',
        'url(alternative-images/alternative-blue.png)'
    ]


    //create your board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()

    // Dragging the Candy
    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('drageleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)
            // this.style.backgroundImage = ''
    }

    function dragOver(e) {
        e.preventDefault()
    }

    function dragEnter(e) {
        e.preventDefault()
    }
    ``

    function dragLeave() {
        this.style.backgroundImage = ''
    }

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
    }

    function dragEnd() {
        //What is a valid move?
        let validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width]
        let validMove = validMoves.includes(squareIdBeingReplaced)

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
            admin.noOfmove--
                console.log(admin.noOfmove)
            moveDisplay.innerHTML = admin.noOfmove

            // step++
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        } else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    }

    //drop candies once  some have been cleared
    function moveIntoSquareBelow() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ''
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstRow = firstRow.includes(i)
                if (isFirstRow && (squares[i].style.backgroundImage === '')) {
                    let randomColor = Math.floor(Math.random() * candyColors.length)
                    squares[i].style.backgroundImage = candyColors[randomColor]
                }
            }
        }
    }


    ///Checking for Matches
    //for row of Four
    function checkRowForFour() {
        for (i = 0; i < 60; i++) {
            let rowOfFour = [i, i + 1, i + 2, i + 3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                rowOfFour.forEach(index => {
                        squares[index].style.backgroundImage = ''
                    })
                    // here sound
                WIN.play();
            }
        }
    }
    checkRowForFour()

    //for column of Four
    function checkColumnForFour() {
        for (i = 0; i < 39; i++) {
            let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                        // here sound
                    WIN.play();
                })
            }
        }
    }
    checkColumnForFour()

    //for row of Three
    function checkRowForThree() {
        for (i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                rowOfThree.forEach(index => {
                        squares[index].style.backgroundImage = ''
                    })
                    // here sound
                smlWin.play();
            }
        }
    }
    checkRowForThree()

    //for column of Three
    function checkColumnForThree() {
        for (i = 0; i < 47; i++) {
            let columnOfThree = [i, i + width, i + width * 2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })

                //here sound 
                smlWin.play();
            }
        }
    }
    checkColumnForThree()

    // check target upon level
    function checkTarget() {
        if (admin.level == 1) {
            if (score >= admin.targetScore) {
                localStorage.setItem("level" + name, 2);
                localStorage.setItem("loginLevel", 2);
                localStorage.setItem("score" + name, score);
                location.replace("congratulation.html");
            }
        }
        if (admin.level == 2) {
            if (score >= admin.targetScore) {
                location.replace("congratulation.html");
            }
            // console.log(admin.noOfmove)
            else if (admin.noOfmove <= 0) {
                location.replace("gameover.html");
            }
        }
    }

    // Checks carried out indefintely - Add Butotn to clear interval for best practise

    // pause button clearInterval
    let t = window.setInterval(function() {
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
        moveIntoSquareBelow()
        checkTarget()
    }, 100);
})
// Element selection
const selectBox = document.querySelector(".select-box"),
    selectXBtn = document.querySelector(".playerX"),
    selectOBtn = document.querySelector(".playerO"),
    playBoard = document.querySelector(".play-board"),
    boxAll = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

window.onload = () => {
    for (let i = 0; i < boxAll.length; i++) {
        boxAll[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add("hide"); // Hide select-box when player X is clicked
        playBoard.classList.add("show"); // Show play-board when player X is clicked
    };
    selectOBtn.onclick = () => {
        selectBox.classList.add("hide"); // Hide select-box when player O is clicked
        playBoard.classList.add("show"); // Show play-board when player O is clicked
        players.setAttribute("class", "players active player"); // Set active player
    };
};

let playerXIcon = "close";
let playerOIcon = "circle";
let playerSign = "X";
let botRun = true;

// User click function
function clickedBox(element) {
    console.log("User clicked");
    if (players.classList.contains("player")) {
        element.innerHTML = `<span class="material-symbols-rounded">${playerOIcon}</span>`; // Add icon to element
        players.classList.remove("active");
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<span class="material-symbols-rounded">${playerXIcon}</span>`; // Add icon to element
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    playBoard.style.pointerEvents = "none"; // Disable user interaction
    element.style.pointerEvents = "none"; // Prevent selected box from being clicked again
    selectWinner();
    setTimeout(() => {
        bot(botRun);
    }, 400); // Delay for bot
}

// Bot click function
function bot(botRun) {
    if (botRun) {
        playerSign = "O";
        let array = [];
        for (let i = 0; i < boxAll.length; i++) {
            if (boxAll[i].childElementCount == 0) {
                array.push(i); // Add unselected box
            }
        }
        let boxRandom = array[Math.floor(Math.random() * array.length)]; // Get random unselected box
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                boxAll[
                    boxRandom
                ].innerHTML = `<span class="material-symbols-rounded">${playerXIcon}</span>`; // Add icon to element
                players.classList.add("active");
                playerSign = "X";
                boxAll[boxRandom].setAttribute("id", playerSign);
            } else {
                boxAll[
                    boxRandom
                ].innerHTML = `<span class="material-symbols-rounded">${playerOIcon}</span>`; // Add icon to element
                players.classList.remove("active");
                boxAll[boxRandom].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        boxAll[boxRandom].style.pointerEvents = "none"; // Prevent selected box from being clicked again
        playerSign = "X";
        playBoard.style.pointerEvents = "auto"; // Enable user interaction
    }
}

// Winner selection
function getId(idName) {
    return document.querySelector(".box" + idName).id; // Return id name
}
function checkIds(val1, val2, val3, sign) {
    if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
        return true;
    }
}
function selectWinner() {
    if (
        checkIds(1, 2, 3, playerSign) ||
        checkIds(4, 5, 6, playerSign) ||
        checkIds(7, 8, 9, playerSign) ||
        checkIds(1, 4, 7, playerSign) ||
        checkIds(2, 5, 8, playerSign) ||
        checkIds(3, 6, 9, playerSign) ||
        checkIds(1, 5, 9, playerSign) ||
        checkIds(3, 5, 7, playerSign)
    ) {
        // Game has been won
        botRun = false;
        wonText.innerHTML = `Player <p id="${playerSign}">${playerSign}</p> won!`;
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); // Delay for result box
    } else if (
        getId(1) != "" &&
        getId(2) != "" &&
        getId(3) != "" &&
        getId(4) != "" &&
        getId(5) != "" &&
        getId(6) != "" &&
        getId(7) != "" &&
        getId(8) != "" &&
        getId(9) != ""
    ) {
        // Game is a draw
        botRun = false;
        wonText.textContent = `It's a draw!`;
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); // Delay for result box
    }
}

replayBtn.onclick = () => {
    window.location.reload(); // Reload page
};

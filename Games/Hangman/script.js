const username = "MikeBidinger";
const repository = "Web_Dev";
const filePath = "Games/Hangman/data/english.json";

async function loadJSONFromGitHub(username, repository, path) {
    const url = `https://raw.githubusercontent.com/${username}/${repository}/main/${path}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON. Status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error(`Error loading JSON from GitHub: ${error.message}`);
    }
}

let wordList;
loadJSONFromGitHub(username, repository, filePath)
    .then((data) => {
        console.log("JSON data loaded successfully:", data);
        wordList = data;
        confirmFunc();
    })
    .catch((error) => {
        console.error("Error:", error);
    });

const hangmanImages = new Map([
    [
        0,
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298.232 291">
            <g id="Group_688" data-name="Group 688" transform="translate(-219 -183)">
                <rect id="Rectangle_2974" data-name="Rectangle 2974" width="5" height="61.733" transform="translate(310.627 183.247) rotate(45)"/>
                <rect id="Rectangle_2966" data-name="Rectangle 2966" width="5" height="298.232" rx="2.5" transform="translate(517.232 469) rotate(90)"/>
                <rect id="Rectangle_2987" data-name="Rectangle 2987" width="5" height="289" rx="2.5" transform="translate(267 183)"/>
                <rect id="Rectangle_2988" data-name="Rectangle 2988" width="187" height="5" rx="2.5" transform="translate(267 183)"/>
                <rect id="Rectangle_2989" data-name="Rectangle 2989" width="5" height="49" rx="2.5" transform="translate(449 184)"/>
            </g>
        </svg>`,
    ],
    [
        1,
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298.232 291">
            <g id="Group_691" data-name="Group 691" transform="translate(-219 -183)">
                <rect id="Rectangle_2974" data-name="Rectangle 2974" width="5" height="61.733" transform="translate(310.627 183.247) rotate(45)"/>
                <rect id="Rectangle_2966" data-name="Rectangle 2966" width="5" height="298.232" rx="2.5" transform="translate(517.232 469) rotate(90)"/>
                <g id="Ellipse_32" data-name="Ellipse 32" transform="translate(423.5 228.247)" fill="none" stroke="#000" stroke-width="5">
                <circle cx="27.5" cy="27.5" r="27.5" stroke="none"/>
                <circle cx="27.5" cy="27.5" r="25" fill="none"/>
                </g>
                <rect id="Rectangle_2987" data-name="Rectangle 2987" width="5" height="289" rx="2.5" transform="translate(267 183)"/>
                <rect id="Rectangle_2988" data-name="Rectangle 2988" width="187" height="5" rx="2.5" transform="translate(267 183)"/>
                <rect id="Rectangle_2989" data-name="Rectangle 2989" width="5" height="49" rx="2.5" transform="translate(449 184)"/>
            </g>
        </svg>`,
    ],
    [
        2,
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298.232 291">
            <g id="Group_692" data-name="Group 692" transform="translate(-219 -183)">
                <rect id="Rectangle_2974" data-name="Rectangle 2974" width="5" height="61.733" transform="translate(310.627 183.247) rotate(45)"/>
                <rect id="Rectangle_2966" data-name="Rectangle 2966" width="5" height="298.232" rx="2.5" transform="translate(517.232 469) rotate(90)"/>
                <g id="Ellipse_32" data-name="Ellipse 32" transform="translate(423.5 228.247)" fill="none" stroke="#000" stroke-width="5">
                <circle cx="27.5" cy="27.5" r="27.5" stroke="none"/>
                <circle cx="27.5" cy="27.5" r="25" fill="none"/>
                </g>
                <rect id="Rectangle_2987" data-name="Rectangle 2987" width="5" height="289" rx="2.5" transform="translate(267 183)"/>
                <rect id="Rectangle_2988" data-name="Rectangle 2988" width="187" height="5" rx="2.5" transform="translate(267 183)"/>
                <rect id="Rectangle_2989" data-name="Rectangle 2989" width="5" height="49" rx="2.5" transform="translate(449 184)"/>
                <rect id="Rectangle_2990" data-name="Rectangle 2990" width="5" height="73" rx="2.5" transform="translate(449 281)"/>
            </g>
        </svg>`,
    ],
    [
        3,
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298.232 291">
            <g id="Group_694" data-name="Group 694" transform="translate(-219 -183)">
                <rect id="Rectangle_2970" data-name="Rectangle 2970" width="5" height="56" rx="2.5" transform="translate(448.965 281.247) rotate(45)"/>
                <rect id="Rectangle_2974" data-name="Rectangle 2974" width="5" height="61.733" transform="translate(310.627 183.247) rotate(45)"/>
                <rect id="Rectangle_2966" data-name="Rectangle 2966" width="5" height="298.232" rx="2.5" transform="translate(517.232 469) rotate(90)"/>
                <g id="Ellipse_32" data-name="Ellipse 32" transform="translate(423.5 228.247)" fill="none" stroke="#000" stroke-width="5">
                <circle cx="27.5" cy="27.5" r="27.5" stroke="none"/>
                <circle cx="27.5" cy="27.5" r="25" fill="none"/>
                </g>
                <rect id="Rectangle_2987" data-name="Rectangle 2987" width="5" height="289" rx="2.5" transform="translate(267 183)"/>
                <rect id="Rectangle_2988" data-name="Rectangle 2988" width="187" height="5" rx="2.5" transform="translate(267 183)"/>
                <rect id="Rectangle_2989" data-name="Rectangle 2989" width="5" height="49" rx="2.5" transform="translate(449 184)"/>
                <rect id="Rectangle_2990" data-name="Rectangle 2990" width="5" height="73" rx="2.5" transform="translate(449 281)"/>
            </g>
        </svg>`,
    ],
    [
        4,
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298.232 291">
            <g id="Group_699" data-name="Group 699" transform="translate(-219 -183)">
                <rect id="Rectangle_2970" data-name="Rectangle 2970" width="5" height="56" rx="2.5" transform="translate(448.965 281.247) rotate(45)"/>
                <rect id="Rectangle_2971" data-name="Rectangle 2971" width="5" height="56" rx="2.5" transform="translate(450.5 284.782) rotate(-45)"/>
                <rect id="Rectangle_2974" data-name="Rectangle 2974" width="5" height="61.733" transform="translate(310.627 183.247) rotate(45)"/>
                <rect id="Rectangle_2966" data-name="Rectangle 2966" width="5" height="298.232" rx="2.5" transform="translate(517.232 469) rotate(90)"/>
                <g id="Ellipse_32" data-name="Ellipse 32" transform="translate(423.5 228.247)" fill="none" stroke="#000" stroke-width="5">
                <circle cx="27.5" cy="27.5" r="27.5" stroke="none"/>
                <circle cx="27.5" cy="27.5" r="25" fill="none"/>
                </g>
                <rect id="Rectangle_2987" data-name="Rectangle 2987" width="5" height="289" rx="2.5" transform="translate(267 183)"/>
                <rect id="Rectangle_2988" data-name="Rectangle 2988" width="187" height="5" rx="2.5" transform="translate(267 183)"/>
                <rect id="Rectangle_2989" data-name="Rectangle 2989" width="5" height="49" rx="2.5" transform="translate(449 184)"/>
                <rect id="Rectangle_2990" data-name="Rectangle 2990" width="5" height="73" rx="2.5" transform="translate(449 281)"/>
            </g>
        </svg>`,
    ],
    [
        5,
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298.232 291">
            <g id="Group_698" data-name="Group 698" transform="translate(-16059.232 -14400)">
                <rect id="Rectangle_2987" data-name="Rectangle 2987" width="5" height="289" rx="2.5" transform="translate(16107.232 14400)"/>
                <g id="Group_697" data-name="Group 697">
                <rect id="Rectangle_2974" data-name="Rectangle 2974" width="5" height="61.733" transform="translate(16150.859 14400.247) rotate(45)"/>
                <rect id="Rectangle_2966" data-name="Rectangle 2966" width="5" height="298.232" rx="2.5" transform="translate(16357.465 14686) rotate(90)"/>
                <rect id="Rectangle_2988" data-name="Rectangle 2988" width="187" height="5" rx="2.5" transform="translate(16107.232 14400)"/>
                <rect id="Rectangle_2989" data-name="Rectangle 2989" width="5" height="49" rx="2.5" transform="translate(16289.232 14401)"/>
                <g id="Group_696" data-name="Group 696">
                    <rect id="Rectangle_2970" data-name="Rectangle 2970" width="5" height="56" rx="2.5" transform="translate(16289.197 14498.247) rotate(45)"/>
                    <rect id="Rectangle_2967" data-name="Rectangle 2967" width="5" height="56" rx="2.5" transform="translate(16291.197 14565.247) rotate(45)"/>
                    <rect id="Rectangle_2971" data-name="Rectangle 2971" width="5" height="56" rx="2.5" transform="translate(16290.732 14501.782) rotate(-45)"/>
                    <g id="Ellipse_32" data-name="Ellipse 32" transform="translate(16263.732 14445.247)" fill="none" stroke="#000" stroke-width="5">
                    <circle cx="27.5" cy="27.5" r="27.5" stroke="none"/>
                    <circle cx="27.5" cy="27.5" r="25" fill="none"/>
                    </g>
                    <rect id="Rectangle_2990" data-name="Rectangle 2990" width="5" height="73" rx="2.5" transform="translate(16289.232 14498)"/>
                </g>
                </g>
            </g>
        </svg>`,
    ],
    [
        6,
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298.232 291">
            <g id="Group_700" data-name="Group 700" transform="translate(-16059.232 -14400)">
                <rect id="Rectangle_2987" data-name="Rectangle 2987" width="5" height="289" rx="2.5" transform="translate(16107.232 14400)"/>
                <g id="Group_697" data-name="Group 697">
                <rect id="Rectangle_2974" data-name="Rectangle 2974" width="5" height="61.733" transform="translate(16150.859 14400.247) rotate(45)"/>
                <rect id="Rectangle_2966" data-name="Rectangle 2966" width="5" height="298.232" rx="2.5" transform="translate(16357.465 14686) rotate(90)"/>
                <rect id="Rectangle_2988" data-name="Rectangle 2988" width="187" height="5" rx="2.5" transform="translate(16107.232 14400)"/>
                <rect id="Rectangle_2989" data-name="Rectangle 2989" width="5" height="49" rx="2.5" transform="translate(16289.232 14401)"/>
                <g id="Group_696" data-name="Group 696">
                    <rect id="Rectangle_2970" data-name="Rectangle 2970" width="5" height="56" rx="2.5" transform="translate(16289.197 14498.247) rotate(45)"/>
                    <rect id="Rectangle_2967" data-name="Rectangle 2967" width="5" height="56" rx="2.5" transform="translate(16291.197 14565.247) rotate(45)"/>
                    <rect id="Rectangle_2971" data-name="Rectangle 2971" width="5" height="56" rx="2.5" transform="translate(16290.732 14501.782) rotate(-45)"/>
                    <path id="Path_355" data-name="Path 355" d="M5,2.5v51a2.5,2.5,0,0,1-5,0V2.5C0,1.119,5,1.119,5,2.5Z" transform="translate(16288.732 14568.783) rotate(-45)"/>
                    <g id="Ellipse_32" data-name="Ellipse 32" transform="translate(16263.732 14445.247)" fill="none" stroke="#000" stroke-width="5">
                    <circle cx="27.5" cy="27.5" r="27.5" stroke="none"/>
                    <circle cx="27.5" cy="27.5" r="25" fill="none"/>
                    </g>
                    <rect id="Rectangle_2990" data-name="Rectangle 2990" width="5" height="73" rx="2.5" transform="translate(16289.232 14498)"/>
                </g>
                </g>
            </g>
        </svg>`,
    ],
]);

const victoryImage = `
<svg height="130px" width="130px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512.009 512.009" xml:space="preserve">
    <circle style="fill:#F7B239;" cx="256.004" cy="256.004" r="256.004"/>
    <path style="fill:#E09B2D;" d="M121.499,390.501C29.407,298.407,22.15,153.608,99.723,53.204
        c-8.593,6.638-16.861,13.895-24.743,21.777c-99.974,99.974-99.974,262.065,0,362.038s262.065,99.974,362.038,0
        c7.881-7.881,15.138-16.15,21.777-24.743C358.392,489.85,213.593,482.593,121.499,390.501z"/>
    <path style="fill:#FFFFFF;" d="M377.624,213.806v44.344c-67.167,67.167-176.072,67.167-243.252,0v-44.344
        C201.552,280.986,310.457,280.986,377.624,213.806z"/>
    <path style="fill:#F95428;" d="M286.95,339.841c19.736,0,36.892,11.02,45.66,27.239c-20.913,16.991-47.57,27.163-76.605,27.163
        s-55.692-10.172-76.605-27.163c8.755-16.219,25.923-27.239,45.647-27.239c11.601,0,22.317,3.808,30.958,10.248
        C264.645,343.649,275.349,339.841,286.95,339.841z"/>
    <path style="fill:#A81004;" d="M377.624,258.15v14.473c0,33.59-13.613,63.992-35.627,85.993c-2.973,2.986-6.111,5.807-9.387,8.464
        c-8.768-16.219-25.923-27.239-45.66-27.239c-11.601,0-22.305,3.808-30.946,10.248c-8.641-6.44-19.357-10.248-30.958-10.248
        c-19.724,0-36.892,11.02-45.647,27.239c-27.479-22.279-45.027-56.325-45.027-94.457V258.15
        C201.552,325.317,310.457,325.317,377.624,258.15z"/>
    <g>
        <path style="fill:#4D4D4D;" d="M168.58,181.703c0,5.24,4.248,9.489,9.489,9.489s9.489-4.248,9.489-9.489
            c0-33.141-26.962-60.103-60.103-60.103s-60.103,26.962-60.103,60.103c0,5.24,4.248,9.489,9.489,9.489s9.489-4.248,9.489-9.489
            c0-22.677,18.449-41.125,41.125-41.125S168.58,159.028,168.58,181.703z"/>
        <path style="fill:#4D4D4D;" d="M384.546,121.602c-33.141,0-60.103,26.962-60.103,60.103c0,5.24,4.248,9.489,9.489,9.489
            c5.24,0,9.489-4.248,9.489-9.489c0-22.677,18.449-41.125,41.125-41.125c22.677,0,41.125,18.449,41.125,41.125
            c0,5.24,4.248,9.489,9.489,9.489c5.24,0,9.489-4.248,9.489-9.489C444.648,148.564,417.686,121.602,384.546,121.602z"/>
    </g>
</svg>`;
const lostImage = `
<svg height="130px" width="130px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512.009 512.009" xml:space="preserve">
    <circle style="fill:#F7B239;" cx="256.004" cy="256.004" r="256.004"/>
    <g>
        <path style="fill:#E09B2D;" d="M121.499,390.501C29.407,298.407,22.15,153.608,99.723,53.204
            c-8.593,6.638-16.861,13.895-24.743,21.777c-99.974,99.974-99.974,262.065,0,362.038s262.065,99.974,362.038,0
            c7.881-7.881,15.138-16.15,21.777-24.743C358.392,489.85,213.593,482.593,121.499,390.501z"/>
        <path style="fill:#E09B2D;" d="M231.004,364.263c-3.532,0-6.923-1.981-8.558-5.377c-2.272-4.722-0.286-10.392,4.436-12.664
            c19.049-9.166,39.187-9.166,58.233,0c4.722,2.272,6.709,7.943,4.436,12.665c-2.272,4.722-7.945,6.707-12.664,4.436
            c-13.665-6.576-28.112-6.575-41.777,0C233.786,363.96,232.384,364.263,231.004,364.263z"/>
    </g>
    <path style="fill:#2BA5F7;" d="M70.893,419.83L70.893,419.83c-23.586-23.586-23.586-61.826,0-85.411l42.705-42.705l42.705,42.705
        c23.585,23.585,23.585,61.826,0,85.411l0,0C132.719,443.415,94.479,443.415,70.893,419.83z"/>
    <path style="fill:#2197D8;" d="M101.256,419.83L101.256,419.83c-23.585-23.585-23.585-61.826,0-85.411l27.525-27.525l-15.182-15.182
        l-42.705,42.705c-23.585,23.586-23.585,61.826,0,85.411l0,0c15.688,15.688,37.856,20.927,57.887,15.745
        C118.697,432.966,109.153,427.727,101.256,419.83z"/>
    <g>
        <path style="fill:#4D4D4D;" d="M171.85,145.607c-32.391,1.528-60.862,19.51-76.162,48.1c-2.472,4.62-0.731,10.37,3.889,12.844
            c1.426,0.763,2.958,1.125,4.47,1.125c3.387,0,6.665-1.819,8.374-5.013c12.119-22.645,34.669-36.887,60.324-38.098
            c5.235-0.247,9.277-4.691,9.031-9.925C181.528,149.406,177.078,145.341,171.85,145.607z"/>
        <path style="fill:#4D4D4D;" d="M340.149,145.607c-5.24-0.254-9.677,3.795-9.925,9.031s3.795,9.678,9.031,9.925
            c25.655,1.211,48.208,15.453,60.325,38.098c1.71,3.196,4.986,5.014,8.374,5.014c1.509,0,3.043-0.362,4.469-1.125
            c4.619-2.473,6.361-8.224,3.888-12.843C401.013,165.117,372.541,147.135,340.149,145.607z"/>
        <path style="fill:#4D4D4D;" d="M316.626,320.939c-33.993-20.497-87.254-20.497-121.251,0c-4.488,2.706-5.932,8.537-3.226,13.025
            c2.706,4.487,8.539,5.932,13.025,3.226c27.55-16.61,74.102-16.61,101.655,0c1.532,0.924,3.221,1.364,4.89,1.364
            c3.216,0,6.352-1.636,8.135-4.59C322.558,329.476,321.114,323.645,316.626,320.939z"/>
        <path style="fill:#4D4D4D;" d="M142.674,201.647c-19.358,0-35.107,15.749-35.107,35.107s15.749,35.107,35.107,35.107
            s35.107-15.749,35.107-35.107S162.031,201.647,142.674,201.647z"/>
        <path style="fill:#4D4D4D;" d="M369.326,201.647c-19.358,0-35.107,15.749-35.107,35.107s15.749,35.107,35.107,35.107
            s35.107-15.749,35.107-35.107S388.684,201.647,369.326,201.647z"/>
    </g>
</svg>`;

const container = document.querySelector(".container");
const wordDisplay = document.querySelector(".word-display");
const guessedText = document.querySelector(".guessed-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-img");
const gameModal = document.querySelector(".game-modal");
const modalImage = document.querySelector(".modal-img");
const playAgainBtn = gameModal.querySelector("button");

// Game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Reset game variables and elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.innerHTML = hangmanImages.get(0);
    guessedText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");
    keyboardDiv
        .querySelectorAll("button")
        .forEach((btn) => (btn.disabled = false));
    gameModal.classList.remove("show");
    container.classList.add("show");
};

const getRandomWord = () => {
    // Select random word and hint
    const { word, hint } =
        wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const getInputWord = () => {
    // Select input word and hint
    currentWord = promptFunc("word");
    if (currentWord === null) {
        confirmFunc();
    } else {
        const hint = promptFunc("hint");
        document.querySelector(".hint-text b").innerText = hint;
        resetGame();
    }
};

const gameOver = (isVictory) => {
    // After game, show modal
    const modalText = isVictory
        ? `You found the word:`
        : `The correct word was:`;
    modalImage.innerHTML = isVictory ? victoryImage : lostImage;
    gameModal.querySelector("h4").innerText = isVictory
        ? "Congrats!"
        : "Game Over!";
    gameModal.querySelector(
        "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
};

const initGame = (button, clickedLetter) => {
    // Check if word contains letter
    if (currentWord.includes(clickedLetter)) {
        // Display all correct letters
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay
                    .querySelectorAll("li")
                    [index].classList.add("guessed");
            }
        });
    } else {
        // If word doesn't contain letter
        wrongGuessCount++;
        hangmanImage.innerHTML = hangmanImages.get(wrongGuessCount);
    }
    button.disabled = true;
    guessedText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    // Check game over
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
};

// Confirm game mode (auto random / user input)
function confirmFunc() {
    if (
        confirm("Use random words, press OK.\nUse input words, press Cancel.")
    ) {
        getRandomWord();
        playAgainBtn.removeEventListener("click", getInputWord);
        playAgainBtn.addEventListener("click", getRandomWord);
    } else {
        getInputWord();
        playAgainBtn.removeEventListener("click", getRandomWord);
        playAgainBtn.addEventListener("click", getInputWord);
    }
}

// User input
function promptFunc(type) {
    if (type === "word") {
        let word = prompt("Please enter your word:", "word");
        if (word == null || word == "") {
            return null;
        } else {
            return word.toLowerCase();
        }
    } else if (type === "hint") {
        let hint = prompt("Please enter your hint (optional):", "hint");
        return hint;
    }
}

// Create keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) =>
        initGame(e.target, String.fromCharCode(i))
    );
}

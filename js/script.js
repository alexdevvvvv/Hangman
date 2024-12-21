const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const hintText = document.querySelector(".hint-text b");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Réinitialisation des variables du jeu
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${maxGuesses - wrongGuessCount}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => {
        btn.disabled = false;
    });
    wordDisplay.innerHTML = "";
    
    // Sélection d'un mot aléatoire et de son indice
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    hintText.innerText = hint;
    
    // Création des éléments span pour chaque lettre
    word.split("").forEach(letter => {
        const li = document.createElement("li");
        li.classList.add("letter");
        wordDisplay.appendChild(li);
    });
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `Vous avez trouvé le mot:` : 'Le mot correct était:';
        alert(`${modalText} ${currentWord}`);
        resetGame();
    }, 300);
}

const initGame = (button, clickedLetter) => {
    // Vérification si la lettre cliquée existe dans le mot
    if(currentWord.includes(clickedLetter)) {
        // Affichage de toutes les lettres correctes
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // Si la lettre n'existe pas, incrémenter wrongGuessCount et mettre à jour l'image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${maxGuesses - wrongGuessCount}`;

    // Appel de gameOver si...
    if(wrongGuessCount === maxGuesses) return gameOver(false); // Défaite
    if(correctLetters.length === currentWord.length) return gameOver(true); // Victoire
}

// Création des boutons du clavier
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

resetGame(); 
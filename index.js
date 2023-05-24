let difficulty = 'Easy';
let totalCards = 0;
let numRows = 0;
let numCols = 0;
let timer;

function setDifficulty(diff) {
    difficulty = diff;
    if (difficulty === "Easy") {
        totalCards = 6;
        numRows = 2;
        numCols = 3;
    } else if (difficulty === "Medium") {
        totalCards = 12;
        numRows = 3;
        numCols = 4;
    } else if (difficulty === "Hard") {
        totalCards = 20;
        numRows = 4;
        numCols = 5;
    }
}

function createGameGrid() {
    $("#game_grid").empty();

    const pairs = totalCards / 2;
    const images = [];

    for (let i = 1; i <= pairs; i++) {
        images.push(i);
    }

    let idNumber = 0;
    const cards = [];

    for (let i = 0; i <= 1; i++) {
        for (let j = 0; j < pairs; j++) {
            idNumber++;
            const card = $("<div>").addClass("card");
            const frontFace = $("<img>").addClass("front_face").attr("id", `img${idNumber}`).attr("src", `00${images[j]}.png`).attr("alt", "");
            const backFace = $("<img>").addClass("back_face").attr("src", "back.webp").attr("alt", "");

            card.append(frontFace, backFace);
            cards.push(card);
        }
    }

    shuffleArray(cards);

    for (const card of cards) {
        $("#game_grid").append(card);
    }

    $("#game_grid").css({
        "width": `${numCols * 200}px`,
        "height": `${numRows * 200}px`
    });

    $(".card").css({
        "width": `${100 / numCols}%`
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function countdown() {
    let time = 100;
    timer = setInterval(() => {
        time--;
        $("#timer").html(time);
        if (time == 0) {
            clearInterval(timer);
            alert("You lose!");
        }
    }, 1000);
}

function startGame() {
    clearInterval(timer);
    countdown();
    createGameGrid();

    let clickCount = 0;
    let firstCard = undefined;
    let secondCard = undefined;

    const totalPairs = Math.floor(totalCards / 2); // Define and set the totalPairs variable based on totalCards

    $(".card").on(("click"), function () {
        $(this).toggleClass("flip");
        clickCount++;

        if (!firstCard) {
            // Select and set first card
            firstCard = $(this).find(".front_face")[0]
            console.log(firstCard);
        } else if (!secondCard) {
            // Select and set second card
            secondCard = $(this).find(".front_face")[0]
            console.log(firstCard, secondCard);
            if ((firstCard.src == secondCard.src) && (firstCard.id != secondCard.id)) {
                // Different but matching card selected
                console.log("match")
                $(`#${firstCard.id}`).parent().off("click")
                $(`#${secondCard.id}`).parent().off("click")
            } else if (firstCard.src != secondCard.src) {
                // Different card selected
                console.log("no match")
                setTimeout(() => {
                    $(`#${firstCard.id}`).parent().toggleClass("flip")
                    $(`#${secondCard.id}`).parent().toggleClass("flip")
                }, 1000)
            } else {
                // If same card is selected
                console.log("Can't click the same card twice!")
                $(this).toggleClass("flip")
                secondCard = undefined
            }
        } else {
            // If first and second card are set
            firstCard = $(this).find(".front_face")[0];
            secondCard = undefined;
            console.log("New first card:", firstCard);
        }

        let pairsLeft = Math.ceil(totalPairs - $(".flip").length / 2);
        let pairsMatched = Math.floor(totalPairs - pairsLeft);
        // Update header
        $("#clickCounter").html(`
            ${clickCount} clicks <br>
            ${pairsLeft} pairs left <br>
            ${pairsMatched} pairs matched <br>
            ${totalPairs} total pairs <br>
        `);

        if ($(".flip").length === totalPairs * 2) {
            console.log("Win");
            clearInterval(timer); // Stop the countdown timer
            alert("You win!");
        }
    });
}

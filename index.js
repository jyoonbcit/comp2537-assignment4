function countdown() {
    let time = 100;
    let timer = setInterval(() => {
        time--;
        $("#timer").html(time);
        if (time == 0) {
            clearInterval(timer);
            alert("You lose!");
        }
    }, 1000);
}

function gameStart(){
    countdown();
    let clickCount = 0;
    let firstCard = undefined
    let secondCard = undefined

    $(".card").on(("click"), function () {
        $(this).toggleClass("flip");
        clickCount++;

        if (!firstCard) {
            // Select and set first card
            firstCard = $(this).find(".front_face")[0]
        } else if (!secondCard) {
            // Select and set second card
            secondCard = $(this).find(".front_face")[0]
            console.log(firstCard, secondCard);
            if ((firstCard.src == secondCard.src) && (firstCard.id != secondCard.id)) {
                // Different but matching card selected
                console.log("match")
                $(`#${firstCard.id}`).parent().off("click")
                $(`#${secondCard.id}`).parent().off("click")
                // If player has won
                if ($("#img1").parent().hasClass("flip") && $("#img2").parent().hasClass("flip") && $("#img3").parent().hasClass("flip")
                    && $("#img4").parent().hasClass("flip") && $("#img5").parent().hasClass("flip") && $("#img6").parent().hasClass("flip")) {
                    console.log("Win")
                    alert("You win!")
                }
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

        let pairsLeft = Math.ceil(3 - $(".flip").length / 2)
        let pairsMatched = Math.floor(3 - pairsLeft)
        let totalPairs = 3
        // Update header
        $("#clickCounter").html(`
        ${clickCount} clicks <br>
        ${pairsLeft} pairs left <br>
        ${pairsMatched} pairs matched <br>
        ${totalPairs} total pairs <br>
        `);
    });
}

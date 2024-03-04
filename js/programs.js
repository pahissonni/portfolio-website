const sliders = ["start", "how_long", "monthly", "yearly"];
const outputs = sliders.map(name => document.getElementById(`${name}_value`));

sliders.forEach(name => {
    const slider = document.getElementById(`${name}_slider`);
    slider.addEventListener("input", function () {
        outputs[sliders.indexOf(name)].value = this.value;
    });
});


function calculate_investment() {


    let start = parseFloat(outputs[sliders.indexOf("start")].value);
    let how_long = parseFloat(outputs[sliders.indexOf("how_long")].value);
    let monthly_investment = parseFloat(outputs[sliders.indexOf("monthly")].value);
    let yearly = parseFloat(outputs[sliders.indexOf("yearly")].value);
    let monthly_percent = (1 + yearly / 12 / 100);
    let result = start;
    let months = how_long * 12;
    let total_investment = start;


    for (let i = 1; i <= months; i++) {
        result = (result * monthly_percent) + monthly_investment;
        total_investment += monthly_investment;

    }

    var content =
        "<table>" +
        "<tr>" +
        "<td>Total investment:</td>" +
        "<td style='text-align: right;'>   " + total_investment.toLocaleString('fi-FI', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + "</td>" +
        "</tr>" +
        "<td>Profit:</td>" +
        "<td style='text-align: right;'>   " + (result - total_investment).toLocaleString('fi-FI', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + "</td>" +
        "<tr>" +
        "<tr>" +
        "<td>Result:</td>" +
        "<td style='text-align: right;'>   " + result.toLocaleString('fi-FI', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + "</td>" +
        "</tr>" +
        "</table>";

    document.getElementById("print_area").innerHTML = content;

}

function calculate_vat() {
    let amount = parseFloat(document.getElementById("amount").value);

    if (document.getElementById("invert").checked) {

        if (document.getElementById("ten").checked) {
            document.getElementById("print_area").innerHTML = "With VAT: " + amount + "<br>VAT (10%): " + (amount - amount / 1.10).toFixed(2) + "<br>Total Without VAT: " + (amount / 1.10).toFixed(2);
        }
        if (document.getElementById("fourteen").checked) {
            document.getElementById("print_area").innerHTML = "With VAT: " + amount + "<br>VAT (14%): " + (amount - amount / 1.14).toFixed(2) + "<br>Total Without VAT: " + (amount / 1.14).toFixed(2);
        }
        if (document.getElementById("twentyfour").checked) {
            document.getElementById("print_area").innerHTML = "With VAT: " + amount + "<br>VAT (24%): " + (amount - amount / 1.24).toFixed(2) + "<br>Total Without VAT: " + (amount / 1.24).toFixed(2);
        }
    } else {

        if (document.getElementById("ten").checked) {
            document.getElementById("print_area").innerHTML = "Without VAT: " + amount + "<br>VAT (10%): " + (amount * 0.10).toFixed(2) + "<br>Total With VAT: " + (amount * 1.10).toFixed(2);
        }
        if (document.getElementById("fourteen").checked) {
            document.getElementById("print_area").innerHTML = "Without VAT: " + amount + "<br>VAT (14%): " + (amount * 0.14).toFixed(2) + "<br>Total With VAT: " + (amount * 1.14).toFixed(2);
        }
        if (document.getElementById("twentyfour").checked) {
            document.getElementById("print_area").innerHTML = "Without VAT: " + amount + "<br>VAT (24%): " + (amount * 0.24).toFixed(2) + "<br>Total With VAT: " + (amount * 1.24).toFixed(2);
        }
    }
}


function text_to_qr() {
    document.getElementById("print-area").innerHTML = '';
    input_text = document.getElementById("text").value;
    var qr_code = new QRCode(document.getElementById("print-area"), {
        text: input_text,
        colorDark: "#000000",
        colorLight: "#ffeed0",
        correctLevel: QRCode.CorrectLevel.H
    });
}


function count_characters() {
    let chars = document.getElementById("characters").value;
    document.getElementById("print_area").innerHTML = chars.length + " characters";
}


function count_words() {
    let words = document.getElementById("words").value;
    let splitted = words.trim().split(" ");
    let counter = 0;

    for (let i = 0; i < splitted.length; i++) {
        if (splitted[i] != "") {
            counter++;
        }
    }

    document.getElementById("print_area").innerHTML = "The Amount of Words: " + counter;
}



//vieläkään ei toimi oikein
function count_same_words() {
    let words = document.getElementById("words").value;
    let trimmed = words.replace(/(\r\n|\n|\r)/gm," ");
    let splitted = trimmed.trim().split(" ");
    let duplicate_words = new Map();

    const removePunctuation = (word) => {
        return word.replace(/[.,;:!?]$/, "");
    };

    for (let i = 0; i < splitted.length; i++) {
        let word_i = removePunctuation(splitted[i].toLowerCase())
        if (!duplicate_words.has(word_i)) {
            for (let j = i + 1; j < splitted.length; j++) {
                let word_j = removePunctuation(splitted[j].toLowerCase())

                    if (word_i === word_j && !duplicate_words.has(word_i)) {
                        duplicate_words.set(word_i, 2);
                }   else if (word_i === word_j) {
                        duplicate_words.set(word_i, duplicate_words.get(word_i) + 1);
                }
            }
        }
    }

    let output = "The Amount of Duplicate Words: " + duplicate_words.size +
                 ".<br>Here's the list of the words & how many times they appear:<br>";

    duplicate_words.forEach((count, word) => {
        output += `<br>${word} (${count})`;
    });

    document.getElementById("print_area").innerHTML = output;
}


function countdown() {
    let current_date = new Date();
    let goal_date_input = document.getElementById("goal_date").value;
    let goal_date = new Date(goal_date_input);
    let difference = goal_date - current_date;

    let years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
    let days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("print_area").innerHTML =
        "Time remaining: <br>" +
        years + " years, <br>" +
        days + " days, <br>" +
        hours + " hours, <br>" +
        minutes + " minutes, <br>" +
        seconds + " seconds.";
}


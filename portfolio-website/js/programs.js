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


        for  (let i = 1; i <= months; i++) {
            result = (result * monthly_percent) + monthly_investment;
            total_investment += monthly_investment;
            
    } 
    document.getElementById("print_area").innerHTML = "Result: " + result.toFixed(2) + "<br>Total investment: " + total_investment.toFixed(2)
    + "<br>Profit: " + (result - total_investment).toFixed(2);


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




function count_same_words() {
    let words = document.getElementById("words").value;
    let splitted = words.trim().split(" ");
    let duplicate_words = [];

    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words.length; j++) {
                //jos sanat i on sama kun sanat j ja sana i ei ole tupla sanoissa niin
                    //lisää sana tupla sanoihin
        }
    }
}
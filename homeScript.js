const form = document.getElementById("schoolForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    var school = document.getElementById("schoolInput").value;
    school = school.toLowerCase().replace(/ /g, "-");
    console.log(school);
    window.location.href = "search.html?" + school;
});

const schoolInput = document.getElementById("schoolInput");

schoolInput.addEventListener("input", async (e) => {
    let input = schoolInput.value;
    schoolInput.value = input.toUpperCase();
    clearSuggestions();
    if (input.length === 0) return;
    let suggestions = getSuggestions(input);
    console.log("suggestions: " + suggestions);
    for (var i = 0; i < suggestions.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = suggestions[i];
        newDiv.className = "autocomplete-option";
        form.appendChild(newDiv);
        newDiv.addEventListener("click", (e) => {
            schoolInput.value = newDiv.innerHTML;
            clearSuggestions();
        });
    }
});

function clearSuggestions() {
    let suggestionDivs = Array.from(document.getElementsByClassName("autocomplete-option"));
    console.log("suggestionDivs: " + suggestionDivs.length);
    //console.log("clearSuggestions()", "length: " + suggestionDivs.length);
    for (var i = 0; i < suggestionDivs.length; i++) {
        form.removeChild(suggestionDivs[i]);
    }
}

function getSuggestions(input) {
    var schools = ["UC BERKELEY", "UC DAVIS", "UC LA", "UC SANTA CRUZ"];
    var suggestions = [];
    for (var i = 0; i < schools.length; i++) {
        if (schools[i].substring(0, input.length).toUpperCase() == input.toUpperCase()) {
            suggestions.push(schools[i]);
        }
    }
    return suggestions;
}

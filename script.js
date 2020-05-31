function get(url) {
    return new Promise(async (resolve, reject) => {
        fetch(await fullUrl(url))
            .then((res) => res.json())
            .then((json) => {
                resolve(json);
            })
            .catch((err) => reject(err));
    });
}

function fullUrl(url) {
    return new Promise((resolve, reject) => {
        resolve("http://127.0.0.1:5000" + url);
    });
}

// get("/test").then((res) => console.log(res));
// get("/getcourses/psychology-logic").then((res) => console.log(res));

const form = document.getElementById("gangForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("form submitted");
    var school = document.getElementById("input_school").value;
    var interests = document
        .getElementById("input_interests")
        .value.replace(" ", "-");
    console.log(school);
    console.log(interests);
    get(
        "/getcourses/?school=" + school + "&interests=" + interests
    ).then((res) => generateTable(res.courses));
});

const schoolInput = document.getElementById("input_school");
function suggest() {
    var suggestions = ["UC Berkeley", "UC Davis", "UC LA"];
    var val = schoolInput.value;
    console.log(val);
}

function generateTable(courses) {
    let table = document.getElementById("courseTable");
    let thead = table.createTHead();
    let row = thead.insertRow();
    var headings = ["subject", "number", "title", "units", "prereqs", "desc"];
    for (var i = 0; i < headings.length; i++) {
        let th = document.createElement("th");
        let text = document.createTextNode(headings[i]);
        th.appendChild(text);
        row.appendChild(th);
    }
    for (var i = 0; i < Math.min(courses.length, 10); i++) {
        let row = table.insertRow();
        for (key in courses[i]) {
            let cell = row.insertCell();
            let text = document.createTextNode(courses[i][key]);
            cell.appendChild(text);
        }
    }
}

//generateTable();

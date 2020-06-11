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

const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    var formId = e.target.id;
    if (formId === "schoolForm") {
        var input = document.getElementById("schoolInput").value;
        setSchool(input);
    } else if (formId === "interestForm") {
        var input = document.getElementById("interestInput").value;
        setInterest(input);
    }
});

function setSchool(school) {
    school = school.toLowerCase().replace(" ", "");
    console.log(school);
    window.location.href = "search.html?" + school;
}

if (document.getElementById("search-school") != null)
    document.getElementById("search-school").innerHTML = query.school;

function setInterest(interest) {
    console.log(interest);
}

const courseDivs = Array.from(document.getElementsByClassName("courseHeader"));
courseDivs.forEach((button) => {
    button.addEventListener("click", (e) => {
        var courseBody = e.target.parentElement.parentElement.getElementsByClassName(
            "courseBody"
        )[0];
        console.log(courseBody);
        if (courseBody.className === "courseBody") {
            courseBody.className = "courseBody active";
        } else if (courseBody.className === "courseBody active") {
            courseBody.className = "courseBody";
        }
        console.log(courseBody);
    });
});

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     var input = document.getElementById("bar");
//     var school = input.value;
//     var desc = document.getElementById("desc");
//     desc.innerHTML = school;
//     desc.style.color = "darkblue";
//     console.log(school.value);
// });

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
    for (var i = 0; i < courses.length; i++) {
        let row = table.insertRow();
        for (key in courses[i]) {
            let cell = row.insertCell();
            let text = document.createTextNode(courses[i][key]);
            cell.appendChild(text);
        }
    }
}

//generateTable();

import resumeData from '../Data.json' assert { type: 'json' };

let resumes = resumeData.resume;
let filteredResume = resumes;
let count = 0
let text = "";

console.log("resume", resumeData.resume)

function incrementCount() {
    if (count < filteredResume.length - 1) {
        count += 1
    }
    renderPage()
}

function decrementCount() {
    if (count > 0) {
        count -= 1
    }
    renderPage()
}

function renderPage() {
    renderActionButtons()
    renderResume()
}

function renderActionButtons() {
    if (filteredResume.length == 1) {
        document.getElementById("previous").style.display = "none";
        document.getElementById("next").style.display = "none";
        return;
    }
    if (count > 0) {
        document.getElementById("previous").style.display = "inline";

    }
    else {
        document.getElementById("previous").style.display = "none";
    }

    if (count < filteredResume.length - 1) {
        document.getElementById("next").style.display = "inline";
    }
    else {
        document.getElementById("next").style.display = "none";
    }
}

function renderError() {
    document.getElementById("error").innerHTML = '😞 ' + "No results Found";
}

function renderResume() {
    if (filteredResume.length == 0) {
        document.getElementById("resumeName").innerText = null;
        document.getElementById("jobProfile").innerText = null;
        document.getElementById("resumeContainer").style.display = "none";
        document.getElementById("errorContainer").style.display = "block";
        renderError();
        return
    }
    document.getElementById("error").innerText = "";
    document.getElementById("errorContainer").style.display = "none";
    document.getElementById("resumeContainer").style.display = "block";
    document.getElementById("resumeName").innerText = filteredResume[count].basics.name;
    document.getElementById("jobProfile").innerText = "Applied For : " + filteredResume[count].basics.AppliedFor;
    let image = filteredResume[count].basics.image;
    //if image is not present, I have added a generic image. Incase it is present, provide path of the image as a string to image tag in json.
    if (image === "") {
        document.getElementById("right").innerHTML = "<img src=\"./img.png\">"
    } else {
        document.getElementById("right").innerHTML = "<img src=" + filteredResume[count].basics.image + ">";

    }
    document.getElementById("companyName").innerHTML = "<b>Company Name: </b>" + filteredResume[count].work['Company Name'];
    document.getElementById("position").innerHTML = "<b>Position: </b>" + filteredResume[count].work.Position;
    document.getElementById("startDate").innerHTML = "<b>Start Date: </b>" + filteredResume[count].work['Start Date'];
    document.getElementById("endDate").innerHTML = "<b>End Date: </b>" + filteredResume[count].work['End Date'];
    document.getElementById("summary").innerHTML = "<b>Summary: </b>" + filteredResume[count].work.Summary;
    document.getElementById("project").innerHTML = "<b>" + filteredResume[count].projects.name + " </b>" + filteredResume[count].projects.description;
    document.getElementById("ug").innerHTML = "<b>UG: </b>" + filteredResume[count].education.UG.institute + ", " + filteredResume[count].education.UG.course + ", " + filteredResume[count].education.UG['Start Date'] + ", " + filteredResume[count].education.UG['End Date'] + ", " + filteredResume[count].education.UG.cgpa;
    document.getElementById("seniorEdu").innerHTML = "<b>PU: </b>" + filteredResume[count].education['Senior Secondary'].institute + ", " + filteredResume[count].education['Senior Secondary'].cgpa;
    document.getElementById("highSchool").innerHTML = "<b>High School: </b>" + filteredResume[count].education['High School'].institute + ", " + filteredResume[count].education['High School'].cgpa;
    document.getElementById("iCompany").innerHTML = "<b>Company Name: </b>" + filteredResume[count].Internship['Company Name'];
    document.getElementById("iPosition").innerHTML = "<b>Position: </b>" + filteredResume[count].Internship.Position;
    document.getElementById("iStartDate").innerHTML = "<b>Start Date: </b>" + filteredResume[count].Internship['Start Date'];
    document.getElementById("iEndDate").innerHTML = "<b>End Date: </b>" + filteredResume[count].Internship['End Date'];
    document.getElementById("iSummary").innerHTML = "<b>Summary: </b>" + filteredResume[count].Internship.Summary;
    document.getElementById("aSummary").innerHTML = filteredResume[count].achievements.Summary;
    document.getElementById("address").innerHTML = filteredResume[count].basics.location.address + ", " + filteredResume[count].basics.location.city + ", " + filteredResume[count].basics.location.state + ", " + filteredResume[count].basics.location.postalCode;

    //fetch all hobbies and display them one after another
    const hobby = filteredResume[count].interests.hobbies;
    hobby.forEach(displayContent);
    document.getElementById("hobbies").innerHTML = text;
    text = ""

    //fetch all keywords/skills and display them one after another
    const skills = filteredResume[count].skills.keywords;
    skills.forEach(displayContent)
    document.getElementById("skills").innerHTML = text
    text = ""

    document.getElementById("phone").innerHTML = filteredResume[count].basics.phone;
    document.getElementById("email").innerHTML = filteredResume[count].basics.email;
    document.getElementById("linkedIn").innerHTML = "<a href='" + filteredResume[count].basics.profiles.url + "'>" + filteredResume[count].basics.profiles.network + "</a>"

}

function displayContent(item) {
    text += item + "<br>";
}

function applyFilter() {
    var filterValue = document.getElementById("jobProfileFilter").value;
    if (filterValue === "") {
        filteredResume = resumes;
    }
    else {
        console.log("filterValue: " + filterValue)
        filterValue = filterValue.toLowerCase();
        resumes.forEach(resume => console.log(resume.basics.AppliedFor))
        filteredResume = resumes.filter(resume => resume.basics.AppliedFor.toLowerCase().startsWith(filterValue))

        console.log(filteredResume.length)
        count = 0
    }
    renderPage();
}

document.getElementById("previous").addEventListener("click", decrementCount)

document.getElementById("next").addEventListener("click", incrementCount)


document.getElementById("jobProfileFilter").addEventListener("keyup", applyFilter)

renderPage();
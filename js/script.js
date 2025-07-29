$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

function downloadFile() {
    const fileName = "Manoj_Kumar.pdf";

    // Create a Blob object from the file.
    const fileBlob = new Blob([new File([fileName], fileName)], { type: `application/pdf` });

    // Create a URL object from the Blob object.
    const url = URL.createObjectURL(fileBlob);

    // Create a new anchor element and set its href attribute to the URL object.
    const anchorElement = document.createElement("a");
    anchorElement.href = url;

    // Set the anchor element's download attribute to the file name.
    anchorElement.download = fileName;

    // Click the anchor element to download the file.
    anchorElement.click();

    // Revoke the object URL to avoid memory leaks.
    URL.revokeObjectURL(url);
}

function openLink(social) {
    const SOCIAL_URLS = {
        linkedin: "https://www.linkedin.com/in/mkv336699",
        leetcode: "https://leetcode.com/mkv336699",
        github: "https://github.com/mkv336699",
        gitlab: "https://gitlab.com/mkv336699",
        stackoverflow: "https://stackoverflow.com/users/13362998/manoj-kumar",
    }
    window.open(SOCIAL_URLS[social], "_blank");
}

// get exp
function calculateYearsAndMonths() {
    const givenDate = new Date('2019-09-19');
    const today = new Date();

    let years = today.getFullYear() - givenDate.getFullYear();
    let months = today.getMonth() - givenDate.getMonth();
    let days = today.getDate() - givenDate.getDate();

    if (days < 0) {
        months -= 1;
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    let yearLabel = years === 1 ? "year" : "years";
    let monthLabel = months === 1 ? "month" : "months";
    let calculateExperience = `${years} ${yearLabel} ${months} ${monthLabel}`;

    for (let element of document.getElementsByClassName("experience-td"))
        element.innerText = calculateExperience;
}

calculateYearsAndMonths();

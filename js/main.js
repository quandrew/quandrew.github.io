function navigateSection() {
    $(window).on("load", function () {
        loadSection(window.location.hash);
    });
    $(".nav-link").on("click", function () {
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
    });
    $(window).on("hashchange", function () {
        loadSection(window.location.hash);
    });
}

function loadSection(section) {
    $(".nav-link").removeClass("active");
    var sections = ["about", "career", "links", "projects", "skills"];
    var sectionWithoutHash = section.replace("#", "");
    if ($.inArray(sectionWithoutHash, sections) > -1) {
        $(section).addClass("active");
        $(".section").load(`/sections/${sectionWithoutHash}.html`);
    } else if (sectionWithoutHash == "") {
        $("#about").addClass("active");
        $(".section").load(`/sections/about.html`);
    } else {
        window.location.replace("404.html");
    }
}

function loadChart() {
    var ctx = $("#chart");
    var config = {
        type: "radar",
        data: {
            labels: ["C++", "CSS", "HTML", "JS", "Python", "Shell", "SQL", "VB"],
            datasets: [{
                label: "Ability",
                borderColor: "#000",
                pointBorderColor: "#fff",
                pointBackgroundColor: "#000",
                data: ["77", "82", "85", "81", "75", "82", "70", "81"]
            }]
        },
        options: {
            maintainAspectRatio: false,
            scale: {
                ticks: {
                    min: 0,
                    max: 100
                }
            },
            legend: {
                display: false
            }
        }
    };
    var chart = new Chart(ctx, config);
}
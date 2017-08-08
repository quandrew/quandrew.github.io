function navigateSection() {
    $(window).on("load", function () {
        loadSection(window.location.hash);
    });
    $(".nav-link").on("click", function () {
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
    });
    $(".navbar-toggler").on("click", function () {
        $(".navbar-toggler").toggleClass("collapsed");
        $(".navbar-collapse").toggle();
        $(".nav-link").on("click", function () {
            if ($(".navbar-collapse").css("display") == "block") {
                $(".navbar-toggler").addClass("collapsed");
                $(".navbar-collapse").hide();
            }
        });
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

function loadProject() {
    var users = [];
    var repos = [];
    $(".github").each(function () {
        var user = $(this).attr("user");
        var repo = $(this).attr("repo");
        if ($.inArray(user, users) == -1) {
            users.push(user);
        }
        if ($.inArray(`${user}/${repo}`, repos) == -1) {
            repos.push(`${user}/${repo}`);
        }
    });
    for (var user = 0; user < users.length; user++) {
        $.get(`https://api.github.com/users/${users[user]}/repos?per_page=100`, function (user) {
            for (var repo = 0; repo < user.length; repo++) {
                $(`[repo="${user[repo].name}"]`).children(".url").attr({
                    "href": user[repo].html_url,
                    "target": "_blank"
                });
                $(`[repo="${user[repo].name}"]`).children(".name").append(user[repo].name);
                $(`[repo="${user[repo].name}"]`).children(".description").append(user[repo].description);
            }
        });
    }
}
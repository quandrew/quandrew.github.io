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
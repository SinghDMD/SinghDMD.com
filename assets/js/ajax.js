$(document).ready(function () {

    $("#main-nav").addClass("navbar navbar-expand-lg navbar-light fixed-top");
    $("#main-nav").load("/assets/include/nav.html");

    $("#page-footer").addClass("footer py-4 bg-dark text-light text-center");
    $("#page-footer").load("/assets/include/footer.html");

    $('#page-loader').fadeOut(500, function () {
        $('body').fadeIn(500);
    });
});
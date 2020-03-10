// ===== Scroll to Top ==== 
$(window).scroll(function () {
    if ($(this).scrollTop() >= 400) {
        $('#scroll-to-top').fadeIn(200);
    } else {
        $('#scroll-to-top').fadeOut(200);
    }
});
$('#scroll-to-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
});
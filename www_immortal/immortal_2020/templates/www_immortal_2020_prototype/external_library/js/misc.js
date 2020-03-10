(function() {
    
    $.fatNav();
    
}());

$('.navi ul li')
.css({cursor: "pointer"})
.on('click', function(){
  $(this).find('ul').toggle();
})

$(function(){

    $('.hover-change').hover(function(){
        this.src = $(this).data('hover-src');
    }, function(){
        this.src = $(this).data('src');
    });

});


$(function(){

  $('.btnH').on('click',function(e){
    $('.popup').css({
      'transform':'translateY(0)',
      'z-index':'999'
    });

    $('body').addClass('overlay');

    $('.popup h1').animate({
      left:'0'
    },1000);

    $(this).css({
      'z-index':'-1'
    });

    $('.popup > .close').on('click',function(){
      $(this).parent().css({
      'transform':'translateY(-300%)'
     });

      $('body').removeClass('overlay');
      $(this).parent().siblings('.btnH').css({
        'z-index':'1'
      });
    });
  });
});

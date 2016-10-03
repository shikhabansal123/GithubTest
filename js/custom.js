/*-- Initialize Swiper --*/
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    parallax: true,
    loop: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    speed: 600,
    effect: 'fade'
});

/*-- Footer FadeIn/FadeOut --*/
var footer = $('#footer'),
    extra = 10; // In case you want to trigger it a bit sooner than exactly at the bottom.

footer.css({ opacity: '0', display: 'block' });

$(window).scroll(function() {

   var scrolledLength = ( $(window).height() + extra ) + $(window).scrollTop(),
       documentHeight = $(document).height();


    console.log( 'Scroll length: ' + scrolledLength + ' Document height: ' + documentHeight )


   if( scrolledLength >= documentHeight ) {

       footer
          .addClass('bottom')
          .stop().animate({ bottom: '0', opacity: '1' }, 100);

   }
   else if ( scrolledLength <= documentHeight && footer.hasClass('bottom') ) {           
        footer
           .removeClass('bottom')
           .stop().animate({ bottom: '0', opacity: '0' }, 100);

   }
});

/*-- Equal div height --*/
equalheight = function(container) {
    var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;
    $(container).each(function() {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        } for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

$(window).load(function() {
  equalheight('.container .equalheight');
  toggleLoginMenu();
});

$(window).resize(function(){
  equalheight('.container .equalheight');
  toggleLoginMenu();
});

/*-- Left panel --*/
function toggleLoginMenu()
{
  var windowWidth = $(window).width();
  if(windowWidth <= 991) {
    $(".left_panel").css("margin-left","-290px");    
  } else if(windowWidth >= 992) {
    $(".left_panel").css("margin-left","0px");
  }
}

$(".btn_panel").click(function() {   
    $(this).animate({'left': $(this).css('left') == '10px' ? '300px' : '10px'}, 1000);
    $(".left_panel").animate({'margin-left': $('.left_panel').css('margin-left') == '0px' ? '-290px' : '0px'}, 1000);
});

// FUNCTION FOR UPLOAD IMAGE
$(".upload-img").on("change", function(){
  var obj = $(this);
  var files = !!this.files ? this.files : [];
  if ( !files.length || !window.FileReader ) return;
  if ( /^image/.test( files[0].type ) ) {
    var reader = new FileReader();
    reader.readAsDataURL( files[0] );
    reader.onloadend = function(){
        $(obj).parent().parents(".banner_image").find(".upload-result").css("background-image", "url(" + this.result + ")");
        $(obj).parent().parents(".banner_image").find(".upload-result").css("background-size", "cover");
    }
  }
});
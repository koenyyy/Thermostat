$(document).ready(function () {
    $('body').css('overflow-y','hidden');
    
    //get the weekprogram
    var weekProgram = getWeekProgram();
    $('#textData').append(weekProgram);
    
    //Click interaction with tabs
    var animTime = 300,
        clickPolice = false;

    $(document).on('touchstart click', '.acc-btn', function () {
        if (!clickPolice) {
            clickPolice = true;

            var currIndex = $(this).index('.acc-btn'),
                targetHeight = $('.acc-content-inner').eq(currIndex).outerHeight();

            $('.acc-btn h1').removeClass('selected');
            $(this).find('h1').addClass('selected');
            $(this).addClass('selected');

            $('.acc-content').stop().animate({
                height: 0
            }, animTime);
            $('.acc-content').eq(currIndex).stop().animate({
                height: targetHeight
            }, animTime);

            setTimeout(function () {
                clickPolice = false;
            }, animTime);

            $(".acc-btn").each(function () {
                $(this).not('.selected').hide();
                console.log("hide and seek")
            });
        }
    });
    
    $(document).on('touchstart click', '.selected', function () {
        if (!clickPolice) {
            clickPolice = true;

            var currIndex = $(this).index('.acc-btn'),
                targetHeight = $('.acc-content-inner').eq(currIndex).outerHeight();

            $('.selected').removeClass('selected');
            $('.selected').css('margin-top','10%');

            $('.acc-content').stop().animate({
                height: 0
            }, animTime);
            

            setTimeout(function () {
                clickPolice = false;
            }, animTime);

            $(".acc-btn").each(function () {
                $(this).not('.selected').show();
                console.log("Nimma");
            });
        }
    });
});
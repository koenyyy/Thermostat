$(document).ready(function () {
    //get the weekprogram
    var weekProgram = getWeekProgram();
    var dayTemperature = get("dayTemperature", "day_temperature");
    var weekProgramString = JSON.stringify(weekProgram);
    var obj = $.parseJSON(weekProgramString);

    //adding a period for testing purposes only
    //addPeriod('Tuesday', '19:00', '19:10');
    //addPeriod('Sunday', '19:40', '19:50');
    //removePeriod('Monday', 4);    

    //go through all days from json xml thing and display the according switches
    $.each(obj, function (index, value) {
        if (index == 'Monday') {
            for (i = 0; i < obj['Monday'].length; i++) {
                var value = obj['Monday'][i].toString().replace(",", " - ");

                $('#MondayContent').append('<p>' + value + " at " + dayTemperature + "°C" + '<p>');
            }
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Monday'].length < 5) {
                $('#MondayContent').append('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }
        }

        if (index == 'Tuesday') {
            for (i = 0; i < obj['Tuesday'].length; i++) {
                var value = obj['Tuesday'][i].toString().replace(",", " - ");

                $('#TuesdayContent').append('<p>' + value + " at " + dayTemperature + "°C" + '<p>');
            }
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Tuesday'].length < 5) {
                $('#TuesdayContent').append('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }
        }

        if (index == 'Wednesday') {
            for (i = 0; i < obj['Wednesday'].length; i++) {
                var value = obj['Wednesday'][i].toString().replace(",", " - ");

                $('#WednesdayContent').append('<p>' + value + " at " + dayTemperature + "°C" + '<p>');
            }
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Wednesday'].length < 5) {
                $('#WednesdayContent').append('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }
        }

        if (index == 'Thursday') {
            for (i = 0; i < obj['Thursday'].length; i++) {
                var value = obj['Thursday'][i].toString().replace(",", " - ");

                $('#ThursdayContent').append('<p>' + value + " at " + dayTemperature + "°C" + '<p>');
            }
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Thursday'].length < 5) {
                $('#ThursdayContent').append('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }
        }

        if (index == 'Friday') {
            for (i = 0; i < obj['Friday'].length; i++) {
                var value = obj['Friday'][i].toString().replace(",", " - ");

                $('#FridayContent').append('<p>' + value + " at " + dayTemperature + "°C" + '<p>');
            }
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Friday'].length < 5) {
                $('#FridayContent').append('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }
        }

        if (index == 'Saturday') {
            for (i = 0; i < obj['Saturday'].length; i++) {
                var value = obj['Saturday'][i].toString().replace(",", " - ");

                $('#SaturdayContent').append('<p>' + value + " at " + dayTemperature + "°C" + '<p>');
            }
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Saturday'].length < 5) {
                $('#SaturdayContent').append('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }
        }

        if (index == 'Sunday') {
            for (i = 0; i < obj['Sunday'].length; i++) {
                var value = obj['Sunday'][i].toString().replace(",", " - ");

                $('#SundayContent').append('<p>' + value + " at " + dayTemperature + "°C" + '<p>');
            }
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Sunday'].length < 5) {
                $('#SundayContent').append('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }
        }
    });

    ///////////////////////////////////////////////////
    //Koen, you need to fix the way input can be done//
    ///////////////////////////////////////////////////
    $("#sendSwitch").click(function () {
        var parentID = $(".acc-content-inner").closest("div").attr("id");
        console.log(parentID);
        var day = parentID.replace("Content", "");
        var from = $('#fromInput').val();
        var to = $('#toInput').val();
        console.log(day + fromr + to);
        addPeriod(day, from, to);
        //Need a refresh to show the just added data. make a function out of it
    });

});


$(document).ready(function () {
    $('body').css('overflow-y', 'hidden');

    //Click interaction with tabs
    var animTime = 300,
        clickPolice = false;
    //opening tab
    $(document).on('touchstart click', '.acc-btn', function () {
        if (!clickPolice) {
            clickPolice = true;

            console.log("kip");

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

            $('.acc-btn').each(function () {
                $(this).not('.selected').hide();
            });
        }
    });

    //closing tab
    $(document).on('touchstart click', '.selected', function () {
        if (!clickPolice) {
            clickPolice = true;

            console.log('Nimma');

            var currIndex = $(this).index('.acc-btn'),
                targetHeight = $('.acc-content-inner').eq(currIndex).outerHeight();

            $('.selected').removeClass('selected');
            $('.selected').css('margin-top', '10%');

            $('.acc-content').stop().animate({
                height: 0
            }, animTime);


            setTimeout(function () {
                clickPolice = false;
            }, animTime);

            $('.acc-btn').each(function () {
                $(this).not('.selected').show();
            });
        }
    });
});
//function to load and show te weekprogram data
function showWeekprogram() {

    // Getting the weekprogram and dayTemperature. Also make a String out of the JSON weekprogram
    var weekProgram = getWeekProgram();
    var dayTemperature = get("dayTemperature", "day_temperature");
    var weekProgramString = JSON.stringify(weekProgram);
    var obj = $.parseJSON(weekProgramString);

    $.each(obj, function (index, value) {
        if (index == 'Monday') {
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Monday'].length < 5) {
                $('#MondayContent').prepend('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }

            for (i = 0; i < obj['Monday'].length; i++) {
                var value = obj['Monday'][i].toString().replace(",", " - ");
                $('#MondayContent').prepend('<div class="removeEdit"><p>' + value + " at " + dayTemperature + "°C" + '</p><span id="' + i + '" class="btn btn-primary removeBtn"><img src="img/garbage.png" width="50%"></span></div>');
            }
        }

        if (index == 'Tuesday') {
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Tuesday'].length < 5) {
                $('#TuesdayContent').prepend('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }
            for (i = 0; i < obj['Tuesday'].length; i++) {
                var value = obj['Tuesday'][i].toString().replace(",", " - ");
                $('#TuesdayContent').prepend('<div class="removeEdit"><p>' + value + " at " + dayTemperature + "°C" + '</p><span id="' + i + '" class="btn btn-primary removeBtn"><img src="img/garbage.png" width="50%"></span></div>');
            }
        }

        if (index == 'Wednesday') {
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Wednesday'].length < 5) {
                $('#WednesdayContent').prepend('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }
            for (i = 0; i < obj['Wednesday'].length; i++) {
                var value = obj['Wednesday'][i].toString().replace(",", " - ");

                $('#WednesdayContent').prepend('<div class="removeEdit"><p>' + value + " at " + dayTemperature + "°C" + '</p><span id="' + i + '" class="btn btn-primary removeBtn"><img src="img/garbage.png" width="50%"></span></div>');
            }
        }

        if (index == 'Thursday') {
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Thursday'].length < 5) {
                $('#ThursdayContent').prepend('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }
            for (i = 0; i < obj['Thursday'].length; i++) {
                var value = obj['Thursday'][i].toString().replace(",", " - ");

                $('#ThursdayContent').prepend('<div class="removeEdit"><p>' + value + " at " + dayTemperature + "°C" + '</p><span id="' + i + '" class="btn btn-primary removeBtn"><img src="img/garbage.png" width="50%"></span></div>');
            }

        }

        if (index == 'Friday') {
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Friday'].length < 5) {
                $('#FridayContent').prepend('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }
            for (i = 0; i < obj['Friday'].length; i++) {
                var value = obj['Friday'][i].toString().replace(",", " - ");
                $('#FridayContent').prepend('<div class="removeEdit"><p>' + value + " at " + dayTemperature + "°C" + '</p><span id="' + i + '" class="btn btn-primary removeBtn"><img src="img/garbage.png" width="50%"></span></div>');
            }
        }

        if (index == 'Saturday') {
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Saturday'].length < 5) {
                $('#SaturdayContent').prepend('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }
            for (i = 0; i < obj['Saturday'].length; i++) {
                var value = obj['Saturday'][i].toString().replace(",", " - ");
                $('#SaturdayContent').prepend('<div class="removeEdit"><p>' + value + " at " + dayTemperature + "°C" + '</p><span id="' + i + '" class="btn btn-primary removeBtn"><img src="img/garbage.png" width="50%"></span></div>');
            }
        }

        if (index == 'Sunday') {
            //check if there are already 5 switches if so, no button to add is displayed
            if (obj['Sunday'].length < 5) {
                $('#SundayContent').prepend('<span class="btn btn-primary addSwitchBtn">Add a switch</span>');
            }
            for (i = 0; i < obj['Sunday'].length; i++) {
                var value = obj['Sunday'][i].toString().replace(",", " - ");

                $('#SundayContent').prepend('<div class="removeEdit"><p>' + value + " at " + dayTemperature + "°C" + '</p><span id="' + i + '" class="btn btn-primary removeBtn"><img src="img/garbage.png" width="50%"></span></div>');
            }
        }
    });
}


$(document).ready(function () {
    //go through all days from json xml thing and display the according switches    
    showWeekprogram();

    ///////////////////////////////////////////////////
    //Koen, you need to fix the way input can be done//
    ///////////////////////////////////////////////////
    $(".sendSwitch").click(function () {
        var parentID = $(this).closest('div.acc-content-inner').attr('id')
        var day = parentID.replace("Content", "");
        var from = $(this).closest("div").find("input.fromInput").val();
        var to = $(this).closest("div").find("input.toInput").val();
        console.log(day + from + to);
        addPeriod(day, from, to);
        $('.fromToContainer').css('visibility', 'hidden');
        //A refresh to show the just added data.
        $('.acc-content-inner').each(function () {
            $(this).find('span.addSwitchBtn').remove();
        });
        $('.acc-content-inner').each(function () {
            $(this).find('div.removeEdit').remove();
        });

        showWeekprogram();
    });

    //to delete a switch with id nr. i //////////////kijken kijken kijken
    $('body').on('click', '.removeBtn', function () {
        var i = $(this).closest("div.removeEdit").find("span").attr("id");
        var parentID = $(this).closest('div.acc-content-inner').attr('id')
        var day = parentID.replace("Content", "");
        removePeriod(day, i);
        console.log(day + "   " + i);
        $('.acc-content-inner').each(function () {
            $(this).find('span.addSwitchBtn').remove();
        });
        $('.acc-content-inner').each(function () {
            $(this).find('div.removeEdit').remove();
        });
        showWeekprogram();
    });

    //to show the switch input fields when you want to add a new switch
    $('body').on('click', '.addSwitchBtn', function () {
        $('.fromToContainer').css('visibility', 'visible');
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
            $('.fromToContainer').css('visibility', 'hidden');
            var currIndex = $(this).index('.acc-btn'),
                targetHeight = 450;

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
                targetHeight = 450;
            console.log(targetHeight);

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
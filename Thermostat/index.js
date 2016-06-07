//function to retrieve the current temp from the online thermostat thingy
$(document).ready(function () {
    var currentTemp = get("currentTemperature", "current_temperature");
    var currentTempInt = Math.round(currentTemp);
    $('#tempInput').val(currentTemp);
});

//function to put the target temperature, onClick also a heating indicator will be displayed.
$(document).ready(function () {
    var currentTemp = get("currentTemperature", "current_temperature");
    $('#tempInput').val(currentTemp);
});

$(document).ready(function () {
    $('#setTempBtn').click(function () {
        var targetTemp = $('#tempInput').val();
        put("targetTemperature", "target_temperature", targetTemp);
        $('#tempOutput').html(targetTemp);
        $('.output').fadeIn(500);
        $('.output').delay(1200).fadeOut(700);
        
        var heated = false;
        var interval = setInterval(function () {
            if (heated == true) {
                clearInterval(interval);
            } else {
                var currentTemp = get("currentTemperature", "current_temperature");
                $('#targetLoading').html(currentTemp + '<img src="img/fire.png" height="20px" />');
                $('#targetLoading').css('visibility', 'visible').animate({opacity: 100});
                $('#targetLoading').delay(1200).animate({opacity: 0});
                if (parseInt(currentTemp, 10) == parseInt(targetTemp, 10)) {
                    heated = true;
                } else {
                    heated = false;
                }
            }
        }, 1000);
    });
});
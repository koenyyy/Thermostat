// global application variables
var tempCurrent = 0;
var tempTarget = 0;

function updateCurrentTemperature() {
	var tempNewCurrent = parseFloat(get("currentTemperature", "current_temperature"));
	
	if (tempNewCurrent > tempCurrent) {
		$("#temp-current-icon")
			.removeClass("glyphicon-arrow-down glyphicon-minus")
			.addClass("glyphicon-arrow-up")
	} else if (tempNewCurrent < tempCurrent) {
		$("#temp-current-icon")
			.removeClass("glyphicon-arrow-up glyphicon-minus")
			.addClass("glyphicon-arrow-down")
	} else {
		$("#temp-current-icon")
			.removeClass("glyphicon-arrow-up glyphicon-arrow-down")
			.addClass("glyphicon-minus")
	}
	
	tempCurrent = tempNewCurrent;
	$("#temp-current").html(tempNewCurrent);
}

//function to put the target temperature, onClick also a heating indicator will be displayed.
$(document).ready(function () {
	var updateCurrentTempInterval = setInterval(updateCurrentTemperature, 1000);
	
	tempCurrent = parseFloat(get("currentTemperature", "current_temperature"));
	$("#temp-current").html(tempCurrent);
	
	tempTarget = parseFloat(get("targetTemperature", "target_temperature"));
	$("#temp-target").html(tempTarget);
	$("#tempInput").val(tempTarget);
	
	$("#tempInput").focus(function() {
		// disallow selection of the input field
		$("#tempInput").blur();
	});
	
    $('#setTempBtn').click(function () {
        var targetTemp = $("#tempInput").val();
        put("targetTemperature", "target_temperature", targetTemp);
        $("#temp-target").html(targetTemp);
    });
});
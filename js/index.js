// global application variables
var tempCurrent = 0;
var tempTarget = 0;

function updateCurrentTemperature() {
	var tempNewCurrent = get("currentTemperature", "current_temperature");
	
	var changeIcon = "";
	if (tempNewCurrent > tempCurrent) {
		changeIcon = "up";
	}
	if (tempNewCurrent < tempCurrent) {
		changeIcon = "down";
	}
	
	if (changeIcon != "") {
		
	}
	$("#tempInput").val(tempNewCurrent);
	$("#temp-current").html(tempNewCurrent);
}

function initialize() {

}

//function to put the target temperature, onClick also a heating indicator will be displayed.
$(document).ready(function () {
	var updateCurrentTempInterval = setInterval(updateCurrentTemperature, 1000);
	$("#temp-target").html(get("targetTemperature", "target_temperature"));
	
	$("#tempInput").focus(function() {
		// disallow selection of the input field
		$("#tempInput").blur();
	});
	
    $('#setTempBtn').click(function () {
        var targetTemp = $("#tempInput").val();
        put("targetTemperature", "target_temperature", targetTemp);
        $('"#temp-target"').html(targetTemp);
    });
});
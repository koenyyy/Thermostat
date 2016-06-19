// global application variables
var tempCurrent = 0;
var tempTarget = 0;
var manual = false;
var knob; 

function setup() {	
	tempCurrent = parseFloat(get("currentTemperature", "current_temperature"));
	$("#tempCurrentFormatted").html(formatDeg(tempCurrent));
	
	tempTarget = parseFloat(get("targetTemperature", "target_temperature"));
	$("#tempInput").val(tempTarget);
	updateTempInputDisplay(tempTarget);
	
	$("#tempInput").slider({
		formatter: function(value) {
			return (Math.round(value * 10) / 10) + "°C";
		}
	}).on("change", function() {
		var value = $(this).val();
		$("#tempTargetFormatted").html(formatDeg(value));
	});
	
	manual = (get("weekProgramState", "week_program_state") == 'off');
	if (manual) {
		showManual();
	} else {
		showProgram();
	}
	
	$("#buttonManual").click(showManual).focus(showManual);
	$("#buttonProgram").click(showProgram).focus(showProgram);
}

function tick() {
	updateCurrentTemperature();
	updateDateTime();
	// updateTempInputDisplay is called by the spinner
}

$(document).ready(function () {
	setup();
	// set the update function to run every second
	setInterval(tick, 1000);
});

function formatDeg(value) {
	value = Math.round(value * 10) / 10;
	var parts = value.toString().split(".");
	if (parts.length == 1) {
		parts[1] = '0';
	}
	
	return '<strong>' + parts[0] + '</strong><small>.' + parts[1] + '&deg;C</small>';
}

function updateCurrentTemperature() {
	var tempNewCurrent = parseFloat(get("currentTemperature", "current_temperature"));
	
	if (tempNewCurrent > tempCurrent) {
		$("#tempCurrentIcon")
			.removeClass("glyphicon-arrow-down glyphicon-minus")
			.addClass("glyphicon-arrow-up")
	} else if (tempNewCurrent < tempCurrent) {
		$("#tempCurrentIcon")
			.removeClass("glyphicon-arrow-up glyphicon-minus")
			.addClass("glyphicon-arrow-down")
	} else {
		$("#tempCurrentIcon")
			.removeClass("glyphicon-arrow-up glyphicon-arrow-down")
			.addClass("glyphicon-minus")
	}
	
	tempCurrent = tempNewCurrent;
	$("#tempCurrentFormatted").html(formatDeg(tempCurrent));
}

function updateTempInputDisplay(value) {
	$("#tempInputFormatted").html(formatDeg(value));
}

function updateDateTime() {
	var currentDay = get("", "current_day");
	var time = get("", "time");
	$("#dateTime").html(currentDay + ", " + time);
}

function saveTargetTemp() {
	put("targetTemperature", "target_temperature", tempTarget);
}


function showManual() {
	$("#buttonManual").addClass("btn-primary").removeClass("btn-default");
	$("#buttonProgram").removeClass("btn-primary").addClass("btn-default");
	
	//$("tempInput").data("fgColor", "#F44336");
	$(".knob").trigger("configure", {"fgColor": "#F44336"});
	$("#tempInputReadonly").hide();
	
	$("#tempInputTitle").html("Manual:");
}

function showProgram() {
	$("#buttonManual").removeClass("btn-primary").addClass("btn-default");
	$("#buttonProgram").addClass("btn-primary").removeClass("btn-default");
	
	$(".knob").trigger("configure", {"fgColor": "#969696"});
	$("#tempInputReadonly").show();
	
	$("#tempInputTitle").html("Program:");
}

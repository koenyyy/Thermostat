// global application variables
var tempCurrent = 0;
var tempTarget = 0;
var tempNight = 0;
var tempDay = 0;
var manual = false;
var inputSlider;

function setup() {	
	tempCurrent = parseFloat(get("currentTemperature", "current_temperature"));
	$("#tempCurrentFormatted").html(formatDeg(tempCurrent));
	
	tempTarget = parseFloat(get("targetTemperature", "target_temperature"));
	$("#tempTargetFormatted").html(formatDeg(tempTarget));
	inputSlider = $("#tempInput").slider({
		formatter: function(value) {
			return (Math.round(value * 10) / 10) + "°C";
		}
	});
		
	inputSlider.on("change", function() {
			var value = $(this).val();
			$("#tempTargetFormatted").html(formatDeg(value));
		})
		.slider("setValue", tempTarget)
		.on("slideStop", function(state) {
			tempTarget = $("#tempInput").val();
			saveTargetTemp();
		});
		
	tempNight = parseFloat(get("nightTemperature", "night_temperature"));
	tempDay = parseFloat(get("dayTemperature", "day_temperature"));
	$("#tempDayNightInput").slider({})
		.on("change", function(state) {
			tempNight = state.value.newValue[0];
			tempDay = state.value.newValue[1];
			$("#tempNightFormatted").html(formatDeg(tempNight));
			$("#tempDayFormatted").html(formatDeg(tempDay));
		})
		.on("slideStop", function(state) {
			put("nightTemperature", "night_temperature", tempNight);
			put("dayTemperature", "day_temperature", tempDay);
		})
		.slider("setValue", [tempNight, tempDay], false, true);
	
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
	updateTemperatures();
	updateDateTime();
	// updateTempInputDisplay is called by the spinner
}

$(document).ready(function () {
	setup();
	// set the update function to run every second
	setInterval(tick, 3000);
	tick();
});

function formatDeg(value) {
	value = Math.round(value * 10) / 10;
	var parts = value.toString().split(".");
	if (parts.length == 1) {
		parts[1] = '0';
	}
	
	return '<strong>' + parts[0] + '</strong><small>.' + parts[1] + '&deg;C</small>';
}

function updateTemperatures() {
	var tempNewCurrent = parseFloat(get("currentTemperature", "current_temperature"));
	var tempNewTarget = parseFloat(get("targetTemperature", "target_temperature"));
	
	if (tempNewTarget != tempTarget) {
		tempTarget = tempNewTarget;
		inputSlider.slider('setValue', tempTarget, false, true);
	}
	
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
	
	put("weekProgramState", "week_program_state", "off");
	
	$("#tempTargetDetails").html("The target temperature is set to this value until the thermostat is put back in Program mode.");
	
	$("#programControls").hide();
}

function showProgram() {
	$("#buttonManual").removeClass("btn-primary").addClass("btn-default");
	$("#buttonProgram").addClass("btn-primary").removeClass("btn-default");
	
	put("weekProgramState", "week_program_state", "on");
	
	$("#tempTargetDetails").html("The target temperature will follow the week program. You can override it temporarily here until the next switch or midnight.");
	$("#programControls").show();
}

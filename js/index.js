// global application variables
var tempCurrent = 0;
var tempTarget = 0;
var manual = false;
var knob; 

function setup() {
	setupSpinner();
		
	tempCurrent = parseFloat(get("currentTemperature", "current_temperature"));
	$("#tempCurrentFormatted").html(formatDeg(tempCurrent));
	
	tempTarget = parseFloat(get("targetTemperature", "target_temperature"));
	$("#tempInput").val(tempTarget);
	updateTempInputDisplay(tempTarget);
	
	// disallow selection of the input field
	$("#tempInput").focus(function() {
		$("#tempInput").blur();
	}).hide(); // also hide it.
	
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

function setupSpinner() {
	knob = $(".knob").knob({
		change : function (value) {
			updateTempInputDisplay(value);
		},
		release : function (value) {
			tempTarget = value;
			saveTargetTemp();
			console.log("release : " + value);
			
		},
		cancel : function () {
			console.log("cancel : ", this);
		},
		format : function (value) {
			return Math.floor(value) + '.' + Math.floor(value % 1 * 10);
		},
		draw : function () {

			// "tron" case
			if(this.$.data('skin') == 'tron') {

				this.cursorExt = 0.3;

				var a = this.arc(this.cv); // Arc
				var pa; // Previous arc
				var r = 1;

				this.g.lineWidth = this.lineWidth;

				if (this.o.displayPrevious) {
					pa = this.arc(this.v);
					this.g.beginPath();
					this.g.strokeStyle = this.pColor;
					this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
					this.g.stroke();
				}

				this.g.beginPath();
				this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
				this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
				this.g.stroke();

				this.g.lineWidth = 2;
				this.g.beginPath();
				this.g.strokeStyle = this.o.fgColor;
				this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
				this.g.stroke();

				return false;
			}
		}
	});
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

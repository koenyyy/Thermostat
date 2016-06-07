$(document).ready(function () {
    setDefault();
    var weekProgram = getWeekProgram();
    $('#textData').append(weekProgram);
});
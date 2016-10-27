//Selects the canvas element
var canvas = $("canvas");

//Checks for browser support.
if (canvas[0].getContext) {

    $(".controls").toggle();
    $(".colors").toggle();

    //Access the rendering context of the canvas
    var context = canvas[0].getContext("2d");
    //Selected color
    var color = $(".selected").css("background-color");
    //Last mouse event
    var lastEvent;
    //The mouse is up by defult
    var mouseDown = false;

    //Changes the current color when clicking on control list items
    $(".colors").on("click", "li", function () {
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
        color = $(this).css("background-color");
    });

    //Reveals the color picker when "New Color" is pressed
    $("#revealColorSelect").click(function () {
        changeColor();
        $("#colorSelect").toggle();
    });

    //Updates the new color
    function changeColor() {
        var r = $("#red").val();
        var g = $("#green").val();
        var b = $("#blue").val();
        $("#newColor").css("background-color", "rgb(" + r + "," + g + ", " + b + ")");
    }

    //Listens to when sliders change and calls the changeColor method
    $("input[type=range]").change(changeColor);

    //Adds the new color to the list when "Add Color" is pressed
    $("#addNewColor").click(function () {
        var newColor = $("<li></li>");
        newColor.css("background-color", $("#newColor").css("background-color"));
        $(".colors ul").append(newColor);
        newColor.click();
    });

    //Mouse events on the canvas listeners
    canvas.mousedown(function (e) {
        lastEvent = e;
        mouseDown = true;
    }).mousemove(function (e) {
        //Listens to when the mouse moves and draws a line from the point where the mouse first touched the canvas
        if (mouseDown) {
            context.beginPath();
            context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
            context.lineTo(e.offsetX, e.offsetY);
            context.strokeStyle = color;
            context.stroke();
            lastEvent = e;
        }
    }).mouseup(function () {
        mouseDown = false;
    }).mouseleave(function () {
        //If the mouse leaves the canvas, is the same as lifting a pencil
        canvas.mouseup();
    });

    //Clears the context of the canvas when the "Reset" button is clicked
    $("#reset").click(function () {
        context.clearRect(0, 0, canvas[0].width, canvas[0].height);
    });

    //Downloads the content of the canvas
    $("#save").click(function () {
        $("#save")[0].href = canvas[0].toDataURL();
        $("#save")[0].download = "image.png";
    });
}

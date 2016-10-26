var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var canvas = $("canvas")[0];
var context = canvas.getContext("2d");
var lastEvent;
var mouseDown = false;
var $saveImage = $('#saveImage');

//When clicking on control list items
$(".colors").on("click", "li", function () {
    //Deselect sibling elements
    $(this).siblings().removeClass("selected");
    //Select clicked element
    $(this).addClass("selected");
    //Cache current color
    color = $(this).css("background-color");
});

//When "New Color" is pressed
$("#revealColorSelect").click(function () {
    //Show color select or hide the color select
    changeColor();
    $("#colorSelect").toggle();
});

//update the new color span
function changeColor() {
    var r = $("#red").val();
    var g = $("#green").val();
    var b = $("#blue").val();
    $("#newColor").css("background-color", "rgb(" + r + "," + g + ", " + b + ")");
}

//When color sliders change
$("input[type=range]").change(changeColor);

//When "Add Color" is pressed
$("#addNewColor").click(function () {
    //Append the color to the colors ul
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    $(".colors ul").append($newColor);
    //Select the new color
    $newColor.click();
});

//On mouse events on the canvas
$canvas.mousedown(function (e) {
    lastEvent = e;
    mouseDown = true;
}).mousemove(function (e) {
    //Draw lines
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
    $canvas.mouseup();
});

//When reset button is clicked....
$("#reset").click(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

// Saving the canvas into an image
var $snapshots = $('#snapshots');
$saveImage.click(function () {
    // Create a new image
    var image = new Image();
    // Set the image source to the canvas data URL
    image.src = canvas.toDataURL();
    // Append the snapshot to the div
    $snapshots.append(image);
    // Disble the 'save image' button
    $saveImage.prop('disabled', true);
});

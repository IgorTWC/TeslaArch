var correct = document.getElementById("correct");
var incorrect = document.getElementById("incorrect");
function correctAnwser() {
    document.getElementById("display").innerHTML = '<a style="color:#0f0;" href="index.html">Continue onwards </a>';
}
function incorrectAnwser() {
    document.getElementById("display").innerHTML = "Try again.";
}
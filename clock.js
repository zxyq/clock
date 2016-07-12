/**
 * Created by Administrator on 2016/7/11.
 */
var ctx;
function init(id) {
    ctx = canvas.getContext("2d");
    drawRound2();
    drawOutLine();
    drawRound();
    drawkedu();
    settime();
    go();
    gotime();
}

function settime() {
    var date = new Date();
    var y = date.getFullYear();
    var ms = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    ctx.font = "italic 30px sans-serif";
    ctx.strokeText(h + ":" + m + ":" + s, 200, 230);
    ctx.strokeStyle = "rgb(255,0,0)";
    ctx.font = "italic 15px sans-serif";
    ctx.strokeText(y + "/" + ms + "/" + d, 200, 260);
    ctx.strokeStyle = "rgb(255,0,0)";
}
function go() {
    setInterval(function () {
        drawRound();
    }, 1000);
}
function gotime() {
    setInterval(function () {
        settime();
    }, 1000);
}

function drawkedu() {
    var angle = 0, radius = 110;
    for (var i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        //确认刻度的起始点
        var x = 200 + radius * Math.cos(angle), y = 200 + radius * Math.sin(angle);
        ctx.moveTo(x, y);
        //这里是用来将刻度的另一点指向中心点，并给予正确的角度
        //PI是180度，正确的角度就是 angle+180度，正好相反方向
        var temp_angle = Math.PI + angle;
        ctx.lineTo(x + 5 * Math.cos(temp_angle), y + 5 * Math.sin(temp_angle));
        ctx.stroke();
        ctx.closePath();
        angle += 6 / 180 * Math.PI;
    }

    angle = 0, radius = 110;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.lineWidth = 2;
    for (var i = 0; i < 12; i++) {
        var num = i + 3 > 12 ? i + 3 - 12 : i + 3;
        ctx.beginPath();
        ctx.strokeStyle = "#FFD700";
        var x = 200 + radius * Math.cos(angle), y = 200 + radius * Math.sin(angle);
        ctx.moveTo(x, y);
        var temp_angle = Math.PI + angle;
        ctx.lineTo(x + 10 * Math.cos(temp_angle), y + 10 * Math.sin(temp_angle));
        ctx.stroke();
        ctx.closePath();
    }
}

function drawRound2() {
    ctx.strokeStyle = "rgb(100,0,0)";
    ctx.fillStyle = "#EEEEFF";
    ctx.beginPath();
    ctx.arc(200, 200, 110, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function drawOutLine() {

    var dx = 196;
    var dy = 202;
    var r = 100;
    var dig = 2 * Math.PI / 60;
    for (var i = 0; i < 60; i++) {
        var x = Math.sin(i * dig);
        var y = Math.cos(i * dig);
        if (i % 5 == 0) {
            ctx.font = "italic 10px sans-serif";
            ctx.strokeText(i / 5 != 0 ? i / 5 : 12, dx + x * r, dy - y * r);
            ctx.strokeStyle = "rgb(255,0,0)";
        }
    }
}

function drawRound() {
    ctx.fillStyle = "#EEEEFF";
    ctx.beginPath();
    ctx.arc(200, 200, 92, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    var date = new Date();
    var h = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    drawPointer(3, 50, (h * 60 + m) / 720);
    drawPointer(2, 70, (m * 60 + s) / 3600);
    drawPointer(1, 92, s / 60);
}

function drawPointer(width, length, offset) {
    ctx.strokeStyle = "rgb(100,0,0)";
    ctx.lineWidth = width;
    var x = 200 + Math.sin(2 * Math.PI * offset) * length;
    var y = 200 - Math.cos(2 * Math.PI * offset) * length;
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
}
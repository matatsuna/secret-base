const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

document.addEventListener("DOMContentLoaded", (() => {
    var s = Snap("#svg");
    var bigCircle = s.circle(150, 150, 100);
    bigCircle.attr({
        fill: "#bada55",
        stroke: "#000",
        strokeWidth: 5
    });
}));

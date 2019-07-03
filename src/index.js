import Flower from "./Flower";

document.addEventListener("DOMContentLoaded", (() => {
    let flowers = [];
    for (var i = 0; i < 1; i++) {
        flowers.push(new Flower(100, 200));
    }
    console.log(flowers);

    setInterval((() => {
        flowers.forEach((flower) => {
            flower.up();
        });
    }), 50);
}));


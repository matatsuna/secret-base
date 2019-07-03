import Flower from "./Flower";

document.addEventListener("DOMContentLoaded", (() => {
    let flowers = [];
    for (var i = 0; i < 10; i++) {
        flowers.push(new Flower(getRandomInt(-100, 1000), getRandomInt(700, 1000), getRandomInt(3, 8), getRandomInt(1, 8) / 10));
    }
    console.log(flowers);

    setInterval((() => {
        flowers.forEach((flower) => {
            flower.up();
        });
    }), 50);
}));

const getRandomInt = ((min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
});

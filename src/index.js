import Flower from "./Flower";
import "songle-api";

document.addEventListener("DOMContentLoaded", (() => {
    const player = new Songle.Player({
        mediaElement: "#songle"
    });
    player.useMedia("www.nicovideo.jp%2Fwatch%2Fsm15335938", {
        videoSizeW: "100%",
        videoSizeH: "100%"
    });

    document.getElementById("check").addEventListener("change", ((e) => {
        let songleDom = document.getElementById("songle");
        if (e.target.checked) {
            songleDom.style.zIndex = 1;
        } else {
            songleDom.style.zIndex = -1;
        }
    }));

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let flowers = [];

    svg.setAttribute('id', 'svg');
    svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('x', '0px');
    svg.setAttribute('y', '0px');
    svg.setAttribute('width', `${width}px`);
    svg.setAttribute('height', `${height}px`);
    svg.setAttribute('style', [
        `width: ${width}px;`,
        `height: ${height}px;`,
    ].join(' '));
    document.body.appendChild(svg);

    window.addEventListener("resize", (() => {
        width = window.innerWidth;
        height = window.innerHeight;
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('width', `${width}px`);
        svg.setAttribute('height', `${height}px`);
        svg.setAttribute('style', [
            `width: ${width}px;`,
            `height: ${height}px;`,
        ].join(' '));
        flowers.forEach(((flower) => {
            flower.flower.remove();
        }));
        flowers = [];
        createFlowers();
    }));
    let upDownStopFlag = "STOP";

    player.on("play", (ev) => {
        console.log("play", ev);
        upDownStopFlag = "DOWN";
        flowers.forEach((flower) => {
            flower.setDownColor();
        });
    });
    player.on("seek", ((ev) => {
        console.log("seek");
    }));

    player.on("pause", (ev) => {
        console.log("pause");
        upDownStopFlag = "STOP";
    });
    player.on("finish", (ev) => {
        upDownStopFlag = "STOP";
    });
    player.addPlugin(new Songle.Plugin.Chorus({
        revisionId: 1537048
    }));
    player.on("chorusSectionEnter", ((ev) => {
        if ([1, 3, 4].indexOf(ev.data.sectionItem.index) !== -1) {
            upDownStopFlag = "STOP";
        }
    }), {
            offset: -1000
        }
    );
    player.on("chorusSectionEnter", ((ev) => {
        if ([1, 2, 3, 4, 5, 6, 7].indexOf(ev.data.sectionItem.index) !== -1) {
            upDownStopFlag = "UP";
            flowers.forEach((flower) => {
                flower.setUpColor();
            });
        }
    }), {
            offset: 500
        }
    );
    player.on("chorusSectionEnter", ((ev) => {
        if (ev.data.sectionItem.index === 0) {
            upDownStopFlag = "DOWN";
            flowers.forEach((flower) => {
                flower.setDownColor();
            });
        }
    }), {
            offset: 0
        }
    );
    player.on("repeatSectionEnter", ((ev) => {
        if (ev.data.section.index === 2 && ev.data.sectionItem.index > 0) {
            upDownStopFlag = "UP";
            flowers.forEach((flower) => {
                flower.setUpColor();
            });
        }
    }));
    player.on("repeatSectionLeave", ((ev) => {
        if (ev.data.section.index === 2 && ev.data.sectionItem.index <= 2) {
            upDownStopFlag = "DOWN";
            flowers.forEach((flower) => {
                flower.setDownColor();
            });
        }
    }));

    const createFlowers = (() => {
        let miniFlowerSize = 30;
        // 小さいもの100個
        let miniFlowerLength = Math.floor(100 / (1920 * 1200) * (width * height));
        let middleFlowerSize = 90;
        // 中ぐらいもの150個
        let middleFlowerLength = Math.floor(150 / (1920 * 1200) * (width * height));
        let bigFlowerSize = 240;
        // 大きいもの5個
        let bigFlowerLength = 5;
        for (var i = 0; i < miniFlowerLength; i++) {
            let flower = new Flower(
                "#svg",
                getRandomInt(0, width - miniFlowerSize),
                getRandomInt(-miniFlowerSize, height / 3 * 4),
                getRandomInt(3, 5),
                0.1,
                getRandomUpColor(),
                getRandomDownColor()
            );
            flowers.push(flower);
        }

        for (var i = 0; i < middleFlowerLength; i++) {
            let flower = new Flower(
                "#svg",
                getRandomInt(0, width - middleFlowerSize),
                getRandomInt(-middleFlowerSize, height / 3 * 4),
                getRandomInt(2, 7),
                0.3,
                getRandomUpColor(),
                getRandomDownColor()
            );
            flowers.push(flower);
        }
        for (var i = 0; i < bigFlowerLength; i++) {
            let flower = new Flower(
                "#svg",
                getRandomInt(0, width - bigFlowerSize),
                getRandomInt(-bigFlowerSize, height / 3 * 4),
                getRandomInt(4, 8),
                0.8,
                getRandomUpColor(),
                getRandomDownColor()
            );
            flowers.push(flower);
        }

    });
    createFlowers();
    setInterval((() => {
        if (upDownStopFlag == "UP") {
            flowers.forEach((flower) => {
                flower.up();
                if (flower.flowerTranslate.matrix.split().dy < -1 * flower.size) {
                    flower.setTranslate(getRandomInt(0, width - flower.size), getRandomInt(height, height * 4 / 3));
                }
            });
        } else if (upDownStopFlag == "STOP") {

        } else if (upDownStopFlag == "DOWN") {
            flowers.forEach((flower) => {
                flower.down();
                if (flower.flowerTranslate.matrix.split().dy > height + flower.size) {
                    flower.setTranslate(getRandomInt(0, width - flower.size), getRandomInt(-1 * height * 1 / 3, -1 * flower.size));
                }
            });
        }

    }), 1000 / 15);
}));

const getRandomInt = ((min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
});

const getRandomUpColor = (() => {
    const upColors = ["#e55faf", "#fa6366", "#e02f6e", "#f8e4ee", "#f8d2c8"];
    return upColors[Math.floor(Math.random() * upColors.length)];
});

const getRandomDownColor = (() => {
    const downColors = ["#8a8c8c", "#e7e7e7", "#b6b6b6"];
    return downColors[Math.floor(Math.random() * downColors.length)];
});

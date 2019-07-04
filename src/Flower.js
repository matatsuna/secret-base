const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

class Flower {

    constructor(svgDom, x = 0, y = 0, dy = 3, scale = 1, upColor = "#f08080", downColor = "#808080") {
        this.svg = Snap(svgDom);
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.scale = scale;
        this.upColor = upColor;
        this.downColor = downColor;
        this.flower = this.svg.path("M 72.00,167.55 C 67.06, 169.55 53.05, 173.24 48.00, 172.90  48.00, 172.90 40.00, 171.32 40.00, 171.32  40.00, 171.32 34.00, 170.69 34.00, 170.69  29.42, 169.52 28.03, 166.04 23.00, 163.63  17.74, 161.11 11.24, 159.53 7.33, 154.82  3.49, 150.19 7.17, 140.49 7.83, 135.00  9.41, 121.95 18.30, 103.30 30.00, 96.53  37.68, 92.09 52.12, 90.11 61.00, 90.00  71.43, 89.88 70.99, 90.64 80.00, 91.55  81.78, 91.74 84.86, 91.91 85.66, 89.78  86.58, 87.34 82.62, 85.22 81.00, 84.20  72.41, 78.83 70.62, 77.22 64.33, 69.00  62.70, 66.86 59.59, 62.45 58.72, 60.00  54.39, 47.70 64.20, 32.37 69.68, 22.00  72.11, 17.41 75.02, 8.75 80.04, 6.74  84.25, 5.06 94.45, 7.57 99.00, 8.49  106.26, 9.94 117.96, 9.72 123.90, 14.50  128.65, 18.32 131.70, 29.09 133.27, 35.00  133.27, 35.00 138.50, 57.00 138.50, 57.00  139.01, 59.19 140.12, 63.94 142.29, 64.97  145.81, 66.66 152.21, 57.45 154.20, 55.00  161.43, 46.09 175.90, 28.49 188.00, 27.65  188.00, 27.65 229.00, 34.83 229.00, 34.83  232.69, 35.23 240.68, 34.89 242.94, 38.51  244.17, 40.48 243.10, 43.04 242.38, 45.00  242.38, 45.00 237.30, 59.00 237.30, 59.00  235.36, 65.86 234.70, 75.80 231.47, 82.00  225.03, 94.37 206.01, 101.37 193.00, 104.00  193.00, 104.00 193.00, 106.00 193.00, 106.00  200.19, 108.39 201.40, 108.08 208.00, 109.52  211.79, 110.34 230.14, 117.03 233.00, 118.88  235.94, 120.77 239.33, 124.27 241.53, 127.00  250.24, 137.78 248.17, 154.71 248.00, 168.00  247.95, 171.21 247.89, 174.91 245.35, 177.27  245.35, 177.27 232.00, 183.73 232.00, 183.73  222.58, 188.18 213.68, 193.98 203.00, 194.81  186.98, 196.06 169.94, 169.36 157.00, 166.00  157.00, 166.00 158.21, 179.00 158.21, 179.00  158.93, 184.04 159.91, 183.33 160.00, 190.00  160.00, 190.00 160.00, 206.00 160.00, 206.00  159.93, 211.56 158.57, 219.39 155.35, 224.00  148.64, 233.59 133.00, 240.20 122.00, 243.28  118.82, 244.18 114.28, 246.33 111.04, 245.65  106.76, 244.75 102.22, 237.30 98.91, 234.18  98.91, 234.18 90.00, 227.62 90.00, 227.62  83.27, 222.23 76.07, 213.62 74.14, 205.00  72.64, 198.31 76.20, 184.85 79.41, 179.00  83.40, 171.74 88.25, 168.20 90.00, 159.00  83.49, 160.86 78.25, 165.01 72.00, 167.55 Z");
        this.bbox = this.flower.getBBox();
        this.size = this.bbox.width > this.bbox.height ? this.bbox.width : this.bbox.height;
        this.flowerScale = this.svg.g(this.flower);
        this.flowerTranslate = this.svg.g(this.flowerScale);
        this.flowerScale.transform("scale(" + this.scale + "," + this.scale + ")");
        this.flowerTranslate.transform("translate(" + this.x + "," + this.y + ")");
        this.setDownColor();
    }
    setUpColor() {
        this.flower.attr({
            fill: this.upColor,
        });
    }
    setDownColor() {
        this.flower.attr({
            fill: this.downColor,
        });
    }

    setTranslateY(y) {
        this.flowerTranslate.transform("translate(" + this.x + "," + y + ")");
    }

    up() {
        this.flower.attr({
            transform: this.flower.matrix.rotate(-2, this.bbox.cx, this.bbox.cy)
        });
        this.flowerTranslate.attr({
            transform: this.flowerTranslate.matrix.translate(0, this.dy * -1)
        });
    }

    down() {
        this.flower.attr({
            transform: this.flower.matrix.rotate(2, this.bbox.cx, this.bbox.cy)
        });
        this.flowerTranslate.attr({
            transform: this.flowerTranslate.matrix.translate(0, this.dy)
        })
    }

}

export default Flower;

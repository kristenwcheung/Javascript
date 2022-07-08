class Color {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
    }
    innerRGB() {
        const { r, g, b } = this;
        return `${r}, ${g}, ${b}`;
    }
    rgb() {   //will be shown as a prototype's method
        return `rgb(${this.innerRGB()})`;
    }
    rgba(a=1.0) {   //will be shown as a prototype's method
        return `rgba(${this.innerRGB()}, ${a})`;
    }
    hex() {   //will be shown as a prototype's method
        const { r, g, b } = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
}

const c1 = new Color(255, 67, 89, 'tomato');
const white = new Color(255, 255, 255, 'white');``
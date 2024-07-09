import { bresenhamLineChequered } from './utils.js';

//A Line constructor for the Canvas, it can be rotated along 2 axis.
//It must have length and position.
export class BoStaff {
    constructor(length, position, angle = 0, rotationX = 0, color1 = '#000000', color2 = '#FFFFFF') {
        this.length = length;
        this.position = position;
        this.angle = angle;
        this.rotationX = rotationX;
        this.color1 = color1;
        this.color2 = color2;
    }

    draw(ctx) {
        const { x, y } = this.position;
        const halfLength = this.length / 2;
        const adjustedHalfLengthX = halfLength * Math.cos(this.rotationX);
        const x1 = Math.round(x + adjustedHalfLengthX * Math.cos(this.angle));
        const y1 = Math.round(y + halfLength * Math.sin(this.angle));
        const x2 = Math.round(x - adjustedHalfLengthX * Math.cos(this.angle));
        const y2 = Math.round(y - halfLength * Math.sin(this.angle));
        bresenhamLineChequered(ctx, x1, y1, x2, y2, this.color1, this.color2);
    }

    updateAngle(a) {
        this.angle = a;
    }

    updateRotationX(rx) {
        this.rotationX = rx;
    }

    updateLength(l) {
        this.length = l;
    }

    updateColor1(c) {
        this.color1 = c;
    }

    updateColor2(c) {
        this.color2 = c;
    }
}

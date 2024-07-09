import { BoStaff } from './bostaff.js';
import { deg_to_rad } from './utils.js';

let frames = [];
const elements = [];

function drawAllElements() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    elements.forEach(element => element.draw(ctx));
}

function sliderUpdated(e) {
    const rangeId = e.target.id;
    const textInput = document.getElementById(rangeId + '_input');
    textInput.value = e.target.value;
    updateBoStaff();
}

function textInputUpdated(e) {
    const textId = e.target.id;
    const range = document.getElementById(textId.replace('_input', ''));
    range.value = e.target.value;
    updateBoStaff();
}

function scaleSliderUpdated(e) {
    const rangeId = e.target.id;
    const textInput = document.getElementById(rangeId + '_input');
    textInput.value = e.target.value;
    canvas.style.scale = e.target.value;
}

function scaleTextInputUpdated(e) {
    const textId = e.target.id;
    const range = document.getElementById(textId.replace('_input', ''));
    range.value = e.target.value;
    canvas.style.scale = e.target.value;
}

function color1Updated(e) {
    boStaff.updateColor1(e.target.value);
    drawAllElements();
}

function color2Updated(e) {
    boStaff.updateColor2(e.target.value);
    drawAllElements();
}

function equaliseColors() {
    const color1 = document.getElementById('color1').value;
    document.getElementById('color2').value = color1;
    boStaff.updateColor2(color1);
    drawAllElements();
}

function resetColors() {
    document.getElementById('color1').value = '#000000';
    document.getElementById('color2').value = '#FFFFFF';
    boStaff.updateColor1('#000000');
    boStaff.updateColor2('#FFFFFF');
    drawAllElements();
}

function updateBoStaff() {
    const a = parseFloat(document.getElementById('angle').value) * (Math.PI / 180);
    const rx = parseFloat(document.getElementById('rotationX').value) * (Math.PI / 180);
    const l = parseInt(document.getElementById('length').value);
    boStaff.updateAngle(a);
    boStaff.updateRotationX(rx);
    boStaff.updateLength(l);
    drawAllElements();
}

function downloadAsPng() {
    const imageInstance = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'pixel-frame.png';
    link.href = imageInstance;
    link.click();
}

function toggleVertical() {
    canvas.classList.toggle('vertical');
}

// Add Event Listeners

document.getElementById('download-png').addEventListener('click', downloadAsPng);
document.getElementById('rotate-canvas').addEventListener('click', toggleVertical);
document.getElementById('scale').addEventListener('input', scaleSliderUpdated);
document.getElementById('scale_input').addEventListener('input', scaleTextInputUpdated);
document.getElementById('color1').addEventListener('input', color1Updated);
document.getElementById('color2').addEventListener('input', color2Updated);
document.getElementById('equal-colors').addEventListener('click', equaliseColors);
document.getElementById('reset-colors').addEventListener('click', resetColors);
document.querySelectorAll('.line-controls input[type="range"]').forEach((element) => {
    element.addEventListener('input', sliderUpdated);
});
document.querySelectorAll('.line-controls input[type="text"]').forEach((element) => {
    element.addEventListener('input', textInputUpdated);
});


// Begin Main

const canvas = document.getElementById('pixelArtCanvas');
const ctx = canvas.getContext('2d');
const boStaff = new BoStaff(50, { x: 40, y: 30 }, deg_to_rad(45), 0);
elements.push(boStaff);
drawAllElements();

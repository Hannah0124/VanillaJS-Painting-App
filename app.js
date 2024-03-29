const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 500;

// Update the pixel of the canvas
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// Set the default of the context
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 5.0;

let painting = false;
let filling = false;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
	if (painting === true) {
		canvas.classList.add('brush');
	}
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	// When I don't paint..
	if (!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
		// When painting..
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function handleColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(event) {
	const size = event.target.value;
	ctx.lineWidth = size;
}

function handleModeClick() {
	// Paint (brush) mode
	if (filling === true) {
		canvas.classList.add('brush');
		canvas.classList.remove('paintBucket');
		filling = false;
		mode.innerText = 'Fill';
		// Filling mode
	} else {
		canvas.classList.remove('brush');
		canvas.classList.add('paintBucket');
		filling = true;
		mode.innerText = 'Paint';
	}
}

function handleCanvasClick() {
	if (filling) {
		canvas.classList.add('paintBucket');
		canvas.classList.remove('brush');
		ctx.fillRect(0, 0, canvas.width, canvas.height); // .fillRect(x, y, width, height)
	}
}

// Handle Context Menu
function handleCM(event) {
	event.preventDefault();
}

function handleSaveClick() {
	const image = canvas.toDataURL();
	const link = document.createElement('a');
	link.href = image;
	link.download = 'PaintJS[🎨]';
	link.click();
}

if (canvas) {
	canvas.addEventListener('mousemove', onMouseMove);
	// Mouse click
	canvas.addEventListener('mousedown', startPainting);
	// Mouse unclick
	canvas.addEventListener('mouseup', stopPainting);
	canvas.addEventListener('mouseleave', stopPainting);
	canvas.addEventListener('click', handleCanvasClick);
	canvas.addEventListener('contextmenu', handleCM); // Mouse right click
}

Array.from(colors).forEach((color) => color.addEventListener('click', handleColorClick));

if (range) {
	range.addEventListener('input', handleRangeChange);
}

if (mode) {
	mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
	saveBtn.addEventListener('click', handleSaveClick);
}

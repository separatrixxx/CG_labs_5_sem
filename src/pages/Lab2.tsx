import { useState } from "react";


export default function Lab2() {
	document.title = 'Lab2';
	const [size, setSize] = useState<number>(window.innerHeight - 150 < window.innerWidth
		? window.innerHeight - 150
		: window.innerWidth);

	window.addEventListener('resize', function () {
		window.innerHeight - 150 < window.innerWidth
			? setSize(window.innerHeight - 150)
			: setSize(window.innerWidth);
		setDraw(rotate1, rotate2, rotate3);
	});

	const [rotate1, setRotate1] = useState<number>(0);
	const [rotate2, setRotate2] = useState<number>(0);
	const [rotate3, setRotate3] = useState<number>(0);

	return (
		<div className='lab1'>
			<div className='inputsDiv'>
				<input id='input1' className='input' placeholder='Введите a' />
				<input id='input2' className='input' placeholder='Введите b' />
				<input id='input3' className='input' placeholder='Введите c' />
				<input id='input4' className='input' placeholder='Введите d' />
				<input id='input5' className='input' placeholder='Введите h' />
			</div>
			<h3>Масштабирование</h3>
			<input id='range1' type="range" min="1" max="100" />
			<h3>Поворот X</h3>
			<input id='range2' type="range" min="0" max="6.28319" step="0.0174533" value={rotate1} onChange={(e) => setRotate1(+e.target.value)} />
			<h3>Поворот Y</h3>
			<input id='range3' type="range" min="0" max="6.28319" step="0.0174533" value={rotate2} onChange={(e) => setRotate2(+e.target.value)} />
			<h3>Поворот Z</h3>
			<input id='range4' type="range" min="0" max="6.28319" step="0.0174533" value={rotate3} onChange={(e) => setRotate3(+e.target.value)} />
			<button className='btn' onClick={() => setDraw(rotate1, rotate2, rotate3)}>Построить фигуру</button>
			<canvas id="lab2Canvas" width={size} height={size} />
		</div>
	);
}

let ctx: any;

function setDraw(rotate1: number, rotate2: number, rotate3: number) {
	const a: number = +(document.getElementById('input1') as HTMLInputElement).value;
	const b: number = +(document.getElementById('input2') as HTMLInputElement).value;
	const c: number = +(document.getElementById('input3') as HTMLInputElement).value;
	const d: number = +(document.getElementById('input4') as HTMLInputElement).value;
	const h: number = +(document.getElementById('input5') as HTMLInputElement).value;

	if (a && b && c && d && h) {
		draw(a, b, c, d, h, rotate1, rotate2, rotate3);
	}
}

function draw(a: number, b: number, c: number, d: number, h: number, rotate1: number, rotate2: number, rotate3: number): any {
	const canvas: any = document.getElementById("lab2Canvas");

	if (canvas?.getContext) {
		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const step1 = 50;
		const step2 = c * step1 / a;

		const startWidthNG = (canvas.width - a - Math.sqrt(b ** 2 - step1 ** 2)) / 2;
		const startHeightNG = (canvas.height + h + step2) / 2;

		const startWidthVG = startWidthNG + (a - c) / 2;
		const startHeightVG = startHeightNG - h;


		ctx.beginPath();
		//Нижняя грань
		ctx.moveTo(startWidthNG, startHeightNG);
		ctx.lineTo(startWidthNG + a, startHeightNG);
		ctx.lineTo(startWidthNG + a + Math.sqrt(b ** 2 - step1 ** 2), startHeightNG - step1);
		ctx.lineTo(startWidthNG + Math.sqrt(b ** 2 - step1 ** 2), startHeightNG - step1);
		ctx.closePath();

		//Верхняя грань
		ctx.moveTo(startWidthVG, startHeightVG);
		ctx.lineTo(startWidthVG + c, startHeightVG);
		ctx.lineTo(startWidthVG + c + Math.sqrt(d ** 2 - step2 ** 2), startHeightVG - step2);
		ctx.lineTo(startWidthVG + Math.sqrt(d ** 2 - step2 ** 2), startHeightVG - step2);
		ctx.closePath();

		//Ребро 1
		ctx.moveTo(startWidthNG, startHeightNG);
		ctx.lineTo(startWidthVG, startHeightVG);
		ctx.closePath();

		//Ребро 2
		ctx.moveTo(startWidthNG + a, startHeightNG);
		ctx.lineTo(startWidthVG + c, startHeightVG);
		ctx.closePath();

		//Ребро 3
		ctx.moveTo(startWidthNG + a + Math.sqrt(b ** 2 - step1 ** 2), startHeightNG - step1);
		ctx.lineTo(startWidthVG + c + Math.sqrt(d ** 2 - step2 ** 2), startHeightVG - step2);
		ctx.closePath();

		//Ребро 4
		ctx.moveTo(startWidthNG + Math.sqrt(b ** 2 - step1 ** 2), startHeightNG - step1);
		ctx.lineTo(startWidthVG + Math.sqrt(d ** 2 - step2 ** 2), startHeightVG - step2);
		ctx.closePath();


		ctx.strokeStyle = 'red';
		ctx.lineWidth = 2;
		ctx.stroke();
	}
}
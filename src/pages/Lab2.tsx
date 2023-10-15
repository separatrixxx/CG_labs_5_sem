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

		const v1 = [startWidthNG, startHeightNG];
		const v2 = [startWidthNG + a, startHeightNG];
		const v3 = [startWidthNG + a, startHeightNG];
		const v4 = [startWidthNG, startHeightNG];

		let newV1 = [v1[0] * Math.cos(rotate2) + v1[1] * Math.sin(rotate2), -v1[0] * Math.sin(rotate2) + v1[1] * Math.cos(rotate2)];
		let newV2 = [v2[0] * Math.cos(rotate2) + v2[1] * Math.sin(rotate2), -v2[0] * Math.sin(rotate2) + v2[1] * Math.cos(rotate2)];
		let newV3 = [v3[0] * Math.cos(rotate2) + v3[1] * Math.sin(rotate2), -v3[0] * Math.sin(rotate2) + v3[1] * Math.cos(rotate2)];
		let newV4 = [v4[0] * Math.cos(rotate2) + v4[1] * Math.sin(rotate2), -v4[0] * Math.sin(rotate2) + v4[1] * Math.cos(rotate2)];


		ctx.beginPath();
		//Нижняя грань
		ctx.moveTo(newV1[0], newV1[1]);
		ctx.lineTo(newV2[0], newV2[1]);
		// ctx.lineTo(newV3[0], newV3[1]);
		// ctx.lineTo(newV4[0], newV4[1]);
		ctx.closePath();

		// //Верхняя грань
		// ctx.moveTo((canvas.width - a) / 2 + (a - c) / 2, canvas.height / 2 - b - h);
		// ctx.lineTo((canvas.width - a) / 2 + (a + c) / 2, canvas.height / 2 - b - h);
		// ctx.lineTo((canvas.width - a) / 2 + (a + c) / 2 + Math.sqrt(d ** 2 - step2 ** 2), canvas.height / 2 - b - h - step2);
		// ctx.lineTo((canvas.width - a) / 2 + (a - c) / 2 + Math.sqrt(d ** 2 - step2 ** 2), canvas.height / 2 - b - h - step2);
		// ctx.closePath();

		// //Ребро 1
		// ctx.moveTo((canvas.width - a) / 2, canvas.height / 2 - b);
		// ctx.lineTo((canvas.width - a) / 2 + (a - c) / 2, canvas.height / 2 - b - h);
		// ctx.closePath();

		// //Ребро 2
		// ctx.moveTo((canvas.width + a) / 2, canvas.height / 2 - b);
		// ctx.lineTo((canvas.width - a) / 2 + (a + c) / 2, canvas.height / 2 - b - h);
		// ctx.closePath();

		// //Ребро 3
		// ctx.moveTo((canvas.width + a) / 2 + Math.sqrt(b ** 2 - step1 ** 2), canvas.height / 2 - b - step1);
		// ctx.lineTo((canvas.width - a) / 2 + (a + c) / 2 + Math.sqrt(d ** 2 - step2 ** 2), canvas.height / 2 - b - h - step2);
		// ctx.closePath();

		// //Ребро 4
		// ctx.moveTo((canvas.width - a) / 2 + Math.sqrt(b ** 2 - step1 ** 2), canvas.height / 2 - b - step1);
		// ctx.lineTo((canvas.width - a) / 2 + (a - c) / 2 + Math.sqrt(d ** 2 - step2 ** 2), canvas.height / 2 - b - h - step2);
		// ctx.closePath();


		ctx.strokeStyle = 'red';
		ctx.lineWidth = 2;
		ctx.stroke();
	}
}
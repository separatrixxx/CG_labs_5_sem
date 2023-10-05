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
		setDraw();
	});

	return (
		<div className='lab1'>
			<input id='input1' className='input' placeholder='Введите a' />
			<input id='input2' className='input' placeholder='Введите b' />
			<input id='input3' className='input' placeholder='Введите c' />
			<input id='input4' className='input' placeholder='Введите d' />
			<button className='btn' onClick={setDraw}>Построить фигуру</button>
			<canvas id="lab2Canvas" width={size} height={size} />
		</div>
	);
}

let ctx: any;

function setDraw() {
	const a: number = +(document.getElementById('input1') as HTMLInputElement).value;
	const b: number = +(document.getElementById('input2') as HTMLInputElement).value;
	const c: number = +(document.getElementById('input3') as HTMLInputElement).value;
	const d: number = +(document.getElementById('input4') as HTMLInputElement).value;

	if (a && b && c && d) {
		draw(a, b, c, d);
	}
}

function draw(a: number, b: number, c: number, d: number): any {
	const canvas: any = document.getElementById("lab2Canvas");

	if (canvas?.getContext) {
		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.beginPath();
		ctx.moveTo(canvas.width / 2, 0);
		ctx.lineTo(canvas.width / 2, canvas.width);
		ctx.moveTo(canvas.width / 2 - 10, 10);
		ctx.lineTo(canvas.width / 2, 0);
		ctx.moveTo(canvas.width / 2, 0);
		ctx.lineTo(canvas.width / 2 + 10, 10);
		ctx.closePath();
	}
}
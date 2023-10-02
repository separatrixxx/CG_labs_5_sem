import { useState } from 'react';


export default function Lab1() {
	document.title = 'Lab1';
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
			<input id='input' className='input' placeholder='Введите a' />
			<button className='btn' onClick={setDraw}>Построить график</button>
			<canvas id="lab1Canvas" width={size} height={size} />
		</div>
	);
}

let ctx: any;

function setDraw() {
	const a: number = +(document.getElementById('input') as HTMLInputElement).value;

	if (a) {
		draw(a);
	}
}

function draw(a: number): any {
	const canvas: any = document.getElementById("lab1Canvas");

	if (canvas?.getContext) {
		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		let step = canvas.width / (20 * Math.ceil(a / 10));

		//Координатная сетка
		//Вертикальные
		for (let i = step; i < canvas.width; i += step) {
			ctx.beginPath();
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 0.1;
			ctx.moveTo(i, 0);
			ctx.lineTo(i, canvas.height);
			ctx.closePath();
			ctx.stroke();
		}

		//Горизонтальные
		for (let i = step; i < canvas.height; i += step) {
			ctx.beginPath();
			ctx.moveTo(0, i);
			ctx.lineTo(canvas.width, i);
			ctx.closePath();
			ctx.stroke();
		}

		ctx.font = `bold sans-serif`;

		//Ось Y
		ctx.beginPath();
		ctx.moveTo(canvas.width / 2, 0);
		ctx.lineTo(canvas.width / 2, canvas.width);
		ctx.moveTo(canvas.width / 2 - 10, 10);
		ctx.lineTo(canvas.width / 2, 0);
		ctx.moveTo(canvas.width / 2, 0);
		ctx.lineTo(canvas.width / 2 + 10, 10);
		ctx.closePath();
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 2;
		ctx.stroke();

		let numY = -Math.floor((canvas.height - 20) / step / 2);

		for (let i = step; i < canvas.height - 20; i += step) {
			ctx.beginPath();
			ctx.moveTo(canvas.width / 2 - 5, i);
			ctx.lineTo(canvas.width / 2 + 5, i);
			ctx.closePath();
			ctx.stroke();
			ctx.fillStyle = "green";

			if (numY !== 0) {
				ctx.fillText(numY, i - 5, canvas.height / 2 - 10);
			}

			numY += 1;
		}

		//Ось X
		ctx.beginPath();
		ctx.moveTo(0, canvas.width / 2);
		ctx.lineTo(canvas.width, canvas.width / 2);
		ctx.moveTo(canvas.width - 10, canvas.width / 2 - 10);
		ctx.lineTo(canvas.width, canvas.width / 2);
		ctx.moveTo(canvas.width, canvas.width / 2);
		ctx.lineTo(canvas.width - 10, canvas.width / 2 + 10);
		ctx.closePath();
		ctx.strokeStyle = 'green';
		ctx.stroke();

		let numX = Math.floor((canvas.height - 20) / step / 2);

		for (let i = step; i < canvas.height - 20; i += step) {
			ctx.beginPath();
			ctx.moveTo(i, canvas.width / 2 - 5);
			ctx.lineTo(i, canvas.width / 2 + 5);
			ctx.closePath();
			ctx.stroke();
			ctx.fillStyle = "red";

			if (numX !== 0) {
				ctx.fillText(numX, canvas.height / 2 + 10, i);
			}

			numX -= 1;
		}

		ctx.fillStyle = "black";
		ctx.fillText(0, canvas.width / 2 + 5, canvas.height / 2 - 5);

		ctx.fillStyle = "green";
		ctx.fillText('X', canvas.width - 10, canvas.height / 2 - 20);

		ctx.fillStyle = "red";
		ctx.fillText('Y', canvas.width / 2 + 20, 10);

		//Начало координат
		ctx.beginPath();
		ctx.arc(canvas.width / 2, canvas.width / 2, 3, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();

		let y: any = (x: number) => Math.pow(a ** (2 / 3) - x ** (2 / 3), 3 / 2);
		let scale = step;

		let pts = [];
		for (let x = -canvas.width / 2; x < canvas.width / 2; x += 1) {
			pts.push([canvas.width / 2 + x, canvas.height / 2 - y(x / scale) * scale]);
		}
		polyline('blue', pts);
		pts = [];
		for (let x = -canvas.width / 2; x < canvas.width / 2; x += 1) {
			pts.push([canvas.width / 2 + x, canvas.height / 2 + y(x / scale) * scale]);
		}
		polyline('blue', pts);
		pts = [];
		for (let x = -canvas.width / 2; x < canvas.width / 2; x += 1) {
			pts.push([canvas.width / 2 - x, canvas.height / 2 - y(x / scale) * scale]);
		}
		polyline('blue', pts);
		pts = [];
		for (let x = -canvas.width / 2; x < canvas.width / 2; x += 1) {
			pts.push([canvas.width / 2 - x, canvas.height / 2 + y(x / scale) * scale]);
		}
		polyline('blue', pts);
	}
}

function polyline(color: any, pts: any): any {
	ctx.strokeStyle = color;
	ctx.beginPath();
	pts.forEach((p: any, i: any) => i ? ctx.lineTo(...p) : ctx.moveTo(...p));
	ctx.stroke();
}
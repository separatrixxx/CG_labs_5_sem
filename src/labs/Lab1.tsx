import LabBlock from '../components/LabBlock';


export default function Lab1() {
	return (
		<div className='lab1'>
			<LabBlock h1='Lab 1' h2='variant: x^(2/3) + y^(2/3) = a^(2/3)' />
			<canvas id="lab1Canvas" width="400" height="400" />
			<input id='input' className='input' placeholder='Введите a' />
			<button className='btn' onClick={() => {
				const a: number = +(document.getElementById('input') as HTMLInputElement).value;

				if (a) {
					draw(a);
				}
			}}>Построить график</button>
		</div>
	);
}

let ctx: any;

function draw(a: number): any {
	const canvas: any = document.getElementById("lab1Canvas");

	if (canvas?.getContext) {
		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		let step = 20;

		//координатная сетка
		for (let i = step; i < canvas.width; i += step) {//вертикальные
			ctx.beginPath();
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 0.1;
			ctx.moveTo(i, 0);
			ctx.lineTo(i, canvas.height);
			ctx.closePath();
			ctx.stroke();
		}

		for (let i = step; i < canvas.height; i += step) {//Горизонтальные
			ctx.beginPath();
			ctx.moveTo(0, i);
			ctx.lineTo(canvas.width, i);
			ctx.closePath();
			ctx.stroke();
		}

		//ось X
		ctx.beginPath();
		ctx.moveTo(200, 0);
		ctx.lineTo(200, 400);
		ctx.moveTo(190, 10);
		ctx.lineTo(200, 0);
		ctx.moveTo(200, 0);
		ctx.lineTo(210, 10);
		ctx.moveTo(195, 180);
		ctx.lineTo(205, 180);
		ctx.closePath();
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 2;
		ctx.stroke();

		//ось Y
		ctx.beginPath();
		ctx.moveTo(0, 200);
		ctx.lineTo(400, 200);
		ctx.moveTo(390, 190);
		ctx.lineTo(400, 200);
		ctx.moveTo(400, 200);
		ctx.lineTo(390, 210);
		ctx.moveTo(220, 195);
		ctx.lineTo(220, 205);
		ctx.closePath();
		ctx.strokeStyle = 'green';
		ctx.stroke();

		//начало координат
		ctx.beginPath();
		ctx.arc(200, 200, 3, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();

		let y: any = (x: number) => Math.pow(a ** (2 / 3) - x ** (2 / 3), 3 / 2);
		let scale = 20;

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
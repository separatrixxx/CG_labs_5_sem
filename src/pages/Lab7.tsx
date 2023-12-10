import { useState } from "react";


interface Coord {
	x: number,
	y: number,
}

export default function Lab7() {
	document.title = 'Lab7';
	const [size, setSize] = useState<number>(window.innerHeight < window.innerWidth
		? window.innerHeight
		: window.innerWidth);

	window.addEventListener('resize', function () {
		window.innerHeight - 150 < window.innerWidth
			? setSize(window.innerHeight - 150)
			: setSize(window.innerWidth);
	});

	const [isFlag, setIsFlag] = useState<boolean>(false);

	return (
		<div className='lab2'>
			<div className='optionsLab2'>
				<div className='inputsDiv'>
					<input id='max' className='input' placeholder='Введите max' />
					<input id='step' className='input' placeholder='Введите step' />
					<div className='checkboxDiv'>
						<label>Показать скрытые линии</label>
						<input type="checkbox" id="flag" checked={isFlag} onChange={() => setIsFlag(!isFlag)} />
					</div>
				</div>
				<button className='btn' onClick={setDraw}>Построить</button>
			</div>
			<canvas id="labCanvas" width={size} height={size} />
		</div>
	);
}

let ctx: any;

function setDraw() {
	const max: number = +(document.getElementById('max') as HTMLInputElement).value;
	const step: number = +(document.getElementById('step') as HTMLInputElement).value;
	const flag: boolean = (document.getElementById('flag') as HTMLInputElement).checked;

	if (max && step) {
		draw(max, step, flag);
	}
}

function draw(max: number, step: number, flag: boolean): any {
	const canvas: any = document.getElementById("labCanvas");

	if (canvas?.getContext) {
		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		let coords: Coord[] = [];
	
		canvas.addEventListener('mouseup', function (e: any) {
			let x: any = e.pageX - e.target.offsetLeft;
			let y: any = e.pageY - e.target.offsetTop;
		
			if (coords.length == 0) {
				coords.push(
					{
						x: x,
						y: y,
					}
				);

				ctx.beginPath();
				ctx.arc(coords[0].x, coords[0].y, 5, 0, Math.PI * 2);
				ctx.strokeStyle = 'orange';
				ctx.lineWidth = 1;
				ctx.stroke();
			} else if (coords.length === 1) {
				coords.push(
					{
						x: x,
						y: y,
					}
				);

				ctx.beginPath();
				ctx.arc(coords[1].x, coords[1].y, 5, 0, Math.PI * 2);
				ctx.stroke();
			} else if (coords.length === 2) {
				coords.push(
					{
						x: x,
						y: y,
					}
				);

				//Пункт 1
				ctx.beginPath();
				ctx.arc(coords[2].x, coords[2].y, 5, 0, Math.PI * 2);
				ctx.stroke();

				//Пункт 2
				if (flag) {
					ctx.beginPath();
					ctx.moveTo(coords[0].x, coords[0].y);
					ctx.lineTo(coords[1].x, coords[1].y);
					ctx.closePath();
					ctx.strokeStyle = 'brown';
					ctx.stroke();
	
					ctx.beginPath();
					ctx.moveTo(coords[1].x, coords[1].y);
					ctx.lineTo(coords[2].x, coords[2].y);
					ctx.closePath();
					ctx.strokeStyle = 'brown';
					ctx.stroke();
				}

				//Пункт 3
				for (let i = 0; i <= max; i += step) {
					let t = 1 / max;

					let a = max - i;
					let b = i;

					let coordsM1 = {
						x: (coords[0].x * a + coords[1].x * b) * t,
						y: (coords[0].y * a + coords[1].y * b) * t,
					};

					let coordsM2 = {
						x: (coords[1].x * a + coords[2].x * b) * t,
						y: (coords[1].y * a + coords[2].y * b) * t,
					};

					if (flag) {
						ctx.beginPath();
						ctx.arc(coordsM1.x, coordsM1.y, 5, 0, Math.PI * 2);
						ctx.strokeStyle = 'green';
						ctx.stroke();

						ctx.beginPath();
						ctx.arc(coordsM2.x, coordsM2.y, 5, 0, Math.PI * 2);
						ctx.stroke();

						ctx.beginPath();
						ctx.moveTo(coordsM1.x, coordsM1.y);
						ctx.lineTo(coordsM2.x, coordsM2.y);
						ctx.closePath();
						ctx.strokeStyle = 'blue';
						ctx.stroke();
					}

					let coordsT = {
						x: (coordsM1.x * a + coordsM2.x * b) * t,
						y: (coordsM1.y * a + coordsM2.y * b) * t,
					}

					ctx.beginPath();
					ctx.arc(coordsT.x, coordsT.y, 2, 0, Math.PI * 2);
					ctx.fillStyle = 'red';
					ctx.fill();
				}
			} else {
				coords.splice(0, coords.length);
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		});
	}
}

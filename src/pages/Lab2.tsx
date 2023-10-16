import { useState } from "react";


interface Vertex {
	x: number,
	y: number,
	z: number,
}

export default function Lab2() {
	document.title = 'Lab2';
	const [size, setSize] = useState<number>(window.innerHeight < window.innerWidth
		? window.innerHeight
		: window.innerWidth);

	window.addEventListener('resize', function () {
		window.innerHeight - 150 < window.innerWidth
			? setSize(window.innerHeight - 150)
			: setSize(window.innerWidth);
		setDraw(scale, rotate1, rotate2, rotate3);
	});

	const [scale, setScale] = useState<number>(1);
	const [rotate1, setRotate1] = useState<number>(0);
	const [rotate2, setRotate2] = useState<number>(0);
	const [rotate3, setRotate3] = useState<number>(0);

	return (
		<div className='lab2'>
			<div className='optionsLab2'>
				<div className='inputsDiv'>
					<input id='input1' className='input' placeholder='Введите a' />
					<input id='input2' className='input' placeholder='Введите b' />
					<input id='input3' className='input' placeholder='Введите c' />
					<input id='input4' className='input' placeholder='Введите d' />
					<input id='input5' className='input' placeholder='Введите h' />
				</div>
				<h3>Масштабирование</h3>
				<input id='range1' type="range" min="1" max="10" step="0.1" value={scale}
					onChange={(e) => {
						setScale(+e.target.value);
						setDraw(scale, rotate1, rotate2, rotate3);
					}} />
				<h3>Поворот X</h3>
				<input id='range2' type="range" min="0" max="6.28319" step="0.0174533" value={rotate1}
					onChange={(e) => {
						setRotate1(+e.target.value);
						setDraw(scale, rotate1, rotate2, rotate3);
					}} />
				<h3>Поворот Y</h3>
				<input id='range3' type="range" min="0" max="6.28319" step="0.0174533" value={rotate2}
					onChange={(e) => {
						setRotate2(+e.target.value);
						setDraw(scale, rotate1, rotate2, rotate3);
					}} />
				<h3>Поворот Z</h3>
				<input id='range4' type="range" min="0" max="6.28319" step="0.0174533" value={rotate3}
					onChange={(e) => {
						setRotate3(+e.target.value);
						setDraw(scale, rotate1, rotate2, rotate3);
					}} />
				<button className='btn' onClick={() => setDraw(scale, rotate1, rotate2, rotate3)}>Построить фигуру</button>
			</div>
			<canvas id="lab2Canvas" width={size} height={size} />
		</div>
	);
}

let ctx: any;

function setDraw(scale: number, rotate1: number, rotate2: number, rotate3: number) {
	let a: number = +(document.getElementById('input1') as HTMLInputElement).value;
	let b: number = +(document.getElementById('input2') as HTMLInputElement).value;
	let c: number = +(document.getElementById('input3') as HTMLInputElement).value;
	let d: number = +(document.getElementById('input4') as HTMLInputElement).value;
	let h: number = +(document.getElementById('input5') as HTMLInputElement).value;

	a *= scale;
	b *= scale;
	c *= scale;
	d *= scale;
	h *= scale;

	if (a && b && c && d && h) {
		draw(a, b, c, d, h, rotate1, rotate2, rotate3);
	}
}

function rotateX(rotate1: number, vertices: Vertex[]): Vertex[] {
	const rotMatrix = [[1, 0, 0],
		[0, Math.cos(rotate1), -Math.sin(rotate1)],
		[0, Math.sin(rotate1), Math.cos(rotate1)]];

	let newVertices: Vertex[] = [];

	for (let i of vertices) {
		const newV: Vertex = {
			x: i.x * rotMatrix[0][0] + i.y * rotMatrix[0][1] + i.z * rotMatrix[0][2],
			y: i.x * rotMatrix[1][0] + i.y * rotMatrix[1][1] + i.z * rotMatrix[1][2],
			z: i.x * rotMatrix[2][0] + i.y * rotMatrix[2][1] + i.z * rotMatrix[2][2],
		}

		newVertices.push(newV);
	}

	return newVertices;
};

function rotateY(rotate2: number, vertices: Vertex[]): Vertex[] {
	const rotMatrix = [[Math.cos(rotate2), 0, Math.sin(rotate2)],
		[0, 1, 0],
		[-Math.sin(rotate2), 0, Math.cos(rotate2)]];

	let newVertices: Vertex[] = [];

	for (let i of vertices) {
		const newV: Vertex = {
			x: i.x * rotMatrix[0][0] + i.y * rotMatrix[0][1] + i.z * rotMatrix[0][2],
			y: i.x * rotMatrix[1][0] + i.y * rotMatrix[1][1] + i.z * rotMatrix[1][2],
			z: i.x * rotMatrix[2][0] + i.y * rotMatrix[2][1] + i.z * rotMatrix[2][2],
		}

		newVertices.push(newV);
	}

	return newVertices;
};

function rotateZ(rotate3: number, vertices: Vertex[]): Vertex[] {
	const rotMatrix = [[Math.cos(rotate3), -Math.sin(rotate3), 0],
		[Math.sin(rotate3), Math.cos(rotate3), 0],
		[0, 0, 1]];

	let newVertices: Vertex[] = [];

	for (let i of vertices) {
		const newV: Vertex = {
			x: i.x * rotMatrix[0][0] + i.y * rotMatrix[0][1] + i.z * rotMatrix[0][2],
			y: i.x * rotMatrix[1][0] + i.y * rotMatrix[1][1] + i.z * rotMatrix[1][2],
			z: i.x * rotMatrix[2][0] + i.y * rotMatrix[2][1] + i.z * rotMatrix[2][2],
		}

		newVertices.push(newV);
	}

	return newVertices;
};

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

		let v1: Vertex = {
			x: startWidthNG,
			y: startHeightNG,
			z: 0,
		};

		let v2: Vertex = {
			x: startWidthNG + a,
			y: startHeightNG,
			z: 0,
		};

		let v3: Vertex = {
			x: startWidthNG + a + Math.sqrt(b ** 2 - step1 ** 2),
			y: startHeightNG - step1,
			z: 0,
		};

		let v4: Vertex = {
			x: startWidthNG + Math.sqrt(b ** 2 - step1 ** 2),
			y: startHeightNG - step1,
			z: 0,
		};

		let v5: Vertex = {
			x: startWidthVG,
			y: startHeightVG,
			z: 0,
		};

		let v6: Vertex = {
			x: startWidthVG + c,
			y: startHeightVG,
			z: 0,
		};

		let v7: Vertex = {
			x: startWidthVG + c + Math.sqrt(d ** 2 - step2 ** 2),
			y: startHeightVG - step2,
			z: 0,
		};

		let v8: Vertex = {
			x: startWidthVG + Math.sqrt(d ** 2 - step2 ** 2),
			y: startHeightVG - step2,
			z: 0,
		};

		let vertices: Vertex[] = [v1, v2, v3, v4, v5, v6, v7, v8];

		vertices = rotateX(rotate1, vertices);
		vertices = rotateY(rotate2, vertices);
		vertices = rotateZ(rotate3, vertices);

		//Нижняя грань
		ctx.beginPath();
		ctx.moveTo(vertices[0].x, vertices[0].y);
		ctx.lineTo(vertices[1].x, vertices[1].y);
		ctx.lineTo(vertices[2].x, vertices[2].y);
		ctx.lineTo(vertices[3].x, vertices[3].y);
		ctx.fill();
		ctx.closePath();
		ctx.fillStyle = 'red';
		ctx.fill();

		//Грань 3
		ctx.beginPath();
		ctx.moveTo(vertices[2].x, vertices[2].y);
		ctx.lineTo(vertices[3].x, vertices[3].y);
		ctx.lineTo(vertices[7].x, vertices[7].y);
		ctx.lineTo(vertices[6].x, vertices[6].y);
		ctx.closePath();
		ctx.fillStyle = 'orange';
		ctx.fill();

		//Грань 4
		ctx.beginPath();
		ctx.moveTo(vertices[0].x, vertices[0].y);
		ctx.lineTo(vertices[3].x, vertices[3].y);
		ctx.lineTo(vertices[7].x, vertices[7].y);
		ctx.lineTo(vertices[4].x, vertices[4].y);
		ctx.closePath();
		ctx.fillStyle = 'deeppink';
		ctx.fill();

		//Верхняя грань
		ctx.beginPath();
		ctx.moveTo(vertices[4].x, vertices[4].y);
		ctx.lineTo(vertices[5].x, vertices[5].y);
		ctx.lineTo(vertices[6].x, vertices[6].y);
		ctx.lineTo(vertices[7].x, vertices[7].y);
		ctx.closePath();
		ctx.fillStyle = 'green';
		ctx.fill();

		//Грань 1
		ctx.beginPath();
		ctx.moveTo(vertices[0].x, vertices[0].y);
		ctx.lineTo(vertices[1].x, vertices[1].y);
		ctx.lineTo(vertices[5].x, vertices[5].y);
		ctx.lineTo(vertices[4].x, vertices[4].y);
		ctx.closePath();
		ctx.fillStyle = 'blue';
		ctx.fill();

		//Грань 2
		ctx.beginPath();
		ctx.moveTo(vertices[1].x, vertices[1].y);
		ctx.lineTo(vertices[2].x, vertices[2].y);
		ctx.lineTo(vertices[6].x, vertices[6].y);
		ctx.lineTo(vertices[5].x, vertices[5].y);
		ctx.closePath();
		ctx.fillStyle = 'purple';
		ctx.fill();
	}
}
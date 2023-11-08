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
				<input id='range2' type="range" min="0" max="10" step="0.001" value={rotate1}
					onChange={(e) => {
						setRotate1(+e.target.value);
						setDraw(scale, rotate1, rotate2, rotate3);
					}} />
				<h3>Поворот Y</h3>
				<input id='range3' type="range" min="0" max="10" step="0.001" value={rotate2}
					onChange={(e) => {
						setRotate2(+e.target.value);
						setDraw(scale, rotate1, rotate2, rotate3);
					}} />
				<h3>Поворот Z</h3>
				<input id='range4' type="range" min="0" max="10" step="0.001" value={rotate3}
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

function rightThree(v1: Vertex, v2: Vertex, v3: Vertex): number {
	const vect1: Vertex = {
		x: v1.x - v2.x,
		y: v1.y - v2.y,
		z: v1.z - v2.z,
	};

	const vect2: Vertex = {
		x: v3.x - v2.x,
		y: v3.y - v2.y,
		z: v3.z - v2.z,
	};

	const z = vect1.x * vect2.y - vect1.y * vect2.x;

	return z;
}

function draw(a: number, b: number, c: number, d: number, h: number, rotate1: number, rotate2: number, rotate3: number): any {
	const canvas: any = document.getElementById("lab2Canvas");

	if (canvas?.getContext) {
		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		let v1: Vertex = {
			x: -c,
			y: -h,
			z: d,
		};

		let v2: Vertex = {
			x: c,
			y: -h,
			z: d,
		};

		let v3: Vertex = {
			x: a,
			y: h,
			z: b,
		};

		let v4: Vertex = {
			x: -a,
			y: h,
			z: b,
		};

		let v5: Vertex = {
			x: -c,
			y: -h,
			z: -d,
		};

		let v6: Vertex = {
			x: c,
			y: -h,
			z: -d,
		};

		let v7: Vertex = {
			x: a,
			y: h,
			z: -b,
		};

		let v8: Vertex = {
			x: -a,
			y: h,
			z: -b,
		};

		let vertices: Vertex[] = [v1, v2, v3, v4, v5, v6, v7, v8];

		vertices = rotateX(rotate1, vertices);
		vertices = rotateY(rotate2, vertices);
		vertices = rotateZ(rotate3, vertices);

		const shiftW = canvas.width / 2;
		const shiftH = canvas.height / 2;

		//Верхняя грань
		let flag1 = rightThree(vertices[1], vertices[0], vertices[4]);

		if (flag1 > 0) {
			ctx.beginPath();
			ctx.moveTo(vertices[0].x + shiftW, vertices[0].y + shiftH);
			ctx.lineTo(vertices[1].x + shiftW, vertices[1].y + shiftH);
			ctx.lineTo(vertices[5].x + shiftW, vertices[5].y + shiftH);
			ctx.lineTo(vertices[4].x + shiftW, vertices[4].y + shiftH);
			ctx.closePath();
			ctx.fillStyle = 'red';
			ctx.lineWidth = 2;
			ctx.fill();
		}

		//Нижняя грань
		let flag2 = rightThree(vertices[6], vertices[7], vertices[3]);

		if (flag2 > 0) {
			ctx.beginPath();
			ctx.moveTo(vertices[3].x + shiftW, vertices[3].y + shiftH);
			ctx.lineTo(vertices[2].x + shiftW, vertices[2].y + shiftH);
			ctx.lineTo(vertices[6].x + shiftW, vertices[6].y + shiftH);
			ctx.lineTo(vertices[7].x + shiftW, vertices[7].y + shiftH);
			ctx.closePath();
			ctx.fillStyle = 'green';
			ctx.lineWidth = 2;
			ctx.fill();
		}

		//Задняя грань
		let flag3 = rightThree(vertices[3], vertices[0], vertices[1]);

		if (flag3 > 0) {
			ctx.beginPath();
			ctx.moveTo(vertices[0].x + shiftW, vertices[0].y + shiftH);
			ctx.lineTo(vertices[1].x + shiftW, vertices[1].y + shiftH);
			ctx.lineTo(vertices[2].x + shiftW, vertices[2].y + shiftH);
			ctx.lineTo(vertices[3].x + shiftW, vertices[3].y + shiftH);
			ctx.closePath();
			ctx.fillStyle = 'blue';
			ctx.lineWidth = 2;
			ctx.fill();
		}

		//Передняя грань
		let flag4 = rightThree(vertices[4], vertices[7], vertices[6]);

		if (flag4 > 0) {
			ctx.beginPath();
			ctx.moveTo(vertices[4].x + shiftW, vertices[4].y + shiftH);
			ctx.lineTo(vertices[5].x + shiftW, vertices[5].y + shiftH);
			ctx.lineTo(vertices[6].x + shiftW, vertices[6].y + shiftH);
			ctx.lineTo(vertices[7].x + shiftW, vertices[7].y + shiftH);
			ctx.closePath();
			ctx.fillStyle = 'pink';
			ctx.lineWidth = 2;
			ctx.fill();
		}

		//Правая грань
		let flag5 = rightThree(vertices[1], vertices[5], vertices[6]);

		if (flag5 > 0) {
			ctx.beginPath();
			ctx.moveTo(vertices[1].x + shiftW, vertices[1].y + shiftH);
			ctx.lineTo(vertices[5].x + shiftW, vertices[5].y + shiftH);
			ctx.lineTo(vertices[6].x + shiftW, vertices[6].y + shiftH);
			ctx.lineTo(vertices[2].x + shiftW, vertices[2].y + shiftH);
			ctx.closePath();
			ctx.fillStyle = 'orange';
			ctx.lineWidth = 2;
			ctx.fill();
		}

		//Левая грань
		let flag6 = rightThree(vertices[7], vertices[4], vertices[0]);

		if (flag6 > 0) {
			ctx.beginPath();
			ctx.moveTo(vertices[0].x + shiftW, vertices[0].y + shiftH);
			ctx.lineTo(vertices[4].x + shiftW, vertices[4].y + shiftH);
			ctx.lineTo(vertices[7].x + shiftW, vertices[7].y + shiftH);
			ctx.lineTo(vertices[3].x + shiftW, vertices[3].y + shiftH);
			ctx.closePath();
			ctx.fillStyle = 'brown';
			ctx.lineWidth = 2;
			ctx.fill();
		}

	}
}
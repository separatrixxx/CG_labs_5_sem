import { useState } from "react";


export default function Lab4() {
	document.title = 'Lab4';
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
			<canvas id="labCanvas" width={size} height={size} />
		</div>
	);
}

let gl: any;

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

function draw(a: number, b: number, c: number, d: number, h: number, rotate1: number, rotate2: number, rotate3: number): any {
	const canvas: any = document.getElementById("labCanvas");

	if (canvas?.getContext) {
		gl = initWebGL(canvas);

		if (gl) {
			gl.clearColor(0.0, 0.0, 0.0, 1.0); // установить в качестве цвета очистки буфера цвета чёрный, полная непрозрачность
			gl.enable(gl.DEPTH_TEST); // включает использование буфера глубины
			gl.depthFunc(gl.LEQUAL); // определяет работу буфера глубины: более ближние объекты перекрывают дальние
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // очистить буфер цвета и буфер глубины.

			gl.viewport(0, 0, canvas.width, canvas.height);

			// let perspectiveMatrix = makePerspective(45, 640.0 / 480.0, 0.1, 100.0);

			// loadIdentity();
			// mvTranslate([-0.0, 0.0, -6.0]);

			// gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
			// gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
			// setMatrixUniforms();
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		}
	}
}

let horizAspect = 480.0 / 640.0;

function initBuffers() {
	let squareVerticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

	var vertices = [
		1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0,
	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function getShader(gl: any, id: any) {
	let theSource, currentChild, shader;
	let shaderScript: any;

	shaderScript = document.getElementById(id);

	if (!shaderScript) {
		return null;
	}

	theSource = "";
	currentChild = shaderScript.firstChild;

	while (currentChild) {
		if (currentChild.nodeType == currentChild.TEXT_NODE) {
			theSource += currentChild.textContent;
		}

		currentChild = currentChild.nextSibling;
	}

	if (shaderScript.type === "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type === "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}

	gl.shaderSource(shader, theSource);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

function initShaders() {
	let fragmentShader = getShader(gl, "shader-fs");
	let vertexShader = getShader(gl, "shader-vs");

	let shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Unable to initialize the shader program.");
	}

	gl.useProgram(shaderProgram);

	let vertexPositionAttribute = gl.getAttribLocation(
		shaderProgram,
		"aVertexPosition",
	);
	gl.enableVertexAttribArray(vertexPositionAttribute);
}

function initWebGL(canvas: any) {
	gl = null;

	try {
		// Попытаться получить стандартный контекст. Если не получится, попробовать получить экспериментальный.
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	} catch (e) { }

	// Если мы не получили контекст GL, завершить работу
	if (!gl) {
		alert("Unable to initialize WebGL. Your browser may not support it.");
		gl = null;
	}

	return gl;
}

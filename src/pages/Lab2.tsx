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
			{/* <input id='input' className='input' placeholder='Введите a' /> */}
			<button className='btn' onClick={setDraw}>Построить фигуру</button>
			<canvas id="lab2Canvas" width={size} height={size} />
		</div>
	);
}

let ctx: any;

function setDraw() {
	const a: number = +(document.getElementById('input') as HTMLInputElement).value;

	if (a) {
		//draw(a);
	}
}
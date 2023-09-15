interface LabBlockProps {
	h1: string,
	h2: string,
};

export default function LabBlock({ h1, h2 }: LabBlockProps) {
	return (
		<div className='labBlock'>
			<h1>{h1}</h1>
			<h2>{h2}</h2>
		</div>
	);
}
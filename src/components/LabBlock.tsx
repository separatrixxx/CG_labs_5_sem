interface LabBlockProps {
	h1: string,
	h2: string,
	link: string;
};

export default function LabBlock({ h1, h2, link }: LabBlockProps) {
	return (
		<div className='labBlock'>
			<h1>{h1}</h1>
			<h2>{h2}</h2>
			<a href={link}>Go</a>
		</div>
	);
}
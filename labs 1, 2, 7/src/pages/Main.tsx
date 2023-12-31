import LabBlock from '../components/LabBlock';


export default function Main() {
	return (
		<div className='header'>
			<h1>Лабораторные работы по компьютерной графике</h1>
			<h2>Выполнил Лохматов Никита</h2>
			<LabBlock h1='Lab 1' h2='variant: x^(2/3) + y^(2/3) = a^(2/3)' link='lab1' />
			<LabBlock h1='Lab 2' h2='variant: обелиск' link='lab2' />
			<LabBlock h1='Lab 3' h2='variant: эллипсоид' link='lab3' />
			<LabBlock h1='Lab 4' h2='variant: эллипсоид' link='lab4' />
			<LabBlock h1='Lab 7' h2='variant: кривая Безье 2-й степени' link='lab7' />
		</div>
	);
}

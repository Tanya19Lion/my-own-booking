import Image from 'next/image';
import logo from '../../public/main-logo.svg';
import Link from 'next/link';

export default function Logo() {
	return (
		<Link href="/" className='shrink-0'>
			<Image priority src={logo} alt="CozyPlaces Logo" width={174} height={44} className='shrink-0'/>
		</Link>
	);
}

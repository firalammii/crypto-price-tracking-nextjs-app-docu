"use client";
import { useData } from '../context/DataContext';
import BalconyIcon from '@mui/icons-material/Balcony';
import { Button, Typography } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import useGetCoin from '@/hooks/useFetchCoinData';

const Navbar = () => {
	const { setCurrency, currency, darkMode, setDarkMode, } = useData();

	const refresh = useGetCoin();

	return (
		<section className={`w-full p-3 flex items-center justify-between  shadow-lg rounded-lg sticky top-0 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} z-10`}>
			<div className='flex gap-4 items-center '>
				<BalconyIcon />
				<Typography component='h1' variant='h6' className='capitalize text-xl'>Crypto Price Tracker</Typography>
			</div>
			<div className='flex gap-4 items-center'>
				<select size='small' id='currency' className='border-none outline-none' value={currency} onChange={(e) => setCurrency(e.target.value)}>
					<option value='usd'>USD</option>
					<option value='eur'>EUR</option>
					<option value='gbp'>GBP</option>
					<option value='inr'>INR</option>
				</select>
				<button onClick={() => setDarkMode(!darkMode)} className='capitalize cursor-pointer'>{darkMode ? (<LightMode />) : (<DarkMode />)}</button>
				<Button onClick={refresh} variant='outlined' className='capitalize'>refresh</Button>
			</div>
		</section>
	);
};

export default Navbar;
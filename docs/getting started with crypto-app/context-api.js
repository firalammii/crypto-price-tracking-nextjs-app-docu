"use client";
import { unstable_noStore as noStore } from 'next/cache';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { options, url } from '@/data/configData';

export const Context = createContext();


const DataContext = ({ children }) => {
	const [data, setData] = useState([]);
	const [currency, setCurrency] = useState('usd');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [darkMode, setDarkMode] = useState(false);
	const [searchValue, setSearchValue] = useState([]);


	async function getCoins (id) {
		noStore();
		setLoading(true);
		setError('');
		try {
			const { data } = await axios.get(`${url}?vs_currency=${currency}&ids=${searchValue}`, options); //&per_page=5
			setError(''); 
			setLoading(false);
			setData(data);
			console.log(data);
		} catch (error) {
			console.log(error);
			setError(error.message);
			setLoading(false);
		}
	}

	useEffect(() => {
		getCoins();
	}, [currency, searchValue]);

	return (
		<Context.Provider
			value={{
				data, setData,
				loading, setLoading,
				error, setError,
				currency, setCurrency,
				darkMode, setDarkMode,
				searchValue, setSearchValue
			}}
		>
			{children}
		</Context.Provider>
	);
};
export const useData = () => useContext(Context);
export default DataContext;
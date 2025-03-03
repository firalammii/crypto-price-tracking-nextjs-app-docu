"use client";
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { coins } from '@/data/coins';

const Welcome = () => {
	const [input, setInput] = useState([]);
	const { setSearchValue } = useData();
	const handleSubmit = (e) => {
		if (e)
			e.preventDefault();
		setSearchValue(input.map(item => item.id));
	};
	useEffect(() => {
		handleSubmit();
	}, [input]);

	return (
		<section className='p-4 shadow-lg pb-4 rounded-lg'>
			<div className='flex flex-col gap-4 w-3/4 m-auto'>
				<h1 className='capitalize font-medium text-3xl text-center'>
					Welcome to Crypto app tracker
				</h1>
				<p>
					This crypto currencies price tracker app gives nor much details however simple and sweet for the purpose of exam only
				</p>
				<form onSubmit={handleSubmit}>
					<Autocomplete
						multiple
						filterSelectedOptions
						size='small'
						id="searchFilter"
						options={coins}
						getOptionLabel={(option) => option.name}
						onChange={(e, val) => setInput(val)}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Filter Search Option"
								placeholder="Search"

							/>
						)}
					/>
				</form>
			</div>

		</section>
	);
};

export default Welcome;
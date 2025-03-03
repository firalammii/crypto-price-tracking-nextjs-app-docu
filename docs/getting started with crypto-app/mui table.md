
1. the table is multi featured including sorting with each of the properties of the currency,thus it sorts in both descending and ascending orders by rank, current price and other properties
1. title of table on the left and the currency selection on the right
2. table with pagination


``` js title = "Table"
'use client';
import * as React from 'react';
import { useState, useMemo  } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { headCells } from '@/data/tableHeadsData';
import { useData } from '../context/DataContext';
import Image from 'next/image';

function descendingComparator (a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator (order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy || "market_cap_rank")
		: (a, b) => -descendingComparator(a, b, orderBy || "market_cap_rank");
}

function EnhancedTableHead (props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar ({}) {
	const {currency, setCurrency} = useData()
	return (
		<Toolbar
			sx={[{pl: { sm: 2 },pr: { xs: 1, sm: 1 },},]}
		>
			<Typography
				sx={{ flex: '1 1 100%' }}
				variant="h5"
				id="tableTitle"
				component="div"
			>
				Popular Coins
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', }}> 
				<Typography variant='body1'> currency</Typography>
				<select size='small' id='currency' className='border-none outline-none' value={currency} onChange={(e) => setCurrency(e.target.value)}>
					<option value='usd'>USD</option>
					<option value='eur'>EUR</option>
					<option value='gbp'>GBP</option>
					<option value='inr'>INR</option>
				</select>
			</Box>
		</Toolbar>
	);
}

export default function EnhancedTable ({data, currency}) {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('rank');
	const [page, setPage] = useState(0);
	const [dense, setDense] = useState(false);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

	const visibleRows = useMemo(
		() =>
			[...data]
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rowsPerPage],
	);

	return (
		<React.Suspense>
		<Box sx={{  overflow:'auto' }}>
			<Paper sx={{ mb: 2, overflow: 'auto' }}>
				<EnhancedTableToolbar currency={currency} />
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table
						sx={{ overflow:'auto' }}
						aria-labelledby="tableTitle"
						size={dense ? 'small' : 'medium'}
						stickyHeader
						aria-label="sticky table"
					>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={data.length}
						/>
						<TableBody>
							{visibleRows.map((row, index) => {
								const labelId = `enhanced-table-checkbox-${index}`;
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.id}
									>
										<TableCell>{row.market_cap_rank}</TableCell>
										<TableCell align="left" className='flex'>
											<div className='flex gap-4 items-center'>
												<img
													aria-hidden
													src={row.image}
													alt="currency logo"
													width={32}
													height={32}
												/>
												<span>{row.name}</span></div>
											</TableCell>
										<TableCell align="right">{row.current_price}</TableCell>
										<TableCell align="right">{row.price_change_24h}</TableCell>
										<TableCell align="right">{row.market_cap}</TableCell>
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<FormControlLabel
				control={<Switch checked={dense} onChange={handleChangeDense} />}
				label="Dense padding"
			/>
		</Box>
		</React.Suspense>

	);
}

```



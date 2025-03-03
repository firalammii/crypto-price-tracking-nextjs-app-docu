```js title = "useFetchCoinsData"
export const headCells = [
	{
		id: 'market_cap_rank',
		numeric: false,
		disablePadding: false,
		label: 'Rank',
	},
	{
		id: 'coin',
		numeric: false,
		disablePadding: true,
		label: 'Coin',
	},
	{
		id: 'current_price',
		numeric: true,
		disablePadding: false,
		label: `Price($)`,
	},
	{
		id: 'price_change_24h',
		numeric: true,
		disablePadding: false,
		label: '24H-Change',
	},
	{
		id: 'market_cap',
		numeric: true,
		disablePadding: false,
		label: 'Market-Cap',
	},
];
```
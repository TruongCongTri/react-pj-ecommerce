/* eslint-disable react/prop-types */
import React from 'react';

import HeaderIcon from '../icons/HeaderIcon';
import Pagination from './Pagination';
import Logo from '../../assets/image/dashboard-logo.svg';
import { HiChevronDown } from 'react-icons/hi2';
import LoadingTable from './LoadingTable';

// columns: An array of objects defining the headers and accessors for the table columns.
// data: An array of objects representing the rows of data to display.

export default function NormalTable({ data, loading }) {
	const columns = [
		{ Header: 'Category', accessor: 'name' },

		{ Header: 'Added', accessor: 'createdAt' },
		{ Header: 'Action', accessor: 'action' },
	];
	const handleErrorImg = e => {
		e.target.src = Logo;
	};
	return (
		<div className='relative rounded-lg w-full text-left bg-white border border-gray-200 '>
			<table className='w-full'>
				<thead className='font-medium text-sm text-gray-700 uppercase bg-[#F9F9FC]'>
					<tr>
						{columns.map((column, colIndex) => {
							if (colIndex === 0) {
								return (
									<th key={column.accessor} className='py-[18px] px-[22px] text-left flex justify-between'>
										<div className='flex items-center gap-2'>
											<input
												id='checkbox-all-search'
												type='checkbox'
												className='size-5 text-blue-600 bg-white rounded-lg focus:ring-blue-500 '
											/>
											<label htmlFor='checkbox-all-search' className='sr-only'>
												checkbox
											</label>
											<div>{column.Header}</div>
										</div>

										<HeaderIcon item={<HiChevronDown />} styling={'ml-2 size-4 '} />
									</th>
								);
							}
							return (
								<th key={column.accessor} className='py-[18px] px-[22px] text-left text-gray-600 '>
									<div className='flex justify-between'>
										{column.Header}
										<HeaderIcon item={<HiChevronDown />} styling={'ml-2 size-4 '} />
									</div>
								</th>
							);
						})}
					</tr>
				</thead>
				{loading ? (
					<LoadingTable />
				) : (
					<tbody>
						{data.map((row, rowIndex) => (
							<tr
								key={rowIndex}
								name={rowIndex}
								className='bg-white border-b border-neutral-50 hover:bg-gray-50 font-medium text-sm text-neutral-500'
							>
								<td className='py-[18px] px-[22px] text-left whitespace-nowrap'>
									<div className='flex items-center gap-2'>
										<div className='flex items-center gap-2'>
											<div className='flex items-center'>
												<img className='size-[44px] rounded-lg bg-[#E0E2E7]' src={row.image} onError={handleErrorImg} />
											</div>
										</div>
										<div className='flex items-center gap-2'>
											<div className='flex items-center'>
												<div className='ps-3'>
													<div className='text-neutral-700'>{row.name}</div>
													<div className='font-normal	text-xs'>{row.description}</div>
												</div>
											</div>
										</div>
									</div>
								</td>
								<td className='py-[18px] px-[22px] text-left whitespace-nowrap'>
									<div className='ps-3'>
										<div className='text-neutral-700'>{row.createdAt}</div>
									</div>
								</td>
								<td className='py-[18px] px-[22px] text-left whitespace-nowrap'>
									<div className='ps-3'>
										<div className='text-neutral-700'>{row.createdAt}</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				)}
			</table>
			<Pagination></Pagination>
		</div>
	);
}

//flex-column flex-wrap md:flex-row
// dark:text-gray-400 mb-4 md:mb-0 md:inline md:w-auto

// Table Status components:

// Table Loading
// Table Empty
// Table Errors

// error

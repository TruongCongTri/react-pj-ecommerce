import React, { useEffect, useState } from 'react';

import BreadCrumb from '../../../components/layouts/BreadCrumb';
import NormalButton from '../../../components/buttons/NormalButton';
import LinkButton from '../../../components/buttons/LinkButton';
import SearchInput from '../../../components/forms/SearchInput';
import CategoryTable from '../../../components/tables/CategoryTable';

// import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";
import { PiExportBold } from 'react-icons/pi';
import { HiMiniPlus } from 'react-icons/hi2';

import { HiMiniAdjustmentsHorizontal } from 'react-icons/hi2';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import apis from '../../../apis';

export default function CategoriesDashboard() {
	// Lưu lại danh sách categories từ server
	const [listData, setListData] = useState([]);
	// Dùng để set state loading của table (first load hoặc searching)
	const [loadingGet, setLoadingGet] = useState(false);

	// createdAt: '2024-12-03T08:05:55.373Z';
	// description: 'Các món ăn nhanh như burger, pizza, khoai tây chiên.';
	// id: 1;
	// image: null;
	// name: 'Fast Food';
	// updatedAt: '2024-12-03T08:05:55.373Z';

	useEffect(() => {
		// C1: Dùng async/await
		// const getListData = async () => {
		// 	const res = await apis.categories.getData();
		// 	try {
		// 		if (res.status >= 400) {
		// 			// Lỗi API
		// 			console.log(`Lỗi call api`);
		// 			return;
		// 		}
		// 		console.log(res.data.data.categories);
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// };
		// getListData();

		// C2: dùng then-c()
		setLoadingGet(true);
		apis.categories
			.getData()
			.then(
				res => {
					const { categories } = res.data.data;
					// xử lý categories nếu cần (Xử lý computed data)
					setListData(categories);
				},
				err => {
					console.log(err);
				}
			)
			.finally(() => {
				setTimeout(() => {
					setLoadingGet(false);
				}, 1000);
			});
		return () => {};
	}, []);

	//{ name: 'Bag & Pounch', image: '', desc: 'Great fashion, great selections, great prices.' }
	//{ name: 'Watch', image: '', desc: 'Our range of watches are perfect whether you’re looking to upgrade.' }
	//{ name: 'Audio', image: '', desc: 'Our big range of audio devices makes it easy to upgrade your device at a great price.' }
	//{ name: 'Smartphone', image: '', desc: 'Our smartphone include all the big brands.' }

	return (
		<div className='mx-6 my-8 '>
			<div className='flex justify-between mb-6'>
				<div>
					<BreadCrumb />
				</div>
				<div className='flex gap-x-4 items-end '>
					<NormalButton
						color='bg-[#DEDEFA]'
						text='text-[#5C59E8] font-semibold text-sm'
						// size="min-w-[98px] max-w-[98px] min-h-10 max-h-10"
						type='submit'
						icon={<PiExportBold />}
						iconStyle='size-5'
					>
						Export
					</NormalButton>

					<LinkButton
						color='bg-[#5C59E8]'
						text='text-white font-semibold text-sm'
						// size="min-w-[147px] max-w-[147px] min-h-10 max-h-10"
						icon={<HiMiniPlus />}
						iconStyle='size-5'
						link='/admin/categories/add'
					>
						Add Category
					</LinkButton>
				</div>
			</div>

			<div className='flex justify-between mb-6'>
				<SearchInput
					// color="bg-white"
					// border="border"
					size='min-w-[320px] max-w-[320px] '
					// text="text-neutral-400 font-normal text-sm"
					icon={<HiMiniMagnifyingGlass />}
					// iconStyle="size-5 text-neutral-500 "
					placeholder='Search category. . .'
					// placeholderText="placeholder:text-neutral-400"
					// type="text"
					name='categorySearch'
					required
				></SearchInput>

				<NormalButton
					color='bg-white'
					border='border'
					text='text-neutral-500 font-medium text-sm'
					size='min-w-[98px] max-w-[98px] min-h-10 max-h-10'
					type='submit'
					icon={<HiMiniAdjustmentsHorizontal />}
					iconStyle='size-5'
				>
					Filters
				</NormalButton>
			</div>
			<div>
				<CategoryTable data={listData} loading={loadingGet}></CategoryTable>
			</div>
			<div></div>
		</div>
	);
}

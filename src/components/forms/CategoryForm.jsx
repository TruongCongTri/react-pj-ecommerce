import React, { useEffect, useState } from 'react';
import FileUploader from '../forms/FileUploader';
import GeneralInformation from '../forms/GeneralInformation';
import apis from '../../apis';
import { useNavigate } from 'react-router';

export default function CategoryForm({ submitFlag }) {
	const [formData, setformData] = useState({});
	const [loadingCreate, setLoadingCreate] = useState(false);

	let navigate = useNavigate();
	const submit = () => {
		// prevent first run

		// logic validata: JOI - formik

		apis.categories
			.create(formData)
			.then(
				res => {
					// thành công
					navigate('/admin/categories');
				},
				err => {
					console.log(err);
				}
			)
			.finally(() => {
				setLoadingCreate(false);
			});
	};

	/**
	 * Description
	 *
	 * Nhận vào một chuỗi là đường dẫn ảnh và update vào 'formData'
	 *
	 * @param {string} img
	 * @returns {void}
	 */
	const handleUpdateFile = img => {
		setformData({
			...formData,
			image: img,
		});
	};

	/**
	 * Description
	 *
	 * Nhận vào một cặp giá trị là key và value sau đó update vào 'formData'
	 *
	 * @param {string} key
	 * @param {string} value
	 * @returns {void}
	 */
	const handleUpdateForm = (key, value) => {
		setformData({
			...formData,
			[key]: value,
		});
	};

	useEffect(() => {
		submit();
	}, [submitFlag]);

	return (
		<div className='grid grid-cols-4 grid-rows-3 gap-5'>
			<div className='col-span-1 row-span-2'>
				<FileUploader
					color='bg-white'
					// size="min-w-[264px] max-w-[264px] min-h-[318px] max-h-[318px]"
					// size="h-[318px]"
					border='border border-neutral-100'
					text='text-neutral-800 font-medium text-lg'
					labelText='text-neutral-600 font-medium text-sm'
					label='Photo'
					type='text'
					placeholder='Drag and drop image here, or click add image'
					updateFile={handleUpdateFile}
				>
					Thumbnail
				</FileUploader>
			</div>
			<div className='col-span-3 row-span-2.5'>
				{/* general information */}
				<GeneralInformation updateForm={handleUpdateForm}>Category</GeneralInformation>
			</div>
		</div>
	);
}

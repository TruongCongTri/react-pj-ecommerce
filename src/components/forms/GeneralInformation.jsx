import React from 'react';

import NormalInput from '../forms/NormalInput';
import NormalTextarea from '../forms/NormalTextarea';

export default function GeneralInformation({ ...props }) {
	return (
		<div className='bg-white p-6 border border-neutral-100 rounded-lg'>
			<div className='text-neutral-800 font-medium text-lg pb-[14px]'>General Information</div>
			<div>
				<div className='mb-3'>
					<NormalInput
						// color="bg-[#F9F9FC]"
						// border="border border-neutral-100"
						size='w-full'
						// text="text-neutral-400 font-normal text-sm"
						placeholder={`Type ${props.children.toLowerCase()} name here. . .`}
						// placeholderText="placeholder:text-neutral-400"
						// childrenText="text-neutral-600 font-medium text-sm"
						type='text'
						name={`${props.children.toLowerCase()}Name`}
						updated={_value => {
							props.updateForm('name', _value);
						}}
					>
						{props.children} Name
					</NormalInput>
				</div>
				<div>
					<NormalTextarea
						// color="bg-[#F9F9FC] "
						// border="border border-neutral-100"
						size='w-full '
						// text="text-neutral-400 font-normal text-sm"
						placeholder='Type category description here. . .'
						// placeholderText="placeholder:text-neutral-400"
						// childrenText="text-neutral-600 font-medium text-sm"
						rows='6'
						type='text'
						name={`${props.children.toLowerCase()}Desc`}
						updated={_value => {
							props.updateForm('description', _value);
						}}
					>
						Description
					</NormalTextarea>
				</div>
			</div>
		</div>
	);
}

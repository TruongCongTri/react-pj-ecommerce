/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import HeaderIcon from '../icons/HeaderIcon.jsx';

export default function FileUploader({ ...props }) {
	const [image, setImage] = useState('');

	const handleChangeImage = event => {
		setImage(event.target.value);
	};

	useEffect(() => {
		props.updateFile(image);
	}, [image]);

	//
	return (
		<div className={`rounded-lg p-6 ${props.size} ${props.color} ${props.border} ${props.text} `}>
			<div className='w-full '>
				{props.children ? (
					<label htmlFor={props.id} className=''>
						{props.children}
					</label>
				) : (
					<></>
				)}
				<div className='pt-[14px]'>
					<div>
						{props.label ? (
							<label htmlFor={props.id} className={props.labelText}>
								{props.label}
							</label>
						) : (
							<></>
						)}
					</div>

					{/* {props.icon &&
          <HeaderIcon item={props.icon} styling={`mr-1 ${props.iconStyle}`} />
        } */}
					{/* <div className="relative bg-[#F9F9FC] min-w-[216px] max-w-[216px] min-h-[204px] max-h-[204px] mt-1"> */}
					<textarea
						type={props.type}
						value={image}
						onChange={handleChangeImage}
						placeholder={props.placeholder}
						name={props.name}
						rows='8'
						className={`text-neutral-400 font-normal text-sm p-3 ${props.placeholderText} bg-[#F9F9FC] w-full h-full mt-1 focus:outline-none text-wrap`}
					/>
					{image ? <img src={image} alt='' className='w-full h-[250px] object-cover' /> : null}

					{/* </div> */}
				</div>
			</div>

			{/* {props.error && <div className="error-message">{props.error}</div>} */}
		</div>
	);
}

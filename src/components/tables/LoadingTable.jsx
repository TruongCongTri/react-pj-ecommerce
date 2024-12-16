import React from 'react'

export default function LoadingTable({ cols = 999, rows = 9 }) {
    return (
		<tbody>
			<tr>
				<td colSpan={cols}>
					<h1 className='font-bold text-center py-2 text-2xl leading5'>
						Đang tải dữ liệu, vui lòng chờ trong giây lát .....
					</h1>
				</td>
			</tr>
		</tbody>
	);
}

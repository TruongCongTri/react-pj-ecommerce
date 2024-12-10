import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import FileIcon from '../icons/HeaderIcon';
import { HiChevronRight } from 'react-icons/hi2';

const categoryNameById = { 1: 'John' };

const DynamicUserBreadcrumb = ({ match }) => <span>{categoryNameById[match.params.id]}</span>;

const CustomPropsBreadcrumb = ({ someProp }) => <span>{someProp}</span>;
const routes = [
	// { path: "/admin/categories/:id", breadcrumb: DynamicUserBreadcrumb },
	{ path: '/admin/categories/:id', breadcrumb: 'Category Detail' },
	{ path: '/admin/categories/add', breadcrumb: 'Add Category' },
	{
		path: '/custom-props',
		breadcrumb: CustomPropsBreadcrumb,
		props: { someProp: 'Hi' },
	},
];
export default function BreadCrumb() {
	const breadcrumbs = useBreadcrumbs(routes);
	const current = useLocation().pathname;
	return (
		<>
			{breadcrumbs.map(({ breadcrumb, match }, index) =>
				`${match.pathname}` === current ? (
					<div className='font-medium text-2xl text-neutral-700 mb-2' key={index}>
						{breadcrumb}
					</div>
				) : null
			)}
			<nav className='flex' aria-label='Breadcrumb'>
				<ol className='inline-flex items-center space-x-1'>
					{breadcrumbs.map(({ breadcrumb, match }, index) => (
						<li key={index} className='inline-flex items-center'>
							<NavLink
								to={match.pathname}
								className={`inline-flex items-center font-medium text-sm mr-2 ${
									match.pathname === current
										? 'text-neutral-500 hover:text-[#5C59E8]'
										: 'text-[#5C59E8] hover:text-neutral-500 '
								}  `}
							>
								{breadcrumb}
							</NavLink>
							{match.pathname === current ? (
								<></>
							) : (
								<FileIcon item={<HiChevronRight />} styling={' size-3 m text-neutral-500 gap-x-2'} />
							)}
						</li>
					))}
				</ol>
			</nav>
		</>
	);
}

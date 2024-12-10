import React, { useContext } from 'react'

import { NotiContext } from '../../contexts/NotiContext';

export default function NotiDropdown() {
    const { isOpen, setIsOpen } = useContext(NotiContext);
    const listNoti = [
        {
            id: 1,
            tittle: 'Your have a new message from Yin',
            message: 'Hello there, check this new items in from the your may interested from the motion school.'

        },
        {
            id: 2,
            tittle: 'Your have a new message from Haper',
            message: 'Hello there, check this new items in from the your may interested from the motion school.'
            
        },
        {
            id: 3,
            tittle: 'Your have a new message from San',
            message: 'Hello there, check this new items in from the your may interested from the motion school.'
            
        }
    ]
  return (
    <div 
      className={`absolute min-w-[320px] max-w-[320px] max-h-[350px] 
      right-0 top-[64px] z-[1000] py-4  
      rounded-lg overflow-y-scroll block shadow-lg bg-white
        ${
          isOpen
            ? " "
            : " hidden"
        }`}
      >
        <div className="flex items-center justify-between px-4 mb-4">
          <p className="text-xs text-blue-600 cursor-pointer">Clear all</p>
          <p className="text-xs text-blue-600 cursor-pointer">Mark as read</p>
        </div>

        <ul className="divide-y">
          {listNoti.map((item) => {
            return (<li key={item.id} className='p-4 flex items-center hover:bg-gray-50 cursor-pointer'>
            <div className="">
              <h3 className="text-sm text-[#333] font-semibold">{item.tittle}</h3>
              <p className="text-xs text-gray-500 mt-2">{item.message}</p>
              <p className="text-xs text-blue-600 leading-3 mt-2">10 minutes ago</p>
            </div>
          </li>);
          })}

          
        </ul>
        <p className="text-xs px-4 mt-6 inline-block text-blue-600 cursor-pointer">View all Notifications</p>
      </div>
  )
}

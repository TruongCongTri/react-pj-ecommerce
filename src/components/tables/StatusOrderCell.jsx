import React from 'react'

export default function StatusOrderCell({ ...props }) {
  return (
    <td
                          key={column.accessor}
                          className="py-2 px-4 border-b border-gray-200 text-gray-800"
                        >
                          {row[column.accessor]}
                        </td>
  )
}

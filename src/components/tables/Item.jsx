import React from 'react'

export default function Item({ currentItem }) {
  return (
    <>
      {currentItem &&
        currentItem.map((item) => (
          <div key={item}>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  )
}

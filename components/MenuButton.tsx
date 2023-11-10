import React from 'react'
import Image from 'next/image'

function MenuButton(props) {
  return (
    <div style={{ background: 'blue' }}><a href={props.link}>
  <Image
    className='object-contain'
    alt="Food Image"
    width={500}
    height={320}
    src={props.image} />
</a></div>
  )
}

export default MenuButton
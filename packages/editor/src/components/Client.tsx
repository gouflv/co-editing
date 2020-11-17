import React, { FC } from 'react'
import { Editor } from './Editor'

interface ClientProps {
  name: string
}

export const Client: FC<ClientProps> = (props) => {
  return (
    <div className='client-container'>
      <h2 className='mb-2 font-medium'>Editor: {props.name}</h2>
      <div className='editor p-4 bg-gray-100'>
        <Editor name={props.name} />
      </div>
    </div>
  )
}

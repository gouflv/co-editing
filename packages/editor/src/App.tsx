import React from 'react'
import './App.css'
import { Client } from './components/Client'

function App() {
  return (
    <div className='h-screen p-8 bg-gray-400'>
      <div className='grid grid-cols-2 gap-8'>
        <Client name='Foo' />
        <Client name='Bar' />
      </div>
    </div>
  )
}

export default App

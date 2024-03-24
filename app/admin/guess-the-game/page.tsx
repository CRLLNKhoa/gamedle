import React from 'react'
import Listgame from "./components/listgame"
import Acction from './components/acction'

export default function Page() {
  return (
    <div className='grid grid-cols-2 h-full'>
        <div className=''>
            <Listgame />
        </div>
        <div className='border-l p-2 overflow-y-auto'>
            <Acction />
        </div>
    </div>
  )
}

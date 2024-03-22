import { Button } from '@/components/ui/button'
import React from 'react'

export default function GameFinish() {
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-xl mb-4'>The answer was: <b className='text-green-600'>Outlast</b></h1>
        <Button className='bg-green-600 hover:bg-green-700 duration-500' size={"sm"}>Chia sẻ kết quả</Button>
    </div>
  )
}

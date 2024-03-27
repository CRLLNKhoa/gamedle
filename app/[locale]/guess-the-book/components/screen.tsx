"use client"
import React from 'react'
import ListHint from './ListHint'
import { useGTBStore } from '@/stores/useGTBStore'
import Hint from './Hint'

export default function Screen() {
  const currHint = useGTBStore((state:any) => state.currHint)
  const game = useGTBStore((state:any) => state.game)
  console.log(game)
  return (
    <div className='flex flex-col w-full'>
      <p className='text-center mb-2'>Book #{game?.id}</p>
        <Hint currHint={currHint} />
        <ListHint />
    </div>
  )
}

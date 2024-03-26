"use client"
import React from 'react'
import ListHint from './ListHint'
import { useGTGStore } from '@/stores/useGTGStore'

export default function Screen() {
  const currHint = useGTGStore((state:any) => state.currHint)
  const game = useGTGStore((state:any) => state.game)
  return (
    <div className='flex flex-col w-full'>
      <p className='text-center mb-2'>Book #{game?.id}</p>
        <ListHint />
    </div>
  )
}

import {Link} from '@/navigation';
import React from 'react'

export default function Footer() {
  return (
    <div className='flex justify-center items-center border-t text-md font-bold gap-4 py-2 border-border/40 bg-background/95
    backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <Link href={"/"}>Gamedle</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/privacy"}>Privacy</Link>
        <p>V.1.0.3</p>
    </div>
  )
}

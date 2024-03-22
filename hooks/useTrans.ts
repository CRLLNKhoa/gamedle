"use client"
import en from '@/public/lang/en'
import vi from '@/public/lang/vi'
import { usePathname } from 'next/navigation';

const useTrans = () => {
    const pathname = usePathname()

    const trans = pathname === 'vi' ? vi : en

    return trans
}

export default useTrans
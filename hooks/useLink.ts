"use client"
import { usePathname, useRouter } from 'next/navigation';

const useLink = () => {
    const pathname = usePathname()
    const router = useRouter()

    const push = (href:string) => {
        router.push(`${pathname.slice(1,3)+href}`)
    }

    return {push}
}

export default useLink
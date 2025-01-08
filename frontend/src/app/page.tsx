"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLogged = !!localStorage.getItem('token')
      if (isLogged) {
        router.push("/pages/tasks")
      } else {
        router.push("/pages/login")
      }
    } else {
      router.push("/pages/login")
    }
  }, [router])

  return (
    <div>
    </div>
  );
}

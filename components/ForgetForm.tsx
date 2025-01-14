'use client'

import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
import axios from 'axios'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const ForgetForm = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true)

        try {

          const res = await axios.post("/api/forget-password", { email });

          if (!res.data.success) {
            toast({
              variant: "destructive",
              title: res.data.message
            })
          }

          if (res.data.success) {
            toast({
              className: "bg-green-500 text-white",
              title: res.data.message
            })
          }

          setLoading(false);
          
        } catch (error) {
          console.log(error);
          toast({
            variant: "destructive",
            title: `${error}`
          })
          setLoading(false)
        }


        setEmail("");
        setLoading(false)
    }

  

  return (
    <Card className='flex flex-col justify-center items-start w-[400px] mx-auto my-80'>
  <CardHeader>
    <CardTitle className='text-2xl'>Forgot Password</CardTitle>
    <CardDescription className='text-gray-600'>Enter your email...<br/> 
        We will send you a link to reset</CardDescription>
  </CardHeader>
  <CardContent className='w-full'>

  <form onSubmit={handleSubmit}
   className="flex flex-row w-full items-center justify-between gap-2 ">

      <Input type="email" placeholder="Email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      required
      className='placeholder-gray-700' />

      <Button type="submit">{loading ? <Loader2 className="animate-spin" /> : "Send"}</Button>

    </form>

    
    {message && (
        <p className="text-sm text-red-500 mt-4">{message}</p>
      )}

  </CardContent>

  <CardFooter>
    <Link href={'/login'}
    className='text-sm hover:underline active:text-gray-600' >
    Back to sign in
    </Link>
  </CardFooter>
</Card>
  )
}

export default ForgetForm

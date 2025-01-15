import { getSession } from "@/actions/getUser";
import ForgetForm from "@/components/ForgetForm";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {

    

    const session = await getSession();
      
        console.log(session);
      
      
          if (session?.user?.email) {
            redirect('/');
          }
        

  return (
    
    <div className="flex min-h-[85vh] w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
          <ForgetForm />
          </div>
        </div>
  )
}

export default page

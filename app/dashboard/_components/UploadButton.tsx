"use client";

import { Button } from "@/components/ui/button";
// import { useOrganization, useUser } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useMutation } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { UploadFile } from "@/lib/actions";
import { storage } from "@/app/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { error } from "console";
import Link from "next/link";
import { title } from "process";
// import { Doc } from "../../../../convex/_generated/dataModel";


const formSchema = z.object({
    title: z.string().min(1).max(200),
    file: z.custom<FileList>((val) => val instanceof FileList, "Required").refine((files) => files.length > 0, "Required")
})

const UploadButton = () => {
    const { toast } = useToast();

    const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        file: undefined,
      }
    });




    const fileRef = form.register("file");


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        console.log(event)
        setFile(event.target.files[0]);
      }
    }


    const handleUpload = (e: any) => {
      e.preventDefault();

      setFileLoading(true);

      if (!file) {
        toast({
          title: "No file selected",
        })
        return;
      }

      const fileRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setDownloadURL(downloadURL);
            setFileLoading(false);
            toast({
              className: "bg-yellow-600 text-white border-none",
              title: "File is uploaded",
            })
          });
        }
      )
    }
    
    console.log(downloadURL)
    console.log(title);


    const handleSubmit = async (e: any) => {
      e.preventDefault();
      
      try {

        setLoading(true)

        const res = await axios.post("/api/upload", {
          title: title,
          file: downloadURL,
        })

        console.log(res)

        if (res.data.success) {
          toast({
            className: "bg-green-500 text-white",
            title: "Saved successfully",
          })

          setIsFileDialogOpen(false);
          setLoading(false)
          window.location.reload();
        }

      } catch (error) {

        toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Your file could not be uploaded, try again later",
      });

      setIsFileDialogOpen(false);
      setLoading(false)

    }

    }

    /*async function onSubmit(values: z.infer<typeof formSchema>) {

      

  }

      /* 
      
      const fileType = values.file[0].type;

      console.log(values.file[0]);
      
      const types = {
        "image/*": "image",
        "application/pdf": "pdf",
        "text/csv": "csv",
      }

      
      */
    
  return (
    <Dialog
    open={isFileDialogOpen}
    onOpenChange={(isOpen) => {
      setIsFileDialogOpen(isOpen);
      form.reset();
    }}
  >
    <DialogTrigger asChild>
      <Button>Upload File</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="mb-8">Upload your File Here</DialogTitle>
        <DialogDescription>
          This file will be accessible by anyone in your organization
        </DialogDescription>
      </DialogHeader>

      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit}
          className="space-y-8">
            

            <Input type="text" onChange={(e) => setTitle(e.target.value)} />
            
            <Input type="file" onChange={(e: any) => {
              handleFileChange(e);
            }}  />

            <Button 
            type="button"
            onClick={handleUpload}
            >
              {fileLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Upload File'}
            </Button>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="flex gap-1"
            >
              {form.formState.isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {loading ? <Loader2 className="animate-spin"/> : "Submit"}
            </Button>
          </form>
        </Form>

        <Link 
        href={downloadURL}
        target="_blank"
        >
        Download
        </Link>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default UploadButton

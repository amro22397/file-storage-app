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
import { Progress } from "@/components/ui/progress";

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
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, "Required"),
});

const UploadButton = ({ email, fetchFiles }: { 
  email: string,
  fetchFiles?: any,
 }) => {
  const { toast } = useToast();

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null | any>(null);
  const [title, setTitle] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  const fileRef = form.register("file");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);

      setFileType(event.target.files[0].type);
      setFileName(event.target.files[0].name);
    }
  };

  const handleUpload = (e: any) => {
    e.preventDefault();

    setFileLoading(true);

    if (!file) {
      toast({
        title: "No file selected",
      });
      setFileLoading(false);
      return;
    }

    const fileRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
          setFileLoading(false);
          toast({
            className: "bg-yellow-600 text-white border-none",
            title: "File is uploaded",
          });
        });
      }
    );

    setUploadProgress(0);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("/api/upload", {
        title: title,
        name: fileName,
        file: downloadURL,
        type: fileType,
        emailRef: email,
      });

      if (!res.data.success) {
        toast({
          variant: "destructive",
          title: res.data.message,
        });
        setLoading(false);
        return;
      }

      if (res.data.success) {
        toast({
          className: "bg-green-500 text-white border-none",
          title: "Saved successfully",
        });

        setIsFileDialogOpen(false);
        setLoading(false);
        fetchFiles();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Something went wrong ${error}`,
        description: "Your file could not be uploaded, try again later",
      });

      setIsFileDialogOpen(false);
      setLoading(false);
    }
  };

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
          <DialogTitle className="mb-1">Upload File</DialogTitle>
          <DialogDescription>
            This file will be accessible by anyone in your organization
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <Input type="text" onChange={(e) => setTitle(e.target.value)} />

              <div className="flex flex-row gap-4">
                <Input
                  type="file"
                  className="file:bg-gray-500 file:my-1 file:px-2 file:rounded-full file:text-white
            file:active:scale-95 file:cursor-pointer file:mr-2"
                  onChange={(e: any) => {
                    handleFileChange(e);
                  }}
                />

                <Button
                  type="button"
                  onClick={handleUpload}
                  className="bg-green-500 hover:bg-green-500 active:scale-95"
                >
                  {fileLoading
                    ? !fileType.includes("video") &&
                      !fileType.includes("audio") ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : 
                      "Upload File"
                    : "Upload File"}
                </Button>
              </div>

              {fileType.includes("video") && uploadProgress !== 0 && uploadProgress !== 100 && (
                <Progress value={uploadProgress} />
              )}

              {fileType.includes("audio") && uploadProgress !== 0 && uploadProgress !== 100 && (
                <Progress value={uploadProgress} />
              )}

              <Button
                type="submit"
                disabled={downloadURL.trim() === "" || title.trim() === ""}
                className="flex gap-1"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {loading ? <Loader2 className="animate-spin" /> : "Submit"}
              </Button>
            </form>
          </Form>

          <Link href={downloadURL} target="_blank" className="hidden">
            Download
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;

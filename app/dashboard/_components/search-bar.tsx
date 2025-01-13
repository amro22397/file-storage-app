import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import queryString from "query-string"

const SearchBar = ({
    query,
    setQuery,
  }: {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
  }) => {


    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!searchTerm) return router.push('/dashboard/files')

        setLoading(true)

        const url = queryString.stringifyUrl({
            url: '/dashboard/files',
            query: {
                searchTerm: searchTerm,
            }
        }, {skipNull: true})

        router.push(url)
        setSearchTerm("");


        setLoading(false)
    }

    console.log(searchTerm)
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 items-center"
      >
        <Input type="text" defaultValue={searchTerm}
        onChange={(e: any) => setSearchTerm(e.target.value)}
         placeholder="your file names" />

        <Button
          size="sm"
          type="submit"
          className="flex gap-1"
        >
            {loading ? 
            <Loader2 className="h-4 w-4 animate-spin" /> : (
                <> <SearchIcon /> Search </>
            )}
          
        </Button>
      </form>
  </div>
  )
}

export default SearchBar

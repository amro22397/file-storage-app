'use client'

import { createContext, useState } from "react";

// should declare here the type of the things that i pass as props
type AppContextType = {
    isOpenMobileNav : boolean, 
    setIsOpenMobileNav: (value: boolean) => void
}

export const AppContext = createContext<AppContextType | null | any>(null)

interface Props {
    [propName: string]: any;
}


const AppContextProvider = (props : Props) => {

    const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);


    const contextValue = {
        isOpenMobileNav, setIsOpenMobileNav
    }


    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
    </AppContext.Provider>
    )

}

export default AppContextProvider
import { createContext, useContext, useState } from "react";


const InfoContext=createContext();

export const useInfo=()=> useContext(InfoContext);

export const InfoProvider=({children})=>{
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [msg,setMsg]=useState('');
    const openModal=()=>{
        setIsModalOpen(true);
    }

    const closeModal=()=>{
        setIsModalOpen(false);
    }

    const setMessage=(msg)=>{
        setMsg(msg);
    }

    return (
        <InfoContext.Provider value={{isModalOpen,openModal,closeModal,msg,setMessage}}>
            {children}
        </InfoContext.Provider>
    );
}
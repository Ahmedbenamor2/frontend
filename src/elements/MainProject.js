import React from 'react'
import { Outlet } from 'react-router-dom'
import { useInfo } from '../contexts/InfoContext'
import InfoPopup from './InfoPopup'

const MainProject = () => {
    const {msg,isModalOpen,closeModal}=useInfo();
    return (
        <>
        { isModalOpen && <InfoPopup isOpen={isModalOpen} onClose={() => closeModal()} message={msg} /> }
        <Outlet />
        </>
  )
}

export default MainProject;
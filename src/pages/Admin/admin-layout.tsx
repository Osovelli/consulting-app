import React from "react"
import Sidebar from "../Components/sidebar"

export const AdminLayout = ({children}: {
    children: React.ReactNode
}) => {
    return(
        <div className="flex relative">
            <Sidebar   />
            <main className="flex-1">
                {children}
            </main>
        </div>
        )
}

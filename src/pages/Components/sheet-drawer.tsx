import React, { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "../../components/ui/sheet"


export const SheetDrawer = ({children, isOpen, openChange, title}: {children: React.ReactNode, isOpen: boolean, openChange: any, title: string }) => {

  return (
    <Sheet open={isOpen} onOpenChange={openChange}>
      <SheetContent className="sm:max-w-md mx-auto bg-white">
        <SheetTitle className="px-2 text-lg capitalize">{title}</SheetTitle>
       {children} 
      </SheetContent>
    </Sheet>
  )
}
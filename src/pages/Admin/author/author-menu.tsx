import { useState } from "react";
import { SheetDrawer } from "../../Components/sheet-drawer";
import { AuthorForm } from "./author-form";
import AuthorDetails from "./author-detail";


export const AuthorMenu = ({isOpen, onClose, data, content}) => {
    const [isTitle, setIsTitle] = useState('Author');

    return(
        <SheetDrawer isOpen={isOpen} openChange={onClose} title={isTitle}>
            {/*<CreateServiceForm   />*/}
            {content === 'detail' ? (<AuthorDetails data={data}/>) : (<AuthorForm  />) }   
        </SheetDrawer>
    )
}
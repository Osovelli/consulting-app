import { useState } from "react";
import { SheetDrawer } from "../../Components/sheet-drawer";
import { CategoryForm } from "./category-form";
import CategoryDetails from "./category-detail";


export const CategoryMenu = ({isOpen, onClose, data, content}) => {
    const [isTitle, setIsTitle] = useState('Category');

    return(
        <SheetDrawer isOpen={isOpen} openChange={onClose} title={isTitle}>
            {/*<CreateServiceForm   />*/}
            {content === 'detail' ? (<CategoryDetails data={data}/>) : (<CategoryForm  />) }   
        </SheetDrawer>
    )
}
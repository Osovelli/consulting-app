import { useState } from "react";
import { SheetDrawer } from "../../Components/sheet-drawer";
import { CreateServiceForm } from "./service-form";
import ServiceDetails from "./service-detail";


export const ServiceMenu = ({isOpen, onClose, data, content}) => {
    const [isTitle, setIsTitle] = useState('service');

    return(
        <SheetDrawer isOpen={isOpen} openChange={onClose} title={isTitle}>
            {/*<CreateServiceForm   />*/}
            {content === 'detail' ? (<ServiceDetails data={data}/>) : (<CreateServiceForm  />) }   
        </SheetDrawer>
    )
}
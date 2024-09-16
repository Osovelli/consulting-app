import { Button } from "../../../components/ui/button";
import { Form } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../../components/ui/sheet"
import { Textarea } from "../../../components/ui/textarea";

type AppointmentSideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  Data: any; // Replace 'any' with your appointment data type
}

export function TestimonialSideMenu({ isOpen, onClose, Data,}: AppointmentSideMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-md font-hubot">
            <SheetTitle className="px-4 mt-2">
                Create testimonial
            </SheetTitle>
            <div className="p-4 h-full space-y-6">
                <h3 className="text-xs font-medium -mx-4 px-4 py-1 text-[#868C98] mb-2 uppercase bg-[#F6F8FA]">Testimonial information</h3>
                <form className="relative space-y-6 h-full">
                    <div className="flex justify-between gap-2">
                        <div className="gap-1">
                            <label className="capitalize text-sm font-medium" htmlFor="first name">
                                first name
                            </label>
                            <Input placeholder="John" className=""/>
                        </div>
                        <div>
                            <label className="capitalize text-sm font-medium" htmlFor="last name">
                                last name
                            </label>
                            <Input placeholder="Doe" className=""/>
                        </div>
                    </div>
                    <div className="relative">
                        <label className="capitalize text-sm font-medium" htmlFor="first name">
                            Testimonial text
                        </label>
                        <Textarea placeholder="placeholder text" rows={8} className="" />
                        <span className="text-xs absolute right-3 bottom-0 text-[#868C98]">0/200</span>
                    </div>
                    <div className="absolute bottom-20 w-full flex gap-2">
                        <Button variant={"outline"} className="flex-1">Cancel</Button>
                        <Button className="bg-[#C1FA6B] hover:text-white text-black flex-1">Create testimonial</Button>
                    </div>
                </form>
            </div>
        </SheetContent>
    </Sheet>
  )
}
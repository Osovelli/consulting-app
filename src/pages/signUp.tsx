import { useState } from "react"

import Footer from "./Components/footer"
import { AvatarGroup } from "./Components/avatarGroup"
import Ratings from "./Components/ratings"
import Modal from "./Components/modal"
import { Button } from "../components/ui/button"

export default function SignUp() {
    const [charCount, setCharCount] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCharCount(event.target.value.length)
      }

    return(
        <div className=" w-full min-h-screen flex bg-[#FEFCF9]">
            <div className="md:w-2/3 overflow-clip antialiased" style={{fontFamily: 'Hubot Sans'}}>
                <div className=" my-4 flex flex-col gap-4 px-16">
                    <div className="flex flex-col gap-3">
                        <span className="">
                            <img src="/logo.svg" alt="logo" />
                        </span>
                        <div className="">
                            <h2 className=" text-3xl font-semibold leading-none">Create your account</h2>
                            <p className=" text-sm">Enter the fields below to get started</p>
                        </div>
                    </div>
                    <form className="flex flex-col gap-4">
                        <div className="flex justify-between gap-2">
                            <div className=" flex flex-col gap-1 w-1/2">
                                <label className=" font-semibold" htmlFor="first name"> First Name</label>
                                <input className="rounded-sm border border-[#E2E4E9] pl-2 h-10" type="text" placeholder="John"/>
                            </div>
                            <div className=" flex flex-col gap-1 w-1/2">
                                <label className=" font-semibold" htmlFor="last name"> Last Name</label>
                                <input className="rounded-sm border border-[#E2E4E9] pl-2 h-10" type="text" placeholder="Doe"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className=" font-semibold" htmlFor="email address">
                                Email address
                            </label>
                            <input type="email" placeholder="user@debusinessconsulting.com" className="rounded-sm border border-[#E2E4E9] pl-2 h-10" />
                            <span className="flex items-center gap-1">
                                <svg width="12" 
                                height="12" 
                                viewBox="0 0 12 12" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z" fill="#1C7F4E"/>
                                </svg>
                                <p className="text-xs text-[#1C7F4E]">We will send a verification mail to this address</p>
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className=" font-semibold" htmlFor="phone number">
                                Phone number
                            </label>
                            <input type="tel" placeholder="0810 000 0000" className="rounded-sm border border-[#E2E4E9] pl-2 h-10" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className=" font-semibold" htmlFor="date of birth">
                                Date of birth
                            </label>
                            <input type="date" placeholder="DD / MM/ YYYY" className="rounded-sm border border-[#E2E4E9] pl-2 h-10" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className=" font-semibold" htmlFor="company's name">
                                Company's name
                            </label>
                            <input type="text" placeholder="Tesla Inc" className="rounded-sm border border-[#E2E4E9] pl-2 h-10" />
                        </div>
                        <div className="relative flex flex-col gap-1">
                            <label className=" font-semibold" htmlFor="Additional information">
                                Additional information
                            </label>
                            <textarea placeholder="Placeholder text..." maxLength={200} className="rounded-sm border border-[#E2E4E9] pl-2" rows={5} onChange={handleTextChange} />
                            <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">{charCount}/200</div>
                        </div>
                    </form>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => setIsModalOpen(true)} className=" bg-[#01170C] text-white py-2 rounded-md h-12">Create account</button>
                        <button className=" py-2 h-12">Already have an account? <span className=" text-[#1C7F4E]">Login</span></button>
                    </div>
                    <Modal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}>
                        <Modal.Body className=" flex items-start gap-4 max-w-sm md:max-w-lg">
                            <div className="bg-[#E6F1EB] p-2 rounded-md w-10 h-10">
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.9 4.5H20.1C20.3387 4.5 20.5676 4.59482 20.7364 4.7636C20.9052 4.93239 21 5.16131 21 5.4V18.6C21 18.8387 20.9052 19.0676 20.7364 19.2364C20.5676 19.4052 20.3387 19.5 20.1 19.5H3.9C3.66131 19.5 3.43239 19.4052 3.2636 19.2364C3.09482 19.0676 3 18.8387 3 18.6V5.4C3 5.16131 3.09482 4.93239 3.2636 4.7636C3.43239 4.59482 3.66131 4.5 3.9 4.5ZM12.054 12.3147L6.2832 7.4142L5.1177 8.7858L12.0657 14.6853L18.8886 8.7813L17.7114 7.4196L12.054 12.3147Z" fill="#1C7F4E"/>
                                    </svg>
                                </span>   
                            </div>
                            <div className=" flex flex-col gap-1">
                                <h3 className=" font-semibold">Verify Your Email Address</h3>
                                <p className=" text-md text-[#525866]">Thank you for signing up! We’ve sent a verification email to the address you provided. 
                                    Please check your inbox and click the verification link to complete your registration. 
                                    If you don’t see the email, check your spam or junk folder
                                </p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="flex justify-end gap-3">
                                <Button variant={"outline"} className=" bg-white text-[#525866]" onClick={() => setIsModalOpen(false)}>Dismiss</Button>
                                <Button className=" bg-[#C1FA6B] text-[#01170C] hover:text-white">Resend mail</Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Footer />
            </div>
            <div className="w-1/3 p-4 hidden lg:block" style={{'fontFamily': 'Hubot Sans'}}>
                <div className="bg-cover bg-yellow-texture h-full px-8 pt-8">
                    <div className="mt-8 mx-6 flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <h2 className=" text-xl tracking-wide font-semibold text-pretty">
                                Good design is pleasing to the eye, great design is invisible
                            </h2>
                            <p className="text-pretty text-md leading-5">
                                Create a free account. Start collecting better research data - 
                                no credit card or user contact required. Full name, Email address,
                                Password
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <AvatarGroup />
                            <Ratings />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
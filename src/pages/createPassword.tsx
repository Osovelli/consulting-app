import { Button } from "../components/ui/button";
import Footer from "./Components/footer";
import Modal from "./Components/modal";

import { useState } from "react";

export default function CreatePassword() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return(
        <div className=" bg-[#FEFCF9]">
            <div className=" min-h-screen w-full mb-32">
                <div className="flex justify-center mt-10">
                    <div className="py-10 space-y-6">
                        <div className="flex flex-col items-center px-4 max-w-lg">
                            <span>
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_3009_75647)">
                                        <rect x="4" y="2" width="56" height="56" rx="28" fill="white"/>
                                        <rect x="4.5" y="2.5" width="55" height="55" rx="27.5" stroke="#C1FA6B" stroke-opacity="0.6"/>
                                        <path d="M38.3 25.8H40.4C40.6785 25.8 40.9456 25.9106 41.1425 26.1076C41.3394 26.3045 41.4501 26.5715 41.4501 26.85V39.45C41.4501 39.7285 41.3394 39.9956 41.1425 40.1925C40.9456 40.3894 40.6785 40.5 40.4 40.5H23.6C23.3216 40.5 23.0545 40.3894 22.8576 40.1925C22.6607 39.9956 22.55 39.7285 22.55 39.45V26.85C22.55 26.5715 22.6607 26.3045 22.8576 26.1076C23.0545 25.9106 23.3216 25.8 23.6 25.8H25.7V24.75C25.7 23.0791 26.3638 21.4767 27.5453 20.2952C28.7268 19.1138 30.3292 18.45 32 18.45C33.6709 18.45 35.2733 19.1138 36.4548 20.2952C37.6363 21.4767 38.3 23.0791 38.3 24.75V25.8ZM36.2 25.8V24.75C36.2 23.6361 35.7576 22.5678 34.9699 21.7802C34.1822 20.9925 33.114 20.55 32 20.55C30.8861 20.55 29.8179 20.9925 29.0302 21.7802C28.2425 22.5678 27.8 23.6361 27.8 24.75V25.8H36.2ZM30.95 32.1V34.2H33.05V32.1H30.95ZM26.75 32.1V34.2H28.85V32.1H26.75ZM35.15 32.1V34.2H37.25V32.1H35.15Z" fill="#1C7F4E"/>
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_3009_75647" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="2"/>
                                            <feGaussianBlur stdDeviation="2"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.105882 0 0 0 0 0.109804 0 0 0 0 0.113725 0 0 0 0.04 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3009_75647"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3009_75647" result="shape"/>
                                        </filter>
                                    </defs>
                                </svg>
                            </span>
                            <div className=" flex flex-col items-center px-10 gap-3">
                                <h2 className=" text-4xl font-semibold text-center">Create your password</h2>
                                <p className=" text-center">To complete your registration, please create a secure password for your account.</p>
                            </div>
                        </div>
                        <form className="flex flex-col gap-4 px-4">
                            <div className="flex flex-col gap-1">
                                <label className=" font-semibold" htmlFor="password">
                                    Password
                                </label>
                                <input type="password" placeholder="• • • • • • • • • • " className=" relative rounded-sm border border-[#E2E4E9] pl-8 h-10 " />
                                <span className="absolute flex items-center pointer-events-none ml-2 mt-9">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.5 7H16C16.1989 7 16.3897 7.07902 16.5303 7.21967C16.671 7.36032 16.75 7.55109 16.75 7.75V16.75C16.75 16.9489 16.671 17.1397 16.5303 17.2803C16.3897 17.421 16.1989 17.5 16 17.5H4C3.80109 17.5 3.61032 17.421 3.46967 17.2803C3.32902 17.1397 3.25 16.9489 3.25 16.75V7.75C3.25 7.55109 3.32902 7.36032 3.46967 7.21967C3.61032 7.07902 3.80109 7 4 7H5.5V6.25C5.5 5.05653 5.97411 3.91193 6.81802 3.06802C7.66193 2.22411 8.80653 1.75 10 1.75C11.1935 1.75 12.3381 2.22411 13.182 3.06802C14.0259 3.91193 14.5 5.05653 14.5 6.25V7ZM4.75 8.5V16H15.25V8.5H4.75ZM9.25 11.5H10.75V13H9.25V11.5ZM6.25 11.5H7.75V13H6.25V11.5ZM12.25 11.5H13.75V13H12.25V11.5ZM13 7V6.25C13 5.45435 12.6839 4.69129 12.1213 4.12868C11.5587 3.56607 10.7956 3.25 10 3.25C9.20435 3.25 8.44129 3.56607 7.87868 4.12868C7.31607 4.69129 7 5.45435 7 6.25V7H13Z" fill="#868C98"/>
                                    </svg>
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-3">
                                    <span className=" h-1 w-1/3 bg-[#E2E4E9] block"></span>
                                    <span className=" h-1 w-1/3 bg-[#E2E4E9] block"></span>
                                    <span className=" h-1 w-1/3 bg-[#E2E4E9] block"></span>
                                </div>
                                <div className="flex flex-col gap-2 text-[#868C98] mb-2">
                                    <p className="text-base">Must contain at least;</p>
                                    <span className="flex gap-2 items-center">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#CDD0D5"/>
                                        </svg>
                                        <p className="text-center">At least 1 uppercase</p>
                                    </span>
                                    <span className="flex gap-2 items-center">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#CDD0D5"/>
                                        </svg>
                                        <p className="text-center">At least 1 number</p>
                                    </span>
                                    <span className="flex gap-2 items-center">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#CDD0D5"/>
                                        </svg>
                                        <p className="text-center">At least 8 characters</p>
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold" htmlFor="password">
                                        Confirm password
                                    </label>
                                    <input type="password" placeholder="• • • • • • • • • • " className=" relative rounded-sm border border-[#E2E4E9] pl-8 h-10 track " />
                                    <span className="absolute flex items-center pointer-events-none ml-2 mt-10">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.5 7H16C16.1989 7 16.3897 7.07902 16.5303 7.21967C16.671 7.36032 16.75 7.55109 16.75 7.75V16.75C16.75 16.9489 16.671 17.1397 16.5303 17.2803C16.3897 17.421 16.1989 17.5 16 17.5H4C3.80109 17.5 3.61032 17.421 3.46967 17.2803C3.32902 17.1397 3.25 16.9489 3.25 16.75V7.75C3.25 7.55109 3.32902 7.36032 3.46967 7.21967C3.61032 7.07902 3.80109 7 4 7H5.5V6.25C5.5 5.05653 5.97411 3.91193 6.81802 3.06802C7.66193 2.22411 8.80653 1.75 10 1.75C11.1935 1.75 12.3381 2.22411 13.182 3.06802C14.0259 3.91193 14.5 5.05653 14.5 6.25V7ZM4.75 8.5V16H15.25V8.5H4.75ZM9.25 11.5H10.75V13H9.25V11.5ZM6.25 11.5H7.75V13H6.25V11.5ZM12.25 11.5H13.75V13H12.25V11.5ZM13 7V6.25C13 5.45435 12.6839 4.69129 12.1213 4.12868C11.5587 3.56607 10.7956 3.25 10 3.25C9.20435 3.25 8.44129 3.56607 7.87868 4.12868C7.31607 4.69129 7 5.45435 7 6.25V7H13Z" fill="#868C98"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Button onClick={() => setIsModalOpen(true)} size={"lg"} className="h-12 rounded-lg text-lg font-normal hover:bg-[#1C7F4E]">
                                    Submit
                                </Button>
                                <Button variant={"outline"} size={"lg"} className="h-12 rounded-lg text-lg font-normal border-none">Cancel</Button>
                            </div>
                        </form>
                    </div>
                    <Modal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                    >
                        <Modal.Body className=" flex items-start gap-4 max-w-sm md:max-w-lg">
                            <div className="bg-[#E6F1EB] p-2 rounded-md w-10 h-10">
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.9 4.5H20.1C20.3387 4.5 20.5676 4.59482 20.7364 4.7636C20.9052 4.93239 21 5.16131 21 5.4V18.6C21 18.8387 20.9052 19.0676 20.7364 19.2364C20.5676 19.4052 20.3387 19.5 20.1 19.5H3.9C3.66131 19.5 3.43239 19.4052 3.2636 19.2364C3.09482 19.0676 3 18.8387 3 18.6V5.4C3 5.16131 3.09482 4.93239 3.2636 4.7636C3.43239 4.59482 3.66131 4.5 3.9 4.5ZM12.054 12.3147L6.2832 7.4142L5.1177 8.7858L12.0657 14.6853L18.8886 8.7813L17.7114 7.4196L12.054 12.3147Z" fill="#1C7F4E"/>
                                    </svg>
                                </span>   
                            </div>
                            <div className=" flex flex-col gap-1">
                                <h3 className=" font-semibold">Password set successfully</h3>
                                <p className=" text-md text-[#525866]">
                                    Your password has been created successfully! You can now log in to your account using your new password.
                                </p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="flex justify-end gap-3">
                                <Button variant={"outline"} className=" bg-white text-[#525866]" onClick={() => setIsModalOpen(false)}>Dismiss</Button>
                                <Button className=" bg-[#C1FA6B] text-[#01170C] hover:text-white">Login</Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <Footer />
        </div>
    )
}
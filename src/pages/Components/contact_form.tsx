import { Button } from "../../components/ui/button"


function ContactForm({ isOpen, onClose}) {
    if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="py-6 px-4 rounded-lg bg-white w-2/3 mx-auto my-4 h-auto">
        <div className="h-full flex md:flex-row flex-col">
            <div className="bg-[url('contact-image.png')] min-h-2/3 flex items-end md:w-2/5 rounded-lg">
                <div className="bg-[#fcfcfb3e] border-[#CDD1D566] bg-cover inset-x-0 bottom-0 mx-2 mb-3 rounded-lg p-3">
                    <div className="space-y-3">
                        <h3 className="text-lg text-white">You can reach us at:</h3>
                        <div className="min-h-full space-y-2">
                            <div className="flex gap-1 items-start h-full">
                                <div className="bg-white inline-block p-1 rounded-md">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.25 3.75H16.75C16.9489 3.75 17.1397 3.82902 17.2803 3.96967C17.421 4.11032 17.5 4.30109 17.5 4.5V15.5C17.5 15.6989 17.421 15.8897 17.2803 16.0303C17.1397 16.171 16.9489 16.25 16.75 16.25H3.25C3.05109 16.25 2.86032 16.171 2.71967 16.0303C2.57902 15.8897 2.5 15.6989 2.5 15.5V4.5C2.5 4.30109 2.57902 4.11032 2.71967 3.96967C2.86032 3.82902 3.05109 3.75 3.25 3.75ZM10.045 10.2622L5.236 6.1785L4.26475 7.3215L10.0547 12.2378L15.7405 7.31775L14.7595 6.183L10.045 10.2622Z" fill="#01170C"/>
                                    </svg>
                                </div>
                                <div className="text-white px-4">
                                    <h3 className="leading-none">Email</h3>
                                    <p>Get in touch by emailing <span className="font-normal">info@debusinessconsulting.com</span></p>
                                </div>
                            </div>
                            <div className="flex gap-1 items-start">
                                <div className="bg-white inline-block p-1 rounded-md">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.75 13.315V15.967C16.7501 16.1569 16.6781 16.3397 16.5487 16.4786C16.4192 16.6176 16.2419 16.7022 16.0525 16.7155C15.7247 16.738 15.457 16.75 15.25 16.75C8.62225 16.75 3.25 11.3778 3.25 4.75C3.25 4.543 3.26125 4.27525 3.2845 3.9475C3.29779 3.75808 3.38244 3.58076 3.52135 3.45131C3.66027 3.32186 3.84312 3.24991 4.033 3.25H6.685C6.77803 3.24991 6.86777 3.28439 6.9368 3.34677C7.00582 3.40914 7.0492 3.49494 7.0585 3.5875C7.07575 3.76 7.0915 3.89725 7.1065 4.0015C7.25555 5.04169 7.561 6.05337 8.0125 7.00225C8.08375 7.15225 8.03725 7.3315 7.90225 7.4275L6.28375 8.584C7.27334 10.8898 9.11091 12.7274 11.4167 13.717L12.5717 12.1015C12.619 12.0355 12.6878 11.9882 12.7664 11.9677C12.8449 11.9473 12.9281 11.9551 13.0015 11.9897C13.9503 12.4404 14.9617 12.7451 16.0015 12.8935C16.1058 12.9085 16.243 12.925 16.414 12.9415C16.5064 12.951 16.592 12.9944 16.6543 13.0634C16.7165 13.1324 16.7509 13.2221 16.7507 13.315H16.75Z" fill="#01170C"/>
                                    </svg>
                                </div>
                                <div className="text-white px-4">
                                    <h3 className="leading-none">Phone</h3>
                                    <p>Give us a call on 866 – 370 – 2996</p>
                                </div>
                            </div>
                            <div className="flex gap-1 items-start">
                                <div className="bg-white inline-block p-1 rounded-md">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.773 14.023L10 18.796L5.227 14.023C4.28301 13.079 3.64014 11.8763 3.3797 10.5669C3.11925 9.25752 3.25293 7.90032 3.76382 6.66693C4.27472 5.43353 5.13988 4.37933 6.24991 3.63764C7.35994 2.89594 8.66498 2.50006 10 2.50006C11.335 2.50006 12.6401 2.89594 13.7501 3.63764C14.8601 4.37933 15.7253 5.43353 16.2362 6.66693C16.7471 7.90032 16.8808 9.25752 16.6203 10.5669C16.3599 11.8763 15.717 13.079 14.773 14.023ZM10 10.75C10.3978 10.75 10.7794 10.592 11.0607 10.3107C11.342 10.0294 11.5 9.64783 11.5 9.25C11.5 8.85218 11.342 8.47065 11.0607 8.18934C10.7794 7.90804 10.3978 7.75 10 7.75C9.60218 7.75 9.22065 7.90804 8.93934 8.18934C8.65804 8.47065 8.5 8.85218 8.5 9.25C8.5 9.64783 8.65804 10.0294 8.93934 10.3107C9.22065 10.592 9.60218 10.75 10 10.75Z" fill="#01170C"/>
                                    </svg>
                                </div>
                                <div className="text-white px-4 ">
                                    <h3 className="leading-none">Location</h3>
                                    <p>Visit us at 1450 S Havana St, Aurora, CO 80012</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-4 md:px-24 py-24 font-hubot">
                <div className="flex">
                    <div className="space-y-1">
                        <h2 className="text-4xl font-medium">Get in touch with us</h2>
                        <p className="text-sm font-normal">Let's connect and see how we can help you achieve your goals.</p>
                    </div>
                </div>
                <div className="">
                    <form action="" className="space-y-4">
                        <div className="flex gap-2 w-full">
                            <div className="flex flex-1 flex-col space-y-1">
                                <label htmlFor="">First Name</label>
                                <input type="text" className="h-12 w-full border rounded-lg px-2" placeholder="e.g John" />
                            </div>
                            <div className="flex flex-1 flex-col space-y-1">
                                <label htmlFor="">Last name</label>
                                <input type="text" className="h-12 w-full border rounded-lg px-2" placeholder="e.g Doe" />
                            </div>                            
                        </div>
                        <div className="flex gap-2 w-full">
                            <div className="flex flex-1 flex-col space-y-1">
                                <label htmlFor="">Email</label>
                                <input type="text" className="h-12 w-full border rounded-lg px-2" placeholder="hello@deconsulting.com" />
                            </div>
                            <div className="flex flex-1 flex-col space-y-1">
                                <label htmlFor="">Phone number</label>
                                <input type="text" className="h-12 w-full border rounded-lg px-2" placeholder="0802 000 0000" />
                            </div>                            
                        </div>
                        <div className="space-y-2">
                            <h2>Your message</h2>
                            <div className="flex relative flex-col border rounded-md w-full">
                                <textarea 
                                rows={6}
                                className="p-2 rounded-lg"
                                placeholder="Placeholder text..."
                                 />
                            </div>
                            {/*<div className="absolute bottom-32 right-16 text-sm text-muted-foreground">0/200</div>*/}
                        </div>
                        <Button className="w-full bg-[#C1FA6B] text-black text-sm hover:text-white">Contact us</Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ContactForm
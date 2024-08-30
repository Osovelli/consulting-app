import { Button } from "../components/ui/button";
import Footer from "./Components/footer";

export default function CheckMail() {

    return(
        <div className=" font-hubot antialiased bg-[#FEFCF9]">
            <div className=" min-h-screen w-full mb-28">
                <div className="flex justify-center mt-10">
                    <div className="pt-48 space-y-6 ">
                        <div className="flex flex-col items-center px-4 max-w-lg">
                            <div className=" flex flex-col items-start px-4 gap-3">
                                <h2 className=" text-4xl font-semibold text-center">Check your email</h2>
                                <p className=" text-left text-base font-normal leading-3">
                                    We have sent the reset email to
                                </p>
                                <p className=" text-[#1C7F4E] text-left text-base font-normal leading-3">
                                    user@debusinessconsulting.com
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Button variant={"icon"} size={"lg"} className="h-12 rounded-lg text-base font-[500] border-none flex gap-1 items-center justify-start text-center">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.20433 9.9992L12.9168 13.7117L11.8563 14.7722L7.08333 9.9992L11.8563 5.2262L12.9168 6.2867L9.20433 9.9992Z" fill="#03713A"/>
                                </svg>
                                Back to
                                <a className=" text-[#1C7F4E]" href="/signup">
                                    Log in
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
import { Button } from "../components/ui/button";
import Footer from "./Components/footer";

export default function ResetPasswordComplete() {

    return(
        <div className=" font-hubot antialiased bg-[#FEFCF9]">
            <div className=" min-h-screen w-full mb-28">
                <div className="flex justify-center mt-10">
                    <div className="pt-48 space-y-6 ">
                        <div className="flex flex-col items-center px-4 max-w-lg">
                            <div className=" flex flex-col items-start px-4 gap-3">
                                <h2 className=" text-4xl font-medium text-center">Reset complete!</h2>
                                <p className=" text-left text-base font-normal leading-6">You have successfully completed your password reset. Log in with your new credentials to continue</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full px-8">
                            <Button size={"lg"} className="h-12 rounded-lg text-lg font-normal hover:bg-[#1C7F4E]">
                                Log in
                            </Button>
                            <Button variant={"outline"} size={"lg"} className="h-12 rounded-lg text-base font-[500] border-none flex gap-1 items-center text-center">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.20433 9.9992L12.9168 13.7117L11.8563 14.7722L7.08333 9.9992L11.8563 5.2262L12.9168 6.2867L9.20433 9.9992Z" fill="#03713A"/>
                                </svg>
                                Back to
                                <a className=" text-[#1C7F4E]" href="/signup">
                                    Home page
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
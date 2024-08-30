import { Button } from "../components/ui/button";
import Footer from "./Components/footer";

export default function ForgotPassword() {

    return(
        <div className=" font-hubot antialiased bg-[#FEFCF9]">
            <div className=" min-h-screen w-full mb-28">
                <div className="flex justify-center mt-10">
                    <div className="pt-48 space-y-6 ">
                        <div className="flex flex-col items-center px-4 max-w-lg">
                            <div className=" flex flex-col items-start px-4 gap-3">
                                <h2 className=" text-4xl font-semibold text-center">Reset your password</h2>
                                <p className=" text-left text-base font-normal leading-6">Have no fear. We’ll email you instructions to reset your password. </p>
                            </div>
                        </div>
                        <form className="flex flex-col gap-4 px-8">
                            <div className="flex flex-col gap-1">
                                <label className=" font-semibold" htmlFor="email">
                                    Email address
                                </label>
                                <input type="email" placeholder="user@debusinessconsulting.com" className="border- relative rounded-sm border border-[#E2E4E9] pl-8 h-10 " />
                                <span className="absolute flex items-center pointer-events-none ml-2 mt-10">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.25 3.75H16.75C16.9489 3.75 17.1397 3.82902 17.2803 3.96967C17.421 4.11032 17.5 4.30109 17.5 4.5V15.5C17.5 15.6989 17.421 15.8897 17.2803 16.0303C17.1397 16.171 16.9489 16.25 16.75 16.25H3.25C3.05109 16.25 2.86032 16.171 2.71967 16.0303C2.57902 15.8897 2.5 15.6989 2.5 15.5V4.5C2.5 4.30109 2.57902 4.11032 2.71967 3.96967C2.86032 3.82902 3.05109 3.75 3.25 3.75ZM16 6.9285L10.054 12.2535L4 6.912V14.75H16V6.9285ZM4.38325 5.25L10.0457 10.2465L15.6265 5.25H4.38325Z" fill="#868C98"/>
                                    </svg>
                                </span>
                            </div>   
                        </form>
                        <div className="flex flex-col gap-2 w-full px-8">
                            <Button size={"lg"} className="h-12 rounded-lg text-lg font-normal hover:bg-[#1C7F4E]">
                                Reset password
                            </Button>
                            <Button variant={"outline"} size={"lg"} className="h-12 rounded-lg text-base font-[500] border-none flex gap-1 items-center text-center">
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
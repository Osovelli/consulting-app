import { Link } from "react-router-dom"

export default function Footer() {
    return(
        <div className="flex flex-col px-8 justify-between font-hubot">
            <div className="flex flex-col md:flex-row justify-between py-12 gap-8">
                <div className="flex flex-col items-center gap-3"> 
                    <div className="space-y-3 flex-col gap-2 flex">
                        <img src="logo.png" alt="" className="" height={100} width={100}  />
                        <p className="text-sm font-normal text-[#4F4D55] text-center">You are just one step away from transforming</p>
                    </div>
                    <div className="flex md:justify-start justify-center gap-4 md:pt-6 text-sm font-medium text-[#525866]  w-full">
                        <Link to={"#"}>About Us</Link>
                        <Link to={"#"}>Contact</Link>
                        <Link to={"#"}>Blog</Link>
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className=" text-base font-medium">Subscribe to our newsletter</h3>
                    <div className="flex gap-2 items-center">
                        <input className="px-2 py-1 h-12  w-64 border rounded-md text-sm" type="email" placeholder="Enter your email" />
                        <button className="px-3 py-1 h-12 rounded-md bg-[#C1FA6B] text-sm">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className=" border-t-2 py-6 border-[#FFDAC2] flex justify-between">
                <p className="text-sm">© 2023 D&E Consulting - All rights reserved</p>
                <ul className="flex flex-col md:flex-row text-sm gap-2 md:gap-5 font-medium leading-4 text-right">
                    <li>Terms & Conditions</li>
                    <li>Cookies</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
        </div>
    )
}
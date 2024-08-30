import { useState } from "react"
import { Button } from "../components/ui/button"
import FeatureCard from "./Components/featureCard"
import TestimonialCard from "./Components/testimonialCard"
import Header from "./Components/header2"
import Footer from "./Components/home-footer"
import ServiceModal from "./Components/service_modal"
import AppointmentBookingModal from "./Components/appointment_booking"

export default function Homepage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

    const services = [
        {
            title: "Accounting and bookkeeping",
            content: "Keep your finances organized and stress-free with our expert accounting and bookkeeping services.",
            description: "You can immediately process an email, but only if it will take less than 2 minutes. This 2-minute rule enables you to reply to important emails, or take an action that has a priority. On the flip side it will protect your precious time from less important emails. Processing an email can mean several things like sending a reply, creating a to-do, or sharing an update to a colleague. As long as it takes you less than 2 minutes.\n\nIf you need more than 2 minutes to process the email, you can postpone it. My trick is to \"Star\" an email so it shows up in my Starred folder. Moving the email from the Inbox to Starred is primarily a mental win as it allows you to achieve Inbox Zero, and you know that everything in Starred requires a bit more attention.\n\nIf you need more than 2 minutes to process the email, you can postpone it. My trick is to \"Star\" an email so it shows up in my Starred folder. Moving the email from the Inbox to Starred is primarily a mental win as it allows you to achieve Inbox Zero, and you know that everything in Starred requires a bit more attention."
        },
        {
            title: "Financial analysis",
            content: "Gain clear insights and make informed decisions with our thorough financial analysis.",
            description: "You can immediately process an email, but only if it will take less than 2 minutes. This 2-minute rule enables you to reply to important emails, or take an action that has a priority. On the flip side it will protect your precious time from less important emails. Processing an email can mean several things like sending a reply, creating a to-do, or sharing an update to a colleague. As long as it takes you less than 2 minutes.\n\nIf you need more than 2 minutes to process the email, you can postpone it. My trick is to \"Star\" an email so it shows up in my Starred folder. Moving the email from the Inbox to Starred is primarily a mental win as it allows you to achieve Inbox Zero, and you know that everything in Starred requires a bit more attention.\n\nIf you need more than 2 minutes to process the email, you can postpone it. My trick is to \"Star\" an email so it shows up in my Starred folder. Moving the email from the Inbox to Starred is primarily a mental win as it allows you to achieve Inbox Zero, and you know that everything in Starred requires a bit more attention."
        },
        {
            title: "Payroll",
            content: "Ensure your team gets paid accurately and on time, every time.",
            description: "You can immediately process an email, but only if it will take less than 2 minutes. This 2-minute rule enables you to reply to important emails, or take an action that has a priority. On the flip side it will protect your precious time from less important emails. Processing an email can mean several things like sending a reply, creating a to-do, or sharing an update to a colleague. As long as it takes you less than 2 minutes.\n\nIf you need more than 2 minutes to process the email, you can postpone it. My trick is to \"Star\" an email so it shows up in my Starred folder. Moving the email from the Inbox to Starred is primarily a mental win as it allows you to achieve Inbox Zero, and you know that everything in Starred requires a bit more attention.\n\nIf you need more than 2 minutes to process the email, you can postpone it. My trick is to \"Star\" an email so it shows up in my Starred folder. Moving the email from the Inbox to Starred is primarily a mental win as it allows you to achieve Inbox Zero, and you know that everything in Starred requires a bit more attention."
        },
        {
            title: "Business and Individual Taxes",
            content: "Navigate tax season smoothly with our comprehensive tax services for both businesses and individuals.",
            description: "You can immediately process an email, but only if it will take less than 2 minutes. This 2-minute rule enables you to reply to important emails, or take an action that has a priority. On the flip side it will protect your precious time from less important emails. Processing an email can mean several things like sending a reply, creating a to-do, or sharing an update to a colleague. As long as it takes you less than 2 minutes.\n\nIf you need more than 2 minutes to process the email, you can postpone it. My trick is to \"Star\" an email so it shows up in my Starred folder. Moving the email from the Inbox to Starred is primarily a mental win as it allows you to achieve Inbox Zero, and you know that everything in Starred requires a bit more attention.\n\nIf you need more than 2 minutes to process the email, you can postpone it. My trick is to \"Star\" an email so it shows up in my Starred folder. Moving the email from the Inbox to Starred is primarily a mental win as it allows you to achieve Inbox Zero, and you know that everything in Starred requires a bit more attention."
        },
        // Add other services here...
    ];

    const openModal = (service: {title: string; content: string; description: string}) => {
        setSelectedService(service);
        setModalOpen(true);
    };

    const openAppointmentModal = () => {
        setModalOpen(false);
        setAppointmentModalOpen(true);
    };

    return(
        <div className="relative w-full px-2 md:px-20 gap-2">
            <Header />
            <div className=" font-hubot antialiased relative bg-slate-400 rounded-xl mt-6">
                <video className=" w-full rounded-xl" poster="" muted playsInline loop autoPlay>
                    <source 
                    src="https://docs.material-tailwind.com/demo.mp4"
                    type="video/mp4"
                     />
                     Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 w-full  md:h-full rounded-xl  bg-black bg-opacity-20 flex flex-col md:pt-15 xl:pt-[20rem] px-8 md:px-20 text-white gap-1">
                    <div className="absolute bottom-2 sm:bottom-20">
                    <h1 className="md:text-7xl text-2xl max-w-xs  md:max-w-4xl font-medium leading-6">
                        Empowering Your Financial Success Together.
                    </h1>
                    <p className=" text-xs leading-3 max-w-4xl md:text-lg font-light md:font-medium">
                        We build personal relationships to deliver tailored, 
                        results-driven solutions. Our expert team offers comprehensive services with a personal touch, 
                        committed to your success.
                    </p>
                    <div className="flex gap-2 md:mt-2 py-2 max-w-4xl">
                        <button className="px-3 md:py-2 md:gap-2 flex items-center text-gray-700 bg-[#C1FA6B] rounded-lg leading-3">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.75 10.315V12.967C13.7501 13.1569 13.6781 13.3397 13.5487 13.4786C13.4192 13.6176 13.2419 13.7022 13.0525 13.7155C12.7247 13.738 12.457 13.75 12.25 13.75C5.62225 13.75 0.25 8.37775 0.25 1.75C0.25 1.543 0.26125 1.27525 0.2845 0.9475C0.297792 0.758083 0.382436 0.580758 0.521353 0.451307C0.660269 0.321855 0.843117 0.249914 1.033 0.25H3.685C3.77803 0.249906 3.86777 0.284394 3.9368 0.346765C4.00582 0.409136 4.0492 0.494937 4.0585 0.5875C4.07575 0.76 4.0915 0.89725 4.1065 1.0015C4.25555 2.04169 4.561 3.05337 5.0125 4.00225C5.08375 4.15225 5.03725 4.3315 4.90225 4.4275L3.28375 5.584C4.27334 7.88984 6.11091 9.72741 8.41675 10.717L9.57175 9.1015C9.61896 9.0355 9.68784 8.98816 9.76637 8.96774C9.84491 8.94732 9.92812 8.95511 10.0015 8.98975C10.9503 9.4404 11.9617 9.74509 13.0015 9.8935C13.1058 9.9085 13.243 9.925 13.414 9.9415C13.5064 9.95098 13.592 9.99443 13.6543 10.0634C13.7165 10.1324 13.7509 10.2221 13.7507 10.315H13.75Z" fill="#01170C"/>
                            </svg>
                            <span>Schedule Appointment</span>
                        </button>
                        <button className="px-3 py-2 md:gap-2 flex items-center bg-white text-[#03713A] rounded-lg leading-4">
                            Contact us
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            <section className=" px-16 py-10">
                <div className="text-center flex flex-col justify-center items-center px-4 md:px-20  md:mx-36 leading-6">
                    <h2 className=" text-xl sm:text-5xl text-center font-medium inline-flex gap-2 whitespace-nowrap">
                        Discover how our tailored
                        {/*<span className="w-12 h-12 md:w-12 md:h-12 bg-[#FEE9D1] inline-block transform rotate-[-5deg]">
                            <img className="w-full h-full"src="guide_headshot_colin_FEE9D1-p-500.png.png" alt="headshot" />
                        </span>*/}
                        services
                    </h2>
                    <h2 className="text-xl md:text-5xl font-medium inline-flex whitespace-nowrap">
                        and expert team can transform your
                    </h2>
                    <h2 className="text-xl md:text-5xl text-center font-medium inline-flex gap-2"> 
                        Financial future
                        {/*<span className="w-12 h-12 md:w-12 md:h-12 inline">
                            <img className=""src="_Spending.png.png" alt="headshot" />
                        </span>*/}
                        
                    </h2>
                </div>
            </section>
            <section className="flex gap-2 pb-10 overflow-x-scroll">
                {services.map((service, index) => (
                        <FeatureCard 
                            key={index}
                            cardtitle={service.title}
                            cardContent={service.content}
                            onClick={() => openModal(service)}
                        />
                    ))}
                {/*<FeatureCard 
                cardtitle="Accounting and bookkeeping"
                cardContent="Keep your finances organized and stress-free with our expert accounting and bookkeeping services."
                />
                <FeatureCard 
                cardtitle="Financial analysis"
                cardContent="Gain clear insights and make informed decisions with our thorough financial analysis."
                />
                <FeatureCard
                className=""
                cardtitle="Payroll"
                cardContent="Ensure your team gets paid accurately and on time, every time."
                />
                <FeatureCard 
                cardtitle="Business and Individual Taxes"
                cardContent="Navigate tax season smoothly with our comprehensive tax services for both businesses and individuals."
                />*/}
            </section>
            <section className="-mx-20 relative font-hubot bg-[#01170C] space-y-2 p-20">
                <div className="absolute inset-0 bg-right-top mix-blend-color-dodge bg-no-repeat text-white bg-[url('globe-illustration-template.png')]">
                </div>
                <div>
                    <div className="max-w-lg">
                        <h1 className="text-white border-l-2 text-2xl md:text-4xl border-[#C1FA6B] px-2 leading-7 ">Explore our unique value</h1>
                        <h1 className="text-2xl md:text-4xl text-white px-2"> propositions today.</h1>
                    </div>
                    <div className="flex flex-col px-2 my-3 max-w-sm gap-8">
                        <p className="text-white text-sm font-thin">Introducing the extraordinary perks of teaming up with us!</p>
                        <Button size={"sm"} className=" bg-[#C1FA6B] text-black flex gap-3 items-center max-w-48 px-0">
                            Schedule consultation
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.129 5.22998L5.106 1.20698L6.1665 0.146484L12 5.97998L6.1665 11.8135L5.106 10.753L9.129 6.72998H0V5.22998H9.129Z" fill="#01170C"/>
                            </svg>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2  p-2 max-w-5xl">
                    <div className="flex-none border border-[#C1FA6B]  space-y-3 max-w-full sm:max-w-xs p-6 rounded-xl">
                        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.920044" width="48" height="48" rx="12" fill="#C1FA6B"/>
                             <path d="M29.4279 29.0753L33.2826 32.9291L32.0091 34.2026L28.1553 30.3479C26.7214 31.4974 24.9378 32.1227 23.1 32.12C18.6288 32.12 15 28.4912 15 24.02C15 19.5488 18.6288 15.92 23.1 15.92C27.5712 15.92 31.2 19.5488 31.2 24.02C31.2026 25.8578 30.5774 27.6414 29.4279 29.0753ZM27.6225 28.4075C28.7647 27.2329 29.4026 25.6584 29.4 24.02C29.4 20.5388 26.5803 17.72 23.1 17.72C19.6188 17.72 16.8 20.5388 16.8 24.02C16.8 27.5003 19.6188 30.32 23.1 30.32C24.7384 30.3226 26.3129 29.6847 27.4875 28.5425L27.6225 28.4075Z" fill="#01170C"/>
                        </svg>
                        <div className="flex flex-col gap-4">
                            <h6 className=" text-white text-xl font-medium ">Brand Perception</h6>
                            <p className=" text-white font-light text-base">We ensure every interaction with your brand leaves a lasting, positive impression.</p>
                        </div>
                    </div>
                    <div className="flex-none border border-[#C1FA6B] space-y-3 max-w-full sm:max-w-xs p-6 rounded-xl">
                        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.333344" y="0.920044" width="48" height="48" rx="12" fill="#C1FA6B"/>
                            <path d="M24.2292 17.713C24.9705 17.2188 25.9335 17.2085 26.6852 17.6868L29.8016 19.67H31.0832C31.4974 19.67 31.8332 20.0058 31.8332 20.42V27.17C31.8332 27.5842 31.4974 27.92 31.0832 27.92H29.9434C29.988 28.6304 29.6533 29.3527 28.98 29.7567L25.1599 32.0488C24.6777 32.3381 24.079 32.3313 23.6069 32.0431C23.0817 32.5076 22.2732 32.5587 21.6866 32.0978L17.8311 29.0684C17.2562 28.6169 17.1109 27.8453 17.4077 27.2336C17.0452 26.9493 16.8333 26.5141 16.8333 26.0532V20.42C16.8333 20.0058 17.1691 19.67 17.5833 19.67H21.2935L24.2292 17.713ZM18.4628 26.1539L18.9818 25.6998C19.9045 24.8924 21.3037 24.9724 22.1284 25.8796L24.155 28.1089C24.8071 28.8263 24.9261 29.8802 24.4518 30.7243L28.2082 28.4705C28.4193 28.3439 28.4956 28.0907 28.4169 27.8775L25.0966 23.2292C24.9101 22.9681 24.5781 22.8545 24.2708 22.9467L22.4069 23.5059C21.614 23.7437 20.7546 23.5271 20.1693 22.9418L19.9498 22.7222C19.5238 22.2962 19.4136 21.6899 19.5929 21.17H18.3333V26.0532L18.4628 26.1539ZM25.8799 18.9523C25.6293 18.7929 25.3083 18.7963 25.0612 18.961L21.0104 21.6616L21.23 21.8812C21.4251 22.0762 21.7116 22.1485 21.9758 22.0692L23.8398 21.51C24.7618 21.2334 25.7577 21.574 26.3172 22.3573L29.2191 26.42H30.3332V21.17H29.8016C29.5163 21.17 29.2369 21.0887 28.9962 20.9355L25.8799 18.9523ZM19.9696 26.8286L18.7578 27.889L22.6134 30.9184L23.1413 29.9945C23.3025 29.7123 23.2637 29.3584 23.0451 29.1179L21.0184 26.8886C20.7435 26.5862 20.2772 26.5595 19.9696 26.8286Z" fill="#01170C"/>
                        </svg>
                        <div className="flex flex-col gap-4">
                            <h6 className=" text-white text-xl font-medium ">Investments & Acquisitions</h6>
                            <p className=" text-white font-light text-base">Trust our expertise to guide you to smart, attractive investments.</p>
                        </div>
                    </div>
                    <div className="flex-none border border-[#C1FA6B] space-y-3 max-w-full sm:max-w-xs p-6 rounded-xl">
                        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.666626" y="0.920044" width="48" height="48" rx="12" fill="#C1FA6B"/>
                            <path d="M24.6666 15.02L32.0619 16.6634C32.4732 16.7552 32.7666 17.1197 32.7666 17.5418V26.5301C32.7666 28.3355 31.8639 30.0221 30.3618 31.0229L24.6666 34.82L18.9714 31.0229C17.4684 30.0212 16.5666 28.3355 16.5666 26.531V17.5418C16.5666 17.1197 16.86 16.7552 17.2713 16.6634L24.6666 15.02ZM24.6666 16.8641L18.3666 18.2636V26.5301C18.3666 27.7334 18.9678 28.8575 19.9695 29.5253L24.6666 32.6573L29.3637 29.5253C30.3654 28.8575 30.9666 27.7343 30.9666 26.531V18.2636L24.6666 16.865V16.8641ZM28.6734 21.5198L29.9469 22.7924L24.2193 28.52L20.4006 24.7013L21.6732 23.4287L24.2184 25.9739L28.6734 21.5189V21.5198Z" fill="#01170C"/>
                        </svg>
                        <div className="flex flex-col gap-4">
                            <h6 className=" text-white text-xl font-medium ">Crisis Management</h6>
                            <p className=" text-white font-light text-base">
                                From small businesses to big names, we offer honest, practical advice in any crisis or special situation
                            .</p>
                        </div>
                    </div>
                    <div className="flex-none border border-[#C1FA6B] space-y-3 max-w-full sm:max-w-xs p-6 rounded-xl">
                        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.920044" width="48" height="48" rx="24" fill="#C1FA6B"/>
                            <path d="M17.5857 16.8201H30.4143C30.5563 16.82 30.6963 16.8536 30.8229 16.9181C30.9494 16.9825 31.0589 17.076 31.1424 17.1909L34.5831 21.9213C34.6443 22.0054 34.6744 22.1082 34.6683 22.2121C34.6622 22.3159 34.6204 22.4145 34.5498 22.491L24.3303 33.5619C24.2493 33.6494 24.137 33.7012 24.0178 33.7059C23.8987 33.7106 23.7825 33.6679 23.6949 33.5871C23.6886 33.5817 20.2749 29.8836 13.4502 22.491C13.3796 22.4145 13.3378 22.3159 13.3317 22.2121C13.3256 22.1082 13.3557 22.0054 13.4169 21.9213L16.8576 17.1909C16.9411 17.076 17.0506 16.9825 17.1772 16.9181C17.3037 16.8536 17.4437 16.82 17.5857 16.8201ZM18.0447 18.6201L15.5247 22.0851L24 31.2651L32.4753 22.0851L29.9553 18.6201H18.0447Z" fill="#01170C"/>
                        </svg>
                        <div className="flex flex-col gap-4">
                            <h6 className=" text-white text-xl font-medium">Quality</h6>
                            <p className=" text-white font-light text-base">
                                Our team stays up-to-date with ever-changing tax laws to provide you with the latest, most accurate information.
                            </p>
                        </div>
                    </div>
                    <div className="flex-none border border-[#C1FA6B] space-y-3 max-w-full sm:max-w-xs p-6 rounded-xl">
                        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.333344" y="0.920044" width="48" height="48" rx="24" fill="#C1FA6B"/>
                            <path d="M16.2333 16.8201H32.4333C32.672 16.8201 32.901 16.9149 33.0697 17.0837C33.2385 17.2525 33.3333 17.4814 33.3333 17.7201V32.1201C33.3333 32.3588 33.2385 32.5877 33.0697 32.7565C32.901 32.9252 32.672 33.0201 32.4333 33.0201H16.2333C15.9946 33.0201 15.7657 32.9252 15.5969 32.7565C15.4282 32.5877 15.3333 32.3588 15.3333 32.1201V17.7201C15.3333 17.4814 15.4282 17.2525 15.5969 17.0837C15.7657 16.9149 15.9946 16.8201 16.2333 16.8201ZM17.1333 18.6201V31.2201H31.5333V18.6201H17.1333ZM19.8333 25.8201H21.6333V29.4201H19.8333V25.8201ZM23.4333 20.4201H25.2333V29.4201H23.4333V20.4201ZM27.0333 23.1201H28.8333V29.4201H27.0333V23.1201Z" fill="#01170C"/>
                        </svg>
                        <div className="flex flex-col gap-4">
                            <h6 className=" text-white text-xl font-medium">Results</h6>
                            <p className=" text-white font-light text-base">
                                You'll work closely with seasoned professionals to find the best solutions tailored to your needs.
                            </p>
                        </div>
                    </div>
                    <div className="flex-none border border-[#C1FA6B] space-y-3 max-w-full sm:max-w-xs p-6 rounded-xl">
                        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.666626" y="0.920044" width="48" height="48" rx="24" fill="#C1FA6B"/>
                            <path d="M24.6666 18.92C26.6095 18.92 28.3371 19.8429 29.4346 21.2771L27.6666 23.045H32.1666V18.545L30.5027 20.209C29.1287 18.509 27.0249 17.42 24.6666 17.42C20.5245 17.42 17.1666 20.7779 17.1666 24.92H18.6666C18.6666 21.6063 21.3529 18.92 24.6666 18.92ZM30.6666 24.92C30.6666 28.2338 27.9804 30.92 24.6666 30.92C22.7238 30.92 20.9962 29.9972 19.8987 28.563L21.6666 26.795H17.1666V31.295L18.8306 29.6311C20.2046 31.331 22.3083 32.42 24.6666 32.42C28.8087 32.42 32.1666 29.0621 32.1666 24.92H30.6666Z" fill="#01170C"/>
                        </svg>
                        <div className="flex flex-col gap-4">
                            <h6 className=" text-white text-xl font-medium">Consistency</h6>
                            <p className=" text-white font-light text-base">
                                Delivering exceptional service to your customers is key to your long-term success, and we’re here to ensure it.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-4 space-y-8 font-hubot">
                <div className="py-4">
                    <div className="flex gap-2 items-center py-1">
                        <h4 className=" text-3xl">Latest articles</h4>
                        <Button variant={"clearlink"} className="pt-5">
                            See all
                            <span className="">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.7958 10.9192L7.08334 7.20674L8.14384 6.14624L12.9168 10.9192L8.14384 15.6922L7.08334 14.6317L10.7958 10.9192Z" fill="#1C7F4E"/>
                                </svg>
                            </span>
                        </Button>
                    </div>
                    <p className="text-base font-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor 
                        incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 pb-8">
                    <div className="inline-block w-full sm:w-auto space-y-3">
                        <div className="">
                            <img className="block w-full" src="image 1.png" alt="" />
                            <div className="py-2">
                                <p className="max-w-xs break-words font-medium">
                                    Lorem ipsum dolor sit amet,  adipiscing elit, adipiscing amet.
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#FEF3EB] inline-block p-1">
                            <p className="text-[#6E330C] text-xs tracking-wide font-semibold align-middle">
                                TECHNOLOGY
                            </p>
                        </div>
                    </div>
                    <div className="inline-block w-full sm:w-auto space-y-3">
                        <div className="">
                            <img className="block w-full" src="image 1.png" alt="" />
                            <div className="py-2">
                                <p className="max-w-xs break-words font-medium">
                                    Lorem ipsum dolor sit amet,  adipiscing elit, adipiscing amet.
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#FEF3EB] inline-block p-1">
                            <p className="text-[#6E330C] text-xs tracking-wide font-semibold align-middle">
                                FINANCE
                            </p>
                        </div>
                    </div>
                    <div className="inline-block w-full sm:w-auto space-y-3">
                        <div className="">
                            <img className="block w-full" src="image 1.png" alt="" />
                            <div className="py-2">
                                <p className="max-w-xs break-words font-medium">
                                    Lorem ipsum dolor sit amet,  adipiscing elit, adipiscing amet.
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#FEF3EB] inline-block p-1">
                            <p className="text-[#6E330C] text-xs tracking-wide font-semibold align-middle">
                                ART
                            </p>
                        </div>
                    </div>
                    <div className="inline-block w-full sm:w-auto space-y-3">
                        <div className="">
                            <img className="block w-full" src="image 1.png" alt="" />
                            <div className="py-2">
                                <p className="max-w-xs break-words font-medium">
                                    Lorem ipsum dolor sit amet,  adipiscing elit, adipiscing amet.
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#FEF3EB] inline-block p-1">
                            <p className="text-[#6E330C] text-xs tracking-wide font-semibold align-middle">
                                BUSINESS
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="-mx-20 font-hubot space-y-8 bg-[#FEF3EB] px-20 py-10">
                <div className="flex flex-col justify-center items-center">
                    <h4 className=" text-3xl text-[#6E330C] font-medium">What our clients say</h4>
                    <p className=" text-base text-[#F17B2C] text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <div className=" flex flex-wrap gap-6 justify-center">
                    <TestimonialCard 
                    cardContent="I was glad the day I discovered Kuzco’s poison. As the name indicates, 
                    it makes the process of creating content for publication incredibly easy."
                    cardFooter={{
                        image: "Ellipse.png",
                        header: "Ahamd Ekstrom Bothman",
                        content: "Lead Product Designer, Google"
                    }}
                    />
                    <TestimonialCard 
                    cardContent="I was glad the day I discovered Kuzco’s poison. As the name indicates, 
                    it makes the process of creating content for publication incredibly easy."
                    cardFooter={{
                        image: "Ellipse.png",
                        header: "Ahamd Ekstrom Bothman",
                        content: "Lead Product Designer, Google"
                    }}
                    />
                    <TestimonialCard 
                    cardContent="I was glad the day I discovered Kuzco’s poison. As the name indicates, 
                    it makes the process of creating content for publication incredibly easy."
                    cardFooter={{
                        image: "Ellipse.png",
                        header: "Ahamd Ekstrom Bothman",
                        content: "Lead Product Designer, Google"
                    }}
                    />
                    <TestimonialCard 
                    cardContent="I was glad the day I discovered Kuzco’s poison. As the name indicates, 
                    it makes the process of creating content for publication incredibly easy."
                    cardFooter={{
                        image: "Ellipse.png",
                        header: "Ahamd Ekstrom Bothman",
                        content: "Lead Product Designer, Google"
                    }}
                    />
                </div>
                <div className="py-8">
                    <div className="relative inline-block border rounded-xl overflow-hidden">
                        <img src="case-studies-accountant..jpg.png" alt="" className="w-full h-auto" />
                        <div className="absolute inset-0 bg-[#090E0B66] md:px-4 md:pr-28">
                            <div className="space-y-0 md:space-y-4 mt-3 md:mt-44 m-2 mr-10">
                                <h3 className=" text-white md:text-4xl text-wrap">
                                    Ready to experience financial excellence? Let's start
                                     your journey to success today!
                                </h3>
                                <div className="flex flex-row gap-1 md:gap-2 md:mt-2 py-2 md:max-w-4xl">
                                    <button className="px-3 py-2 gap-2 flex items-center text-xs md:text-base text-gray-700 bg-[#C1FA6B] rounded-lg leading-3">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.75 10.315V12.967C13.7501 13.1569 13.6781 13.3397 13.5487 13.4786C13.4192 13.6176 13.2419 13.7022 13.0525 13.7155C12.7247 13.738 12.457 13.75 12.25 13.75C5.62225 13.75 0.25 8.37775 0.25 1.75C0.25 1.543 0.26125 1.27525 0.2845 0.9475C0.297792 0.758083 0.382436 0.580758 0.521353 0.451307C0.660269 0.321855 0.843117 0.249914 1.033 0.25H3.685C3.77803 0.249906 3.86777 0.284394 3.9368 0.346765C4.00582 0.409136 4.0492 0.494937 4.0585 0.5875C4.07575 0.76 4.0915 0.89725 4.1065 1.0015C4.25555 2.04169 4.561 3.05337 5.0125 4.00225C5.08375 4.15225 5.03725 4.3315 4.90225 4.4275L3.28375 5.584C4.27334 7.88984 6.11091 9.72741 8.41675 10.717L9.57175 9.1015C9.61896 9.0355 9.68784 8.98816 9.76637 8.96774C9.84491 8.94732 9.92812 8.95511 10.0015 8.98975C10.9503 9.4404 11.9617 9.74509 13.0015 9.8935C13.1058 9.9085 13.243 9.925 13.414 9.9415C13.5064 9.95098 13.592 9.99443 13.6543 10.0634C13.7165 10.1324 13.7509 10.2221 13.7507 10.315H13.75Z" fill="#01170C"/>
                                        </svg>
                                        <span>Schedule Appointment</span>
                                    </button>
                                    <button className="px-3 h-12 py-1 md:gap-2 text-xs md:text-base flex items-center bg-white text-[#03713A] rounded-lg leading-4">
                                        Contact us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <ServiceModal 
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={selectedService?.title}
                content={selectedService?.description}
                onschedule={openAppointmentModal}
            />
            <AppointmentBookingModal 
                isOpen={appointmentModalOpen}
                onClose={() => setAppointmentModalOpen(false)}
            />
        </div>
        
    )
}
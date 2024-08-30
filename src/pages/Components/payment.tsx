import Modal from "./modal";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setStatus, setSubmissionDate } from "../../store/applicationSlice";
import { RootState } from "../../store";


const PaymentForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const totalCost = useSelector((state: RootState) => state.progress.totalPrice);
  const dispatch = useDispatch();

  const handleSubmitApplication = (applicationData) => {
    const newApplication: ServiceCol = {
      id: generateUniqueId(), // Implement this function
      services: applicationData.services,
      documents: applicationData.documents.length,
      date: new Date().toISOString(),
      status: 'submitted',
    };
    addApplication(newApplication);
  };

 

  const addApplication = (newApplication: ServiceCol) => {
    setApplicationData(prevData => [...prevData, newApplication]);
  };


  const handlePayment = () => {
    // Process payment...
    dispatch(setStatus('submitted'));
    dispatch(setSubmissionDate(new Date().toISOString()));
    setIsModalOpen(true)
  };

  return (
    <div className="flex justify-center">
        <div className="w-96 p-5 border border-gray-200 rounded-lg font-sans">
      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-700">Card number</label>
        <input
          type="text"
          placeholder="1234 1234 1234 1234"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
        />
        <div className="flex gap-1 mt-1">
          {/* Replace these divs with actual card type icons */}
          <div className="w-6 h-6 bg-gray-200 rounded">
            <svg className="" xmlns="http://www.w3.org/2000/svg"  y="0px" width="" height="" viewBox="0 0 50 50">
                <path d="M 5 7 C 2.25 7 0 9.25 0 12 L 0 38 C 0 40.75 2.25 43 5 43 L 45 43 C 47.75 43 50 40.75 50 38 L 50 12 C 50 9.25 47.75 7 45 7 Z M 5 9 L 45 9 C 46.667969 9 48 10.332031 48 12 L 48 38 C 48 39.667969 46.667969 41 45 41 L 5 41 C 3.332031 41 2 39.667969 2 38 L 2 12 C 2 10.332031 3.332031 9 5 9 Z M 29.6875 19.40625 C 26.585938 19.40625 25 20.933594 25 22.875 C 25 26.386719 29.0625 25.914063 29.0625 27.71875 C 29.0625 28.023438 28.828125 28.75 27.125 28.75 C 25.417969 28.75 24.3125 28.09375 24.3125 28.09375 L 23.78125 30.46875 C 23.78125 30.46875 24.886719 31.09375 27 31.09375 C 29.113281 31.09375 32.03125 29.476563 32.03125 27.125 C 32.03125 24.296875 27.96875 24.074219 27.96875 22.8125 C 27.96875 22.167969 28.46875 21.6875 29.9375 21.6875 C 30.890625 21.6875 31.96875 22.40625 31.96875 22.40625 L 32.46875 19.96875 C 32.46875 19.96875 31.050781 19.40625 29.6875 19.40625 Z M 16.46875 19.625 L 13.78125 27.5625 C 13.78125 27.5625 13.597656 26.886719 13.53125 26.46875 C 11.996094 23.023438 9.5 21.75 9.5 21.75 L 11.875 30.75 L 15.125 30.75 L 19.625 19.625 Z M 20.78125 19.625 L 19.03125 30.75 L 22 30.75 L 23.78125 19.625 Z M 36.8125 19.625 L 31.96875 30.75 L 34.90625 30.75 L 35.5 29.15625 L 39.1875 29.15625 L 39.5 30.75 L 42.1875 30.75 L 39.90625 19.625 Z M 6.25 19.65625 C 6.25 19.65625 12.054688 21.453125 13.40625 25.8125 L 12.40625 20.75 C 12.40625 20.75 11.976563 19.65625 10.8125 19.65625 Z M 37.9375 22.84375 L 38.75 27.03125 L 36.3125 27.03125 Z"></path>
            </svg>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="" height="" viewBox="0 0 48 48">
                <linearGradient id="NgmlaCv2fU27PJOuiUvQVa_Sq0VNi1Afgmj_gr1" x1="20.375" x2="28.748" y1="1365.061" y2="1394.946" gradientTransform="translate(0 -1354)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00b3ee"></stop><stop offset="1" stop-color="#0082d8"></stop></linearGradient><path fill="url(#NgmlaCv2fU27PJOuiUvQVa_Sq0VNi1Afgmj_gr1)" d="M43.125,9H4.875C3.287,9,2,10.287,2,11.875v24.25C2,37.713,3.287,39,4.875,39h38.25	C44.713,39,46,37.713,46,36.125v-24.25C46,10.287,44.713,9,43.125,9z"></path><circle cx="17.053" cy="24.053" r="10.053" fill="#cf1928"></circle><linearGradient id="NgmlaCv2fU27PJOuiUvQVb_Sq0VNi1Afgmj_gr2" x1="20" x2="40.107" y1="24.053" y2="24.053" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fede00"></stop><stop offset="1" stop-color="#ffd000"></stop></linearGradient><circle cx="30.053" cy="24.053" r="10.053" fill="url(#NgmlaCv2fU27PJOuiUvQVb_Sq0VNi1Afgmj_gr2)"></circle><path fill="#d97218" d="M20,24.053c0,3.072,1.382,5.818,3.553,7.662c2.172-1.844,3.553-4.59,3.553-7.662	s-1.382-5.818-3.553-7.662C21.382,18.235,20,20.981,20,24.053z"></path>
            </svg>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="" height="" viewBox="0 0 48 48">
                <path fill="#1976D2" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"></path><path fill="#FFF" d="M22.255 20l-2.113 4.683L18.039 20h-2.695v6.726L12.341 20h-2.274L7 26.981h1.815l.671-1.558h3.432l.682 1.558h3.465v-5.185l2.299 5.185h1.563l2.351-5.095v5.095H25V20H22.255zM10.135 23.915l1.026-2.44 1.066 2.44H10.135zM37.883 23.413L41 20.018h-2.217l-1.994 2.164L34.86 20H28v6.982h6.635l2.092-2.311L38.767 27h2.21L37.883 23.413zM33.728 25.516h-4.011v-1.381h3.838v-1.323h-3.838v-1.308l4.234.012 1.693 1.897L33.728 25.516z"></path>
            </svg>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="" height="" viewBox="0 0 48 48">
                <path fill="#e21836" d="M10.09,9h11.585c1.617,0,2.623,1.362,2.246,3.039l-5.394,23.927c-0.381,1.671-2,3.034-3.618,3.034 H3.325C1.956,38.999,1.023,38.02,1,36.704c-0.004-0.237,0.021-0.484,0.079-0.739l5.396-23.927C6.852,10.362,8.471,9,10.09,9"></path><path fill="#00447c" d="M20.5,9h13.47c1.657,0,0.91,1.362,0.52,3.039l-5.527,23.928C28.575,37.637,28.696,39,27.035,39H13.38 c-1.39,0-2.336-0.955-2.379-2.246c-0.008-0.251,0.018-0.516,0.081-0.788l5.711-23.928C17.187,10.362,18.657,9,20.316,9"></path><path fill="#007b84" d="M33.273,9h11.401c1.183,0,2.039,0.727,2.266,1.773c0.044,0.204,0.064,0.42,0.059,0.645 c-0.005,0.2-0.031,0.408-0.079,0.62l-5.393,23.928C41.146,37.637,39.525,39,37.906,39h-11.58c-1.355,0-2.279-0.953-2.324-2.241 c-0.009-0.253,0.016-0.518,0.078-0.792l5.578-23.928C30.036,10.362,31.653,9,33.273,9z"></path><path fill="#fefefe" d="M19.364 18.117c-.325-.195-.905-.134-1.302.135-.396.263-.45.636-.126.833.319.189.902.134 1.296-.137C19.626 18.68 19.685 18.31 19.364 18.117zM42.308 19.376l-1.171 2.048L40.874 19l-1.24.294.454 3.963-1.415 2.293c-.038.054-.072.091-.119.107-.052.025-.118.03-.21.03h-.04L38 26.624l.75.001c.53-.002.904-.288 1.092-.625L44 19 42.308 19.376zM22.157 25l-.404.701C21.666 25.854 21.518 26 21.19 26h-.201l-.282.875h.668c.787 0 1.158-.431 1.158-.431h2.086l.301-.933h-1.752l.28-.51L22.157 25zM10.416 19.885c-.194.75-.341 1.24-.679 1.585-.233.238-.593.351-.923.35-.493 0-.91-.311-.883-.823.002-.038.007-.078.014-.119C8.187 19.531 9.242 16 9.242 16H7.275l-1.02 4.03c0 0-.25.968-.255 1.379-.004.313.047.569.164.785C6.54 22.879 7.652 23 8.288 23c1.088 0 1.731-.104 2.257-.424.839-.51 1.082-1.2 1.341-2.175C12.178 19.305 13 16 13 16h-1.595C11.405 16 10.417 19.883 10.416 19.885zM13.701 23l.705-2.869C14.559 20.065 14.709 20 14.851 20c.338 0 .414.281.397.393C15.234 20.529 14.658 23 14.658 23h1.404l.491-2.068c.204-.764.307-1.152.177-1.468C16.594 19.111 16.246 19 15.924 19c-.21 0-.596.073-.946.234-.127.061-.247.132-.374.202l.103-.438-1.493.234L12.25 23H13.701zM25.576 23l.705-2.869C26.434 20.065 26.584 20 26.726 20c.338 0 .414.281.397.393C27.109 20.529 26.533 23 26.533 23h1.404l.491-2.068c.204-.764.307-1.152.177-1.468C28.469 19.111 28.121 19 27.799 19c-.21 0-.596.073-.946.234-.127.061-.247.132-.374.202l.103-.438-1.493.234L24.125 23H25.576zM17 23L18.451 23 19.201 20 17.715 20.22zM35.424 16.62c-.414-.603-1.269-.615-2.257-.62-.001 0-.727 0-.727 0h-1.614L29 23h1.579l.665-2.5h.294c1.007 0 1.972-.014 2.809-.618.585-.426 1.033-.992 1.228-1.757.05-.187.09-.41.096-.633C35.678 17.199 35.588 16.847 35.424 16.62zM33.742 18.19c-.115.467-.428.86-.822 1.049-.324.16-.721.137-1.125.136h-.252L32.175 17c.142 0 .38 0 .62 0 .75 0 .988.477.986.875C33.781 17.978 33.768 18.084 33.742 18.19zM28.47 29c0 0-.075.219-.099.293-.02.063-.1.207-.327.207h-.419V29H26.5v2.5c-.007.183.179.5.998.5h.932l.286-.876-.84.001c-.25 0-.245-.116-.248-.3-.003-.2-.003-.575-.003-.575h.794c.73 0 .89-.606.946-.787L29.474 29H28.47z"></path><path fill="#fefefe" d="M28.824 25c-1.502 0-1.795.67-1.795.67L27.235 25h-1.21l-1.979 6.083c-.021.07-.048.18-.046.299C24.006 31.664 24.174 32 24.964 32l.718-.001L26.002 31c0 0-.36 0-.485 0-.157 0-.125-.13-.125-.13l.709-2.152h1.778c1.47 0 1.743-.9 1.875-1.31L30.538 25C30.538 25 29.369 25 28.824 25zM28.298 28h-2.001l.206-.604h2.005L28.298 28zM28.822 26.518c0 0-1.012-.01-1.175.02-.717.124-1.018.508-1.018.508L26.967 26h2.023L28.822 26.518zM37.507 19.234c0 0-.01.04-.028.111C37.325 19.179 37.07 19 36.668 19c-.5 0-.937.179-1.45.617-.451.39-.677.926-.811 1.439-.052.19-.083.491-.083.694 0 1.25 1.082 1.25 1.345 1.25.395 0 .71-.151.965-.347C36.602 22.776 36.543 23 36.543 23h1.451L39 19 37.507 19.234zM36.098 22.116c-.063 0-.438 0-.429-.411.004-.203.052-.43.125-.691.17-.608.399-1.139 1-1.139.47 0 .461.377.26 1.133-.058.217-.221.609-.348.8C36.521 22.086 36.31 22.116 36.098 22.116zM23.768 19.493C23.471 19.12 22.93 19.001 22.366 19c-.339 0-1.149.031-1.796.579-.465.396-.69.934-.831 1.449-.142.525-.316 1.471.596 1.824C20.616 22.968 21.025 23 21.29 23c.675.001 1.372-.174 1.908-.695.413-.422.614-1.051.685-1.31C24.114 20.138 23.964 19.737 23.768 19.493zM21.429 22.115c-.063 0-.438 0-.429-.411.004-.203.06-.471.125-.691.169-.572.4-1.139 1-1.139.47 0 .461.377.26 1.133-.058.217-.221.609-.348.8C21.852 22.086 21.641 22.116 21.429 22.115zM20.847 27.115L20.556 28h.846l-.248.769h-.848L20 29.706h.845l-.536 1.639c-.072.217-.075.654.738.654h1.627L23 31c0 0-.931 0-1.181 0s-.183-.177-.183-.177l.368-1.132h1.746l.302-.921h-1.747L22.56 28h1.713l.297-.885H20.847zM39.7 27.916L40 27h-4.037l-.294.916h1.211l-.247.743h-1.232l-.263.812h1.082l-.963 1.265C35.18 30.847 35.017 31 34.749 31h-.486l.095-.289H33.94L35.479 26h.547l.172-.518c0 0 0 .381 0 .517 0 .434.125.626.821.626h.478L37.8 25.69h-.223c-.147.003-.217-.044-.205-.138V25c0 0-.799 0-1.25 0-1.175 0-1.903.055-2.193.132-.351.09-.807.357-.807.357L33.279 25H31.98l-1.862 5.722h-.28L29.52 31.69h2.874L32.293 32h1.229l.1-.31h.402L33.919 32h1.02c.259 0 .468-.058.642-.155.182-.101.325-.244.447-.407l.756-1.006.115 1.055C36.928 31.679 37.002 32 37.791 32h.568l.329-1h-.371c-.265 0-.322-.195-.337-.297l-.132-1.024h-.615l.25-.208h1.703l.268-.812h-1.585l.251-.743C38.12 27.916 39.7 27.916 39.7 27.916zM32.964 26h1.303l-.278.853c0 0-.462.028-.693.08-.393.09-.72.248-.72.248L32.964 26zM32.729 30.722h-1.306l.347-1.064h1.303L32.729 30.722zM33.408 28.622c0 0-.346.043-.574.095C32.435 28.832 31.979 29 31.979 29l.4-1.218h1.308L33.408 28.622z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-1 text-sm text-gray-700">Expiry</label>
          <input
            type="text"
            placeholder="MM / YY"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 text-sm text-gray-700">CVC</label>
          <input
            type="text"
            placeholder="CVC"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
          />
        </div>
      </div>
      
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-1 text-sm text-gray-700">Country</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-base appearance-none bg-white">
            <option>United States</option>
            {/* Add more countries here */}
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-1 text-sm text-gray-700">ZIP</label>
          <input
            type="text"
            placeholder="90210"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
          />
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mt-5 mb-5">
        By providing your card information, you allow Techtolia to charge your card for
        future payments in accordance with their terms.
      </p>
      
      <button  onClick={handlePayment} className="w-full py-3 bg-indigo-600 text-white rounded-md text-base hover:bg-indigo-700 transition-colors">
        Pay Now €29.99
      </button>
    </div>
    <Modal 
    isOpen={isModalOpen} 
    onClose={() => setIsModalOpen(false)}>
        <Modal.Body className=" flex items-start gap-4 max-w-sm md:max-w-lg">
            <div className="bg-[#E6F1EB] p-2 rounded-md w-10 h-10">
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.3999 8.4001H19.1999C19.4386 8.4001 19.6675 8.49492 19.8363 8.6637C20.0051 8.83248 20.0999 9.0614 20.0999 9.3001V20.1001C20.0999 20.3388 20.0051 20.5677 19.8363 20.7365C19.6675 20.9053 19.4386 21.0001 19.1999 21.0001H4.7999C4.56121 21.0001 4.33229 20.9053 4.16351 20.7365C3.99472 20.5677 3.8999 20.3388 3.8999 20.1001V9.3001C3.8999 9.0614 3.99472 8.83248 4.16351 8.6637C4.33229 8.49492 4.56121 8.4001 4.7999 8.4001H6.5999V7.5001C6.5999 6.06793 7.16883 4.69442 8.18153 3.68172C9.19422 2.66902 10.5677 2.1001 11.9999 2.1001C13.4321 2.1001 14.8056 2.66902 15.8183 3.68172C16.831 4.69442 17.3999 6.06793 17.3999 7.5001V8.4001ZM15.5999 8.4001V7.5001C15.5999 6.54532 15.2206 5.62964 14.5455 4.95451C13.8704 4.27938 12.9547 3.9001 11.9999 3.9001C11.0451 3.9001 10.1294 4.27938 9.45432 4.95451C8.77919 5.62964 8.3999 6.54532 8.3999 7.5001V8.4001H15.5999ZM11.0999 13.8001V15.6001H12.8999V13.8001H11.0999ZM7.4999 13.8001V15.6001H9.2999V13.8001H7.4999ZM14.6999 13.8001V15.6001H16.4999V13.8001H14.6999Z" fill="#1C7F4E"/>
                    </svg>
                </span>   
            </div>
            <div className=" flex flex-col gap-1">
                <h3 className=" font-semibold">Application Submitted</h3>
                <p className=" text-md text-[#525866]">
                    Thank you! Your application has been submitted successfully. You will receive updates via text message and email.
                </p>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex justify-end gap-3">
                    <Button variant={"outline"} className=" bg-white text-[#525866]" onClick={() => setIsModalOpen(false)}>Go to dashboard</Button>
                    <Link to={"/application"} state={{ openDetails: true, }}>
                      <Button className=" bg-[#C1FA6B] text-[#01170C] hover:text-white">View application</Button>
                    </Link>
                </div>
            </Modal.Footer>
        </Modal>
    </div>
  );
};

export default PaymentForm;
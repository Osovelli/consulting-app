import ChatBox from "./chatbox";
import { useState } from "react";
import { MessageIcon } from "./icons";

const ApplicationDetails = ({ isOpen, onClose, applicationData }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'admin',
      name: 'Admin (Firstname Lastname)',
      text: 'Yeah ive already spoken to them and i think its going to;',
      date: '27.12.2024',
      avatar: '/avatars/Ellipse.png'
    },
    {
      sender: 'user',
      name: 'Amanda Klien',
      text: 'Hey there, ive had a look at the latest revisions and i think we are nearly there.',
      date: '27.12.2024',
      avatar: '/path_to_user_avatar.jpg'
    }
  ]);

  const [showChatbox, setShowChatbox] = useState(false);

  const handleSendMessage = (message) => {
    setMessages([...messages, {
      sender: 'user',
      name: 'Your Name',
      text: message,
      date: new Date().toLocaleDateString(),
      avatar: '/path_to_your_avatar.jpg'
    }]);
  };

  const toggleChatbox = () => {
    setShowChatbox(!showChatbox);
  };
  
  if (!isOpen || !applicationData || applicationData === 0) return null;

  const application = applicationData[0];

  return (
    <div className="flex">
      <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Application Details</h2>
          <div className="flex gap-1">
            <span onClick={toggleChatbox}>
              <MessageIcon />
            </span>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
          </div>
        </div>      
        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-gray-500">APPLICATION ID</h3>
            <p className="text-lg font-medium">#{application.id}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-500">STATUS</h3>
            <span className="inline-block px-2 py-1 text-sm font-semibold text-orange-700 bg-orange-100 rounded-full">
              {application.status}
            </span>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">DATE OF SUBMISSION</h3>
            <p className="text-xs">{application.date}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">{application.services}</h3>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Attached files</h4>
              {/*applicationData.attachedFiles.map((file, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{file}</span>
                </div>
              ))*/}
            </div>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Additional Information</h3>
            <p className="text-sm">{application.additionalInfo}</p>
          </div>
        </div>
      </div>
      {showChatbox && 
      <div className="absolute right-96 bottom-0 border bg-white shadow-lg p-6 overflow-y-auto">
        <ChatBox messages={messages} onSendMessage={handleSendMessage} setShowChat={setShowChatbox} />
      </div>}
    </div>
    
  );
};

export default ApplicationDetails;
import React, { useState } from 'react';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '../../components/ui/tabs';
import { Switch } from '../../components/ui/switch';
import { cn } from '../../lib/utils';

// Separate components for each tab
const ProfileTab = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    additionalInfo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile data submitted:', profileData);
    // Add logic to send data to backend
  };

  return (
    <div className='px-4 inline-block py-6'>
      <h2 className="text-base font-medium">Profile Settings</h2>
      <p className="text-sm font-normal mb-4">Edit your account information and preferences.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className='text-sm font-medium text-[#01170C]'>First Name</label>
          <input 
            name="firstName" 
            value={profileData.firstName} 
            onChange={handleInputChange} 
            placeholder="John"
            className="w-full h-12 p-2 border rounded-lg text-sm font-normal text-[#868C98]"
          />
        </div>
        <div>
          <label className='text-sm font-medium text-[#01170C]'>Last Name</label>
          <input 
            name="lastName" 
            value={profileData.lastName} 
            onChange={handleInputChange} 
            placeholder="Doe"
            className="w-full h-12 p-2 border rounded-lg text-sm font-normal text-[#868C98]"
          />
        </div>
        <div>
          <label className='text-sm font-medium text-[#01170C]'>Company's Name</label>
          <input 
            name="companyName" 
            value={profileData.companyName} 
            onChange={handleInputChange} 
            placeholder="Tesla Inc"
            className="w-full h-12 p-2 border rounded-lg text-sm font-normal text-[#868C98]"
          />
        </div>
        <div>
          <label className='text-sm font-medium text-[#01170C]'>Email Address</label>
          <input 
            name="email" 
            value={profileData.email} 
            onChange={handleInputChange} 
            placeholder="user@debusinessconsulting.com"
            className="w-full h-12 p-2 border rounded-lg text-sm font-normal text-[#868C98]"
          />
        </div>
        <div>
          <label className='text-sm font-medium text-[#01170C]'>Phone Number</label>
          <input 
            name="phoneNumber" 
            value={profileData.phoneNumber} 
            onChange={handleInputChange} 
            placeholder="0810 000 0000"
            className="w-full h-12 p-2 border rounded-lg text-sm font-normal text-[#868C98]"
          />
        </div>
        <div>
          <label className='text-sm font-medium text-[#01170C]'>Date of Birth</label>
          <input 
            name="dateOfBirth" 
            value={profileData.dateOfBirth} 
            onChange={handleInputChange} 
            placeholder="DD / YYYY / MM"
            className="w-full h-12 p-2 border rounded-lg text-sm font-normal text-[#868C98]"
          />
        </div>
        {/* Add similar inputs for other fields */}
        <div>
          <label htmlFor="additional info" className='text-sm font-medium text-[#01170C]'>
            Additonal Information
          </label>
          <textarea 
            name="additionalInfo" 
            value={profileData.additionalInfo} 
            onChange={handleInputChange} 
            placeholder="Additional information..." 
            rows={4}
            maxLength={200}
            className="w-full p-2 border rounded text-sm font-normal text-[#868C98]"
          />
        </div>
        <div className="flex space-x-4">
          <button type="button" className="flex-1 px-4 text-sm h-12 border rounded-lg font-medium">Discard</button>
          <button type="submit" className="flex-1 px-4 text-sm h-12 bg-[#C1FA6B] text-black rounded-lg font-medium">Apply Changes</button>
        </div>
      </form>
    </div>
  );
};

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState({
    push: false,
    email: true,
    sms: true
  });

  const notificationSettings = [
    {
      type: 'push',
      label: 'News and updates',
      description: 'Stay informed about the latest news, updates, and announcements.'
    },
    {
      type: 'email',
      label: 'Email Notifications',
      description: 'Receive notifications via email'
    },
    {
      type: 'sms',
      label: 'SMS Notifications',
      description: 'Receive text messages for important updates'
    }
  ];

  const handleToggle = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className='px-1 inline-block py-6'>
      <h2 className="text-base font-medium">Notification Settings</h2>
      <p className="text-sm font-normal mb-4 max-w-xs">Choose what and how you prefer to receive notifications.</p>
      
      <div className="space-y-4">
        {notificationSettings.map(({type, label, description}) => (
          <div key={type} className="flex items-start gap-2">
            <Switch className='data-[state=checked]:bg-[#C1FA6B] mt-1' 
            id={type}
            checked={notifications[type]} 
            onCheckedChange={() => handleToggle(type)} 
            />
            <div>
              <label htmlFor={type} className="capitalize text-sm font-medium">{label}</label>
              <p className="text-xs max-w-xs text-gray-500">{description}</p>
            </div>
          </div>
        ))}
        <div className='bg-[#F9FEF0] p-3 flex items-start gap-2'>
          <span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 7.4V11H8.6V7.4H7.4ZM7.4 5V6.2H8.6V5H7.4Z" fill="#1C7F4E"/>
            </svg>
          </span>
          <p className='text-xs font-normal max-w-72'>Maximize your app usage by leaving notification settings active.</p>
        </div>
        <div className="flex space-x-4">
          <button type="button" className="flex-1 px-4 text-sm h-12 border rounded-lg font-medium">Discard</button>
          <button type="submit" className="flex-1 px-4 text-sm h-12 bg-[#C1FA6B] text-black rounded-lg font-medium">Apply Changes</button>
        </div>
      </div>
    </div>
  );
};

const ChangePasswordTab = () => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    hasUppercase: false,
    hasNumber: false,
    hasMinLength: false
  });

  const [conditionsMet, setConditionsMet] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));

    if (name === 'new') {
      const newStrength = {
        hasUppercase: /[A-Z]/.test(value),
        hasNumber: /\d/.test(value),
        hasMinLength: value.length >= 8
      };
      setPasswordStrength(newStrength);
      setConditionsMet(Object.values(newStrength).filter(Boolean).length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords don't match!");
      return;
    }
    console.log('Password change submitted');
    // Add logic to send password change request to backend
  };

  //const strengthPercentage = Object.values(passwordStrength).filter(Boolean).length * 33.33;

  return (
    <div className='px-1 inline-block py-6'>
      <h2 className="text-base font-medium">Notification Settings</h2>
      <p className="text-sm font-normal mb-4 max-w-xs">Choose what and how you prefer to receive notifications.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="password">
                Current password
            </label>
            {}
            <input type="password" name='current' value={passwords.current} onChange={handleInputChange} placeholder="• • • • • • • • • • " className="relative rounded-xl border border-[#E2E4E9] pl-8 h-10 " />
            <span className="absolute flex items-center pointer-events-none ml-2 mt-9">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 7H16C16.1989 7 16.3897 7.07902 16.5303 7.21967C16.671 7.36032 16.75 7.55109 16.75 7.75V16.75C16.75 16.9489 16.671 17.1397 16.5303 17.2803C16.3897 17.421 16.1989 17.5 16 17.5H4C3.80109 17.5 3.61032 17.421 3.46967 17.2803C3.32902 17.1397 3.25 16.9489 3.25 16.75V7.75C3.25 7.55109 3.32902 7.36032 3.46967 7.21967C3.61032 7.07902 3.80109 7 4 7H5.5V6.25C5.5 5.05653 5.97411 3.91193 6.81802 3.06802C7.66193 2.22411 8.80653 1.75 10 1.75C11.1935 1.75 12.3381 2.22411 13.182 3.06802C14.0259 3.91193 14.5 5.05653 14.5 6.25V7ZM4.75 8.5V16H15.25V8.5H4.75ZM9.25 11.5H10.75V13H9.25V11.5ZM6.25 11.5H7.75V13H6.25V11.5ZM12.25 11.5H13.75V13H12.25V11.5ZM13 7V6.25C13 5.45435 12.6839 4.69129 12.1213 4.12868C11.5587 3.56607 10.7956 3.25 10 3.25C9.20435 3.25 8.44129 3.56607 7.87868 4.12868C7.31607 4.69129 7 5.45435 7 6.25V7H13Z" fill="#868C98"/>
                </svg>
            </span>
        </div>
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="password">
                New password
            </label>
            <input type="password" name='new' value={passwords.new} onChange={handleInputChange} placeholder="• • • • • • • • • • " className=" relative rounded-xl border border-[#E2E4E9] pl-8 h-10 " />
            <span className="absolute flex items-center pointer-events-none ml-2 mt-9">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 7H16C16.1989 7 16.3897 7.07902 16.5303 7.21967C16.671 7.36032 16.75 7.55109 16.75 7.75V16.75C16.75 16.9489 16.671 17.1397 16.5303 17.2803C16.3897 17.421 16.1989 17.5 16 17.5H4C3.80109 17.5 3.61032 17.421 3.46967 17.2803C3.32902 17.1397 3.25 16.9489 3.25 16.75V7.75C3.25 7.55109 3.32902 7.36032 3.46967 7.21967C3.61032 7.07902 3.80109 7 4 7H5.5V6.25C5.5 5.05653 5.97411 3.91193 6.81802 3.06802C7.66193 2.22411 8.80653 1.75 10 1.75C11.1935 1.75 12.3381 2.22411 13.182 3.06802C14.0259 3.91193 14.5 5.05653 14.5 6.25V7ZM4.75 8.5V16H15.25V8.5H4.75ZM9.25 11.5H10.75V13H9.25V11.5ZM6.25 11.5H7.75V13H6.25V11.5ZM12.25 11.5H13.75V13H12.25V11.5ZM13 7V6.25C13 5.45435 12.6839 4.69129 12.1213 4.12868C11.5587 3.56607 10.7956 3.25 10 3.25C9.20435 3.25 8.44129 3.56607 7.87868 4.12868C7.31607 4.69129 7 5.45435 7 6.25V7H13Z" fill="#868C98"/>
                </svg>
            </span>
        </div>
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="password">
                Confirm new password
            </label>
            <input type="password"  name='confirm' value={passwords.confirm} onChange={handleInputChange} placeholder="• • • • • • • • • • " className=" relative rounded-xl border border-[#E2E4E9] pl-8 h-10 " />
            <span className="absolute flex items-center pointer-events-none ml-2 mt-9">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 7H16C16.1989 7 16.3897 7.07902 16.5303 7.21967C16.671 7.36032 16.75 7.55109 16.75 7.75V16.75C16.75 16.9489 16.671 17.1397 16.5303 17.2803C16.3897 17.421 16.1989 17.5 16 17.5H4C3.80109 17.5 3.61032 17.421 3.46967 17.2803C3.32902 17.1397 3.25 16.9489 3.25 16.75V7.75C3.25 7.55109 3.32902 7.36032 3.46967 7.21967C3.61032 7.07902 3.80109 7 4 7H5.5V6.25C5.5 5.05653 5.97411 3.91193 6.81802 3.06802C7.66193 2.22411 8.80653 1.75 10 1.75C11.1935 1.75 12.3381 2.22411 13.182 3.06802C14.0259 3.91193 14.5 5.05653 14.5 6.25V7ZM4.75 8.5V16H15.25V8.5H4.75ZM9.25 11.5H10.75V13H9.25V11.5ZM6.25 11.5H7.75V13H6.25V11.5ZM12.25 11.5H13.75V13H12.25V11.5ZM13 7V6.25C13 5.45435 12.6839 4.69129 12.1213 4.12868C11.5587 3.56607 10.7956 3.25 10 3.25C9.20435 3.25 8.44129 3.56607 7.87868 4.12868C7.31607 4.69129 7 5.45435 7 6.25V7H13Z" fill="#868C98"/>
                </svg>
            </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            {[1, 2, 3].map((num) => (
              <span 
                key={num}
                className={cn("h-1 w-1/3 block", 
                  conditionsMet >= num 
                    ? conditionsMet === 1 ? "bg-[#FF0000]" 
                      : conditionsMet === 2 ? "bg-[#F17B2C]" 
                      : "bg-[#1C7F4E]"
                    : "bg-[#E2E4E9]"
                )}
              ></span>
            ))}           
          </div>
            <div className="flex flex-col gap-2 text-[#868C98] mb-2">
                <p className="text-xs text-[#525866] font-normal">Must contain at least;</p>
                <span className="flex gap-2 items-center">
                  { passwordStrength.hasUppercase ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4018 8.4L9.6438 4.1574L8.7954 3.309L5.4018 6.7032L3.7044 5.0058L2.856 5.8542L5.4018 8.4Z" fill="#1C7F4E"/>
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM6 5.1516L4.3032 3.4542L3.4542 4.3032L5.1516 6L3.4542 7.6968L4.3032 8.5458L6 6.8484L7.6968 8.5458L8.5458 7.6968L6.8484 6L8.5458 4.3032L7.6968 3.4542L6 5.1516Z" fill="#868C98"/>
                    </svg>
                  )}
                    
                    <p className="text-center text-xs font-normal text-[#868C98]">At least 1 uppercase</p>
                </span>
                <span className="flex gap-2 items-center">
                  { passwordStrength.hasNumber ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4018 8.4L9.6438 4.1574L8.7954 3.309L5.4018 6.7032L3.7044 5.0058L2.856 5.8542L5.4018 8.4Z" fill="#1C7F4E"/>
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM6 5.1516L4.3032 3.4542L3.4542 4.3032L5.1516 6L3.4542 7.6968L4.3032 8.5458L6 6.8484L7.6968 8.5458L8.5458 7.6968L6.8484 6L8.5458 4.3032L7.6968 3.4542L6 5.1516Z" fill="#868C98"/>
                    </svg>
                  )}
                    <p className="text-center text-xs font-normal text-[#868C98]">At least 1 number</p>
                </span>
                <span className="flex gap-2 items-center">
                  { passwordStrength.hasMinLength ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4018 8.4L9.6438 4.1574L8.7954 3.309L5.4018 6.7032L3.7044 5.0058L2.856 5.8542L5.4018 8.4Z" fill="#1C7F4E"/>
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM6 5.1516L4.3032 3.4542L3.4542 4.3032L5.1516 6L3.4542 7.6968L4.3032 8.5458L6 6.8484L7.6968 8.5458L8.5458 7.6968L6.8484 6L8.5458 4.3032L7.6968 3.4542L6 5.1516Z" fill="#868C98"/>
                    </svg>
                  )}
                    <p className="text-center text-xs font-normal text-[#868C98]">At least 8 characters</p>
                </span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button type="button" className="flex-1 px-4 text-sm h-12 border rounded-lg font-medium">Discard</button>
            <button type="submit" className="flex-1 px-4 text-sm h-12 bg-[#C1FA6B] text-black rounded-lg font-medium">Apply Changes</button>
        </div>
      </form>
    </div>
  );
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="p-4 bg-[#e4eeecb9] font-hubot space-y-6">
      <h2 className='text-lg font-medium'>Account & Settings</h2>
      <div className='bg-white py-6 rounded-lg'>
      <Tabs value={activeTab} onValueChange={setActiveTab} className='px-2 mb-2 flex flex-col items-center'>
        <TabsList className='space-x-2 flex justify-center gap-4 w-full bg-white'>
          <div className='bg-[#e4eeecb9] px-1 py-1 rounded-xl w-96 flex'>
            <TabsTrigger className='flex-1'  value="profile">Profile</TabsTrigger>
            <TabsTrigger className='flex-1'  value="notifications">Notifications</TabsTrigger>
            <TabsTrigger className='flex-1'  value="changePassword">Change password</TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>

        <TabsContent value="changePassword">
          <ChangePasswordTab />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default Settings;

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
                        </form>
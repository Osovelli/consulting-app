import Sidebar from "./Components/sidebar";
import { AdminDashboard } from "./Admin/Dashboard";
import { AdminApplication } from "./Admin/application/application";
import { useState } from "react";
import { AdminClient } from "./Admin/client/client";
import { AdminPayment } from "./Admin/payment/payment";
import { AdminAppointment } from "./Admin/appointment/appointment";
import { AdminBlog } from "./Admin/blog/blog";
import { AdminTestimonial } from "./Admin/testimonial/testimonial";
import { AdminNewsletter } from "./Admin/newsletter/newsletter";
import CreateNewClientMenu from "./Admin/client/create-new-client";

const AdminApplications = () => {

    const [selectedItem, setSelectedItem] = useState('dashboard');
    const [openClientModal, setOpenClientModal] = useState(false);
      
    const handleSidebarItemClick = (item) => { 
        setSelectedItem(item);
    };

    console.log('page modal open: ', openClientModal)


    const renderMainContent = () => {
        switch (selectedItem) {
            case 'dashboard':
            return <AdminDashboard/>;
            case 'clients':
            return <AdminClient modalOpen={openClientModal} setModalOpen={setOpenClientModal}/>;
            case 'applications':
            return <AdminApplication />;
            case 'payments':
            return <AdminPayment />;
            case 'appointments':
            return <AdminAppointment />;
            case 'blog':
            return <AdminBlog />;
            case 'newsletter':
            return <AdminNewsletter />;
            case 'testimonials':
            return <AdminTestimonial />;
            default:
            return null;
        }
    };

    return (
      <div className="flex relative">
        <Sidebar onItemClick={handleSidebarItemClick} />
        <main className="flex-1">
          {renderMainContent()}
        </main>
        {openClientModal && (<div className='absolute inset-0 bg-[#1a19197b] z-50'>
        <CreateNewClientMenu onClose={() => setOpenClientModal(false)} />
      </div>)}
      </div>
    );
  };

export default AdminApplications;
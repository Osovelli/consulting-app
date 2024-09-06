import Sidebar from "./Components/sidebar";
import { AdminDashboard } from "./Components/Admin/Dashboard";
import { AdminApplication } from "./Components/Admin/application";
import { useState } from "react";
import { AdminClient } from "./Components/Admin/client";
import { AdminPayment } from "./Components/Admin/payment";
import { AdminAppointment } from "./Components/Admin/appointment";
import { AdminBlog } from "./Components/Admin/blog";
import { AdminTestimonial } from "./Components/Admin/testimonial";
import { AdminNewsletter } from "./Components/Admin/newsletter";
import CreateNewClientMenu from "./Components/Admin/create-new-client";

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
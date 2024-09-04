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

const AdminApplications = () => {

    const [selectedItem, setSelectedItem] = useState('dashboard');
      
    const handleSidebarItemClick = (item) => { 
        setSelectedItem(item);
    };


    const renderMainContent = () => {
        switch (selectedItem) {
            case 'dashboard':
            return <AdminDashboard/>;
            case 'clients':
            return <AdminClient />;
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
      <div className="flex">
        <Sidebar onItemClick={handleSidebarItemClick} />
        <main className="flex-1">
          {renderMainContent()}
        </main>
      </div>
    );
  };

export default AdminApplications;
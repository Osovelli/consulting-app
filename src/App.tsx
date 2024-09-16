import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
//import Header from './pages/Components/header';

import { AdminLayout } from './pages/Admin/admin-layout';
import { AdminDashboard } from './pages/Admin/Dashboard';
import { AdminClient } from './pages/Admin/client/client';
import CreateClientComponent from './pages/Admin/client/create-client';
import { AdminApplication } from './pages/Admin/application/application';
import { ApplicationReview } from './pages/Admin/application/application-review';
import { AdminPayment } from './pages/Admin/payment/payment';
import { AdminAppointment } from './pages/Admin/appointment/appointment';
import { AdminBlog } from './pages/Admin/blog/blog';
import BlogEditor from './pages/Admin/blog/blog-editor';
import { AdminNewsletter } from './pages/Admin/newsletter/newsletter';
import { NewsletterEditor } from './pages/Admin/newsletter/newsletter-editor';
import { AdminTestimonial } from './pages/Admin/testimonial/testimonial';
import { AdminServices } from './pages/Admin/services/services';
import { BlogCategory } from './pages/Admin/category/category';
import { BlogAuthor } from './pages/Admin/author/author';

function App() {
    return(
        <BrowserRouter>
            <Routes>         
                <Route path='/' element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                <Route path='/client' element={<AdminLayout><AdminClient  /></AdminLayout>} />
                <Route path='/create-client' element={<AdminLayout><CreateClientComponent /></AdminLayout>} />
                <Route path='/application' element={<AdminLayout><AdminApplication  /></AdminLayout>} />
                <Route path='/application/create-application' element={<AdminLayout><ApplicationReview application={''} onClose={() => {}} /></AdminLayout>} />
                <Route path='/payment' element={<AdminLayout><AdminPayment /></AdminLayout>} />
                <Route path='/appointment' element={<AdminLayout><AdminAppointment /></AdminLayout>} />
                <Route path='/blog' element={<AdminLayout><AdminBlog /></AdminLayout>} />
                <Route path='/blog/create-blog' element={<AdminLayout><BlogEditor /></AdminLayout>} />
                <Route path='/newsletter' element={<AdminLayout><AdminNewsletter /></AdminLayout>} />
                <Route path='/newsletter/create-newsletter' element={<AdminLayout><NewsletterEditor /></AdminLayout>} />
                <Route path='/testimonial' element={<AdminLayout><AdminTestimonial /></AdminLayout>} />
                <Route path='/service' element={<AdminLayout><AdminServices /></AdminLayout>} />
                <Route path='/blog/category' element={<AdminLayout><BlogCategory /></AdminLayout>} />
                <Route path='/blog/author' element={<AdminLayout><BlogAuthor /></AdminLayout>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

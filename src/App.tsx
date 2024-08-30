import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
//import Header from './pages/Components/header';
import SignUp from './pages/signUp';
import CreatePassword from './pages/createPassword';
import Login from './pages/login';
import ForgotPassword from './pages/forgotPassword';
import CheckMail from './pages/checkMail';
import NewPassword from './pages/setNewPassword';
import ResetPasswordComplete from './pages/resetComplete';
import Homepage from './pages/homepage';
import Application from "./pages/application"
import NewApplication from './pages/newApplication';
import Appointment from './pages/appointment';
//import { Settings } from 'lucide-react';
import ContactForm from './pages/contact_form';
import Blog from './pages/blog';
import BlogPost from './pages/blogpost';
import BlogGrid from './pages/Components/blog_grid';

const BlogPostWrapper = () => {
    const { id } = useParams();
    return <BlogPost posts={blogPosts} id={id} />;
  };

  const blogPosts = [
    {
      id: 1,
      image: 'blog-image.png',
      category: 'Productivity',
      title: 'The Legendary and Highest-Paid Software Engineer From Google',
      excerpt: 'Improving your designs with tactics instead of talent. - Every web developer inevitably runs into situations where they need to make...'
    },
    {
      id: 2,
      image: 'blog-image.png',
      category: 'Productivity',
      title: 'Lorem Ipsum Dolor anseda comet valur',
      excerpt: 'Improving your designs with tactics instead of talent. - Every web developer inevitably runs into situations where they need to make...'
    },
    {
      id: 3,
      image: 'blog-image.png',
      category: 'Productivity',
      title: 'The Legendary and Highest-Paid Software Engineer From Google',
      excerpt: 'Improving your designs with tactics instead of talent. - Every web developer inevitably runs into situations where they need to make...'
    },
    {
      id: 4,
      image: 'blog-image.png',
      category: 'Productivity',
      title: 'The Legendary and Highest-Paid Software Engineer From Google',
      excerpt: 'Improving your designs with tactics instead of talent. - Every web developer inevitably runs into situations where they need to make...'
    },
    {
      id: 5,
      image: 'blog-image.png',
      category: 'Productivity',
      title: 'The Legendary and Highest-Paid Software Engineer From Google',
      excerpt: 'Improving your designs with tactics instead of talent. - Every web developer inevitably runs into situations where they need to make...'
    },
    {
      id: 6,
      image: 'blog-image.png',
      category: 'Productivity',
      title: 'The Legendary and Highest-Paid Software Engineer From Google',
      excerpt: 'Improving your designs with tactics instead of talent. - Every web developer inevitably runs into situations where they need to make...'
    },
    {
      id: 7,
      image: 'blog-image.png',
      category: 'Productivity',
      title: 'The Legendary and Highest-Paid Software Engineer From Google',
      excerpt: 'Improving your designs with tactics instead of talent. - Every web developer inevitably runs into situations where they need to make...'
    },
]
function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/create-password' element={<CreatePassword />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/check-mail' element={<CheckMail />} />
                <Route path='/new-password' element={<NewPassword/>}/>
                <Route path='/password-reset-complete' element={<ResetPasswordComplete/>}/>
                <Route path='/application' element={<Application />} />
                <Route path='/application/create' element={<NewApplication/>} />
                <Route path='/appointment' element={<Appointment />}/>
                <Route path='/contact' element={<ContactForm />}/>
                <Route>
                    <Route path="/blog" element={<Blog posts={blogPosts} />} />
                    <Route path="/blog/:id" element={<BlogPost posts={blogPosts} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

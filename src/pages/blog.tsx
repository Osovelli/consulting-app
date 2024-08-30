import Header from "./Components/header"
import BlogGrid from "./Components/blog_grid"
import Footer from "./Components/home-footer"

function Blog({posts}) {

  return (
    <div className='w-full px-2 md:px-10 gap-2'>
       <Header  />
       <section className="relative h-[300px] w-full bg-cover bg-center text-white bg-[url('leave-image.jpg')] rounded-lg pb-6 my-6" >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                <div className="flex items-center mb-2">
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Productivity</span>
                    <span className="ml-3 text-sm">3 min read</span>
                </div>
                <h1 className="text-3xl font-bold mb-2 leading-tight">The Legendary and Highest-Paid Software Engineer From Google</h1>
                <p className="text-sm text-gray-200">Improving your designs with tactics instead of talent - Every web developer inevitably runs into situations where they need to make...</p>
            </div>
        </section>
        <section className="py-6 space-y-2">
            <ul className="flex gap-6">
                <li className="text-base font-medium">All categories</li>
                <li className="text-base font-medium">Design</li>
                <li className="text-base font-medium">Finance</li>
                <li className="text-base font-medium">Business</li>
                <li className="text-base font-medium">Healthcare</li>
                <li className="text-base font-medium">Science</li>
            </ul>
            <BlogGrid posts={posts}/>
        </section>
        <Footer />
    </div>
  )
}

export default Blog
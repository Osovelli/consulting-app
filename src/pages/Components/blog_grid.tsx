import { Link } from 'react-router-dom';
import { TablePagination } from './pagination';

const BlogCard = ({ post }) => (
  <Link to={`/blog/${post.id}`} className="group">
    <div className="font-hubot rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white flex">
        <div className='flex-1'>
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      <div className="p-4 flex-1">
        <span className="text-xs text-[#6E330C] font-semibold bg-[#FEF3EB] p-2 rounded-full">{post.category}</span>
        <h2 className="text-xl font-bold mt-2 group-hover:text-blue-600 transition-colors duration-300">{post.title}</h2>
        <p className="text-gray-600 mt-2 text-sm">{post.excerpt}</p>
        <span className="text-sm text-[#025A2E] font-semibold mt-4 inline-block group-hover:underline">View details &gt;</span>
      </div>
    </div>
  </Link>
);

const BlogGrid = ({ posts }) => (
  <div className="container mx-auto px-0 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
    <div className='flex justify-between items-center'>
        <div className='inline-block w-32'>
            <p className=''>Page 1 of 16</p>
        </div>
        <TablePagination  />
        <div>
            <button className='border py-1 px-4 rounded-lg'> 
                7/page
            </button>
        </div>
    </div>
    
  </div>
);

export default BlogGrid;
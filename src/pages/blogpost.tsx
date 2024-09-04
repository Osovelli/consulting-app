import { useParams } from 'react-router-dom';
import Header from './Components/header';

const AuthorInfo = ({ author }) => (
  <div className="flex items-center space-x-3 mt-4">
    <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full" />
    <span className="text-sm text-gray-600">{author.name}</span>
  </div>
);

const ShareButtons = () => (
  <div className="fixed left-4 top-1/4 flex flex-col space-y-4">
    {['facebook', 'twitter', 'linkedin', 'link', 'bookmark'].map(icon => (
      <button key={icon} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-xs">{icon[0].toUpperCase()}</span>
      </button>
    ))}
  </div>
);

const BlogPost = ({ posts}) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) return <div>Post not found</div>;

  return (
    <div className='px-8 font-hubot'>
        <Header />
        <div className='max-w-3xl mx-auto px-4'>
        <header className="mt-8 mb-2">
            <h1 className="text-3xl font-bold mb-2">Good design is pleasing to the eye, great design is invisible.</h1>
            <div className="flex items-center justify-center">
                <img src="/avatars/avatar1.png" alt="Author avatar" className="w-4 h-4 rounded-full mr-2" />
                <span className="text-gray-600">Lori Harvey</span>
            </div>
        </header>
        <div className="mb-8">
            <img src="/curve-orange.png" alt="Curved orange lines" className="w-full" />
        </div>
        <div className="mb-8 flex items-center flex-col">
            <p className="text-3xl font-medium  mb-4 text-center max-w-90">
                It's fairly common to associate a certain tool with a certain job or discipline. For example, when you think of bubble wrap, you probably think about packaging a fragile item.
            </p>
            <h2 className="text-2xl font-bold  mb-4 text-green-700">Introduction</h2>
            <p className="mb-4">
            {/*-- Paragraph content here -->*/}
            No matter what it is, almost no one’s first association with bubble wrap is home decor. Well, except for the two people who invented it. Bubble wrap was originally marketed as wallpaper. Yes, you read that right. It wasn’t until nearly three years after it originally came on the market that bubble wrap was presented as a way to protect fragile items. 
            Though that may seem odd, these types of shifts in use happen all the time. A product starts out in one lane, then as people get more access, they start using it in new and exciting ways. In fact, we’re starting to see one happen right now with a tool commonly associated with customer support: the shared inbox. 
            </p>
        </div>
        <div className="mb-8">
            <img src="/mountain-pic.png" alt="Mountain landscape" className="w-full object-cover" />
            <div className="text-sm text-gray-600 mt-2 flex gap-1 items-start">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.14876 8.49213L4.28755 10.3533C3.59243 11.0485 3.1927 11.9943 3.20001 12.9883C3.20731 13.9823 3.5983 14.9338 4.32639 15.6395C5.03196 16.3676 5.98374 16.7585 6.97759 16.7658C7.99411 16.7733 8.91753 16.3961 9.61268 15.701L11.4739 13.8398M13.8512 11.5079L15.7125 9.64668C16.4076 8.95157 16.8073 8.00577 16.8 7.01175C16.7927 6.01774 16.4017 5.06617 15.6736 4.36056C14.9682 3.65516 14.0166 3.26415 13.0226 3.25684C12.0286 3.24954 11.0826 3.62658 10.3875 4.32171L8.52627 6.18293M7.17759 12.7726L12.7612 7.18901" stroke="#4F4D55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div className=''>
                <h3 className='text-sm font-medium'>Image Title</h3>
                <p className='text-xs'>Exstention of the image and the name can go right here below</p>
              </div>
            </div>
        </div>
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Section title</h2>
            <p className="mb-4">
                {/*section content here*/}
            </p>
        </div>
        <footer className="mt-12 mb-8">
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <img src="author-avatar.jpg" alt="Author avatar" className="w-10 h-10 rounded-full mr-3" />
      <div>
        <p className="font-bold">Author Name</p>
        <p className="text-sm text-gray-600">Author title</p>
      </div>
    </div>
    <div className="flex space-x-4">
      {/*} Social media icons here */}
    </div>
  </div>
</footer>
        </div>
        
</div>
  );
};

export default BlogPost;
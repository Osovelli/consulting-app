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
    <div className='px-8 '>
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
            <p className="text-xl font-medium  mb-4 text-center max-w-80">
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
            <img src="mountains.jpg" alt="Mountain landscape" className="w-full" />
            <p className="text-sm text-gray-600 mt-2">Image caption</p>
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
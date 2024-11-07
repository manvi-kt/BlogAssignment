import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const BlogDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const blogData = useSelector((state: RootState) => state.blog.blogData);

  const blogPost = blogData.find((blog) => blog.id === id?.toString());

if (!blogPost) {
  return <p>Blog post not found.</p>;
}

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">{blogPost.title}</h1>
      <p className="text-lg text-gray-700">{blogPost.content}</p>
    </div>
  );
};

export default BlogDetailPage; 
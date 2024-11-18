import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../store';
import { addBlog, deleteBlog, updateBlog } from '../slices/blogSlice';
import { loginUser, logoutUser } from '@/slices/authSlice';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const CreateBlogPost: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const loggedIn = useSelector((state: RootState) => state.logged.loggedIn);
  const weeklyData = useSelector((state: RootState) => state.blog.weeklyData);
  const blogData = useSelector((state: RootState) => state.blog.blogData);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedContent, setEditedContent] = useState<string>(''); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginToggle = () => {
    loggedIn ? dispatch(logoutUser()) : dispatch(loginUser());
  };

  const handlePostBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedIn) {
      setErrorMessage('Please log in to post a blog.');
      return;
    }
    dispatch(addBlog({ title, content }));
    setTitle('');
    setContent('');
    setErrorMessage(null);
  };

  const handleSelectedDays = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleDeleteBlog = (id: string) => {
    if (!loggedIn) {
      setErrorMessage('Please log in to delete a blog post.');
      return;
    }
    dispatch(deleteBlog({ id }));
  };

  const handleEditBlog = (id: string, currentTitle: string, currentContent: string) => {
    if (!loggedIn) {
      setErrorMessage('Please log in to edit a blog post.');
      return;
    }
    setEditingBlogId(id);
    setEditedTitle(currentTitle); // Pre-fill title for editing
    setEditedContent(currentContent); // Pre-fill content for editing
  };

  const handleUpdateContent = (id: string) => {
    if (editedTitle.trim() !== '' && editedContent.trim() !== '') {
      dispatch(updateBlog({ id, title: editedTitle, content: editedContent }));
      setEditingBlogId(null);
      setEditedTitle('');
      setEditedContent('');
    }
  };

  const filterBlogs =
    selectedDays.length > 0
      ? blogData.filter((blog) => selectedDays.includes(blog.day))
      : blogData;

  const handleResetFilter = () => {
    setSelectedDays([]);
  };

  const handleNavigateToBlog = (id: string) => {
    router.push(`/blog/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar loggedIn={loggedIn} handleLoginToggle={handleLoginToggle} />

        <main className="flex-1 p-8 pt-24 pl-4">
          <div className="flex justify-between space-x-4">
            <div className="w-3/5 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Create a New Blog Post</h2>
              <form onSubmit={handlePostBlog}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="block text-gray-700 font-medium mb-1">
                    Content
                  </label>
                  <textarea
                    id="content"
                    className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Write your blog content here"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {errorMessage && (
                  <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                >
                  Post Blog
                </button>
              </form>
            </div>

            <div className="w-1/4 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Data</h3>
              <ul className="space-y-2">
                {Object.entries(weeklyData).map(([day, count]) => (
                  <li key={day} className="flex justify-between text-gray-600">
                    <span>{day}</span>
                    <span>{count} posts</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Day</h3>
            <div className="flex items-center space-x-4">
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    onChange={() => handleSelectedDays(day)}
                    checked={selectedDays.includes(day)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">{day}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleResetFilter}
              className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Reset
            </button>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Blog List</h3>
            {filterBlogs.length > 0 ? (
              <ul>
                {filterBlogs.map((blog) => (
                  <div className="flex justify-between" key={blog.id}>
                    <li className="border-b border-gray-200 py-4 w-full">
                      <h4
                        className="text-lg font-semibold"
                        onClick={() => handleNavigateToBlog(blog.id.toString())}
                      >
                        {blog.title}
                      </h4>
                      {editingBlogId === blog.id ? (
                        <div>
                          <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                          />
                          <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg resize-none"
                          />
                          <button
                            onClick={() => handleUpdateContent(blog.id)}
                            className="mt-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 hover:bg-green-800"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-600">{blog.content}</p>
                      )}
                    </li>
                    <div className="flex items-center ml-4 space-x-2">
                      {loggedIn && (
                        <>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="rounded-md border border-transparent p-2 text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleEditBlog(blog.id, blog.title, blog.content)}
                            className="rounded-md border border-transparent p-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No blogs available.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateBlogPost;

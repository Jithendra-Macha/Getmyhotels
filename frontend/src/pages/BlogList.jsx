import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const BlogList = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Blog</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Expert guides, insider tips, and destination insights to help you plan your perfect trip
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <Link
                            key={post.id}
                            to={`/blog/${post.slug}`}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                                        {post.category}
                                    </span>
                                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>{post.author}</span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 bg-primary rounded-lg p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Ready to Book Your Next Adventure?</h2>
                    <p className="mb-6 text-blue-100">
                        Find the best hotel deals across all destinations with Getmyhotels.com
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Search Hotels Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogList;

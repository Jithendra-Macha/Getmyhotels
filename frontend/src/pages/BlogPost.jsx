import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const BlogPost = () => {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return <Navigate to="/blog" />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm">
                    <Link to="/" className="text-primary hover:underline">Home</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link to="/blog" className="text-primary hover:underline">Blog</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-600">{post.title}</span>
                </nav>

                {/* Header */}
                <header className="mb-8">
                    <div className="mb-4">
                        <span className="bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full">
                            {post.category}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {post.title}
                    </h1>
                    <div className="flex items-center text-gray-600 text-sm space-x-4">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 md:h-96 object-cover"
                    />
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 mb-12">
                    <div className="prose prose-lg max-w-none">
                        {post.content.split('\n').map((paragraph, index) => {
                            // Handle headings
                            if (paragraph.startsWith('# ')) {
                                return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.substring(2)}</h1>;
                            }
                            if (paragraph.startsWith('## ')) {
                                return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.substring(3)}</h2>;
                            }
                            if (paragraph.startsWith('### ')) {
                                return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{paragraph.substring(4)}</h3>;
                            }
                            // Handle bold text
                            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                return <p key={index} className="font-semibold my-3">{paragraph.replace(/\*\*/g, '')}</p>;
                            }
                            // Handle list items
                            if (paragraph.startsWith('- ')) {
                                return <li key={index} className="ml-6 my-2">{paragraph.substring(2)}</li>;
                            }
                            if (/^\d+\./.test(paragraph)) {
                                return <li key={index} className="ml-6 my-2 list-decimal">{paragraph.substring(paragraph.indexOf('.') + 2)}</li>;
                            }
                            // Regular paragraphs
                            if (paragraph.trim()) {
                                return <p key={index} className="my-4 text-gray-700 leading-relaxed">{paragraph}</p>;
                            }
                            return null;
                        })}
                    </div>
                </div>

                {/* CTA Box */}
                <div className="bg-primary rounded-lg p-8 text-center text-white mb-12">
                    <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Hotel?</h2>
                    <p className="mb-6 text-blue-100">
                        Search and compare hotels across {post.category === 'Destinations' ? 'all NYC boroughs' : 'the best locations'} on Getmyhotels.com
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Start Your Search
                    </Link>
                </div>

                {/* Related Posts */}
                <div className="border-t pt-8">
                    <h3 className="text-2xl font-bold mb-6">More Travel Guides</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {blogPosts
                            .filter(p => p.id !== post.id)
                            .slice(0, 2)
                            .map(relatedPost => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.slug}`}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                                >
                                    <div className="h-32 overflow-hidden">
                                        <img
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                                            {relatedPost.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                            {relatedPost.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogPost;

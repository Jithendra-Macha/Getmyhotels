import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { destinations } from '../data/destinationData';
import Footer from '../components/Footer';

const DestinationPage = () => {
    const { slug } = useParams();
    const data = destinations[slug];

    useEffect(() => {
        if (data) {
            document.title = data.seo.title;
            let metaDesc = document.querySelector("meta[name='description']");
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = "description";
                document.head.appendChild(metaDesc);
            }
            metaDesc.content = data.seo.description;
        }
    }, [data]);

    if (!data) {
        return <div className="min-h-screen flex items-center justify-center">Destination not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <img
                    src={data.hero.image}
                    alt={data.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl tracking-tight">
                        {data.hero.headline}
                    </h1>
                    <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

                {/* Why Visit */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/3">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Visit <span className="text-purple-600">{data.name}</span>?</h2>
                            <div className="h-1.5 w-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
                        </div>
                        <div className="md:w-2/3 space-y-4 text-lg text-gray-700 leading-relaxed font-light">
                            {data.whyVisit.content.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* AI Intro */}
                <section className="bg-gradient-to-r from-gray-900 to-slate-800 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-sm border border-white/10">
                            <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            {data.aiIntro.headline}
                        </div>
                        <p className="text-2xl md:text-3xl font-medium leading-relaxed">
                            "{data.aiIntro.subtext}"
                        </p>
                    </div>
                </section>

                {/* Curated Hotels */}
                <section>
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Curated Stays</h2>
                            <p className="text-gray-500 mt-2">Handpicked for authenticity and fairness.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {data.curatedHotels.map(hotel => (
                            <div key={hotel.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                                <div className="relative h-64 overflow-hidden">
                                    <img src={hotel.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={hotel.name} />
                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                        {hotel.tags.map(tag => (
                                            <span key={tag} className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg">
                                        <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider">Starting at</span>
                                        <span className="text-xl font-extrabold text-gray-900">{hotel.price}</span>
                                    </div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                                        <p className="text-gray-600 mb-4">{hotel.description}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-6">
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span className="text-xs font-bold text-green-600 uppercase tracking-wide">{hotel.pricingNote}</span>
                                        </div>
                                        <Link to={`/hotel/${hotel.id}`} className="block w-full py-3 bg-gray-900 text-white text-center rounded-lg font-bold hover:bg-gray-800 transition-colors">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Local Tips */}
                <section className="bg-purple-50 rounded-2xl p-8 md:p-12 border border-purple-100">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="bg-white p-4 rounded-full shadow-md">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Travelers who loved <span className="text-purple-600">{data.localTips.hotelName}</span> also booked:
                            </h3>
                            <div className="space-y-4">
                                {data.localTips.tips.map((tip, idx) => (
                                    <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-transform hover:translate-x-2">
                                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm font-bold text-gray-600">{idx + 1}</span>
                                        <span className="font-semibold text-gray-800">{tip}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </div>
    );
};

export default DestinationPage;

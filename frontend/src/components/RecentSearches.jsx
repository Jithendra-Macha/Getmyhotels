import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecentSearches = () => {
    const [searches, setSearches] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSearches = async () => {
            // 1. Always load from LocalStorage first (Fast & works for Guests)
            try {
                const localData = JSON.parse(localStorage.getItem('recent_searches') || '[]');
                if (localData.length > 0) {
                    setSearches(localData);
                    setLoading(false);
                }
            } catch (e) {
                console.error("Error reading local searches", e);
            }

            // 2. If logged in, fetch from backend and merge/override
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('https://getmyhotels-backend.vercel.app/recent-searches', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.length > 0) {
                            // Ideally merge, but for now backend is source of truth if available
                            // Or we could display unique items from both?
                            // Let's just set searches to backend if it returns data, as it's more persistent
                            setSearches(data);
                        }
                    }
                } catch (err) {
                    console.error("Failed to fetch recent searches", err);
                }
            }

            setLoading(false);
        };

        fetchSearches();
    }, []);

    const handleSearchClick = (search) => {
        // Construct query params
        const params = new URLSearchParams({
            location: search.location,
            checkIn: search.check_in,
            checkOut: search.check_out,
            guests: search.guests
        });
        navigate(`/search?${params.toString()}`);
    };

    if (loading) return null;

    if (searches.length === 0) {
        return (
            <section className="animate-fade-in-up mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Recent Searches</h2>
                </div>
                <div className="p-8 text-center bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">Your recent searches will appear here</p>
                </div>
            </section>
        );
    }

    return (
        <section className="animate-fade-in-up mb-8">
            <div className="flex items-center gap-2 mb-6">
                <div className="bg-purple-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Recent Searches</h2>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {searches.map((search) => (
                    <div
                        key={search.id}
                        onClick={() => handleSearchClick(search)}
                        className="min-w-[280px] bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors truncate">{search.location}</h3>
                            <svg className="w-4 h-4 text-gray-300 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <span>{new Date(search.check_in).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(search.check_out).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span>{search.guests}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentSearches;

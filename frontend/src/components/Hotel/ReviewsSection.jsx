import React from 'react';

const ReviewsSection = ({ rating, count, distribution }) => {
    return (
        <div className="py-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
                {/* Header Stats */}
                <div className="w-full md:w-1/3 bg-gray-50 rounded-xl p-6">
                    <div className="text-center mb-4">
                        <div className="text-5xl font-bold text-gray-900 mb-2">{rating}</div>
                        <div className="text-yellow-400 text-xl mb-2">★★★★★</div>
                        <p className="text-gray-600 font-medium">Excellent</p>
                        <p className="text-sm text-gray-500">Based on {count} verified reviews</p>
                    </div>

                    {/* Breakdown Bars */}
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Cleanliness</span>
                            <div className="flex items-center flex-1 mx-3">
                                <div className="h-2 bg-gray-200 rounded-full flex-1">
                                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '98%' }}></div>
                                </div>
                            </div>
                            <span className="font-bold text-gray-900">4.9</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Comfort</span>
                            <div className="flex items-center flex-1 mx-3">
                                <div className="h-2 bg-gray-200 rounded-full flex-1">
                                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '96%' }}></div>
                                </div>
                            </div>
                            <span className="font-bold text-gray-900">4.8</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Value</span>
                            <div className="flex items-center flex-1 mx-3">
                                <div className="h-2 bg-gray-200 rounded-full flex-1">
                                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '94%' }}></div>
                                </div>
                            </div>
                            <span className="font-bold text-gray-900">4.7</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Location</span>
                            <div className="flex items-center flex-1 mx-3">
                                <div className="h-2 bg-gray-200 rounded-full flex-1">
                                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '98%' }}></div>
                                </div>
                            </div>
                            <span className="font-bold text-gray-900">4.9</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex-1">
                    <p className="text-sm font-bold text-gray-700 mb-3">Filter by traveler type:</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['Couples', 'Families', 'Solo', 'Business'].map(type => (
                            <button key={type} className="border border-gray-300 rounded-full px-4 py-1.5 text-sm text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors">
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Review Cards */}
            <div className="space-y-6">
                {[1, 2].map((i) => (
                    <div key={i} className="border-b border-gray-100 pb-6">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                    {i === 1 ? 'JS' : 'MK'}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{i === 1 ? 'Jessica S.' : 'Mike K.'}</div>
                                    <div className="text-xs text-green-600 font-medium flex items-center">
                                        ✅ Verified Stay • {i === 1 ? 'Feb 2026' : 'Jan 2026'}
                                    </div>
                                </div>
                            </div>
                            <div className="text-yellow-400 text-sm">★★★★★</div>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            {i === 1
                                ? "The owner walked us to the subway and gave us her favorite taco spot. Felt like locals in 10 minutes. The garden is magical in the morning."
                                : "No elevator, but the staff carried our bags immediately. The room was spotless and the neighborhood is perfect."}
                        </p>
                        {/* Owner Response */}
                        {i === 1 && (
                            <div className="bg-gray-50 p-4 rounded-lg ml-8 mt-2 border-l-4 border-primary">
                                <p className="text-xs font-bold text-gray-900 mb-1">Response from Lena & Tom (Owners)</p>
                                <p className="text-sm text-gray-600">So glad you enjoyed the taco recommendation, Jessica! Hope to see you again soon.</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button className="mt-4 text-primary font-bold hover:underline">Read all reviews</button>
        </div>
    );
};

export default ReviewsSection;

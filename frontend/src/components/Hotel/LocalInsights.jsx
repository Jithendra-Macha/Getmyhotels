import React from 'react';

const LocalInsights = ({ insights }) => {
    // Hardcoded for "Brooklyn" demo fallback
    const defaultTips = [
        {
            icon: "🥯",
            title: "Skip the bodega line",
            text: "'Sunrise Bagels' opens at 6 AM, two blocks east. Ask for the everything-on-rye."
        },
        {
            icon: "🚇",
            title: "To reach Manhattan",
            text: "Take the D train from 45th St — avoid R train after 8 PM on weekends (slower service)."
        },
        {
            icon: "🌳",
            title: "Hidden gem",
            text: "The tiny 'Peace Garden' behind the library — open 9 AM–4 PM, free to enter."
        }
    ];

    const tips = (insights && insights.length > 0) ? insights : defaultTips;

    return (
        <div className="py-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Local Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tips.map((tip, idx) => (
                    <div key={idx} className="bg-yellow-50 rounded-xl p-5 border border-yellow-100">
                        <div className="text-3xl mb-3">{tip.icon}</div>
                        <h3 className="font-bold text-gray-900 mb-1">{tip.title}</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            "{tip.text}"
                        </p>
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Curated by our local team</p>
        </div>
    );
};

export default LocalInsights;

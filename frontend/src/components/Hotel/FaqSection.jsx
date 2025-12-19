import React from 'react';

const FaqSection = () => {
    const faqs = [
        { q: "Is street parking available?", a: "Free after 7 PM and all day Sunday. Metered 8 AM–7 PM weekdays ($1.50/hr)." },
        { q: "Do you have elevators?", a: "No — this is a historic 3-story brownstone. Rooms 1 & 2 are ground floor." },
        { q: "How far is the subway?", a: "The F/G train at 7th Ave is a 2-minute walk." }
    ];

    return (
        <div className="py-8 border-t border-gray-100 mb-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-5">
                        <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                        <p className="text-gray-700 flex items-start gap-2">
                            <span className="text-lg">👉</span>
                            {faq.a}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FaqSection;

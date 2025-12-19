import React, { useState } from 'react';

const PricingWidget = ({ basePrice }) => {
    // State simulating a date range selection
    const [dates, setDates] = useState({ start: 'Feb 26', end: 'Feb 28' });
    const [guests, setGuests] = useState(2);
    const [extras, setExtras] = useState({
        breakfast: false,
        parking: false,
        lateCheckout: false
    });

    // Calculations
    const nights = 2;
    const taxes = Math.round(basePrice * 0.1475); // ~14.75% NYC tax
    const baseTotal = basePrice * nights;

    // Extra costs
    const COST_BREAKFAST = 18; // per person per night
    const COST_PARKING = 25; // per night
    const COST_LATE_CHECKOUT = 25; // flat

    const extraTotal =
        (extras.breakfast ? COST_BREAKFAST * guests * nights : 0) +
        (extras.parking ? COST_PARKING * nights : 0) +
        (extras.lateCheckout ? COST_LATE_CHECKOUT : 0);

    const grandTotal = baseTotal + (taxes * nights) + extraTotal;

    const toggleExtra = (key) => {
        setExtras(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sticky top-24">
            <div className="flex justify-between items-baseline mb-4">
                <div>
                    <span className="text-sm text-gray-500">From</span>
                    <span className="text-3xl font-bold text-gray-900 ml-1">${basePrice}</span>
                    <span className="text-gray-500 font-normal">/night</span>
                </div>
                <div className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                    All-inclusive
                </div>
            </div>

            {/* Date Selection Mock */}
            <div className="border border-gray-300 rounded-lg mb-4 overflow-hidden">
                <div className="flex border-b border-gray-300">
                    <div className="w-1/2 p-3 border-r border-gray-300 hover:bg-gray-50 cursor-pointer">
                        <div className="text-xs font-bold text-gray-700 uppercase">Check-in</div>
                        <div className="text-sm text-gray-900">{dates.start}</div>
                    </div>
                    <div className="w-1/2 p-3 hover:bg-gray-50 cursor-pointer">
                        <div className="text-xs font-bold text-gray-700 uppercase">Check-out</div>
                        <div className="text-sm text-gray-900">{dates.end}</div>
                    </div>
                </div>
                <div className="p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="text-xs font-bold text-gray-700 uppercase">Guests</div>
                    <div className="text-sm text-gray-900">{guests} guests</div>
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 text-sm">
                    <span className="underline decoration-dotted cursor-help" title={`$${basePrice} x ${nights} nights`}>
                        ${basePrice} x {nights} nights
                    </span>
                    <span>${baseTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                    <span className="underline decoration-dotted cursor-help" title="NYC Hotel Tax (14.75%) + occupancy fee">
                        Taxes & Fees
                    </span>
                    <span>${taxes * nights}</span>
                </div>

                {/* Optional Extras */}
                <div className="py-3 border-t border-b border-gray-100 space-y-3">
                    <p className="text-xs font-bold text-gray-500 uppercase">Customize Your Stay</p>

                    <label className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={extras.breakfast}
                                onChange={() => toggleExtra('breakfast')}
                                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">Farm Breakfast</span>
                        </div>
                        <span className="text-sm text-gray-500">+${COST_BREAKFAST * guests * nights}</span>
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={extras.parking}
                                onChange={() => toggleExtra('parking')}
                                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">Secure Parking</span>
                        </div>
                        <span className="text-sm text-gray-500">+${COST_PARKING * nights}</span>
                    </label>
                </div>

                <div className="flex justify-between items-center pt-2 font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>${grandTotal}</span>
                </div>
            </div>

            <button className="w-full bg-gradient-to-r from-primary to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow hover:shadow-lg transform transition hover:-translate-y-0.5">
                Reserve These Dates
            </button>

            <p className="text-center text-xs text-gray-500 mt-3">
                You won't be charged yet.
            </p>

            {/* Price Promise Badge */}
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-start gap-3">
                <div className="pt-0.5">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-gray-900">Price Promise</h4>
                    <p className="text-xs text-gray-600 leading-tight">
                        What you see is what you pay. No hidden resort fees or we'll refund you + $25.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PricingWidget;

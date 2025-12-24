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
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 sticky top-24 ring-1 ring-black/5">
            <div className="flex justify-between items-baseline mb-6 border-b border-gray-100 pb-4">
                <div>
                    <span className="text-sm text-gray-500 font-medium">From</span>
                    <span className="text-4xl font-heading font-bold text-gray-900 ml-2">${basePrice}</span>
                    <span className="text-gray-500 font-normal">/night</span>
                </div>
                <div className="text-xs font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                    All-inclusive
                </div>
            </div>

            {/* Date Selection Mock */}
            <div className="border border-gray-200 rounded-xl mb-6 overflow-hidden bg-white/50">
                <div className="flex border-b border-gray-200">
                    <div className="w-1/2 p-4 border-r border-gray-200 hover:bg-white transition-colors cursor-pointer">
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Check-in</div>
                        <div className="text-sm font-semibold text-gray-900">{dates.start}</div>
                    </div>
                    <div className="w-1/2 p-4 hover:bg-white transition-colors cursor-pointer">
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Check-out</div>
                        <div className="text-sm font-semibold text-gray-900">{dates.end}</div>
                    </div>
                </div>
                <div className="p-4 hover:bg-white transition-colors cursor-pointer">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Guests</div>
                    <div className="text-sm font-semibold text-gray-900">{guests} guests</div>
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-700 text-sm">
                    <span className="underline decoration-dotted decoration-gray-300 cursor-help" title={`$${basePrice} x ${nights} nights`}>
                        ${basePrice} x {nights} nights
                    </span>
                    <span className="font-medium">${baseTotal}</span>
                </div>
                <div className="flex justify-between text-gray-700 text-sm">
                    <span className="underline decoration-dotted decoration-gray-300 cursor-help" title="NYC Hotel Tax (14.75%) + occupancy fee">
                        Taxes & Fees
                    </span>
                    <span className="font-medium">${taxes * nights}</span>
                </div>

                {/* Optional Extras */}
                <div className="py-4 border-t border-b border-gray-100 space-y-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enhance Your Stay</p>

                    <label className="flex items-center justify-between cursor-pointer group select-none">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={extras.breakfast}
                                onChange={() => toggleExtra('breakfast')}
                                className="w-4 h-4 text-gray-900 rounded border-gray-300 focus:ring-gray-900 transition-colors"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Farm Breakfast</span>
                        </div>
                        <span className="text-sm text-gray-500">+${COST_BREAKFAST * guests * nights}</span>
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group select-none">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={extras.parking}
                                onChange={() => toggleExtra('parking')}
                                className="w-4 h-4 text-gray-900 rounded border-gray-300 focus:ring-gray-900 transition-colors"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Secure Parking</span>
                        </div>
                        <span className="text-sm text-gray-500">+${COST_PARKING * nights}</span>
                    </label>
                </div>

                <div className="flex justify-between items-center pt-2 text-xl font-heading font-bold text-gray-900">
                    <span>Total</span>
                    <span>${grandTotal}</span>
                </div>
            </div>

            <button className="w-full bg-gray-900 text-white font-bold py-4 px-4 rounded-xl shadow-xl hover:shadow-2xl hover:bg-black transition-all hover:scale-[1.02] active:scale-[0.98] text-lg">
                Reserve These Dates
            </button>

            <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                You won't be charged yet
            </p>

            {/* Price Promise Badge */}
            <div className="mt-6 bg-white/50 border border-white/50 rounded-xl p-4 flex items-start gap-4 backdrop-blur-sm">
                <div className="pt-0.5 p-1.5 bg-green-100 rounded-full">
                    <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-0.5">Price Guarantee</h4>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                        No hidden fees. We match any lower price you find within 24 hours of booking.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PricingWidget;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const SearchBar = () => {
    const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
    const [guests, setGuests] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize from URL params if available
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const loc = params.get('location');
        const ci = params.get('checkIn') || params.get('check_in');
        const co = params.get('checkOut') || params.get('check_out');
        const g = params.get('guests');

        if (loc) setValue(loc, false);
        if (ci) setDates(prev => ({ ...prev, checkIn: ci }));
        if (co) setDates(prev => ({ ...prev, checkOut: co }));
        if (g) setGuests(parseInt(g));
    }, [location.search]);

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            // types: ['(cities)'] // Restrict to cities
            // To allow counties/regions, we can remove the type restriction or use '(regions)'
            // Removing it allows mixing cities and regions which is usually best for UX
        },
        debounce: 300,
    });

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = ({ description }) => () => {
        setValue(description, false);
        clearSuggestions();
    };

    const handleSearch = (e) => {
        e.preventDefault();

        // Default to tomorrow/day after if dates missing
        let ci = dates.checkIn;
        let co = dates.checkOut;

        if (!ci) {
            ci = addDays(getToday(), 1);
        }
        if (!co) {
            co = addDays(ci, 1);
        }

        // Update state to match (optional but good UI)
        setDates({ checkIn: ci, checkOut: co });

        navigate(`/search?location=${value}&checkIn=${ci}&checkOut=${co}&guests=${guests}`);
    };

    // Helper to get today's date in YYYY-MM-DD format (local time)
    const getToday = () => {
        const d = new Date();
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d.toISOString().split('T')[0];
    };

    // Helper to add days to a date string
    const addDays = (dateStr, days) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        // Set to noon to avoid timezone issues when converting back
        date.setHours(12);
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    };

    const today = getToday();
    const minCheckOut = dates.checkIn ? addDays(dates.checkIn, 1) : addDays(today, 1);
    const maxCheckOut = dates.checkIn ? addDays(dates.checkIn, 28) : '';

    const handleCheckInChange = (e) => {
        const newCheckIn = e.target.value;
        setDates(prev => {
            const newDates = { ...prev, checkIn: newCheckIn };
            // If check-in is after current check-out, or check-out is > 28 days, reset check-out
            if (prev.checkOut && (newCheckIn >= prev.checkOut || (new Date(prev.checkOut) - new Date(newCheckIn)) / (1000 * 60 * 60 * 24) > 28)) {
                newDates.checkOut = '';
            }
            return newDates;
        });
    };

    return (
        <div className="bg-white p-2 rounded-xl shadow-2xl">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center">
                {/* Destination */}
                <div className="relative flex-grow md:w-1/3 p-2">
                    <div ref={ref} className="relative w-full">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-3 mb-1">Destination</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border-none rounded-lg bg-gray-50 focus:ring-0 focus:bg-white transition-colors text-gray-900 placeholder-gray-400 font-medium text-lg"
                                placeholder="Where are you going?"
                                value={value}
                                onChange={handleInput}
                                disabled={!ready}
                                required
                            />
                        </div>
                        {status === "OK" && (
                            <ul className="absolute z-50 bg-white border border-gray-100 w-full rounded-xl shadow-2xl mt-2 max-h-60 overflow-auto py-2">
                                {data.map((suggestion) => (
                                    <li
                                        key={suggestion.place_id}
                                        onClick={handleSelect(suggestion)}
                                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 flex items-center gap-3"
                                    >
                                        <span className="text-gray-400">📍</span>
                                        {suggestion.description}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 h-10 w-px bg-gray-200"></div>
                </div>

                {/* Check-in */}
                <div className="relative md:w-1/5 p-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-3 mb-1">Check-in</label>
                    <div className="relative">
                        <input
                            type="date"
                            min={today}
                            className="block w-full pl-3 pr-3 py-3 border-none rounded-lg bg-gray-50 focus:ring-0 focus:bg-white transition-colors text-gray-900 font-medium text-lg"
                            value={dates.checkIn}
                            onChange={handleCheckInChange}
                            required
                        />
                    </div>
                    <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 h-10 w-px bg-gray-200"></div>
                </div>

                {/* Check-out */}
                <div className="relative md:w-1/5 p-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-3 mb-1">Check-out</label>
                    <div className="relative">
                        <input
                            type="date"
                            min={minCheckOut}
                            max={maxCheckOut}
                            className="block w-full pl-3 pr-3 py-3 border-none rounded-lg bg-gray-50 focus:ring-0 focus:bg-white transition-colors text-gray-900 font-medium text-lg"
                            value={dates.checkOut}
                            onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
                            required
                            disabled={!dates.checkIn}
                        />
                    </div>
                    <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 h-10 w-px bg-gray-200"></div>
                </div>

                {/* Guests */}
                <div className="relative md:w-1/5 p-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-3 mb-1">Guests</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <select
                            className="block w-full pl-10 pr-8 py-2 border-none rounded-lg bg-gray-50 focus:ring-0 focus:bg-white transition-colors text-gray-900 font-medium appearance-none cursor-pointer"
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <div className="p-2 md:w-auto">
                    <button
                        type="submit"
                        className="w-full md:w-auto flex items-center justify-center py-4 px-8 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-105"
                    >
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;

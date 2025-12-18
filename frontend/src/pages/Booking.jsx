import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/bookings`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full bg-primary text-white py-3 px-4 rounded-md font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner">Processing...</div> : `Pay $${totalAmount}`}
                </span>
            </button>
            {message && <div id="payment-message" className="text-red-500 text-sm mt-2">{message}</div>}
        </form>
    );
};

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState("");

    // Mock data if not coming from details page
    const hotel = location.state?.hotel || {
        name: "Grand Hotel NYC",
        price_per_night: 250,
        image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    };
    const room = location.state?.room || { name: "Deluxe King Room", price: 250 };

    const totalAmount = room.price || room.price_per_night || 250; // Handle different data structures

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://getmyhotels-com.onrender.com/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                hotel_id: 1, // Placeholder
                room_id: 1, // Placeholder
                check_in: "2024-12-20",
                check_out: "2024-12-22"
            }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Secure Booking</h1>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="md:flex">
                        <div className="md:w-1/3">
                            <img src={hotel.image_url} alt={hotel.name} className="h-48 w-full object-cover md:h-full" />
                        </div>
                        <div className="p-6 md:w-2/3">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h2>
                            <p className="text-gray-600 mb-4">{room.name}</p>
                            <div className="flex justify-between items-center border-t pt-4">
                                <span className="text-gray-600">Total Price</span>
                                <span className="text-2xl font-bold text-primary">${totalAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h3>
                    {clientSecret ? (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm totalAmount={totalAmount} />
                        </Elements>
                    ) : (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;

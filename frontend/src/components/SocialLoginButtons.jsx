import React from 'react';

const SocialLoginButtons = () => {
    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
        // Implement actual social login logic here
        alert(`${provider} login coming soon!`);
    };

    return (
        <div className="space-y-3 mt-4">
            <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
                <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                Continue with Google
            </button>
            <button
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
                <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" />
                Continue with Facebook
            </button>
            <button
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
                <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475638/apple-color.svg" alt="Apple" />
                Continue with Apple
            </button>
        </div>
    );
};

export default SocialLoginButtons;

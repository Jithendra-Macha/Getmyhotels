import React, { useState } from 'react';

const ImageGallery = ({ mainImage, hotelName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock additional images for the "Brooklyn Brownstone" vibe since we only have one in the main data
    const galleryImages = [
        {
            url: mainImage,
            caption: "Main Facade: Classic 1920s Brownstone architecture",
            size: "col-span-2 row-span-2"
        },
        {
            url: "https://images.unsplash.com/photo-1512918760532-3edbed13ee1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            caption: "Garden View: Private backyard oasis for guests",
            size: "col-span-1 row-span-1"
        },
        {
            url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            caption: "Common Area: Cozy reading nook with vintage decor",
            size: "col-span-1 row-span-1"
        },
        {
            url: "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            caption: "Breakfast Nook: Fresh local pastries served daily",
            size: "col-span-1 row-span-1"
        },
        {
            url: "https://images.unsplash.com/photo-1505693416388-b0346efee958?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            caption: "Bedroom Detail: Original hardwood floors",
            size: "col-span-1 row-span-1"
        }
    ];

    return (
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
            <div className="grid grid-cols-4 grid-rows-2 gap-1 md:gap-2 h-96 md:h-[500px]">
                {galleryImages.map((img, idx) => (
                    <div
                        key={idx}
                        className={`relative group overflow-hidden cursor-pointer ${img.size}`}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <img
                            src={img.url}
                            alt={`${hotelName} - ${img.caption}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-sm font-medium">{img.caption}</p>
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-lg backdrop-blur-sm transition-all flex items-center gap-2 group z-10"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    View All Photos
                </button>
            </div>

            {/* Simple Lightbox Placeholder - could be expanded to a full carousel */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-lg">
                        <img
                            src={mainImage}
                            alt="Full view"
                            className="w-full h-full object-contain"
                        />
                        <p className="text-white text-center mt-4 text-lg font-light">
                            Gallery view implemented as a placeholder.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;

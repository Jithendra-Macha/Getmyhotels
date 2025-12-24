import React from 'react';

const ImmersiveHero = ({ images, hotelName, rating, location }) => {
    // Ensure we have at least 5 images for the grid, fill with placeholders if needed
    const gridImages = images && images.length > 0 ? images : [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ];

    // Safely slice to get 5
    const displayImages = [...gridImages, ...gridImages].slice(0, 5);

    return (
        <div className="relative mb-8">
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[500px] rounded-2xl overflow-hidden">
                {/* Main Hero Image (Spans 2x2) */}
                <div className="col-span-2 row-span-2 relative group cursor-pointer">
                    <img
                        src={displayImages[0]}
                        alt={hotelName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Secondary Images */}
                <div className="relative group cursor-pointer">
                    <img
                        src={displayImages[1]}
                        alt="Gallery 2"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="relative group cursor-pointer">
                    <img
                        src={displayImages[2]}
                        alt="Gallery 3"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="relative group cursor-pointer">
                    <img
                        src={displayImages[3]}
                        alt="Gallery 4"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Visual "View All" Trigger */}
                <div className="relative group cursor-pointer">
                    <img
                        src={displayImages[4]}
                        alt="Gallery 5"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                        <span className="text-white font-bold text-lg border-2 border-white/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                            View All Photos
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile Slider / Single Image */}
            <div className="md:hidden h-80 relative rounded-xl overflow-hidden">
                <img src={displayImages[0]} alt={hotelName} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md">
                    1 / {gridImages.length} Photos
                </div>
            </div>
        </div>
    );
};

export default ImmersiveHero;

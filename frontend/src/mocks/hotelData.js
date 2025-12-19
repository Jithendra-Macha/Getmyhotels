export const hotelData = [
    {
        id: 1,
        name: "The Brooklyn Brownstone House",
        address: "452 7th Avenue, Park Slope, Brooklyn, NY 11215",
        location: "Park Slope, Brooklyn",
        coordinates: { lat: 40.6602, lng: -73.9817 },
        distances: [
            { to: "Prospect Park", value: 0.2, unit: "mi", walkTime: "4 min" },
            { to: "7th Ave Subway (F/G)", value: 0.1, unit: "mi", walkTime: "2 min" }
        ],
        rating: 4.9,
        reviewsCount: 128,
        reviews: 128, // Keeping for backward compatibility
        reviewDistribution: { 5: 102, 4: 20, 3: 4, 2: 1, 1: 1 },
        reviewResponseRate: 92,
        avgResponseTime: "1.2 days",
        isBoutique: true,
        is_boutique: true, // Keeping for backward compatibility
        badges: [
            { id: "family-run", label: "Family-Run", icon: "👨‍👩‍👧‍👦" },
            { id: "historic", label: "Historic Building", icon: "🏛️" },
            { id: "eco", label: "Eco-Certified", icon: "🌱", link: "/sustainability" }
        ],
        pricePromise: true,
        shortDescription: "A restored 1920s Brooklyn brownstone run by a husband-wife team.",
        longDescription: "A restored 1920s Brooklyn brownstone run by Lena & Tom offering a unique and personal stay experience in the heart of Park Slope.",
        neighborhoodDescription: "Park Slope is known for its tree-lined brownstone streets, proximity to Prospect Park, and vibrant community atmosphere.",
        rooms: [
            {
                id: 101,
                name: "Cozy Queen Room",
                ratePlans: [
                    {
                        id: "flex",
                        name: "Pay Later",
                        description: "Free cancellation until 48h before",
                        totalPrice: 154,
                        features: ["Free cancellation", "No prepayment"],
                        isRefundable: true
                    },
                    {
                        id: "save15",
                        name: "Pay Now & Save 15%",
                        description: "Non-refundable",
                        totalPrice: 132,
                        features: ["15% off", "Instant confirmation"],
                        isRefundable: false
                    }
                ],
                pricePerOccupancy: { 1: 154, 2: 154, 3: 174 },
                accessibilityFeatures: ["Step-free entrance", "Visual alarms"]
            }
        ],
        availability: {
            status: "available",
            nextAvailableDate: "2026-02-25",
            lastUpdated: "2025-12-19T10:30:00Z"
        },
        image_url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price_per_night: 154,
        taxes_and_fees: 0, // Included in totalPrice above, but keeping field
        is_independent: true,
        ai_tagline: "A restored 1920s Brooklyn brownstone run by a husband-wife team.",
        ai_relevance_score: 9.8,
        ai_match_reason: "Perfect match for local charm and historic architecture lovers.",
        sustainability_score: 9,
        amenities: ["Free Wi-Fi", "Garden Access", "Breakfast Included"], // Defaulting some amenities
        deal_tag: "Pay Later",
        deal_savings: 0,
        fair_rank_boost: true,
        description: "A restored 1920s Brooklyn brownstone run by a husband-wife team."
    },
    {
        id: 2,
        name: "1 Hotel Brooklyn Bridge",
        location: "Dumbo, Brooklyn, NY",
        rating: 9.2,
        reviews: 3105,
        image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price_per_night: 420,
        taxes_and_fees: 65,
        is_boutique: false,
        is_independent: false, // Chain
        ai_tagline: "Eco-luxury waterfront retreat with stunning Manhattan Bridge views.",
        ai_relevance_score: 9.5,
        ai_match_reason: "Top rated for sustainability and waterfront location.",
        sustainability_score: 10,
        badges: ["Plastic-Free", "LEED Certified"],
        amenities: ["Spa", "EV Charging", "Gym", "Plunge Pool"],
        deal_tag: null,
        deal_savings: 0,
        fair_rank_boost: false,
        description: "Nature-inspired luxury hotel right on the waterfront, perfect for eco-conscious travelers."
    },
    {
        id: 3,
        name: "Box House Hotel",
        location: "Greenpoint, Brooklyn, NY",
        rating: 9.5,
        reviews: 876,
        image_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price_per_night: 189,
        taxes_and_fees: 25,
        is_boutique: true,
        is_independent: true,
        ai_tagline: "Hidden Gem: Converted factory lofts with authentic Brooklyn charm.",
        ai_relevance_score: 9.9,
        ai_match_reason: "Highly recommended for 'Local Charm' preference. Family-run since 2010.",
        sustainability_score: 8,
        badges: ["Local Ownership", "Hidden Gem"],
        amenities: ["Kitchenette", "Free Local Shuttle", "Terrace"],
        deal_tag: "Great Value",
        deal_savings: 0,
        fair_rank_boost: true,
        description: "A quirky, colorful hotel in a converted factory, offering loft-style suites and a true local vibe."
    },
    {
        id: 4,
        name: "Marriott Downtown",
        location: "Downtown Brooklyn, NY",
        rating: 8.1,
        reviews: 5420,
        image_url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price_per_night: 199,
        taxes_and_fees: 35,
        is_boutique: false,
        is_independent: false,
        ai_tagline: "Reliable comfort for business travelers and families.",
        ai_relevance_score: 7.5,
        ai_match_reason: "Good value, but generic style.",
        sustainability_score: 5,
        badges: [],
        amenities: ["Indoor Pool", "Business Center", "Club Lounge"],
        deal_tag: "Member Discount",
        deal_savings: 15,
        fair_rank_boost: false,
        description: "Standard high-rise hotel with all the expected amenities and convenient subway access."
    },
    {
        id: 5,
        name: "Franklin Guesthouse",
        location: "Greenpoint, Brooklyn, NY",
        rating: 9.0,
        reviews: 530,
        image_url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price_per_night: 215,
        taxes_and_fees: 30,
        is_boutique: true,
        is_independent: true,
        ai_tagline: "Feels like a home away from home with spacious suites.",
        ai_relevance_score: 8.8,
        ai_match_reason: "Quiet neighborhood location perfectly matches 'Relaxation' goal.",
        sustainability_score: 7,
        badges: ["Independent", "Apartment Style"],
        amenities: ["Gym", "Sauna", "Workspaces"],
        deal_tag: null,
        deal_savings: 0,
        fair_rank_boost: true,
        description: "Boutique hotel offering apartment-style accommodations, ideal for longer stays."
    },
    {
        id: 6,
        name: "Wythe Hotel",
        location: "Williamsburg, Brooklyn, NY",
        rating: 8.7,
        reviews: 980,
        image_url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price_per_night: 285,
        taxes_and_fees: 45,
        is_boutique: true,
        is_independent: true,
        ai_tagline: "Historic textile factory turned trendy industrial-chic hotel.",
        ai_relevance_score: 9.4,
        ai_match_reason: "Top tier architecture and dining.",
        sustainability_score: 8,
        badges: ["Historic Building", "Boutique"],
        amenities: ["Rooftop Bar", "Concierge", "Minibar"],
        deal_tag: "Pay Later",
        deal_savings: 0,
        fair_rank_boost: false,
        description: "The original Williamsburg boutique hotel, featuring exposed brick, pine ceilings, and skyline views."
    }
];

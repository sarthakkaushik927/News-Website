// --- Mock Data ---
// This data is used to populate the UI until you hook up your API.

const mockHeroData = {
  mainArticle: {
    id: 1,
    title: 'Democrats Overhaul Party’s Primary Calendar, Upending a Political Tradition',
    category: 'Politics',
    imageUrl: 'https://placehold.co/800x600/333/fff?text=Main+Story',
    author: 'John Doe',
    date: 'Nov 17, 2025',
  },
  sideArticles: [
    {
      id: 2,
      title: 'Secretary of State Antony J. Blinken will travel to the Middle East...',
      imageUrl: 'https://placehold.co/400x300/555/fff?text=Side+Story+1',
    },
    {
      id: 3,
      title: 'Blinken, Top Chinese Spy Traded Barbs Over Balloon in Diplomatic Crisis',
      imageUrl: 'https://placehold.co/400x300/555/fff?text=Side+Story+2',
    },
  ],
  bottomArticles: [
     {
      id: 4,
      title: "Poisoned 'Cash' Is Weird Enough to Take on the World",
      category: "World",
    },
    {
      id: 5,
      title: "Balloon's Journey",
      category: "World",
    },
    {
      id: 6,
      title: "More Airports to Use Greener 'Glide' Approach to Landing",
      category: "Travel",
    },
    {
      id: 7,
      title: "The 'Burning' White House Offers Weeks of Unscripted...",
      category: "Politics",
    },
  ]
};

const mockLatestNews = [
  {
    id: 10,
    title: 'Troops Deployed, Former Military Ruler Flees Pakistan',
    imageUrl: 'https://placehold.co/400x300/666/fff?text=Latest+1',
    category: 'World',
    date: 'Nov 17, 2025',
  },
  {
    id: 11,
    title: 'How Artist Groups Championing Social Justice...',
    imageUrl: 'https://placehold.co/400x300/666/fff?text=Latest+2',
    category: 'World',
    date: 'Nov 17, 2025',
  },
  {
    id: 12,
    title: 'London to Istanbul by Train: This 6-country trip will cost you just $200...',
    description: 'Romantic cross-European train journeys have long captured the imagination, but the reality is they can be eye-wateringly expensive...',
    category: 'Travel',
  },
  {
    id: 13,
    title: 'More Airports to Use Greener "Glide" Approach to Landing',
    description: 'The Federal Aviation Administration approved a plan to adopt a new way of landing planes that reduces both emissions and noise...',
    category: 'Travel',
  },
  {
    id: 14,
    title: '10 ways to drastically mold a more fuel-efficient, weeknight cooking',
    imageUrl: 'https://placehold.co/400x300/666/fff?text=Latest+3',
    category: 'Food',
  },
  {
    id: 15,
    title: 'Oil prices dip again as spectre of trade war, demand concerns rattles market',
    imageUrl: 'https://placehold.co/400x300/666/fff?text=Latest+4',
    category: 'Business',
  },
  {
    id: 16,
    title: 'Europeans are the world\'s heaviest drinkers: How do countries compare?',
    description: 'Alcohol consumption per capita dropped by 12.5 per cent between 2000 and 2020 in the WHO European Region...',
    category: 'Health',
  },
  {
    id: 17,
    title: 'A Dumptruck Company Wants to Bring Back the Dodo',
    imageUrl: 'https://placehold.co/400x300/666/fff?text=Latest+5',
    category: 'Science',
  },
];

const mockTrendingNews = [
  {
    id: 20,
    title: 'Chinese spy balloons over the U.S. and beyond',
    category: 'World',
    imageUrl: 'https://placehold.co/100x100/777/fff?text=T1',
  },
  {
    id: 21,
    title: 'Hidden Tunnel May Be Ancient Artificial Waterway',
    category: 'Science',
    imageUrl: 'https://placehold.co/100x100/777/fff?text=T2',
  },
  {
    id: 22,
    title: 'LeBron James Breaks the Scoring Record',
    category: 'Sports',
    imageUrl: 'https://placehold.co/100x100/777/fff?text=T3',
  },
  {
    id: 23,
    title: 'Russia\'s Christian sectarians who live in the woods',
    category: 'World',
    imageUrl: 'https://placehold.co/100x100/777/fff?text=T4',
  },
  {
    id: 24,
    title: 'NASA anticipates new powered solar sail for...',
    category: 'Tech',
    imageUrl: 'https://placehold.co/100x100/777/fff?text=T5',
  },
  {
    id: 25,
    title: 'How Americans can protect wildlife in their backyards',
    category: 'Lifestyle',
    imageUrl: 'https://placehold.co/100x100/777/fff?text=T6',
  },
  {
    id: 26,
    title: 'Is TikTok really giving you shorter attention?',
    category: 'Health',
    imageUrl: 'https://placehold.co/100x100/777/fff?text=T7',
  },
  {
    id: 27,
    title: 'For Biden, a Chance for a \'Reset\' With China',
    category: 'Politics',
    imageUrl: 'https://placehold.co/100x100/777/fff?text=T8',
  },
];


// --- API Call Placeholders ---
// Replace these with your actual API calls

/**
 * Simulates fetching all news data.
 * @returns {Promise<Object>} A promise that resolves with mock data.
 */
export const fetchAllNews = async () => {
  console.log("Simulating API call to fetch news...");
  
  // *** YOUR REAL API CALL GOES HERE ***
  // try {
  //   // Replace with your actual API endpoint
  //   const response = await fetch('YOUR_NEWS_API_ENDPOINT');
    
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
    
  //   const data = await response.json();
    
  //   // Assuming your API returns an object matching the mock data structure
  //   // e.g., { heroData: { ... }, latestNews: [ ... ], trendingNews: [ ... ] }
  //   return data;

  // } catch (error) {
  //   console.error("Failed to fetch news:", error);
  //   // You might want to throw the error or return a specific error object
  //   // For now, we'll re-throw
  //   throw error;
  // }

  // --- Mock Data Fallback ---
  // This part runs if the real API call is commented out
  await new Promise(resolve => setTimeout(resolve, 500)); // Fake delay
  return {
    heroData: mockHeroData,
    latestNews: mockLatestNews,
    trendingNews: mockTrendingNews,
  };
};

/**
 * Simulates a user login.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} A promise that resolves with user data.
 */
export const apiLogin = async (email, password) => {
  console.log("Simulating API call to login...", { email, password });

  // *** YOUR REAL API CALL GOES HERE ***
  // try {
  //   // Replace with your actual API endpoint
  //   const response = await fetch('YOUR_LOGIN_API_ENDPOINT', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // 'Authorization': 'Bearer YOUR_API_KEY' // If needed
  //     },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   if (!response.ok) {
  //     const errorBody = await response.json();
  //     throw new Error(errorBody.message || `Login failed! status: ${response.status}`);
  //   }
    
  //   const data = await response.json();
  //   // Assuming API returns { user: { ... }, token: '...' }
  //   return data;

  // } catch (error) {
  //   console.error("Login failed:", error);
  //   throw error; // Re-throw to be caught by the AuthContext
  // }

  // --- Mock Data Fallback ---
  // This part runs if the real API call is commented out
  await new Promise(resolve => setTimeout(resolve, 500)); // Fake delay
  if (email === "user@example.com" && password === "password123") {
    return { user: { name: 'Demo User', email: 'user@example.com' }, token: 'fake-jwt-token' };
  } else {
    throw new Error('Invalid credentials');
  }
};

/**
 * Simulates a user signup.
 * @param {string} name
 *@param {string} email
 * @param {string} password
 *@returns {Promise<Object>} A promise that resolves with user data.
 */
export const apiSignup = async (name, email, password) => {
  console.log("Simulating API call to signup...", { name, email, password });
  
  // *** YOUR REAL API CALL GOES HERE ***
  // try {
  //   // Replace with your actual API endpoint
  //   const response = await fetch('YOUR_SIGNUP_API_ENDPOINT', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // 'Authorization': 'Bearer YOUR_API_KEY' // If needed
  //     },
  //     body: JSON.stringify({ name, email, password }),
  //   });

  //   if (!response.ok) {
  //     const errorBody = await response.json();
  //     throw new Error(errorBody.message || `Signup failed! status: ${response.status}`);
  //   }
    
  //   const data = await response.json();
  //   // Assuming API returns { user: { ... }, token: '...' }
  //   return data;

  // } catch (error) {
  //   console.error("Signup failed:", error);
  //   throw error; // Re-throw to be caught by the AuthContext
  // }

  // --- Mock Data Fallback ---
  // This part runs if the real API call is commented out
  await new Promise(resolve => setTimeout(resolve, 500)); // Fake delay
  return { user: { name: name, email: email }, token: 'fake-jwt-token-new-user' };
};
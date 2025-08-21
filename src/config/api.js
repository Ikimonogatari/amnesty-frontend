// API Configuration for Amnesty CMS
export const API_CONFIG = {
  // Base URL for the Strapi CMS API
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api',

  // Media URL for images and files
  MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_URL || 'http://localhost:1337',

  // Users API URL for contact form and other user-related features
  USERS_API_URL: process.env.NEXT_PUBLIC_PROD_API_USERS_URL || 'https://api.amnesty.mn/users',

  // Locale for content - using Cyrillic as primary with Mongol Bichig as additional field
  LOCALE: process.env.NEXT_PUBLIC_CMS_LOCALE || 'mn-MN',

  // Demo mode - set to false to use real CMS data
  DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE === "true",

  // API endpoints - using actual CMS structure
  ENDPOINTS: {
    POSTS_LIST: "/posts/list",
    POSTS_GET: "/posts/get",
    POSTS_RECOMMENDED: "/posts/recommended",
    STATEMENTS: "/statements",
    EVENTS: "/events",
    ACTIONS: "/actions",
    VIDEOS: "/videos",
    STORIES: "/stories",
    LIBRARIES: "/libraries",
    FAQS: "/faqs",
    SLIDESHOWS: "/slideshows",
    PODCASTS: "/podcasts",
    REPORTS: "/reports",
    HOMEPAGE_SLIDERS: "/homepage-slider",
    COMPANY_WORK: "/company-works",
    COMPANY_WORK_FEATURES: "/company-work-features",
  },

  // Default query parameters for standard endpoints
  DEFAULT_PARAMS: {
    locale: process.env.NEXT_PUBLIC_CMS_LOCALE || 'mn-MN',
    populate: "*",
  },

  // Default query parameters for posts
  POST_PARAMS: {
    locale: process.env.NEXT_PUBLIC_CMS_LOCALE || 'mn-MN',
    limit: 10,
    page: 1,
  },

  // Pagination settings
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
};

// Mock data for demo mode
export const MOCK_DATA = {
  posts: [
    {
      id: 1,
      title: "ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠦᠨ ᠡᠷᢈᠡ ᠶᠢᠨ ᠮᠡᠳᠡᢉᠡ",
      short_description:
        "ᠡᠨᠡ ᠮᠡᠳᠡᢉᠡ ᠨᠢ ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠦᠨ ᠡᠷᢈᠡ ᠶᠢᠨ ᠲᠤᠬᠠᠢ ᠮᠡᠳᠡᢉᠡ ᠶᠤᠮ",
      body: "ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠦᠨ ᠡᠷᢈᠡ ᠶᠢᠨ ᠲᠠᠯᠠᠭᠠᠷᢈᠢ ᠨᠢ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠦᠨ ᠡᠷᢈᠡ ᠶᠢᠨ ᠨᠢᠭᠡ ᠬᠡᠰᠡᠭ ᠶᠤᠮ᠃ ᠡᠨᠡ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᢈᠡ ᠶᠢᠨ ᠦᠨᠳᠦᠰᠦᠲᠡᠨ ᠦ ᠲᠦᠯᠦᠭᠡ ᠪᠠᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ ᠦᠨ ᠡᠷᢈᠡ ᠶᠤᠮ᠃",
      cover: "/images/news1.png",
      locale: "mn-MN",
      publishedAt: "2024-01-15T10:00:00.000Z",
      createdAt: "2024-01-15T10:00:00.000Z",
    },
    {
      id: 2,
      title: "ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠧᠰᠢᠨᠠᠯ ᠦᠨ ᠠᠵᠢᠯ",
      short_description: "ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠧᠰᠢᠨᠠᠯ ᠦᠨ ᠠᠵᠢᠯ ᠦᠨ ᠲᠤᠬᠠᠢ ᠮᠡᠳᠡᢉᠡ",
      body: "ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠧᠰᠢᠨᠠᠯ ᠨᠢ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶᠢᠨ ᠲᠦᠯᠦᠭᠡ ᠪᠠᠨ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ᠃ ᠪᠢᠳᠡ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᢈᠡ ᠶᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠶᠢᠨ ᠲᠦᠯᠦᠭᠡ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ᠃",
      cover: "/images/news2.png",
      locale: "mn-MN",
      publishedAt: "2024-01-14T15:30:00.000Z",
      createdAt: "2024-01-14T15:30:00.000Z",
    },
    {
      id: 3,
      title: "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᢈᠡ ᠶᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ",
      short_description: "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᢈᠡ ᠶᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ ᠦᠨ ᠲᠤᠬᠠᠢ ᠮᠡᠳᠡᢉᠡ",
      body: "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᢈᠡ ᠶᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ ᠨᠢ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶᠢᠨ ᠦᠨᠳᠦᠰᠦᠲᠡᠨ ᠦ ᠲᠦᠯᠦᠭᠡ ᠪᠠᠨ ᠠᠵᠢᠯ ᠶᠤᠮ᠃",
      cover: "/images/news3.png",
      locale: "mn-MN",
      publishedAt: "2024-01-13T09:15:00.000Z",
      createdAt: "2024-01-13T09:15:00.000Z",
    },
    {
      id: 4,
      title: "ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ",
      short_description: "ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ ᠦᠨ ᠲᠤᠬᠠᠢ ᠮᠡᠳᠡᢉᠡ",
      body: "ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ ᠨᠢ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠦᠨ ᠦᠨᠳᠦᠰᠦᠲᠡᠨ ᠦ ᠲᠦᠯᠦᠭᠡ ᠪᠠᠨ ᠠᠵᠢᠯ ᠶᠤᠮ᠃",
      cover: "/images/news4.png",
      locale: "mn-MN",
      publishedAt: "2024-01-12T14:45:00.000Z",
      createdAt: "2024-01-12T14:45:00.000Z",
    },
    {
      id: 5,
      title: "ᠠᠮᠢᠳᠤᠷᠠᠯ ᠦᠨ ᠡᠷᢈᠡ ᠶᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ",
      short_description: "ᠠᠮᠢᠳᠤᠷᠠᠯ ᠦᠨ ᠡᠷᢈᠡ ᠶᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ ᠦᠨ ᠲᠤᠬᠠᠢ ᠮᠡᠳᠡᢉᠡ",
      body: "ᠠᠮᠢᠳᠤᠷᠠᠯ ᠦᠨ ᠡᠷᢈᠡ ᠶᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ ᠨᠢ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᢈᠡ ᠶᠢᠨ ᠦᠨᠳᠦᠰᠦᠲᠡᠨ ᠦ ᠲᠦᠯᠦᠭᠡ ᠪᠠᠨ ᠠᠵᠢᠯ ᠶᠤᠮ᠃",
      cover: "/images/news5.png",
      locale: "mn-MN",
      publishedAt: "2024-01-11T11:20:00.000Z",
      createdAt: "2024-01-11T11:20:00.000Z",
    },
    {
      id: 6,
      title: "ᠰᠢᠪᠢᠯ ᠦᠨ ᠡᠷᢈᠡ ᠶᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ",
      short_description: "ᠰᠢᠪᠢᠯ ᠦᠨ ᠡᠷᢈᠡ ᠶᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ ᠦᠨ ᠲᠤᠬᠠᠢ ᠮᠡᠳᠡᢉᠡ",
      body: "ᠰᠢᠪᠢᠯ ᠦᠨ ᠡᠷᢈᠡ ᠶᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ ᠨᠢ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶᠢᠨ ᠦᠨᠳᠦᠰᠦᠲᠡᠨ ᠦ ᠲᠦᠯᠦᠭᠡ ᠪᠠᠨ ᠠᠵᠢᠯ ᠶᠤᠮ᠃",
      cover: "/images/news6.png",
      locale: "mn-MN",
      publishedAt: "2024-01-10T16:10:00.000Z",
      createdAt: "2024-01-10T16:10:00.000Z",
    },
  ],
  faqs: [
    {
      id: 1,
      question: "ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠶᠠᠭᠤ ᠬᠡᠷᠡᠭᠯᠡᠭᠳᠡᠭ ᠪᠤᠢ?",
      answer:
        "ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠨᠢ ᠮᠣᠩᠭᠣᠯ ᠦᠨᠳᠦᠰᠦᠲᠡᠨ ᠦ ᠦᠭᠡ ᠦᠰᠦᠭ ᠦᠨ ᠪᠢᠴᠢᠭ ᠪᠣᠯᠤᠨ᠂ ᠰᠠᠶᠢᠨ ᠦᠶᠡ ᠶᠢᠨ ᠦᠷᠭᠦᠯᠵᠢᠯᠡᠯ ᠦᠨ ᠪᠠᠭᠠᠵᠢ ᠶᠤᠮ᠃",
      image: "/images/about1.png",
      locale: "mn-MN",
      publishedAt: "2024-01-15T10:00:00.000Z",
    },
    {
      id: 2,
      question: "ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠧᠰᠢᠨᠠᠯ ᠶᠠᠭᠤ ᠪᠠᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠪᠤᠢ?",
      answer:
        "ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠧᠰᠢᠨᠠᠯ ᠨᠢ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᢈᠡ ᠶᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠶᠢᠨ ᠲᠦᠯᠦᠭᠡ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ᠃",
      image: "/images/about2.png",
      locale: "mn-MN",
      publishedAt: "2024-01-14T15:30:00.000Z",
    },
    {
      id: 3,
      question: "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᢈᠡ ᠶᠠᠭᠤ ᠦᠨᠳᠦᠰᠦᠲᠡᠨ ᠦ ᠡᠷᢈᠡ ᠪᠤᠢ?",
      answer:
        "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᢈᠡ ᠨᠢ ᠬᠦᠮᠦᠨ ᠦ ᠠᠮᠢᠳᠤᠷᠠᠯ᠂ ᠡᠷᠬᠡ ᠴᠢᠯᠦᠭᠡ᠂ ᠪᠣᠳᠠᠯᠭ᠎ᠠ ᠶᠢᠨ ᠡᠷᢈᠡ ᠶᠤᠮ᠃",
      image: "/images/about3.jpg",
      locale: "mn-MN",
      publishedAt: "2024-01-13T09:15:00.000Z",
    },
    {
      id: 4,
      question: "ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶᠠᠭᠤ ᠦᠨᠳᠦᠰᠦᠲᠡᠨ ᠦ ᠡᠷᢈᠡ ᠪᠤᠢ?",
      answer:
        "ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠨᠢ ᠬᠦᠮᠦᠨ ᠦ ᠪᠣᠳᠠᠯᠭ᠎ᠠ᠂ ᠰᠠᠶᠢᠨ ᠦᠶᠡ᠂ ᠠᠷᠠᠳ ᠦᠨ ᠡᠷᢈᠡ ᠶᠤᠮ᠃",
      image: "/images/about4.jpg",
      locale: "mn-MN",
      publishedAt: "2024-01-12T14:45:00.000Z",
    },
  ],
  videos: [],
  libraries: [],
  events: [],
  actions: [],
  stories: [],
};

// Helper function to build API URL with parameters for standard endpoints
export const buildApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);

  // Add default parameters for standard endpoints (not for posts endpoints)
  if (
    endpoint &&
    typeof endpoint === "string" &&
    !endpoint.startsWith("/posts/")
  ) {
    Object.entries(API_CONFIG.DEFAULT_PARAMS).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  // Add custom parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};

// Helper function to build API URL for custom post endpoints
export const buildPostApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);

  // Add default post parameters
  Object.entries(API_CONFIG.POST_PARAMS).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  // Add custom parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};

// Helper function to get image URL from Strapi media
export const getImageUrl = (
  imageData,
  baseUrl = process.env.NEXT_PUBLIC_MEDIA_URL || 'http://localhost:1337'
) => {
  if (!imageData) return null;

  // Handle different response formats from Strapi
  const url = imageData.data?.attributes?.url || imageData.url || imageData;

  // Return full URL if already absolute, otherwise prepend base URL
  if (url && url.startsWith("http")) {
    return url;
  }

  return url ? `${baseUrl}${url}` : null;
};

// Helper function to format Strapi response data
export const formatStrapiResponse = (response) => {
  if (!response || !response.data) return null;

  if (Array.isArray(response.data)) {
    return response.data.map((item) => ({
      id: item.id,
      ...item.attributes,
      // Add locale information
      _locale: item.attributes?.locale,
      _localizations: item.attributes?.localizations,
    }));
  }

  return {
    id: response.data.id,
    ...response.data.attributes,
    _locale: response.data.attributes?.locale,
    _localizations: response.data.attributes?.localizations,
  };
};

// Helper function to format custom post response data
export const formatPostResponse = (response) => {
  if (!response || !response.data) return null;

  // Custom post endpoints return data in a different format
  if (Array.isArray(response.data)) {
    return response.data.map((item) => ({
      id: item.id,
      title: item.title,
      body: item.body,
      short_description: item.short_description,
      cover: item.cover,
      locale: item.locale,
      publishedAt: item.publishedAt,
      post_date: item.post_date,
      createdAt: item.createdAt,
      post_categories: item.post_categories,
      post_topics: item.post_topics,
    }));
  }

  return response.data;
};

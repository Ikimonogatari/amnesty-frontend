// API Endpoints Configuration - Based on actual Strapi routes
// Posts use custom routes, other content types use standard Strapi routes

export const API_ENDPOINTS = {
  // Posts - Both custom routes and standard route
  POSTS: "/posts", // Standard Strapi route
  POSTS_LIST: "/posts/list",
  POSTS_GET: "/posts/get",
  POSTS_RECOMMENDED: "/posts/recommended",

  // Other content types - Standard Strapi routes (plural)
  STATEMENTS: "/statements",
  EVENTS: "/events",
  ACTIONS: "/actions",
  VIDEOS: "/videos",
  STORIES: "/stories",
  LIBRARIES: "/libraries",
  LIBRARY_GROUPS: "/library-groups",
  SLIDESHOWS: "/slideshows",
  PODCASTS: "/podcasts",
  LESSONS: "/lessons",
  REPORTS: "/reports",
  MERCHANDISES: "/merchandises",

  // Settings and Info
  CONTACT_INFO: "/contact-info",
  WEBSITE_SETTINGS: "/website-settings",

  // Categories and Topics
  POST_CATEGORIES: "/post-categories",
  POST_TOPICS: "/post-topics",

  // Company Work (Campaigns)
  COMPANY_WORKS: "/company-works",
  COMPANY_WORK_FEATURES: "/company-work-features",

  // Groups
  GROUPS: "/groups",
  GROUP_ITEMS: "/group-items",
  VIDEO_GROUPS: "/video-groups",
  PODCAST_GROUPS: "/podcast-groups",

  // Online Lessons
  ONLINE_LESSONS: "/online-lessons",
  ONLINE_LESSON_GROUPS: "/online-lesson-groups",
  FEATURED_ONLINE_LESSONS: "/featured-online-lesson",

  // Tests and FAQ
  TESTS: "/tests",
  MEMBER_TESTS: "/member-test",
  FAQS: "/faqs",

  // Homepage content - singleType endpoints use singular form
  HOMEPAGE_SLIDERS: "/homepage-slider",
  FEATURED_LIBRARIES: "/featured-library",

  // Settings
  ACTION_SETTINGS: "/action-setting",
  PODCAST_SETTINGS: "/podcast-setting",
};

// Get default locale from environment variable
const getDefaultLocale = () => {
  return process.env.NEXT_PUBLIC_CMS_LOCALE || "mn-MN";
};

// Default query parameters - using correct Strapi v4 format
export const DEFAULT_QUERY_PARAMS = {
  POPULATE_DEEP: "populate=*", // Use * instead of deep for Strapi v4
  SORT_DESC: "sort=id:desc",
  SORT_PUBLISHED_DESC: "sort=publishedAt:desc",
  SORT_DATE_ASC: "sort=start_date:asc",
  LOCALE_MN: `locale=${getDefaultLocale()}`,
};

// Helper function to build query string
export const buildQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return "";

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : "";
};

// Helper function to build full endpoint URL with query params
export const buildEndpointUrl = (endpoint, params = {}) => {
  const queryString = buildQueryString(params);
  return `${endpoint}${queryString}`;
};

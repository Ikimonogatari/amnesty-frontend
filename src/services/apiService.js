// API Service for Amnesty CMS - Mongol Bichig Version
// Using correct endpoints: custom routes for posts, standard routes for others

import Fetcher, {
  FetcherPost,
  FetcherPut,
  formatStrapiResponse,
} from "@/utils/fetcher";
import {
  API_ENDPOINTS,
  buildEndpointUrl,
  DEFAULT_QUERY_PARAMS,
} from "@/config/apiEndpoints";

// Get default locale from environment variable
const getDefaultLocale = () => {
  return process.env.NEXT_PUBLIC_CMS_LOCALE || "mn-MN";
};

// Posts and News Services - Using both custom routes and standard routes
export const postsService = {
  // Get posts using standard /posts endpoint (what user requested)
  async getPosts(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        sort: "publishedAt:desc",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };

      // Add any filters from params
      if (params.filters) {
        Object.keys(params.filters).forEach((key) => {
          queryParams[key] = params.filters[key];
        });
      }

      const endpoint = buildEndpointUrl(API_ENDPOINTS.POSTS, queryParams);
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  // Get posts list using custom route
  async getPostsList(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        sort: "publishedAt:desc",
        locale: getDefaultLocale(),
      };

      // If pageSize is provided and no page, use simple 'limit' format (like old web)
      // This is for homepage compatibility with old API format
      if (params.pageSize && !params.page) {
        queryParams.limit = params.pageSize;
      } else {
        // Use Strapi v4 pagination format for other cases
        queryParams["pagination[page]"] = params.page || 1;
        queryParams["pagination[pageSize]"] = params.pageSize || 10;
      }

      // Add filters directly to queryParams (not nested)
      if (params.filters) {
        Object.keys(params.filters).forEach((key) => {
          queryParams[key] = params.filters[key];
        });
      }

      // Add post_category filter if provided
      if (params.post_category) {
        queryParams.post_category = params.post_category;
      }

      const endpoint = buildEndpointUrl(API_ENDPOINTS.POSTS_LIST, queryParams);
      const response = await Fetcher(endpoint);

      // The posts API returns a custom structure, let's normalize it to match other services
      // Posts API returns: { data: [...], currentPage, length, total, limit }
      // We want to return the same structure as formatStrapiResponse for consistency
      if (response && response.data && Array.isArray(response.data)) {
        return {
          data: response.data.map((item) => ({
            id: item.id,
            title: item.title,
            body: item.body,
            short_description: item.short_description,
            publishedAt: item.publishedAt,
            createdAt: item.createdAt,
            post_date: item.post_date,
            locale: item.locale,
            cover: item.cover,
            post_categories: item.post_categories,
            post_topics: item.post_topics,
            // Add metadata
            _locale: item.locale,
          })),
          meta: {
            pagination: {
              page: response.currentPage || 1,
              pageSize: response.limit || 10,
              pageCount: Math.ceil(
                (response.total || 0) / (response.limit || 10)
              ),
              total: response.total || 0,
            },
          },
        };
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get single post by ID using custom route
  async getPostById(id) {
    try {
      const endpoint = `${
        API_ENDPOINTS.POSTS_GET
      }/${id}?populate=*&locale=${getDefaultLocale()}`;
      const response = await Fetcher(endpoint);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get recommended posts using custom route
  async getRecommendedPosts(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        locale: getDefaultLocale(),
        ...params,
      };
      const endpoint = buildEndpointUrl(
        API_ENDPOINTS.POSTS_RECOMMENDED,
        queryParams
      );
      const response = await Fetcher(endpoint);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get statements using standard route
  async getStatements(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        sort: "id:desc",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };
      const endpoint = buildEndpointUrl(API_ENDPOINTS.STATEMENTS, queryParams);
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// Events Service - Using standard routes
export const eventsService = {
  async getEvents(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        sort: params.sort || "start_date:asc",
        locale: params.locale || getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 100, // Increase default to get more events
        ...params, // Include all other params directly (for date filters)
      };

      // Add any filters from params.filters if they exist
      if (params.filters) {
        Object.keys(params.filters).forEach((key) => {
          queryParams[key] = params.filters[key];
        });
      }

      const endpoint = buildEndpointUrl(API_ENDPOINTS.EVENTS, queryParams);
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getEventById(id) {
    try {
      const endpoint = buildEndpointUrl(`${API_ENDPOINTS.EVENTS}/${id}`, {
        populate: "*",
        locale: getDefaultLocale(),
      });
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// Actions Service - Using standard routes
export const actionsService = {
  async getActions(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };

      // Add filters if provided
      if (params.filters) {
        Object.keys(params.filters).forEach((key) => {
          queryParams[key] = params.filters[key];
        });
      }

      // Add other query parameters
      Object.keys(params).forEach((key) => {
        if (key !== "filters" && key !== "page" && key !== "pageSize") {
          queryParams[key] = params[key];
        }
      });

      const endpoint = buildEndpointUrl(API_ENDPOINTS.ACTIONS, queryParams);
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getActionById(id) {
    try {
      const endpoint = buildEndpointUrl(`${API_ENDPOINTS.ACTIONS}/${id}`, {
        populate: "*",
        locale: getDefaultLocale(),
      });
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  // Submit action form - Routes to Next.js API proxy
  async submitAction(formData) {
    try {
      console.log("=== ACTION SERVICE SUBMIT ===");
      console.log("Form data being submitted:", formData);
      console.log("Making request to: /api/actions/submit");

      const response = await fetch("/mng/api/actions/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log("Error response data:", errorData);
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log("Success response data:", result);
      return result;
    } catch (error) {
      console.error("=== ACTION SUBMISSION FAILED ===");
      console.error("Error:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      throw error;
    }
  },
};

// Videos Service - Using standard routes
export const videosService = {
  async getVideos(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        sort: "publishedAt:desc",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };

      const endpoint = buildEndpointUrl(API_ENDPOINTS.VIDEOS, queryParams);
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getVideoById(id) {
    try {
      const endpoint = buildEndpointUrl(`${API_ENDPOINTS.VIDEOS}/${id}`, {
        populate: "*",
        locale: getDefaultLocale(),
      });
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// Libraries Service - Using standard routes
export const librariesService = {
  async getLibraries(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };

      const endpoint = buildEndpointUrl(API_ENDPOINTS.LIBRARIES, queryParams);
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getLibraryGroups() {
    try {
      const endpoint = buildEndpointUrl(API_ENDPOINTS.LIBRARY_GROUPS, {
        populate: "*",
        locale: getDefaultLocale(),
      });
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getLibraryById(id) {
    try {
      const endpoint = buildEndpointUrl(`${API_ENDPOINTS.LIBRARIES}/${id}`, {
        populate: "*",
        locale: getDefaultLocale(),
      });
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// Stories Service - Using standard routes
export const storiesService = {
  async getStories(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        sort: "publishedAt:desc",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };

      const endpoint = buildEndpointUrl(API_ENDPOINTS.STORIES, queryParams);
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getStoryById(id) {
    try {
      const endpoint = buildEndpointUrl(`${API_ENDPOINTS.STORIES}/${id}`, {
        populate: "*",
        locale: getDefaultLocale(),
      });
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// FAQs Service - Using standard routes
export const faqsService = {
  async getFaqs(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };

      const endpoint = buildEndpointUrl(API_ENDPOINTS.FAQS, queryParams);
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getFaqById(id) {
    try {
      const endpoint = buildEndpointUrl(`${API_ENDPOINTS.FAQS}/${id}`, {
        populate: "*",
        locale: getDefaultLocale(),
      });
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// Slideshows Service - Using standard routes
export const slideshowsService = {
  async getSlideshows(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
        sort: "publishedAt:desc",
      };

      const endpoint = buildEndpointUrl(API_ENDPOINTS.SLIDESHOWS, queryParams);
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getHomepageSliders(params = {}) {
    try {
      const queryParams = {
        populate: "deep",
        locale: getDefaultLocale(),
        ...params,
      };

      const endpoint = buildEndpointUrl(
        API_ENDPOINTS.HOMEPAGE_SLIDERS,
        queryParams
      );
      const response = await Fetcher(endpoint);

      // Extract posts data from homepage-slider singleType (matching SvelteKit app structure)
      // SvelteKit: sliders?.data?.attributes?.posts?.data || []
      const slidersData = response?.data?.attributes?.posts?.data || [];

      return {
        data: slidersData,
        meta: response?.meta || {},
      };
    } catch (error) {
      // Return empty array if homepage-slider content doesn't exist yet
      return {
        data: [],
        meta: {},
      };
    }
  },
};

// Reports Service - Using standard routes
export const reportsService = {
  async getReports(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        sort: "id:desc",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };
      const endpoint = buildEndpointUrl(API_ENDPOINTS.REPORTS, queryParams);
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getReportById(id) {
    try {
      const endpoint = buildEndpointUrl(`${API_ENDPOINTS.REPORTS}/${id}`, {
        populate: "*",
        locale: getDefaultLocale(),
      });
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// Company Work (Campaigns) Service - Using standard routes
export const campaignsService = {
  async getCompanyWorks(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };

      const endpoint = buildEndpointUrl(
        API_ENDPOINTS.COMPANY_WORKS,
        queryParams
      );
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getCompanyWorkById(id) {
    try {
      const endpoint = buildEndpointUrl(API_ENDPOINTS.COMPANY_WORKS, {
        "filters[static_id][$eq]": id,
        populate: "*",
        locale: getDefaultLocale(),
      });
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getCompanyWorkFeatures(staticId) {
    try {
      const endpoint = buildEndpointUrl(API_ENDPOINTS.COMPANY_WORK_FEATURES, {
        "filters[company_work][static_id][$eq]": staticId,
        populate: "*",
        locale: getDefaultLocale(),
      });
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// Settings Service - Using standard routes
export const settingsService = {
  async getContactInfo() {
    try {
      const response = await Fetcher(
        `${API_ENDPOINTS.CONTACT_INFO}?locale=${getDefaultLocale()}`
      );
      return response?.data?.attributes || null;
    } catch (error) {
      throw error;
    }
  },

  async getWebsiteSettings() {
    try {
      const response = await Fetcher(
        `${API_ENDPOINTS.WEBSITE_SETTINGS}?locale=${getDefaultLocale()}`
      );
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// Merchandises Service - Using standard routes
export const merchService = {
  async getMerchandises(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };
      const endpoint = buildEndpointUrl(
        API_ENDPOINTS.MERCHANDISES,
        queryParams
      );
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// Lessons Service - Using standard routes (missing from original)
export const lessonsService = {
  async getLessons(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        sort: "id:desc",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };
      const endpoint = buildEndpointUrl(API_ENDPOINTS.LESSONS, queryParams);
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getLessonById(id) {
    try {
      const endpoint = buildEndpointUrl(`${API_ENDPOINTS.LESSONS}/${id}`, {
        populate: "*",
        locale: getDefaultLocale(),
      });
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// Online Lessons Service - Using standard routes (missing from original)
export const onlineLessonsService = {
  async getOnlineLessons(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        sort: "id:desc",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };
      const endpoint = buildEndpointUrl(
        API_ENDPOINTS.ONLINE_LESSONS,
        queryParams
      );
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getOnlineLessonById(id) {
    try {
      const endpoint = buildEndpointUrl(
        `${API_ENDPOINTS.ONLINE_LESSONS}/${id}`,
        {
          populate: "*",
          locale: getDefaultLocale(),
        }
      );
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// Podcasts Service - Using standard routes (missing from original)
export const podcastsService = {
  async getPodcasts(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        sort: "id:desc",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };
      const endpoint = buildEndpointUrl(API_ENDPOINTS.PODCASTS, queryParams);
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getPodcastById(id) {
    try {
      const endpoint = buildEndpointUrl(`${API_ENDPOINTS.PODCASTS}/${id}`, {
        populate: "*",
        locale: getDefaultLocale(),
      });
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// Statements Service - Using standard routes
export const statementsService = {
  async getStatements(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        sort: "id:desc",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
      };
      const endpoint = buildEndpointUrl(API_ENDPOINTS.STATEMENTS, queryParams);
      const response = await Fetcher(endpoint);

      // Return proper structure with data and meta
      return {
        data: formatStrapiResponse(response),
        meta: response.meta || {},
      };
    } catch (error) {
      throw error;
    }
  },

  async getStatementById(id) {
    try {
      const endpoint = buildEndpointUrl(`${API_ENDPOINTS.STATEMENTS}/${id}`, {
        populate: "*",
        locale: getDefaultLocale(),
      });
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

// Company Works Service - For campaigns
export const companyWorksService = {
  async getCompanyWorks(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        sort: "publishedAt:desc",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
        ...params,
      };

      const endpoint = buildEndpointUrl(
        API_ENDPOINTS.COMPANY_WORKS,
        queryParams
      );
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      console.error("Error fetching company works:", error);
      throw error;
    }
  },

  async getCompanyWorkById(id) {
    try {
      const endpoint = buildEndpointUrl(
        `${API_ENDPOINTS.COMPANY_WORKS}/${id}`,
        {
          populate: "*",
          locale: getDefaultLocale(),
        }
      );
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      console.error("Error fetching company work:", error);
      throw error;
    }
  },
};

// Company Work Features Service - For campaign features
export const companyWorkFeaturesService = {
  async getCompanyWorkFeatures(params = {}) {
    try {
      const queryParams = {
        populate: "*",
        sort: "publishedAt:desc",
        locale: getDefaultLocale(),
        "pagination[page]": params.page || 1,
        "pagination[pageSize]": params.pageSize || 10,
        ...params,
      };

      const endpoint = buildEndpointUrl(
        API_ENDPOINTS.COMPANY_WORK_FEATURES,
        queryParams
      );
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      console.error("Error fetching company work features:", error);
      throw error;
    }
  },

  async getCompanyWorkFeatureById(id) {
    try {
      const endpoint = buildEndpointUrl(
        `${API_ENDPOINTS.COMPANY_WORK_FEATURES}/${id}`,
        {
          populate: "*",
          locale: getDefaultLocale(),
        }
      );
      const response = await Fetcher(endpoint);
      return formatStrapiResponse(response);
    } catch (error) {
      console.error("Error fetching company work feature:", error);
      throw error;
    }
  },
};

// Export all services
export default {
  posts: postsService,
  events: eventsService,
  actions: actionsService,
  videos: videosService,
  libraries: librariesService,
  stories: storiesService,
  reports: reportsService,
  campaigns: campaignsService,
  companyWorks: companyWorksService,
  companyWorkFeatures: companyWorkFeaturesService,
  settings: settingsService,
  merch: merchService,
  faqs: faqsService,
  slideshows: slideshowsService,
  lessons: lessonsService,
  onlineLessons: onlineLessonsService,
  podcasts: podcastsService,
  statements: statementsService,
};

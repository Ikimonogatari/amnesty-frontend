import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  API_CONFIG,
  buildApiUrl,
  buildPostApiUrl,
  formatStrapiResponse,
  formatPostResponse,
  MOCK_DATA,
} from "@/config/api";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      // Add Strapi API key for authentication
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (apiKey) {
        headers.set("Authorization", `Bearer ${apiKey}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Post",
    "Event",
    "Action",
    "Video",
    "Story",
    "Library",
    "FAQ",
    "Slideshow",
    "CompanyWork",
    "CompanyWorkFeature",
    "Contact",
    "Report",
  ],
  endpoints: (builder) => ({
    // Contact form submission
    submitContactForm: builder.mutation({
      queryFn: async (data) => {
        try {
          const response = await fetch("/api/contact-request/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              phone: data.phone,
              subject: data.subject || "Contact Form Submission",
              message: data.message,
              contactType: data.contactType,
              token: data.token,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            return { error: { status: response.status, data: errorData } };
          }

          const result = await response.json();
          return { data: result };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
      invalidatesTags: ["Contact"],
    }),

    // Human Rights Report submission
    submitHumanRightsReport: builder.mutation({
      queryFn: async (data) => {
        try {
          const response = await fetch("/api/human-right-reports/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: data.phone,
              otp: data.otp,
              evidenceCode: data.evidenceCode,
              incident: data.incident,
              outcome: data.outcome,
              authorities: data.authorities,
              details: data.details,
              message: data.message,
              images: data.images,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            return { error: { status: response.status, data: errorData } };
          }

          const result = await response.json();
          return { data: result };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
      invalidatesTags: ["Report"],
    }),

    // Posts endpoints - using custom list endpoint
    getPosts: builder.query({
      query: (params = {}) => {
        // Use the posts/list endpoint which is working
        let url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS_LIST}`;

        // Add query parameters
        const queryParams = [];

        // Add pagination parameters
        if (params["pagination[page]"]) {
          queryParams.push(`page=${params["pagination[page]"]}`);
        }
        if (params["pagination[pageSize]"]) {
          queryParams.push(`pageSize=${params["pagination[pageSize]"]}`);
        }

        // Add category filter if provided
        if (params.post_category) {
          queryParams.push(
            `post_category=${encodeURIComponent(params.post_category)}`
          );
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response, meta, arg) => {
        // The /posts/list endpoint returns data in flattened format, not nested attributes
        // Use actual pagination data from response if available, otherwise calculate from current data
        const actualPagination = response.meta?.pagination;
        const pageSize = arg["pagination[pageSize]"] || 9;
        const currentPage = arg["pagination[page]"] || 1;

        return {
          data: response.data || [],
          meta: {
            pagination: actualPagination || {
              // Fallback calculation - assume there might be more pages
              // This is a temporary fix until the API returns proper pagination
              pageCount: Math.max(
                Math.ceil((response.data?.length || 0) / pageSize),
                currentPage + (response.data?.length === pageSize ? 1 : 0)
              ),
              pageSize: pageSize,
              page: currentPage,
              total: response.data?.length || 0,
            },
          },
        };
      },
      providesTags: ["Post"],
    }),

    getPostById: builder.query({
      query: (id) => {
        const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.POSTS}/${id}`);
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    getRecommendedPosts: builder.query({
      query: (params = {}) => {
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.POSTS, {
          "pagination[pageSize]": 3,
          sort: "publishedAt:desc",
          ...params,
        });
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        const result = formatStrapiResponse(response);
        // Return first 3 posts as recommended
        return result.data ? result.data.slice(0, 3) : [];
      },
      providesTags: ["Post"],
    }),

    // Events endpoints - using standard Strapi API
    getEvents: builder.query({
      query: (params = {}) => {
        // Extract pageSize from params to avoid duplication
        const { pageSize, page, sort, ...otherParams } = params;

        const url = buildApiUrl(API_CONFIG.ENDPOINTS.EVENTS, {
          "pagination[pageSize]":
            pageSize || API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
          "pagination[page]": page || 1,
          sort: sort || "start_date:asc",
          ...otherParams,
        });
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: ["Event"],
    }),

    getEventById: builder.query({
      query: (id) => {
        const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.EVENTS}/${id}`);
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),

    // Actions endpoints - using standard Strapi API
    getActions: builder.query({
      query: (params = {}) => {
        // Extract pageSize from params to avoid duplication
        const { pageSize, page, sort, ...otherParams } = params;

        const url = buildApiUrl(API_CONFIG.ENDPOINTS.ACTIONS, {
          "pagination[pageSize]":
            pageSize || API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
          "pagination[page]": page || 1,
          sort: sort || "publishedAt:desc",
          ...otherParams,
        });
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: ["Action"],
    }),

    getActionById: builder.query({
      query: (id) => {
        const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.ACTIONS}/${id}`);
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: (result, error, id) => [{ type: "Action", id }],
    }),

    // Videos endpoints - using standard Strapi API
    getVideos: builder.query({
      query: (params = {}) => {
        // Extract pageSize from params to avoid duplication
        const { pageSize, page, sort, ...otherParams } = params;

        const url = buildApiUrl(API_CONFIG.ENDPOINTS.VIDEOS, {
          "pagination[pageSize]":
            pageSize || API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
          "pagination[page]": page || 1,
          sort: sort || "publishedAt:desc",
          ...otherParams,
        });
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: ["Video"],
    }),

    getVideoById: builder.query({
      query: (id) => {
        const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.VIDEOS}/${id}`);
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: (result, error, id) => [{ type: "Video", id }],
    }),

    // Stories endpoints - using standard Strapi API
    getStories: builder.query({
      query: (params = {}) => {
        // Extract pageSize from params to avoid duplication
        const { pageSize, page, sort, ...otherParams } = params;

        const url = buildApiUrl(API_CONFIG.ENDPOINTS.STORIES, {
          "pagination[pageSize]":
            pageSize || API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
          "pagination[page]": page || 1,
          sort: sort || "publishedAt:desc",
          ...otherParams,
        });
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: ["Story"],
    }),

    // Library endpoints - using standard Strapi API
    getLibraries: builder.query({
      query: (params = {}) => {
        // Extract pageSize from params to avoid duplication
        const { pageSize, page, sort, ...otherParams } = params;

        const url = buildApiUrl(API_CONFIG.ENDPOINTS.LIBRARIES, {
          "pagination[pageSize]":
            pageSize || API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
          "pagination[page]": page || 1,
          sort: sort || "createdAt:desc",
          ...otherParams,
        });
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: ["Library"],
    }),

    getLibraryById: builder.query({
      query: (id) => {
        const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.LIBRARIES}/${id}`);
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: (result, error, id) => [{ type: "Librarys", id }],
    }),

    // FAQs endpoints - using standard Strapi API
    getFaqs: builder.query({
      query: (params = {}) => {
        // Simple endpoint without complex pagination
        return "/faqs";
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: ["FAQ"],
    }),

    // Reports endpoints - using standard Strapi API (matching old web sorting)
    getReports: builder.query({
      query: (params = {}) => {
        // Extract pageSize from params to avoid duplication
        const { pageSize, page, sort, ...otherParams } = params;

        const url = buildApiUrl(API_CONFIG.ENDPOINTS.REPORTS, {
          "pagination[pageSize]":
            pageSize || API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
          "pagination[page]": page || 1,
          sort: sort || "id:desc", // Match old web sorting by ID descending
          ...otherParams,
        });
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: ["Report"],
    }),

    getReportById: builder.query({
      query: (id) => {
        return `/reports/${id}`;
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: (result, error, id) => [{ type: "Report", id }],
    }),

    // Slideshows endpoints - using standard Strapi API
    getSlideshows: builder.query({
      query: (params = {}) => {
        // Extract pageSize from params to avoid duplication
        const { pageSize, page, sort, ...otherParams } = params;

        const url = buildApiUrl(API_CONFIG.ENDPOINTS.SLIDESHOWS, {
          "pagination[pageSize]":
            pageSize || API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
          "pagination[page]": page || 1,
          sort: sort || "publishedAt:desc",
          ...otherParams,
        });
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: ["Slideshow"],
    }),

    // Company Work endpoints - using standard Strapi API
    getCompanyWorks: builder.query({
      query: (params = {}) => {
        // Extract pageSize from params to avoid duplication
        const { pageSize, page, sort, ...otherParams } = params;

        const url = buildApiUrl(API_CONFIG.ENDPOINTS.COMPANY_WORK, {
          "pagination[pageSize]":
            pageSize || API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
          "pagination[page]": page || 1,
          sort: sort || "publishedAt:desc",
          ...otherParams,
        });
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: ["CompanyWork"],
    }),

    getCompanyWorkById: builder.query({
      query: (id) => {
        const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.COMPANY_WORK}/${id}`);
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: (result, error, id) => [{ type: "CompanyWork", id }],
    }),

    // Company Work Features endpoints - using standard Strapi API
    getCompanyWorkFeatures: builder.query({
      query: (params = {}) => {
        // Extract pageSize from params to avoid duplication
        const { pageSize, page, sort, ...otherParams } = params;

        const url = buildApiUrl(API_CONFIG.ENDPOINTS.COMPANY_WORK_FEATURES, {
          "pagination[pageSize]":
            pageSize || API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
          "pagination[page]": page || 1,
          sort: sort || "publishedAt:desc",
          ...otherParams,
        });
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: ["CompanyWorkFeature"],
    }),

    getCompanyWorkFeatureById: builder.query({
      query: (id) => {
        const url = buildApiUrl(
          `${API_CONFIG.ENDPOINTS.COMPANY_WORK_FEATURES}/${id}`
        );
        return url.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatStrapiResponse(response);
      },
      providesTags: (result, error, id) => [{ type: "CompanyWorkFeature", id }],
    }),

    // Homepage content (combination of multiple content types)
    getHomepageContent: builder.query({
      query: () => {
        // This will be used to fetch multiple content types for homepage
        const postsUrl = buildPostApiUrl(API_CONFIG.ENDPOINTS.POSTS_LIST, {
          limit: 6,
        });
        return postsUrl.replace(API_CONFIG.BASE_URL, "");
      },
      transformResponse: (response) => {
        return formatPostResponse(response);
      },
      providesTags: ["Post"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetRecommendedPostsQuery,
  useGetEventsQuery,
  useGetEventByIdQuery,
  useGetActionsQuery,
  useGetActionByIdQuery,
  useGetVideosQuery,
  useGetVideoByIdQuery,
  useGetStoriesQuery,
  useGetLibrariesQuery,
  useGetLibraryByIdQuery,
  useGetFaqsQuery,
  useGetReportsQuery,
  useGetReportByIdQuery,
  useGetSlideshowsQuery,
  useGetCompanyWorksQuery,
  useGetCompanyWorkByIdQuery,
  useGetCompanyWorkFeaturesQuery,
  useGetCompanyWorkFeatureByIdQuery,
  useGetHomepageContentQuery,
  useSubmitContactFormMutation,
  useSubmitHumanRightsReportMutation,
} = apiService;

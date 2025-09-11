# Locale Configuration Documentation

This document describes how locale is properly configured throughout the Amnesty International website to use environment variables consistently.

## Environment Configuration

The primary locale configuration is controlled by the environment variable:

```bash
NEXT_PUBLIC_CMS_LOCALE=mn-MN
```

This variable is defined in:

- `.env` files (development/production)
- `Dockerfile` (for containerized deployments)
- `env.example` (template for new environments)

## Frontend Locale Usage

### API Configuration

All API calls now properly use the environment locale through:

1. **Main API Config** (`src/config/api.js`):

   ```javascript
   export const API_CONFIG = {
     LOCALE: process.env.NEXT_PUBLIC_CMS_LOCALE || "mn-MN",
     DEFAULT_PARAMS: {
       locale: process.env.NEXT_PUBLIC_CMS_LOCALE || "mn-MN",
     },
     POST_PARAMS: {
       locale: process.env.NEXT_PUBLIC_CMS_LOCALE || "mn-MN",
     },
   };
   ```

2. **URL Building Functions**:

   - `buildApiUrl()` - Automatically includes locale for standard endpoints
   - `buildPostApiUrl()` - Includes locale for custom post endpoints
   - `buildEndpointUrl()` - Allows explicit locale parameter

3. **Redux API Service** (`src/redux/services/apiService.js`):
   - Sets `Accept-Language` header using environment locale
   - Converts `mn-MN` to `mn` for backend compatibility
   - All query endpoints include explicit locale parameters
   - Custom endpoints (posts, reports) manually add locale to query strings

### Locale Utility Functions

A new utility module `src/utils/locale.js` provides centralized locale functions:

```javascript
import { getLocale, formatCurrency, formatDate } from "@/utils/locale";

// Get current locale from environment
const locale = getLocale(); // Returns 'mn-MN'

// Format currency with proper locale
const price = formatCurrency(15000); // Returns "15,000₮"

// Format date with proper locale
const date = formatDate("2024-01-15"); // Returns localized date
```

### Component Updates

The following components have been updated to use environment locale:

- **Event Components**: `EventsDesktop.jsx`, `EventsMobile.jsx`
- **Donation Components**: `MySubscriptions.jsx`, `MySubscriptionsMobile.jsx`
- **Video Pages**: `videos/[id].js`
- **User Profile**: `UserProfile.jsx`
- **Examples**: `SuspenseNewsList.jsx`

## Backend Locale Support

### Strapi CMS Configuration

The Strapi backend properly supports locale through:

1. **i18n Plugin**: `@strapi/plugin-i18n` is installed and configured
2. **Content Types**: All content types have `i18n: { localized: true }` enabled
3. **Locale Detection**: `getLocale()` function reads `Accept-Language` header
4. **Default Locale**: Falls back to `mn` if no locale specified

### API Endpoint Locale Handling

All API endpoints support the `locale` parameter:

- Standard endpoints: `/api/posts?locale=mn-MN`
- Custom endpoints: Automatically include locale from environment
- Single item endpoints: Include locale in query parameters

## Testing

A comprehensive test was created to verify locale configuration:

```bash
# All tests pass:
✅ API_CONFIG.LOCALE uses environment variable
✅ DEFAULT_PARAMS includes environment locale
✅ POST_PARAMS includes environment locale
✅ buildApiUrl includes locale parameter
✅ buildPostApiUrl includes locale parameter
✅ buildEndpointUrl supports explicit locale
```

## Migration Summary

### Changes Made

1. **Centralized Locale Configuration**:

   - All hardcoded `'mn-MN'` values replaced with environment variable references
   - Created `src/utils/locale.js` for consistent locale handling

2. **API Service Updates**:

   - `src/services/apiService.js`: Uses `getDefaultLocale()` function
   - `src/redux/services/apiService.js`: Fixed custom query endpoints to include locale parameters
   - `src/config/api.js`: Mock data updated to use environment locale
   - `src/utils/fetcher.js`: Added `buildFetcherUrl()` helper function for consistent locale handling
   - **News Page Fix**: Added explicit locale parameters to `getPosts` and `getReports` queries
   - **All Content Pages Fix**: Updated videos, lessons, podcasts, libraries, online-lessons pages

3. **Component Updates**:

   - Date/number formatting now uses locale utility functions
   - Event components use `API_CONFIG.LOCALE` instead of hardcoded values

4. **URL Building**:

   - All URL building functions properly include locale from environment
   - Automatic locale inclusion for standard endpoints
   - Explicit locale support for custom requirements
   - New `buildFetcherUrl()` utility for pages using direct Fetcher calls

5. **Content Pages**:
   - All content listing pages: videos, lessons, podcasts, libraries, online-lessons
   - Single content pages: individual video, lesson, podcast, library, online-lesson pages
   - Knowrights page: aggregated content from multiple endpoints

### Benefits

- **Consistency**: All API calls use the same locale from environment
- **Maintainability**: Single source of truth for locale configuration
- **Flexibility**: Easy to change locale by updating environment variable
- **Testing**: Comprehensive test coverage ensures locale is properly applied

## Environment Setup

To configure locale for different environments:

### Development

```bash
NEXT_PUBLIC_CMS_LOCALE=mn-MN
```

### Production

```bash
NEXT_PUBLIC_CMS_LOCALE=mn-MN
```

### Testing

```bash
NEXT_PUBLIC_CMS_LOCALE=test-locale
```

## Troubleshooting

### Common Issues

1. **Missing Locale Parameter**: Ensure environment variable is set
2. **Wrong Locale Format**: Use format `mn-MN` (language-country)
3. **Backend Compatibility**: Backend expects `mn` (language only)

### Verification

To verify locale configuration is working:

1. Check browser network tab for API calls
2. Confirm `locale=mn-MN` parameter in URLs
3. Verify `Accept-Language: mn` header is set
4. Test with different environment locale values

## Future Considerations

- Support for additional locales (English, etc.)
- Dynamic locale switching in UI
- Locale-specific content fallbacks
- Performance optimization for multi-locale content

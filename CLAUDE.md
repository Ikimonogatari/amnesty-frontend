# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Amnesty International Mongolia public website using traditional Mongolian script (Mongol Bichig). This is a Next.js 15 application with Pages Router that displays content in vertical right-to-left writing mode for traditional Mongolian text.

## Development Commands

```bash
npm run dev      # Start development server at localhost:3000/mng
npm run build    # Production build
npm run lint     # Run ESLint
```

### Docker

```bash
docker-compose --profile dev up        # Development
docker-compose --profile prod up       # Production
docker-compose --profile nginx up      # Production with Nginx reverse proxy
```

## Architecture

### Routing & Base Path
- Uses Next.js Pages Router (not App Router)
- Base path is `/mng` (configured in `next.config.mjs`)
- All routes are prefixed with `/mng` (e.g., `/mng/news`, `/mng/about/1`)

### Layout System
Desktop and mobile have completely different layouts:
- **Desktop**: Horizontal scrolling layout for traditional Mongolian vertical text (`writingMode: vertical-lr`)
- **Mobile**: Standard vertical scrolling layout

Components follow the pattern `ComponentDesktop.jsx` / `ComponentMobile.jsx` with the page selecting which to render based on viewport.

### State Management
- Redux Toolkit with RTK Query for API data fetching
- Store: `src/redux/store.js`
- API service: `src/redux/services/apiService.js` - exports hooks like `useGetPostsQuery`, `useGetEventsQuery`, etc.

### API Integration
- Backend: Strapi v4 CMS at `cms.amnesty.mn`
- User API: `api.amnesty.mn/users`
- Configuration: `src/config/api.js` and `src/config/apiEndpoints.js`
- Locale: `mn-MN` (Mongolian)
- All API responses use RTK Query's `transformResponse` to flatten Strapi's nested attribute structure

### Key Directories
- `src/pages/` - Next.js pages (index.js, news.js, about/*.js, etc.)
- `src/pages/api/` - Next.js API routes (donation, auth, contact)
- `src/components/` - React components organized by feature
- `src/redux/services/` - RTK Query API definitions
- `src/config/` - API configuration and endpoints
- `src/utils/` - Utility functions including Mongolian number formatting

### Environment Variables
Required in `.env`:
```
NEXT_PUBLIC_API_URL=https://cms.amnesty.mn/api
NEXT_PUBLIC_MEDIA_URL=https://cms.amnesty.mn
NEXT_PUBLIC_USER_API_URL=<user api url>
NEXT_PUBLIC_CMS_LOCALE=mn-MN
```

## Mongolian Script Considerations

- Use `font-mongolian` Tailwind class for Mongolian text
- Toast notifications use `writingMode: vertical-lr` for proper display
- Desktop layout scrolls horizontally to accommodate vertical text flow

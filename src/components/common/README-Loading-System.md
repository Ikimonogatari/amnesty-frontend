# Modern Loading System with React Suspense

This document explains the new Suspense-based loading system that provides a modern, efficient way to handle loading states throughout the application.

## 🎯 Overview

The loading system consists of multiple components working together:

- **`LoadingSpinner`** - Simple spinner for inline loading states
- **`LayoutLoader`** - Full-screen branded loader with Amnesty logo
- **`SuspenseLoader`** - Suspense wrapper component
- **`SuspenseFetcher`** - Utilities for Suspense-compatible data fetching

## 🚀 Quick Start

### Basic Loading Spinner (Replace Old Loaders)

```jsx
// OLD WAY (replace this)
<div className="min-h-screen flex items-center justify-center">
  <div className="text-center">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
    <p
      className="mt-4 text-gray-600"
      style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
    >
      ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ...
    </p>
  </div>
</div>;

// NEW WAY (use this)
import LoadingSpinner from "@/components/common/LoadingSpinner";

return <LoadingSpinner size="sm" />;
```

### Full-Screen Layout Loader

```jsx
import LayoutLoader from "@/components/common/LayoutLoader";

return (
  <LayoutLoader
    logoSize="xl"
    showText={true}
    customText="ᠰᠣᠨᠢᠨ ᠮᠡᠳᠡᠭᠡᠯ ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ..."
    backgroundColor="bg-gradient-to-br from-blue-50 to-indigo-100"
  />
);
```

## 📋 Components Reference

### LoadingSpinner

| Prop           | Type    | Default                  | Description                          |
| -------------- | ------- | ------------------------ | ------------------------------------ |
| `size`         | string  | `"md"`                   | Spinner size: `"sm"`, `"md"`, `"lg"` |
| `text`         | string  | `"ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ..."` | Loading text                         |
| `spinnerColor` | string  | `"border-gray-900"`      | Spinner border color                 |
| `textColor`    | string  | `"text-gray-600"`        | Text color                           |
| `fullScreen`   | boolean | `true`                   | Full screen height                   |

### LayoutLoader

| Prop              | Type    | Default           | Description                               |
| ----------------- | ------- | ----------------- | ----------------------------------------- |
| `logoSize`        | string  | `"lg"`            | Logo size: `"sm"`, `"md"`, `"lg"`, `"xl"` |
| `showText`        | boolean | `true`            | Show loading text                         |
| `customText`      | string  | `null`            | Custom loading text                       |
| `backgroundColor` | string  | `"bg-white"`      | Background color                          |
| `logoColor`       | string  | `"text-blue-600"` | Logo accent color                         |

### SuspenseLoader

| Prop         | Type      | Default | Description                      |
| ------------ | --------- | ------- | -------------------------------- |
| `children`   | ReactNode | -       | Components to wrap with Suspense |
| `fallback`   | ReactNode | `null`  | Custom fallback component        |
| `loaderSize` | string    | `"lg"`  | Fallback loader size             |

## 🔄 Migration Guide

### Step 1: Add Import

```jsx
import LoadingSpinner from "@/components/common/LoadingSpinner";
```

### Step 2: Replace Loading State

```jsx
// Before
if (isLoading && data.length === 0) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
        <p
          className="mt-4 text-gray-600"
          style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
        >
          ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ...
        </p>
      </div>
    </div>
  );
}

// After
if (isLoading && data.length === 0) {
  return <LoadingSpinner size="sm" />;
}
```

### Step 3: Clean Up

Remove the old loading state JSX and any unused imports.

## ⚡ Advanced Usage with Suspense

### Creating Suspense-Compatible Components

```jsx
import { useMemo } from "react";
import { createSuspenseApiFetcher } from "@/utils/suspenseFetcher";

function MyDataComponent() {
  const fetcher = useMemo(() => createSuspenseApiFetcher("/api/data"), []);

  const resource = useMemo(() => {
    const { createResource } = require("@/utils/suspenseFetcher");
    return createResource(fetcher, []);
  }, [fetcher]);

  const data = resource.read(); // This throws promise while loading

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// Wrap with SuspenseLoader
import SuspenseLoader from "@/components/common/SuspenseLoader";

export default function MyPage() {
  return (
    <SuspenseLoader>
      <MyDataComponent />
    </SuspenseLoader>
  );
}
```

### Using Higher-Order Component

```jsx
import { withSuspense } from "@/components/common/SuspenseLoader";

const MyComponentWithSuspense = withSuspense(MyComponent, {
  loaderSize: "lg",
  showText: true,
  customText: "ᠲᠤᠰᠭᠠᠢ ᠮᠡᠳᠡᠭᠡᠯ ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ...",
});

// Usage
<MyComponentWithSuspense />;
```

## 🎨 Customization Examples

### Branded Full-Screen Loader

```jsx
<LayoutLoader
  logoSize="xl"
  customText="ᠡᠮᠨᠡᠰᠲᠢ ᠢᠨᠲᠡᠷᠨᠡᠰᠬᠨᠠᠯ ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ..."
  backgroundColor="bg-gradient-to-br from-blue-50 via-white to-indigo-50"
  logoColor="text-blue-600"
/>
```

### Minimal Inline Spinner

```jsx
<LoadingSpinner
  size="sm"
  text="ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ..."
  spinnerColor="border-blue-500"
  textColor="text-blue-600"
  fullScreen={false}
/>
```

### Custom Suspense Boundary

```jsx
<SuspenseLoader
  fallback={
    <div className="custom-loader">
      <CustomLoaderComponent />
    </div>
  }
>
  <MyComponent />
</SuspenseLoader>
```

## 🚀 Benefits

- **Better UX**: Consistent, branded loading experiences
- **Performance**: Suspense enables concurrent loading and better caching
- **Maintainability**: Centralized loading logic
- **Accessibility**: Proper loading states with screen readers
- **Modern React**: Uses latest React patterns and Suspense

## 📁 File Structure

```
src/components/common/
├── LoadingSpinner.jsx          # Simple spinner component
├── LayoutLoader.jsx            # Full-screen branded loader
├── SuspenseLoader.jsx          # Suspense wrapper utilities
└── README-Loading-System.md    # This documentation

src/utils/
└── suspenseFetcher.js          # Suspense-compatible data fetching
```

## 🔧 Troubleshooting

### Loader Not Showing

- Check that the component is properly imported
- Ensure the loading condition is correctly triggering
- Verify that the parent container has proper dimensions

### Suspense Not Working

- Make sure you're using React 18+ with Suspense support
- Check that the fetcher function is properly throwing promises
- Verify the Suspense boundary is correctly wrapping the component

### Text Not Centering

- Check that the container has proper flex properties
- Ensure there are no conflicting CSS styles
- Verify the vertical text styling is correct

## 📞 Support

For questions about the loading system, refer to the component documentation or create an issue in the project repository.

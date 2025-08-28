/**
 * Suspense Loader Component
 * Modern loading solution using React Suspense
 * Can be used as fallback for Suspense boundaries
 */

import { Suspense } from "react";
import LayoutLoader from "./LayoutLoader";

export default function SuspenseLoader({
  children,
  fallback = null,
  loaderSize = "lg",
  showText = true,
  customText = null,
  backgroundColor = "bg-white",
  logoColor = "text-blue-600",
}) {
  // Default fallback loader
  const defaultFallback = (
    <LayoutLoader
      logoSize={loaderSize}
      showText={showText}
      customText={customText}
      backgroundColor={backgroundColor}
      logoColor={logoColor}
    />
  );

  const fallbackLoader = fallback || defaultFallback;

  return <Suspense fallback={fallbackLoader}>{children}</Suspense>;
}

// Higher-order component for wrapping components with Suspense
export function withSuspense(Component, options = {}) {
  const {
    loaderSize = "lg",
    showText = true,
    customText = null,
    backgroundColor = "bg-white",
    logoColor = "text-blue-600",
    fallback = null,
  } = options;

  const WrappedComponent = (props) => {
    const defaultFallback = (
      <LayoutLoader
        logoSize={loaderSize}
        showText={showText}
        customText={customText}
        backgroundColor={backgroundColor}
        logoColor={logoColor}
      />
    );

    const fallbackLoader = fallback || defaultFallback;

    return (
      <Suspense fallback={fallbackLoader}>
        <Component {...props} />
      </Suspense>
    );
  };

  WrappedComponent.displayName = `withSuspense(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
}

// Page-level Suspense wrapper
export function PageSuspenseLoader({
  children,
  loaderSize = "xl",
  showText = true,
  customText = null,
  backgroundColor = "bg-gradient-to-br from-blue-50 to-indigo-100",
  logoColor = "text-blue-600",
}) {
  return (
    <SuspenseLoader
      loaderSize={loaderSize}
      showText={showText}
      customText={customText}
      backgroundColor={backgroundColor}
      logoColor={logoColor}
    >
      {children}
    </SuspenseLoader>
  );
}

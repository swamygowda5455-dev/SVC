import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  SITE_DOMAIN, 
  SITE_NAME, 
  DEFAULT_OG_IMAGE, 
  SEO_PAGE_METADATA, 
  BASE_ORGANIZATION_SCHEMA, 
  BASE_WEBSITE_SCHEMA,
  generateBreadcrumbsSchema
} from "../seo/seoConfig.js";

// Helper function to update or create a meta tag
function setMetaTag(attributeName, attributeValue, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

// Helper function to update or create a link tag (e.g. canonical)
function setLinkTag(rel, href) {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

// Helper function to inject structured data JSON-LD scripts
function setStructuredData(id, schemaObject) {
  if (!schemaObject) return;
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schemaObject);
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  breadcrumbs = null,
  customSchemas = []
}) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Fallback to pre-configured metadata based on path if not explicitly provided
  const routeMeta = SEO_PAGE_METADATA[currentPath] || SEO_PAGE_METADATA["/"] || {};

  const effectiveTitle = title || routeMeta.title || SITE_NAME;
  const effectiveDescription = description || routeMeta.description || "";
  const effectiveKeywords = keywords || routeMeta.keywords || "";
  const effectiveCanonical = canonical || routeMeta.canonical || `${SITE_DOMAIN}${currentPath === "/" ? "" : currentPath}`;
  const effectiveOgType = ogType || routeMeta.ogType || "website";
  const effectiveOgImage = ogImage || DEFAULT_OG_IMAGE;
  const effectiveBreadcrumbs = breadcrumbs || routeMeta.breadcrumbs || null;

  useEffect(() => {
    // 1. Page Title
    document.title = effectiveTitle;

    // 2. Standard HTML Meta Tags
    setMetaTag("name", "description", effectiveDescription);
    if (effectiveKeywords) {
      setMetaTag("name", "keywords", effectiveKeywords);
    }
    setMetaTag("name", "robots", robots);
    setMetaTag("name", "author", "Sri Vidya Chetana Degree College");

    // 3. Canonical Link
    setLinkTag("canonical", effectiveCanonical);

    // 4. Open Graph Meta Tags
    setMetaTag("property", "og:title", effectiveTitle);
    setMetaTag("property", "og:description", effectiveDescription);
    setMetaTag("property", "og:url", effectiveCanonical);
    setMetaTag("property", "og:type", effectiveOgType);
    setMetaTag("property", "og:image", effectiveOgImage);
    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("property", "og:locale", "en_IN");

    // 5. Twitter Card Meta Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", effectiveTitle);
    setMetaTag("name", "twitter:description", effectiveDescription);
    setMetaTag("name", "twitter:image", effectiveOgImage);

    // 6. Base Organization & Website Schemas (Global)
    setStructuredData("seo-jsonld-org", BASE_ORGANIZATION_SCHEMA);
    setStructuredData("seo-jsonld-website", BASE_WEBSITE_SCHEMA);

    // 7. Breadcrumbs Schema
    if (effectiveBreadcrumbs) {
      const breadcrumbsSchema = generateBreadcrumbsSchema(effectiveBreadcrumbs);
      if (breadcrumbsSchema) {
        setStructuredData("seo-jsonld-breadcrumbs", breadcrumbsSchema);
      }
    }

    // 8. Custom Schemas (e.g. Course, FAQ, etc.)
    if (customSchemas && customSchemas.length > 0) {
      customSchemas.forEach((schema, idx) => {
        if (schema) {
          setStructuredData(`seo-jsonld-custom-${idx}`, schema);
        }
      });
    }

    // Cleanup dynamic custom schemas when unmounting / navigating
    return () => {
      const customScripts = document.querySelectorAll('script[id^="seo-jsonld-custom-"]');
      customScripts.forEach((s) => s.remove());
    };
  }, [
    effectiveTitle,
    effectiveDescription,
    effectiveKeywords,
    effectiveCanonical,
    effectiveOgType,
    effectiveOgImage,
    robots,
    effectiveBreadcrumbs,
    customSchemas
  ]);

  return null;
}

import type { JsonLdGraph } from "@/types/seo";

interface JsonLdProps {
  graph: JsonLdGraph;
}

/**
 * Renders a page's JSON-LD `@graph` as a server-rendered `<script>` tag —
 * a plain Server Component (no "use client"), so the structured data is
 * present in the initial HTML for crawlers rather than injected client-side.
 * `JSON.stringify` on a value we constructed ourselves (never raw user
 * input) is standard practice for this tag; nothing here originates from a
 * request.
 */
export function JsonLd({ graph }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

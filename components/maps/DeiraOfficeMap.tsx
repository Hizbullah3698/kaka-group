"use client";

import type { Map as LeafletMap } from "leaflet";
import { useEffect, useRef } from "react";

import "leaflet/dist/leaflet.css";

// Same coordinates and zoom as `deira-map.html`.
const HQ: [number, number] = [25.267, 55.309];

/**
 * KAKA Group's Deira head office, rendered as a real Leaflet/OpenStreetMap
 * street map — deliberately NOT built on the TradeMap/ExportRoutesMap D3
 * hub-arc architecture. Those two draw an abstract topojson land silhouette
 * with great-circle arcs between named regions at world scale, with no real
 * basemap and no zoom interaction. `deira-map.html` is a genuinely
 * different kind of map: a real, zoomable, georeferenced street map
 * centered on one building, using raster OSM tiles — a problem d3-geo and
 * world-atlas topojson don't address at all. This is the "looks similar
 * (both are branded maps with a gold pin/arc), differs in layout,
 * interactions and semantics — keep separate" case, not a shared-map-
 * architecture opportunity. It still had to stop being a raw `<iframe
 * src="deira-map.html">` per instruction, so this replicates the original's
 * vanilla-Leaflet setup (dark tile-invert filter, gold divIcon pin with a
 * pulse ring, permanent label tooltip) as a real embedded component instead
 * of a sandboxed document — same deviation TradeMap/ExportRoutesMap already
 * made for their own iframe sources.
 *
 * Vanilla Leaflet (imperative init in `useEffect`, matching the source's own
 * approach) rather than react-leaflet — the only map on the site that needs
 * a tile-based basemap, so a second mapping-library abstraction isn't
 * warranted for one usage.
 */
export function DeiraOfficeMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let map: LeafletMap | undefined;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        center: HQ,
        zoom: 16,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      L.marker(HQ, {
        icon: L.divIcon({
          className: "",
          html: '<span class="kaka-deira-pin-ring animate-pin-pulse"></span><span class="kaka-deira-pin-dot"></span>',
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        }),
      })
        .addTo(map)
        .bindTooltip("Rolex Twin Tower &middot; Office No. 1001", {
          permanent: true,
          direction: "top",
          offset: [0, -14],
          className: "kaka-deira-tooltip",
          opacity: 1,
        });
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="kaka-deira-map h-full w-full"
      aria-label="Map of KAKA Group head office, Baniyas Road, Deira"
    />
  );
}

import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";

const WORLD_ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";

let cachedLand: Promise<FeatureCollection<Geometry>> | null = null;

/**
 * Loads the world-atlas 110m countries topology and converts it to GeoJSON —
 * the exact same CDN source and conversion `trade-map.html` and
 * `export-routes.html` both use. Shared here (rather than duplicated per
 * map) because both maps need the identical land geometry; only the nodes,
 * arcs and hub differ between them.
 *
 * Cached at module scope so mounting more than one D3 hub-arc map on a page
 * — or remounting one — doesn't re-fetch the ~100kb topology each time.
 */
export function loadWorldLand(): Promise<FeatureCollection<Geometry>> {
  if (!cachedLand) {
    cachedLand = fetch(WORLD_ATLAS_URL)
      .then((res) => res.json())
      .then((topology: Topology) => {
        const countries = topology.objects.countries as GeometryCollection;
        return feature(topology, countries) as unknown as FeatureCollection<Geometry>;
      });
  }
  return cachedLand;
}

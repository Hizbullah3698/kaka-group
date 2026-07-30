"use client";

import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { useEffect, useRef, useState } from "react";

import { arcPath } from "@/lib/geo/arc";
import { loadWorldLand } from "@/lib/geo/worldAtlas";
import { colors } from "@/lib/tokens";
import { cn } from "@/lib/utils";

interface RouteNode {
  name: string;
  coords: [number, number];
  side: "left" | "right";
  /** Small per-label vertical nudge to avoid overlap — Georgia/Iraq sit close together on the map. */
  labelOffset: number;
}

// [lng, lat]. Same coordinates as `export-routes.html`. Hub label reads "UAE" here (TradeMap's reads "Dubai") — kept as its own constant rather than a shared one, since the two source scripts genuinely label it differently.
const HUB: [number, number] = [55.3, 25.27];

const SOURCE: RouteNode = { name: "United States", coords: [-98.0, 39.0], side: "right", labelOffset: 0 };

const DESTINATIONS: RouteNode[] = [
  { name: "Georgia", coords: [43.5, 42.3], side: "left", labelOffset: -6 },
  { name: "Iraq", coords: [43.7, 33.2], side: "left", labelOffset: 4 },
];

interface ProjectedGeometry {
  width: number;
  height: number;
  landPaths: string[];
  hub: [number, number];
  source: RouteNode & { point: [number, number] };
  destinations: Array<RouteNode & { point: [number, number] }>;
}

/**
 * A single arc's stroke-dasharray/--len has to come from the rendered
 * path's own measured length, same reasoning as `TradeMap`'s own `TradeArc`
 * — see that component for why this can't be computed up front.
 */
function RouteArc({ d, delayMs, strokeClassName }: { d: string; delayMs: number; strokeClassName: string }) {
  const ref = useRef<SVGPathElement>(null);
  const [length, setLength] = useState<number | null>(null);

  useEffect(() => {
    setLength(null);
    const raf = requestAnimationFrame(() => {
      if (ref.current) setLength(ref.current.getTotalLength());
    });
    return () => cancelAnimationFrame(raf);
  }, [d]);

  return (
    <path
      ref={ref}
      d={d}
      fill="none"
      className={cn(strokeClassName, length && "animate-draw-arc")}
      style={
        length
          ? ({ "--len": `${length}px`, strokeDasharray: length, animationDelay: `${delayMs}ms` } as React.CSSProperties)
          : { opacity: 0 }
      }
    />
  );
}

/**
 * Recreates `export-routes.html`'s D3 hub-arc map, the second of the two
 * hub-arc maps on the site (see `TradeMap` for the first). Shares the land
 * geometry loader and arc-path math (`lib/geo/worldAtlas.ts`,
 * `lib/geo/arc.ts`) with `TradeMap`, since both maps only differ in their
 * node data and arc styling — exactly the infrastructure split anticipated
 * when `TradeMap` was built.
 *
 * The two arc "kinds" here are visually distinct on purpose, matching
 * source: a single thin cream source arc (United States → UAE) at a
 * shallow lift, and thicker gold destination arcs (UAE → Georgia /
 * Iraq) at a steeper lift, staggered in after the source arc.
 */
export function ExportRoutesMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [land, setLand] = useState<FeatureCollection<Geometry> | null>(null);
  const [geo, setGeo] = useState<ProjectedGeometry | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadWorldLand().then((data) => {
      if (!cancelled) setLand(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !land) return;

    const compute = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      const projection = geoNaturalEarth1().fitExtent(
        [
          [26, 34],
          [width - 26, height - 34],
        ],
        land
      );
      const pathGenerator = geoPath(projection);

      const landPaths = land.features
        .map((f) => pathGenerator(f as Feature<Geometry>))
        .filter((d): d is string => Boolean(d));

      const hub = projection(HUB);
      const sourcePoint = projection(SOURCE.coords);
      if (!hub || !sourcePoint) return;

      const destinations = DESTINATIONS.flatMap((node) => {
        const point = projection(node.coords);
        return point ? [{ ...node, point: point as [number, number] }] : [];
      });

      setGeo({
        width,
        height,
        landPaths,
        hub: hub as [number, number],
        source: { ...SOURCE, point: sourcePoint as [number, number] },
        destinations,
      });
    };

    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(container);
    return () => observer.disconnect();
  }, [land]);

  return (
    <div ref={containerRef} className="h-full w-full bg-ink-deep">
      {geo && (
        <svg
          viewBox={`0 0 ${geo.width} ${geo.height}`}
          className="block h-full w-full"
          role="img"
          aria-label="Map of vehicle sourcing routes from the United States through the UAE to Georgia and Iraq"
        >
          <g>
            {geo.landPaths.map((d, index) => (
              <path key={index} d={d} fill={colors.mapLand} className="stroke-gold/20" strokeWidth={0.6} />
            ))}
          </g>

          <RouteArc
            d={arcPath(geo.source.point, geo.hub, 0.18)}
            delayMs={250}
            strokeClassName="stroke-cream/50"
          />
          {geo.destinations.map((node, index) => (
            <RouteArc
              key={node.name}
              d={arcPath(geo.hub, node.point, 0.3)}
              delayMs={900 + index * 260}
              strokeClassName="stroke-gold/85"
            />
          ))}

          <g>
            <circle
              cx={geo.source.point[0]}
              cy={geo.source.point[1]}
              r={3.4}
              fill={colors.inkDeep}
              className="stroke-cream/75"
              strokeWidth={1.2}
            />
            <text
              x={geo.source.side === "left" ? geo.source.point[0] - 11 : geo.source.point[0] + 11}
              y={geo.source.point[1] + 3.5 + geo.source.labelOffset}
              textAnchor={geo.source.side === "left" ? "end" : "start"}
              className="fill-cream/62 font-mono text-[9.5px] uppercase tracking-[.2em]"
            >
              {geo.source.name}
            </text>
          </g>

          {geo.destinations.map((node) => (
            <g key={node.name}>
              <circle cx={node.point[0]} cy={node.point[1]} r={3.4} fill={colors.inkDeep} stroke={colors.gold} strokeWidth={1.2} />
              <text
                x={node.side === "left" ? node.point[0] - 11 : node.point[0] + 11}
                y={node.point[1] + 3.5 + node.labelOffset}
                textAnchor={node.side === "left" ? "end" : "start"}
                className="fill-gold font-mono text-[9.5px] uppercase tracking-[.2em]"
              >
                {node.name}
              </text>
            </g>
          ))}

          <circle cx={geo.hub[0]} cy={geo.hub[1]} r={15} className="fill-gold/[.13] stroke-gold/40" />
          <circle cx={geo.hub[0]} cy={geo.hub[1]} r={5} fill={colors.gold} />
          <text
            x={geo.hub[0]}
            y={geo.hub[1] + 33}
            textAnchor="middle"
            className="fill-cream font-mono text-[10.5px] uppercase tracking-[.26em]"
          >
            UAE
          </text>
        </svg>
      )}
    </div>
  );
}

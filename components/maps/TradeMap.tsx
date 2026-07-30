"use client";

import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { useEffect, useRef, useState } from "react";

import { arcPath } from "@/lib/geo/arc";
import { loadWorldLand } from "@/lib/geo/worldAtlas";
import { colors } from "@/lib/tokens";
import { cn } from "@/lib/utils";

interface TradeNode {
  name: string;
  coords: [number, number];
  side: "left" | "right";
}

// [lng, lat]. Same coordinates and hub as `trade-map.html`.
const HUB: [number, number] = [55.3, 25.27];

const NODES: TradeNode[] = [
  { name: "California", coords: [-120.0, 37.0], side: "left" },
  { name: "Chile", coords: [-71.0, -33.5], side: "left" },
  { name: "Türkiye", coords: [35.0, 39.0], side: "right" },
  { name: "Iran", coords: [53.0, 32.5], side: "right" },
  { name: "India", coords: [78.0, 22.0], side: "right" },
  { name: "Vietnam", coords: [106.0, 16.0], side: "right" },
  { name: "Kenya", coords: [37.9, -0.5], side: "right" },
  { name: "Europe", coords: [9.0, 49.0], side: "left" },
  { name: "Saudi Arabia", coords: [45.0, 24.0], side: "left" },
];

interface ProjectedGeometry {
  width: number;
  height: number;
  landPaths: string[];
  hub: [number, number];
  nodes: Array<TradeNode & { point: [number, number] }>;
}

/**
 * A single arc's stroke-dasharray/--len has to come from the rendered
 * path's own measured length (`getTotalLength`), so it can't be computed
 * up front the way the projection math can — this small component owns
 * that one measurement-then-animate step per arc, matching the timing
 * (1900ms, per-arc stagger) from `trade-map.html`.
 */
function TradeArc({ d, delayMs }: { d: string; delayMs: number }) {
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
      strokeWidth={1}
      className={cn("stroke-gold/55", length && "animate-draw-arc")}
      style={
        length
          ? ({ "--len": `${length}px`, strokeDasharray: length, animationDelay: `${delayMs}ms` } as React.CSSProperties)
          : { opacity: 0 }
      }
    />
  );
}

/**
 * Recreates `trade-map.html`'s D3 hub-arc map as a directly-embedded React
 * component (the original was a standalone document loaded through an
 * `<iframe>`; embedding it directly is the one deliberate deviation, so it
 * composes with the rest of the page instead of sitting in a sandboxed
 * document). D3 (`d3-geo`, not the full `d3` bundle — this only ever used
 * the projection and path-generator, never D3's DOM selection/binding
 * API) still does all the actual geographic math; React owns rendering the
 * resulting SVG, which is why this reads as JSX rather than an imperative
 * `svg.append(...)` script like the source.
 *
 * Sized to its container via ResizeObserver rather than `window`, since as
 * an embedded component it no longer owns the whole viewport the way the
 * iframed original did.
 */
export function TradeMap() {
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
          [24, 30],
          [width - 24, height - 30],
        ],
        land
      );
      const pathGenerator = geoPath(projection);

      const landPaths = land.features
        .map((f) => pathGenerator(f as Feature<Geometry>))
        .filter((d): d is string => Boolean(d));

      const hub = projection(HUB);
      if (!hub) return;

      const nodes = NODES.flatMap((node) => {
        const point = projection(node.coords);
        return point ? [{ ...node, point: point as [number, number] }] : [];
      });

      setGeo({ width, height, landPaths, hub: hub as [number, number], nodes });
    };

    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(container);
    return () => observer.disconnect();
  }, [land]);

  return (
    <div ref={containerRef} className="h-full w-full bg-ink">
      {geo && (
        <svg
          viewBox={`0 0 ${geo.width} ${geo.height}`}
          className="block h-full w-full"
          role="img"
          aria-label="Map of KAKA Group's principal sourcing origins and supply markets, converging on Dubai"
        >
          <g>
            {geo.landPaths.map((d, index) => (
              <path key={index} d={d} fill={colors.mapLand} className="stroke-gold/22" strokeWidth={0.6} />
            ))}
          </g>
          <g>
            {geo.nodes.map((node, index) => (
              <TradeArc key={node.name} d={arcPath(node.point, geo.hub, 0.22)} delayMs={300 + index * 180} />
            ))}
          </g>
          {geo.nodes.map((node) => (
            <g key={node.name}>
              <circle cx={node.point[0]} cy={node.point[1]} r={3} fill={colors.ink} stroke={colors.gold} strokeWidth={1.2} />
              <text
                x={node.side === "left" ? node.point[0] - 9 : node.point[0] + 9}
                y={node.point[1] + 3.5}
                textAnchor={node.side === "left" ? "end" : "start"}
                className="fill-cream/60 font-mono text-[9px] uppercase tracking-[.22em]"
              >
                {node.name}
              </text>
            </g>
          ))}
          <circle cx={geo.hub[0]} cy={geo.hub[1]} r={14} className="fill-gold/14 stroke-gold/35" />
          <circle cx={geo.hub[0]} cy={geo.hub[1]} r={5} fill={colors.gold} />
          <text
            x={geo.hub[0]}
            y={geo.hub[1] + 32}
            textAnchor="middle"
            className="fill-gold font-mono text-[10px] uppercase tracking-[.26em]"
          >
            Dubai
          </text>
        </svg>
      )}
    </div>
  );
}

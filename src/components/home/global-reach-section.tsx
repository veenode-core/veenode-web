import TextSplitReveal from "../ui/text-split-reveal";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type LabelPos = "top" | "bottom" | "left" | "right";

const markers: {
  name: string;
  coordinates: [number, number];
  primary: boolean;
  labelPos?: LabelPos;
}[] = [
  // West Africa — HQ cities, labels split to avoid overlap
  {
    name: "Lagos",
    coordinates: [3.3792, 6.5244],
    primary: true,
    labelPos: "bottom",
  },
  {
    name: "Accra",
    coordinates: [-0.187, 5.6037],
    primary: true,
    labelPos: "top",
  },
  {
    name: "Freetown",
    coordinates: [-13.2317, 8.4657],
    primary: false,
    labelPos: "top",
  },

  // East Africa
  {
    name: "Nairobi",
    coordinates: [36.8219, -1.2921],
    primary: false,
    labelPos: "right",
  },
  {
    name: "Kampala",
    coordinates: [32.5825, 0.3476],
    primary: false,
    labelPos: "top",
  },

  // Southern Africa
  {
    name: "Johannesburg",
    coordinates: [28.0473, -26.2041],
    primary: false,
    labelPos: "bottom",
  },

  // North Africa
  {
    name: "Cairo",
    coordinates: [31.2357, 30.0444],
    primary: false,
    labelPos: "top",
  },

  // Middle East
  {
    name: "Dubai",
    coordinates: [55.2708, 25.2048],
    primary: false,
    labelPos: "top",
  },

  // Europe
  {
    name: "London",
    coordinates: [-0.1276, 51.5074],
    primary: false,
    labelPos: "top",
  },

  // North America
  {
    name: "New York",
    coordinates: [-74.006, 40.7128],
    primary: false,
    labelPos: "top",
  },
  {
    name: "Toronto",
    coordinates: [-79.3832, 43.6532],
    primary: false,
    labelPos: "bottom",
  },
];

function getLabelProps(pos: LabelPos = "top", primary: boolean) {
  const offset = primary ? 8 : 6;
  const fontSize = primary ? "7px" : "6.5px";

  switch (pos) {
    case "bottom":
      return { x: 0, y: offset + 4, textAnchor: "middle" as const, fontSize };
    case "left":
      return { x: -(offset + 2), y: 3, textAnchor: "end" as const, fontSize };
    case "right":
      return { x: offset + 2, y: 3, textAnchor: "start" as const, fontSize };
    default:
      return { x: 0, y: -offset, textAnchor: "middle" as const, fontSize };
  }
}

export default function GlobalReachSection() {
  return (
    <section className="pt-20 md:pt-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="max-w-3xl">
          <TextSplitReveal
            text="Built in West Africa.|Ready for the World."
            mobileText="Built in|West Africa.|Ready for|the World."
            className="text-3xl md:text-5xl font-bold mb-6"
            tag="h2"
          />
          <p className="text-muted text-sm md:text-base leading-relaxed">
            Veenode is headquartered in West Africa with a global delivery
            capability. We serve clients across Nigeria and Ghana, as well as
            organisations in the UK, the US, the Middle East, and across Africa.
            Our remote-first delivery model means you get Veenode-quality work
            wherever you are.
          </p>
        </div>
      </div>

      <div className="relative bg-primary w-full">
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,60,110,1) 0%, transparent 100%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(26,60,110,1) 0%, transparent 100%)",
          }}
        />

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 140, center: [0, 20] }}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(255,255,255,0.07)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "rgba(255,255,255,0.12)" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {markers.map(({ name, coordinates, primary, labelPos = "top" }) => {
            const dotR = primary ? 3.5 : 2.5;
            const pulseFrom = primary ? 5 : 3.5;
            const pulseTo = primary ? 13 : 9;
            const dur = primary ? "2.2s" : "2.6s";
            const lp = getLabelProps(labelPos, primary);

            return (
              <Marker key={name} coordinates={coordinates}>
                {/* Outer pulse */}
                <circle r={pulseFrom} fill="#F0A500" opacity={0.2}>
                  <animate
                    attributeName="r"
                    from={String(pulseFrom)}
                    to={String(pulseTo)}
                    dur={dur}
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.25"
                    to="0"
                    dur={dur}
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Inner pulse */}
                <circle r={pulseFrom * 0.65} fill="#F0A500" opacity={0.15}>
                  <animate
                    attributeName="r"
                    from={String(pulseFrom * 0.65)}
                    to={String(pulseTo * 0.6)}
                    dur={dur}
                    begin="0.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.3"
                    to="0"
                    dur={dur}
                    begin="0.4s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Dot */}
                <circle
                  r={dotR}
                  fill="#F0A500"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth={0.8}
                />

                {/* Label */}
                <text
                  x={lp.x}
                  y={lp.y}
                  textAnchor={lp.textAnchor}
                  style={{
                    fontFamily: "inherit",
                    fontSize: lp.fontSize,
                    fontWeight: "700",
                    fill: "rgba(255,255,255,0.8)",
                    letterSpacing: "0.05em",
                    pointerEvents: "none",
                  }}
                >
                  {name}
                </text>
              </Marker>
            );
          })}
        </ComposableMap>

        {/* Legend */}
        <div className="relative z-20 flex items-center justify-center gap-8 pb-8 -mt-4">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-gold shrink-0"
              style={{ boxShadow: "0 0 6px rgba(240,165,0,0.6)" }}
            />
            <span
              className="text-white/50 font-semibold tracking-widest uppercase"
              style={{ fontSize: "0.6rem" }}
            >
              HQ Markets
            </span>
          </div>
          <div className="w-px h-3 bg-white/15" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" />
            <span
              className="text-white/50 font-semibold tracking-widest uppercase"
              style={{ fontSize: "0.6rem" }}
            >
              Active Delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
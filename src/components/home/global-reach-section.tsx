import TextSplitReveal from "../ui/text-split-reveal";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  {
    name: "Lagos",
    coordinates: [3.3792, 6.5244] as [number, number],
    primary: true,
  },
  {
    name: "Accra",
    coordinates: [-0.187, 5.6037] as [number, number],
    primary: true,
  },
  {
    name: "London",
    coordinates: [-0.1276, 51.5074] as [number, number],
    primary: false,
  },
  {
    name: "New York",
    coordinates: [-74.006, 40.7128] as [number, number],
    primary: false,
  },
];

export default function GlobalReachSection() {
  return (
    <section className="pt-20 md:pt-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <TextSplitReveal
              text="Built in West Africa.|Ready for the World."
              mobileText="Built in|West Africa.|Ready for|the World."
              className="text-3xl md:text-5xl font-bold"
              tag="h2"
            />
          </div>
          <p className="text-muted text-sm max-w-xs md:text-right leading-relaxed">
            Headquartered in West Africa. Delivering globally — Nigeria, Ghana,
            the UK, the US, the Middle East, and beyond.
          </p>
        </div>
      </div>

      {/* Map container */}
      <div className="relative bg-primary w-full">
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
                    hover: {
                      outline: "none",
                      fill: "rgba(255,255,255,0.12)",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {markers.map(({ name, coordinates, primary }) => (
            <Marker key={name} coordinates={coordinates}>
              {/* Outer pulse ring */}
              <circle r={primary ? 7 : 5} fill="#F0A500" opacity={0.2}>
                <animate
                  attributeName="r"
                  from={primary ? "7" : "5"}
                  to={primary ? "18" : "13"}
                  dur={primary ? "2.2s" : "2.5s"}
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.25"
                  to="0"
                  dur={primary ? "2.2s" : "2.5s"}
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Inner pulse ring */}
              <circle r={primary ? 5 : 3} fill="#F0A500" opacity={0.15}>
                <animate
                  attributeName="r"
                  from={primary ? "5" : "3"}
                  to={primary ? "12" : "8"}
                  dur={primary ? "2.2s" : "2.5s"}
                  begin="0.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.3"
                  to="0"
                  dur={primary ? "2.2s" : "2.5s"}
                  begin="0.4s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Main dot — larger for West Africa HQ cities */}
              <circle
                r={primary ? 4.5 : 3}
                fill="#F0A500"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={1.5}
              />

              {/* Label */}
              <text
                textAnchor="middle"
                y={primary ? -12 : -10}
                style={{
                  fontFamily: "inherit",
                  fontSize: primary ? "9px" : "8px",
                  fontWeight: "700",
                  fill: "rgba(255,255,255,0.85)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  pointerEvents: "none",
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ComposableMap>

        {/* Bottom legend */}
        <div className="relative z-20 flex items-center justify-center gap-8 pb-8 -mt-4">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full bg-gold flex-shrink-0"
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
            <span className="w-2 h-2 rounded-full bg-gold/60 flex-shrink-0" />
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

// Animated "connections" graphic: a loose US map of cities, with Arizona and
// Washington highlighted and links drawing in between markets.
type Node = { id: string; x: number; y: number; label?: string; home?: boolean; left?: boolean };

const nodes: Node[] = [
  { id: "sea", x: 92, y: 62, label: "Seattle", home: true, left: true },
  { id: "tac", x: 84, y: 92, label: "Tacoma", home: true, left: true },
  { id: "spo", x: 168, y: 66, home: true },
  { id: "pdx", x: 72, y: 140 },
  { id: "sf", x: 50, y: 248 },
  { id: "la", x: 92, y: 318 },
  { id: "phx", x: 176, y: 332, label: "Phoenix", home: true, left: true },
  { id: "tus", x: 196, y: 372, label: "Tucson", home: true, left: true },
  { id: "flg", x: 186, y: 284, home: true },
  { id: "den", x: 284, y: 226 },
  { id: "aus", x: 352, y: 392 },
  { id: "dal", x: 372, y: 346 },
  { id: "chi", x: 452, y: 166 },
  { id: "atl", x: 492, y: 322 },
  { id: "mia", x: 548, y: 418 },
  { id: "nyc", x: 556, y: 140 },
];

const links: [string, string][] = [
  ["sea", "tac"], ["sea", "spo"], ["tac", "pdx"], ["phx", "tus"], ["phx", "flg"],
  ["sea", "phx"], ["sea", "den"], ["phx", "la"], ["pdx", "sf"], ["phx", "den"],
  ["phx", "dal"], ["dal", "aus"], ["den", "chi"], ["sea", "chi"], ["chi", "nyc"],
  ["dal", "atl"], ["atl", "mia"], ["atl", "nyc"], ["tus", "aus"], ["sf", "phx"],
];

const by = Object.fromEntries(nodes.map((n) => [n.id, n]));
// Packets travel along these links continuously.
const travelling = new Set(["sea-phx", "phx-dal", "sea-chi", "phx-den", "chi-nyc", "atl-mia"]);

export default function NetworkGraphic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-40 0 640 450" className={className} role="img" aria-label="A network of connected real estate markets across the US, centered on Arizona and Washington">
      <g fill="none" strokeLinecap="round">
        {links.map(([a, b], i) => {
          const A = by[a], B = by[b];
          const len = Math.ceil(Math.hypot(B.x - A.x, B.y - A.y));
          const home = A.home && B.home;
          return (
            <line key={a + b} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
              className="net-line" stroke={home ? "#E6C01F" : "#E32B12"} strokeOpacity={home ? 0.9 : 0.55} strokeWidth={home ? 2.5 : 1.5}
              style={{ ["--len" as string]: len, ["--d" as string]: `${300 + i * 90}ms` }} />
          );
        })}
      </g>
      {links.filter(([a, b]) => travelling.has(`${a}-${b}`)).map(([a, b], i) => {
        const A = by[a], B = by[b];
        return (
          <circle key={`p${a}${b}`} r="3.5" fill="#FFFFFF" className="net-packet"
            style={{ offsetPath: `path("M${A.x} ${A.y} L${B.x} ${B.y}")`, ["--d" as string]: `${2.2 + i * 0.7}s`, ["--t" as string]: `${3 + (i % 3)}s` }} />
        );
      })}
      {nodes.map((n, i) => (
        <g key={n.id}>
          {n.home && <circle cx={n.x} cy={n.y} r="7" fill="#E6C01F" className="net-pulse" style={{ ["--d" as string]: `${(i % 4) * 0.7}s` }} />}
          <circle cx={n.x} cy={n.y} r={n.home ? 7 : 4.5} fill={n.home ? "#E6C01F" : "#E32B12"} className="net-node" style={{ ["--d" as string]: `${150 + i * 70}ms` }} />
          {n.label && (
            <text x={n.left ? n.x - 12 : n.x + 12} y={n.y + 4} textAnchor={n.left ? "end" : "start"} fill="#FFFFFF" fillOpacity="0.85" fontSize="13" fontWeight="700" fontFamily="var(--font-montserrat), sans-serif" className="net-node" style={{ ["--d" as string]: `${900 + i * 70}ms` }}>
              {n.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

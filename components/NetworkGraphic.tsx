// Animated "connections" graphic: a loose US map of cities, with Arizona and
// Washington highlighted and links drawing in between markets.
type Node = { id: string; x: number; y: number; label?: string; home?: boolean; left?: boolean; minor?: boolean };

const nodes: Node[] = [
  // Washington: Seattle and the South Sound
  { id: "eve", x: 104, y: 20, label: "Everett", home: true, minor: true },
  { id: "sea", x: 90, y: 50, label: "Seattle", home: true, left: true },
  { id: "bel", x: 130, y: 60, label: "Bellevue", home: true, minor: true },
  { id: "tac", x: 84, y: 88, label: "Tacoma", home: true, left: true },
  { id: "puy", x: 122, y: 102, label: "Puyallup", home: true, minor: true },
  { id: "dup", x: 62, y: 116, label: "DuPont", home: true, left: true, minor: true },
  { id: "lac", x: 82, y: 142, label: "Lacey", home: true, minor: true },
  { id: "oly", x: 44, y: 152, label: "Olympia", home: true, left: true, minor: true },
  { id: "spo", x: 262, y: 40, label: "Spokane", home: true, minor: true },
  // Rest of the country
  { id: "pdx", x: 66, y: 200 },
  { id: "sf", x: 34, y: 258 },
  { id: "la", x: 56, y: 330 },
  { id: "den", x: 290, y: 226 },
  { id: "aus", x: 352, y: 400 },
  { id: "dal", x: 372, y: 352 },
  { id: "chi", x: 452, y: 166 },
  { id: "atl", x: 492, y: 322 },
  { id: "mia", x: 548, y: 418 },
  { id: "nyc", x: 556, y: 140 },
  // Arizona: the Valley, Tucson and the high country
  { id: "flg", x: 190, y: 246, label: "Flagstaff", home: true, minor: true },
  { id: "pre", x: 146, y: 268, label: "Prescott", home: true, left: true, minor: true },
  { id: "gle", x: 140, y: 306, label: "Glendale", home: true, left: true, minor: true },
  { id: "sco", x: 202, y: 298, label: "Scottsdale", home: true, minor: true },
  { id: "phx", x: 172, y: 332, label: "Phoenix", home: true, left: true },
  { id: "mes", x: 224, y: 330, label: "Mesa", home: true, minor: true },
  { id: "cha", x: 192, y: 364, label: "Chandler", home: true, left: true, minor: true },
  { id: "gil", x: 234, y: 362, label: "Gilbert", home: true, minor: true },
  { id: "tus", x: 214, y: 416, label: "Tucson", home: true },
];

const links: [string, string][] = [
  // Washington
  ["sea", "eve"], ["sea", "bel"], ["sea", "tac"], ["bel", "puy"], ["tac", "puy"], ["tac", "dup"],
  ["dup", "lac"], ["lac", "oly"], ["dup", "oly"], ["sea", "spo"],
  // Arizona
  ["phx", "gle"], ["phx", "sco"], ["phx", "mes"], ["sco", "mes"], ["mes", "gil"], ["phx", "cha"],
  ["cha", "gil"], ["phx", "tus"], ["phx", "flg"], ["flg", "pre"], ["pre", "gle"],
  // Across the country
  ["oly", "pdx"], ["sea", "phx"], ["sea", "den"], ["phx", "la"], ["pdx", "sf"], ["phx", "den"],
  ["phx", "dal"], ["dal", "aus"], ["den", "chi"], ["sea", "chi"], ["chi", "nyc"],
  ["dal", "atl"], ["atl", "mia"], ["atl", "nyc"], ["tus", "aus"], ["sf", "phx"],
];

const by = Object.fromEntries(nodes.map((n) => [n.id, n]));
// Packets travel along these links continuously.
const travelling = new Set(["sea-phx", "phx-dal", "sea-chi", "phx-den", "chi-nyc", "atl-mia", "tac-dup", "lac-oly", "phx-mes", "phx-tus"]);

export default function NetworkGraphic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-50 0 650 440" className={className} role="img" aria-label="A network of connected real estate markets across the US, centered on Arizona and Washington">
      <g fill="none" strokeLinecap="round">
        {links.map(([a, b], i) => {
          const A = by[a], B = by[b];
          const len = Math.ceil(Math.hypot(B.x - A.x, B.y - A.y));
          const home = A.home && B.home;
          return (
            <line key={a + b} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
              className="net-line" stroke={home ? "#E6C01F" : "#E32B12"} strokeOpacity={home ? 0.9 : 0.55} strokeWidth={home ? 2.5 : 1.5}
              style={{ ["--len" as string]: len, ["--d" as string]: `${300 + i * 55}ms` }} />
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
          {n.home && !n.minor && <circle cx={n.x} cy={n.y} r="7" fill="#E6C01F" className="net-pulse" style={{ ["--d" as string]: `${(i % 4) * 0.7}s` }} />}
          <circle cx={n.x} cy={n.y} r={n.home ? (n.minor ? 5 : 7) : 4.5} fill={n.home ? "#E6C01F" : "#E32B12"} className="net-node" style={{ ["--d" as string]: `${150 + i * 45}ms` }} />
          {n.label && (
            <text x={n.left ? n.x - 12 : n.x + 12} y={n.y + 4} textAnchor={n.left ? "end" : "start"} fill="#FFFFFF" fillOpacity={n.minor ? 0.7 : 0.9} fontSize={n.minor ? 11 : 13} fontWeight="700" fontFamily="var(--font-montserrat), sans-serif" className="net-node" style={{ ["--d" as string]: `${900 + i * 45}ms` }}>
              {n.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

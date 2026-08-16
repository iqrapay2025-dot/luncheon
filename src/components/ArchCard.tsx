import type { CSSProperties, ReactNode } from "react"

interface ArchCardProps {
  children: ReactNode
  className?: string
  bg?: string
  borderColor?: string
  style?: CSSProperties
}

export default function ArchCard({
  children,
  className = "",
  bg = "#FDF8F0",
  borderColor = "#D4A24C",
  style = {},
}: ArchCardProps) {
  return (
    <div className={`flex flex-col ${className}`} style={style}>
      {/* SVG pointed arch forming the top border of the card */}
      <svg
        viewBox="0 0 200 28"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 28, display: "block" }}
        aria-hidden="true"
      >
        {/* Fill the arch region with the card background */}
        <path d="M0,28 C0,28 65,28 100,4 C135,28 200,28 200,28 Z" fill={bg} />
        {/* Arch curve stroke — only traces the arch, not the base */}
        <path
          d="M0,28 C0,28 65,28 100,4 C135,28 200,28 200,28"
          fill="none"
          stroke={borderColor}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Card body */}
      <div
        style={{
          background: bg,
          borderLeft: `1.5px solid ${borderColor}`,
          borderRight: `1.5px solid ${borderColor}`,
          borderBottom: `1.5px solid ${borderColor}`,
          borderRadius: "0 0 14px 14px",
          flexGrow: 1,
        }}
      >
        {children}
      </div>
    </div>
  )
}

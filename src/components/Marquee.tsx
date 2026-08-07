type Props = {
  items?: string[]
}

const defaultItems = [
  'AI Software Engineer',
  'FastAPI',
  'Scan Chain Diagnosis',
  'RAG Agents',
  'ATE Diagnostics',
  'Published Research',
  'ML Pipelines',
  'Bengaluru',
]

export function Marquee({ items = defaultItems }: Props) {
  const row = [...items, ...items]

  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={`${item}-${i}`}>
            {item}
            <em>✦</em>
          </span>
        ))}
      </div>
    </div>
  )
}

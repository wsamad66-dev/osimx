import { PortableText, PortableTextComponents } from '@portabletext/react'

interface PortableTextRendererProps {
  value: any[]
  className?: string
}

export function PortableTextRenderer({ value, className }: PortableTextRendererProps) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <span className={className}>{children}</span>,
      h1: ({ children }) => <span className={className}>{children}</span>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      underline: ({ children }) => <span className="underline">{children}</span>,
      color: ({ children, value }: any) => (
        <span style={{ color: value?.value || 'inherit' }}>{children}</span>
      ),
    },
  }

  return <PortableText value={value} components={components} />
}

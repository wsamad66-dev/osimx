export default function StudioGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Ce layout pour le groupe (studio) ne contient RIEN
  // Pas de header, pas de footer, juste les enfants
  return <>{children}</>
}

export default function DebugStudioPage() {
  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#ff0000',
      color: 'white',
      minHeight: '100vh',
      fontFamily: 'monospace',
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>
        🔍 DEBUG PAGE - STUDIO TEST
      </h1>
      
      <div style={{ fontSize: '1.5rem', lineHeight: '2' }}>
        <p>✅ Si vous voyez UNIQUEMENT ce fond rouge:</p>
        <p style={{ marginLeft: '2rem' }}>→ Les layouts fonctionnent correctement</p>
        <br />
        <p>❌ Si vous voyez un header ou footer:</p>
        <p style={{ marginLeft: '2rem' }}>→ Il y a un problème de layout</p>
        <br />
        <p>Route actuelle: <code>/studio/debug</code></p>
        <p>Layout hierarchy:</p>
        <ol style={{ marginLeft: '2rem' }}>
          <li>app/layout.tsx</li>
          <li>app/(studio)/layout.tsx</li>
          <li>app/(studio)/studio/debug/page.tsx (cette page)</li>
        </ol>
      </div>
    </div>
  )
}

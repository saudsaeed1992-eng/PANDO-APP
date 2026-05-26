export const metadata = {
  title: 'PANDO APP',
  description: '2-Month Transformation Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}

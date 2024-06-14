import '../globals.css'
import './play.css'

import { Web3Modal } from '../../context/web3modal'

export const metadata = {
  title: 'Love, Linux',
  description: 'Ongoing game'
}


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
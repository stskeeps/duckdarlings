import './globals.css'

import { Web3Modal } from '../context/web3modal'


export const metadata = {
  title: 'Love, Linux - Connect',
  description: 'Connect to start your game'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Web3Modal>
            {children}
        </Web3Modal>
      </body>
    </html>
  )
}
import Link from 'next/link'

export default function Menu() {



  return (
    <main className="background">
      
      <div className="sidebar">
        <div>
          <div className="blackbg"><w3m-button /></div>
          <div className="padder">
            <h1>Love, <br/>Linux</h1>

            <ul>
              <li>
                <Link href={`/play`}>New Game</Link>
              </li>
              <li>Continue Game</li>
              <li>Settings</li>
            </ul>
          </div>
        </div>
      </div>
    <div>
    </div>
    </main>
  );
}

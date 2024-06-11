import Image from "next/image";
import StateFetcher from '../components/StateFetcher';
import SendTransaction from '../components/SendTransaction'

export default function Home() {
  return (
    <main className="background">
      
      <div className="sidebar">
        <div>
          <div className="blackbg"><w3m-button /></div>
          <h1>IPFS State Fetcher</h1>
          <StateFetcher />
          <SendTransaction />
        </div>
      </div>
    <div>
      <h1>IPFS State Fetcher</h1>
      <StateFetcher />
      <SendTransaction />
    </div>
    </main>
  );
}

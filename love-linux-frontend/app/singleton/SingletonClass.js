import { ethers } from 'ethers';

// SingletonClass.js
class SingletonClass {
    constructor() {
      if (!SingletonClass.instance) {
        this.data = {}; // Initialize your shared data
        this.signer = {}
        this.wallet = null;
        this.expiryTime = null;
        SingletonClass.instance = this;
      }
      return SingletonClass.instance;
    }

    async createTempWallet() {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();

        this.wallet = ethers.Wallet.createRandom();
        console.log('New Wallet Address:', this.wallet.address);
        this.expiryTime = Date.now() + 5 * 60 * 60 * 1000;
        const tx = await signer.sendTransaction({
            to: this.wallet.address,
            value: ethers.utils.parseEther('0.01'),
        });
        await tx.wait();
        console.log('Wallet funded:', tx);

    }

    getWallet() {
        return this.wallet
    }
  
    // Add methods to manipulate the shared state
    setData(key, value) {
      this.data[key] = value;
    }
  
    getData(key) {
      return this.data[key];
    }
  }
  
  const instance = new SingletonClass();
  Object.freeze(instance);
  
  export default instance;
  
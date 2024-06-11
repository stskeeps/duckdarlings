// lib/TransactionService.js
import { ethers } from 'ethers';
import * as abi from './abi'; // Update the path accordingly

class TransactionService {
  constructor(signer) {
    this.signer = signer;

    // Contract addresses
    this.dappAddress = '0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e';
    this.dappRelayAddress = '0xF5DE34d6BbC0446E2a45719E718efEbaaE179daE';
    this.inputAddress = '0x59b22D57D4f067708AB0c00552767405926dc768';
    this.etherPortalAddress = '0xFfdbe43d4c855BF7e0f105c400A50857f53AB044';
    this.erc20PortalAddress = '0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB';
    this.erc721PortalAddress = '0x237F8DD094C0e47f4236f12b4Fa01d6Dae89fb87';

    // Contract instances
    this.dappContract = new ethers.Contract(this.dappAddress, abi.dappContractABI, this.signer);
    this.dappRelayContract = new ethers.Contract(this.dappRelayAddress, abi.dappRelayContractABI, this.signer);
    this.inputContract = new ethers.Contract(this.inputAddress, abi.inputContractABI, this.signer);
    this.etherPortalContract = new ethers.Contract(this.etherPortalAddress, abi.etherPortalContractABI, this.signer);
    this.erc20PortalContract = new ethers.Contract(this.erc20PortalAddress, abi.erc20PortalsContractABI, this.signer);
    this.erc721PortalContract = new ethers.Contract(this.erc721PortalAddress, abi.erc721PortalContractABI, this.signer);
  }

  async updateRelay() {
    if (!this.dappRelayContract) {
      throw new Error('Portal Contract not initialized');
    }
    await this.dappRelayContract['relayDAppAddress'](this.dappAddress);
  }

  async depositEtherAssets(amount) {
    if (!this.etherPortalContract) {
      throw new Error('Portal Contract not initialized');
    }

    const parsedAmount = ethers.parseEther(`${amount}`);
    const data = ethers.toUtf8Bytes(`Deposited (${amount}) ether.`);
    const txOverrides = { value: parsedAmount };

    const transaction = await this.etherPortalContract['depositEther'](this.dappAddress, data, txOverrides);
    await transaction.wait(1);
  }

  async depositERC20Assets(amount) {
    if (!this.erc20PortalContract) {
      throw new Error('Portal Contract not initialized');
    }

    if (!this.erc20TokenContract) {
      throw new Error('Token Contract not initialized');
    }

    const allowance = await this.erc20TokenContract['allowance'](this.signer.getAddress(), this.erc20PortalAddress);
    const parsedAmount = ethers.parseEther(`${amount}`);
    
    if (parsedAmount > allowance) {
      const increaseAllowanceTx = await this.erc20TokenContract['approve'](this.erc20PortalAddress, parsedAmount);
      let receipt = await increaseAllowanceTx.wait(1);

      const event = (await this.erc20TokenContract.queryFilter(this.erc20TokenContract.filters['Approval'](), receipt.blockHash)).pop();
      if (!event) {
        throw Error(`could not approve ${amount} tokens for DAppERC20Portal(${this.erc20PortalAddress})  (signer: ${this.signer.getAddress()}, tx: ${increaseAllowanceTx.hash})`);
      }
    }

    const data = ethers.toUtf8Bytes(`Deposited (${amount}) of ERC20 (${this.erc20TokenAddress}).`);
    const transaction = await this.erc20PortalContract['depositERC20Tokens'](this.erc20TokenAddress, this.dappAddress, parsedAmount, data);
    await transaction.wait(1);
  }

  async depositERC721Assets(tokenAddress, tokenId) {
    if (!this.erc721PortalContract) {
      throw new Error('Portal Contract not initialized');
    }

    if (!this.signer) {
      throw new Error('Signer not initialized');
    }
    const data = ethers.toUtf8Bytes(`Deposited (${tokenId}) of ERC721 (${tokenAddress}).`);
    let erc721TokenContract = new ethers.Contract(tokenAddress, abi.genericERC721ContractABI, this.signer);

    const currentApproval = await erc721TokenContract['getApproved'](tokenId);
    if (currentApproval !== this.erc721PortalAddress) {
      const tx = await erc721TokenContract['approve'](this.erc721PortalAddress, tokenId);
      const receipt = await tx.wait(1);
      const event = (await erc721TokenContract.queryFilter(erc721TokenContract.filters['Approval'](), receipt.blockHash)).pop();
      if (!event) {
        throw Error(`could not approve ${tokenId} for DAppERC721Portal(${this.erc721PortalAddress})  (signer: ${this.signer.getAddress()}, tx: ${tx.hash})`);
      }
    }

    const transaction = await this.erc721PortalContract['depositERC721Token'](tokenAddress, this.dappAddress, tokenId, "0x", data);
    await transaction.wait(1);
  }

  async transferEther(from, to, amount) {
    let obj = {
      "method": "ether_transfer",
      "from": from,
      "to": to,
      "amount": ethers.parseEther(`${amount}`).toString()
    };

    await this.genericCall(JSON.stringify(obj));
  }

  async transferERC20(from, to, amount) {
    let obj = {
      "method": "erc20_transfer",
      "from": from,
      "to": to,
      "erc20": this.erc20TokenAddress,
      "amount": ethers.parseEther(`${amount}`).toString()
    };

    await this.genericCall(JSON.stringify(obj));
  }

  async transferERC721(from, to, tokenAddress, tokenId) {
    let obj = {
      "method": "erc721_transfer",
      "from": from,
      "to": to,
      "erc721": tokenAddress,
      "token_id": tokenId
    };

    await this.genericCall(JSON.stringify(obj));
  }

  async withdrawEther(from, amount) {
    let obj = {
      "method": "ether_withdraw",
      "from": from,
      "amount": ethers.parseEther(`${amount}`).toString()
    };

    await this.genericCall(JSON.stringify(obj));
  }

  async withdrawERC20(from, amount) {
    let obj = {
      "method": "erc20_withdraw",
      "from": from,
      "erc20": this.erc20TokenAddress,
      "amount": ethers.parseEther(`${amount}`).toString()
    };

    await this.genericCall(JSON.stringify(obj));
  }

  async withdrawERC721(from, tokenAddress, tokenId) {
    let obj = {
      "method": "erc721_withdraw",
      "from": from,
      "erc721": tokenAddress,
      "amount": tokenId
    };

    await this.genericCall(JSON.stringify(obj));
  }

  async genericCall(str) {
    if (!this.inputContract) {
      throw new Error('Token Contract not initialized');
    }

    try {
      let payload = ethers.toUtf8Bytes(str);
      await this.inputContract['addInput'](this.dappAddress, payload);
    } catch (e) {
      console.error(e);
    }
  }

  async wasVoucherExecuted(inputIndex, index) {
    if (!this.dappContract) {
      throw new Error('Token Contract not initialized');
    }
    let executed = true;
    try {
      executed = await this.dappContract['wasVoucherExecuted'](inputIndex, index);
    } catch (e) {
      console.error(e);
    }
    return executed;
  }

  async voucherExecuteCall(destination, payload, proof) {
    if (!this.dappContract) {
      throw new Error('Token Contract not initialized');
    }
    let executed = true;
    try {
      await this.dappContract['executeVoucher'](destination, payload, proof);
    } catch (e) {
      console.error(e);
    }
    return executed;
  }
}

export default TransactionService;

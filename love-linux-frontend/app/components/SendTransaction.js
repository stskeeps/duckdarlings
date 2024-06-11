// components/SendTransaction.js
'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import TransactionService from '../lib/TransactionService';

export default function SendTransaction() {
  const [status, setStatus] = useState('');

  const handleTransaction = async (transactionType, ...args) => {
    setStatus('Processing...');
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const transactionService = new TransactionService(signer);

      let result;
      switch (transactionType) {
        case 'updateRelay':
          await transactionService.updateRelay();
          result = 'Relay updated';
          break;
        case 'depositEther':
          await transactionService.depositEtherAssets(args[0]);
          result = 'Ether deposited';
          break;
        case 'depositERC20':
          await transactionService.depositERC20Assets(args[0]);
          result = 'ERC20 deposited';
          break;
        case 'depositERC721':
          await transactionService.depositERC721Assets(args[0], args[1]);
          result = 'ERC721 deposited';
          break;
        case 'transferEther':
          await transactionService.transferEther(args[0], args[1], args[2]);
          result = 'Ether transferred';
          break;
        case 'transferERC20':
          await transactionService.transferERC20(args[0], args[1], args[2]);
          result = 'ERC20 transferred';
          break;
        case 'transferERC721':
          await transactionService.transferERC721(args[0], args[1], args[2], args[3]);
          result = 'ERC721 transferred';
          break;
        case 'withdrawEther':
          await transactionService.withdrawEther(args[0], args[1]);
          result = 'Ether withdrawn';
          break;
        case 'withdrawERC20':
          await transactionService.withdrawERC20(args[0], args[1]);
          result = 'ERC20 withdrawn';
          break;
        case 'withdrawERC721':
          await transactionService.withdrawERC721(args[0], args[1], args[2]);
          result = 'ERC721 withdrawn';
          break;
        case 'wasVoucherExecuted':
          result = await transactionService.wasVoucherExecuted(args[0], args[1]);
          break;
        case 'voucherExecuteCall':
          await transactionService.voucherExecuteCall(args[0], args[1], args[2]);
          result = 'Voucher executed';
          break;
        default:
          result = 'Unknown transaction type';
      }

      setStatus(`Transaction successful: ${result}`);
    } catch (error) {
      setStatus(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Transaction Service</h2>
      <button onClick={() => handleTransaction('updateRelay')}>Update Relay</button><br/>
      <button onClick={() => handleTransaction('depositEther', 1)}>Deposit 1 Ether</button><br/>
      <button onClick={() => handleTransaction('depositERC20', 100)}>Deposit 100 ERC20</button><br/>
      <button onClick={() => handleTransaction('depositERC721', '0xTokenAddress', 1)}>Deposit ERC721</button><br/>
      <button onClick={() => handleTransaction('transferEther', '0xFrom', '0xTo', 1)}>Transfer 1 Ether</button><br/>
      <button onClick={() => handleTransaction('transferERC20', '0xFrom', '0xTo', 100)}>Transfer 100 ERC20</button><br/>
      <button onClick={() => handleTransaction('transferERC721', '0xFrom', '0xTo', '0xTokenAddress', 1)}>Transfer ERC721</button><br/>
      <button onClick={() => handleTransaction('withdrawEther', '0xFrom', 1)}>Withdraw 1 Ether</button><br/>
      <button onClick={() => handleTransaction('withdrawERC20', '0xFrom', 100)}>Withdraw 100 ERC20</button><br/>
      <button onClick={() => handleTransaction('withdrawERC721', '0xFrom', '0xTokenAddress', 1)}>Withdraw ERC721</button><br/>
      <button onClick={() => handleTransaction('wasVoucherExecuted', 0, 0)}>Check Voucher Execution</button><br/>
      <button onClick={() => handleTransaction('voucherExecuteCall', '0xDestination', 'payload', 'proof')}>Execute Voucher</button><br/>
      <p>{status}</p>
    </div>
  );
}

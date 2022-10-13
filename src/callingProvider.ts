import { ethers } from 'ethers';

import { ProviderWrapper } from './ProviderWrapper';

const INFURA_MAINNET_RPC = 'https://mainnet.infura.io/v3/YOUR_KEY_HERE';
const ANKR_MAINNET_RPC = 'https://rpc.ankr.com/eth';

const provider1 = new ethers.providers.JsonRpcProvider(INFURA_MAINNET_RPC);
const provider2 = new ethers.providers.JsonRpcProvider(ANKR_MAINNET_RPC);

const providerWrapper: ProviderWrapper = new ProviderWrapper(provider1, [
  provider2,
]);

async function getTxHashesFromBlock(blockNo: number): Promise<string[]> {
  const blockData = await providerWrapper.callProviderWithRetriesAndWait(
    provider => provider.getBlock(blockNo)
  );
  return blockData.transactions;
}

async function getTxReceipt(
  txHash: string
): Promise<ethers.providers.TransactionReceipt> {
  return await providerWrapper.callProviderWithRetriesAndWait(provider =>
    provider.getTransactionReceipt(txHash)
  );
}

async function getTxReceiptFromBlock(
  blockNo: number
): Promise<ethers.providers.TransactionReceipt[]> {
  const txHashes = await getTxHashesFromBlock(blockNo);
  const txReceipts = await Promise.all(txHashes.map(getTxReceipt));
  return txReceipts;
}

export async function exampleCallProvider(): Promise<void> {
  try {
    for (let i = 12345678; i < 15345678; i++) {
      await getTxReceiptFromBlock(i);
      console.log(`Block ${i} done`);
    }
  } catch (error) {
    console.log(error);
  }
}

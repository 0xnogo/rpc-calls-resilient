import { ethers } from 'ethers';
import { Interface } from 'ethers/lib/utils';

import { ProviderWrapper } from './ProviderWrapper';
import UniswapV2Abi from './UniswapV2Pair.json';

const UNISWAPV2_PAIR_INTERFACE = new Interface(UniswapV2Abi);

const INFURA_MAINNET_RPC = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const ANKR_MAINNET_RPC = 'https://rpc.ankr.com/eth';

const provider1 = new ethers.providers.JsonRpcProvider(INFURA_MAINNET_RPC);
const provider2 = new ethers.providers.JsonRpcProvider(ANKR_MAINNET_RPC);

const providerWrapper: ProviderWrapper = new ProviderWrapper(provider1, [provider2]);

async function init(): Promise<void> {
  try {
    const token0 = await providerWrapper.callContractMethodWithRetries(
      'token0',
      [],
      "UNISWAPV2_PAIR_ADDRESS",
      UNISWAPV2_PAIR_INTERFACE,
    );

    const token1 = await providerWrapper.callContractMethodWithRetries(
      'token0',
      [],
      "UNISWAPV2_PAIR_ADDRESS",
      UNISWAPV2_PAIR_INTERFACE,
    );

    console.log(token0, token1);
  } catch (error) {
    console.log(error);
  }
}

init();
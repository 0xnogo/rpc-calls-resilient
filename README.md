# Make your RPC calls more resilient

This repo is an illustration of the blog article [Make your RPC calls more resilient](https://www.nogo.wtf/posts/make-your-rpc-calls-more-resilient/).

## Usage

In the `callingProvider.ts` and `callingContract.ts`, replace the RPC node url with your own.

In the `callingContract.ts`, replace the contract address with your own (and eventually the method name). Here we will be performing a call to get the addresses of the tokens from a Uniswap V2 pair.

## Commands
```bash
yarn install 
npm build
```

```bash
node dist/index.js
```

# @polymarket/multi-endpoint-provider

ethers.js JsonRpcProvider and Web3Provider that try backup rpc endpoints when requests fail.

This package is expects ethers.js as a peer dependency so that different versions of ethers don't conflict.


```typescript
import { JsonRpcMultiProvider } from "@polymarket/multi-endpoint-provider";

const provider = new JsonRpcMultiProvider([
    "https://polygon-mainnet.infura.io/v3/<infura_key>",
    "https://rpc-mainnet.maticvigil.com/v1/<matic_vigil_key>",
], {
  network: 137,
}
```

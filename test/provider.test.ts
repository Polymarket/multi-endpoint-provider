import assert from "assert";
import { BigNumber } from "@ethersproject/bignumber";
import { Provider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { ethers } from "ethers";

import { Web3MultiProvider, JsonRpcMultiProvider } from "../src";
import { getMockFetchFunction } from "./helpers";

const bnify = BigNumber.from;

type TestCases = {
    addresses: Array<any>;
    blocks: Array<any>;
    transactions: Array<any>;
    transactionReceipts: Array<any>;
};

const blockchainData: { [network: string]: TestCases } = {
    homestead: {
        addresses: [
            {
                address: "0xAC1639CF97a3A46D431e6d1216f576622894cBB5",
                balance: bnify("4813414100000000"),
                code: "0x",
            },
            // Splitter contract
            {
                address: "0x3474627D4F63A678266BC17171D87f8570936622",
                code: "0x606060405260e060020a60003504630b3ed5368114602e57806337b0574a14605257806356fa47f0146062575b005b602c6004356000546101009004600160a060020a03908116339091161460bb575b50565b60005460ff166060908152602090f35b602c60043560005460ff1615609657600160a060020a038116600034606082818181858883f193505050501515604f576002565b33600160a060020a0316600034606082818181858883f193505050501515604f576002565b600080546101009004600160a060020a03169082606082818181858883f193505050501515604f57600256",
                storage: {
                    "0": "0x0000000000000000000000b2682160c482eb985ec9f3e364eec0a904c44c2300",
                },
            },
            {
                address: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
                name: "ricmoo.firefly.eth",
            },
        ],
        blocks: [
            {
                hash: "0x3d6122660cc824376f11ee842f83addc3525e2dd6756b9bcf0affa6aa88cf741",
                parentHash: "0xb495a1d7e6663152ae92708da4843337b958146015a2802f4193a410044698c9",
                number: 3,
                timestamp: 1438270048,
                nonce: "0x2e9344e0cbde83ce",
                difficulty: 17154715646,
                gasLimit: bnify("0x1388"),
                gasUsed: bnify("0"),
                miner: "0x5088D623ba0fcf0131E0897a91734A4D83596AA0",
                extraData: "0x476574682f76312e302e302d66633739643332642f6c696e75782f676f312e34",
                transactions: [],
            },
        ],
        transactions: [
            {
                hash: "0xccc90ab97a74c952fb3376c4a3efb566a58a10df62eb4d44a61e106fcf10ec61",
                blockHash: "0x9653f180a5720f3634816eb945a6d722adee52cc47526f6357ac10adaf368135",
                blockNumber: 4097745,
                transactionIndex: 18,
                from: "0x32DEF047DeFd076DB21A2D759aff2A591c972248",
                gasPrice: bnify("0x4a817c800"),
                gasLimit: bnify("0x3d090"),
                to: "0x6fC21092DA55B392b045eD78F4732bff3C580e2c",
                value: bnify("0x186cc6acd4b0000"),
                nonce: 0,
                data: "0xf2c298be000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000067269636d6f6f0000000000000000000000000000000000000000000000000000",
                r: "0x1e5605197a03e3f0a168f14749168dfeefc44c9228312dacbffdcbbb13263265",
                s: "0x269c3e5b3558267ad91b0a887d51f9f10098771c67b82ea6cb74f29638754f54",
                v: 38,
                creates: null,
                // raw: "0xf8d2808504a817c8008303d090946fc21092da55b392b045ed78f4732bff3c580e2c880186cc6acd4b0000b864f2c298be000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000067269636d6f6f000000000000000000000000000000000000000000000000000026a01e5605197a03e3f0a168f14749168dfeefc44c9228312dacbffdcbbb13263265a0269c3e5b3558267ad91b0a887d51f9f10098771c67b82ea6cb74f29638754f54",
                chainId: 1,
            },
        ],
        transactionReceipts: [
            {
                blockHash: "0x36b4af7f0538559e581c8588f16477df0f676439ea67fe8d7a2ae4abb20e2566",
                blockNumber: 0x3c92b5,
                contractAddress: null,
                cumulativeGasUsed: 0x1cca2e,
                from: "0x18C6045651826824FEBBD39d8560584078d1b247",
                gasUsed: 0x14bb7,
                logs: [
                    {
                        address: "0x314159265dD8dbb310642f98f50C066173C1259b",
                        blockHash: "0x36b4af7f0538559e581c8588f16477df0f676439ea67fe8d7a2ae4abb20e2566",
                        blockNumber: 0x3c92b5,
                        data: "0x00000000000000000000000018c6045651826824febbd39d8560584078d1b247",
                        logIndex: 0x1a,
                        topics: [
                            "0xce0457fe73731f824cc272376169235128c118b49d344817417c6d108d155e82",
                            "0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae",
                            "0xf0106919d12469348e14ad6a051d0656227e1aba2fefed41737fdf78421b20e1",
                        ],
                        transactionHash: "0xc6fcb7d00d536e659a4559d2de29afa9e364094438fef3e72ba80728ce1cb616",
                        transactionIndex: 0x39,
                    },
                    {
                        address: "0x6090A6e47849629b7245Dfa1Ca21D94cd15878Ef",
                        blockHash: "0x36b4af7f0538559e581c8588f16477df0f676439ea67fe8d7a2ae4abb20e2566",
                        blockNumber: 0x3c92b5,
                        data: "0x000000000000000000000000000000000000000000000000002386f26fc1000000000000000000000000000000000000000000000000000000000000595a32ce",
                        logIndex: 0x1b,
                        topics: [
                            "0x0f0c27adfd84b60b6f456b0e87cdccb1e5fb9603991588d87fa99f5b6b61e670",
                            "0xf0106919d12469348e14ad6a051d0656227e1aba2fefed41737fdf78421b20e1",
                            "0x00000000000000000000000018c6045651826824febbd39d8560584078d1b247",
                        ],
                        transactionHash: "0xc6fcb7d00d536e659a4559d2de29afa9e364094438fef3e72ba80728ce1cb616",
                        transactionIndex: 0x39,
                    },
                ],
                logsBloom:
                    "0x00000000000000040000000000100000010000000000000040000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000200000010000000004000000000000000000000000000000000002000000000000000000000000400000000020000000000000000000000000000000000000004000000000000000000000000000000000000000000000000801000000000000000000000020000000000040000000040000000000000000002000000004000000000000000000000000000000000000000000000010000000000000000000000000000000000200000000000000000",
                root: "0x9b550a9a640ce50331b64504ef87aaa7e2aaf97344acb6ff111f879b319d2590",
                status: null,
                to: "0x6090A6e47849629b7245Dfa1Ca21D94cd15878Ef",
                transactionHash: "0xc6fcb7d00d536e659a4559d2de29afa9e364094438fef3e72ba80728ce1cb616",
                transactionIndex: 0x39,
            },
            // Byzantium block
            {
                byzantium: true,
                blockHash: "0x34e5a6cfbdbb84f7625df1de69d218ade4da72f4a2558064a156674e72e976c9",
                blockNumber: 0x444f76,
                contractAddress: null,
                cumulativeGasUsed: 0x15bfe7,
                from: "0x18C6045651826824FEBBD39d8560584078d1b247",
                gasUsed: 0x1b968,
                logs: [
                    {
                        address: "0xb90E64082D00437e65A76d4c8187596BC213480a",
                        blockHash: "0x34e5a6cfbdbb84f7625df1de69d218ade4da72f4a2558064a156674e72e976c9",
                        blockNumber: 0x444f76,
                        data: "0x",
                        logIndex: 0x10,
                        topics: [
                            "0x748d071d1992ee1bfe7a39058114d0a50d5798fe8eb3a9bfb4687f024629a2ce",
                            "0x5574aa58f7191ccab6de6cf75fe2ea0484f010b852fdd8c6b7ae151d6c2f4b83",
                        ],
                        transactionHash: "0x7f1c6a58dc880438236d0b0a4ae166e9e9a038dbea8ec074149bd8b176332cac",
                        transactionIndex: 0x1e,
                    },
                ],
                logsBloom:
                    "0x00000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000200000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000800000000000000000800000000000000000000000000000000000000",
                status: 1,
                to: "0xb90E64082D00437e65A76d4c8187596BC213480a",
                transactionHash: "0x7f1c6a58dc880438236d0b0a4ae166e9e9a038dbea8ec074149bd8b176332cac",
                transactionIndex: 0x1e,
            },
        ],
    },
    kovan: {
        addresses: [
            {
                address: "0x09c967A0385eE3B3717779738cA0B9D116e0EcE7",
                balance: bnify("997787946734641021"),
                code: "0x",
            },
        ],
        blocks: [
            {
                hash: "0xf0ec9bf41b99a6bd1f6cd29f91302f71a1a82d14634d2e207edea4b7962f3676",
                parentHash: "0xf110ecd84454f116e2222378e7bca81ac3e59be0dac96d7ec56d5ef1c3bc1d64",
                number: 3,
                timestamp: 1488459452,
                difficulty: 131072,
                gasLimit: bnify("0x5b48ec"),
                gasUsed: bnify("0"),
                miner: "0x00A0A24b9f0E5EC7Aa4c7389b8302fd0123194dE",
                extraData: "0xd5830105048650617269747986312e31352e31826c69",
                transactions: [],
            },
            // Kovan Test Case with difficulty > 53-bits; See #711
            {
                hash: "0xd92891a6eeaed4892289edf9bd5ebff261da5c6a51f7131cc1a481c6f4d1aa75",
                parentHash: "0xcc769a02513be1df80eee7d3a5cb87f14f37baee03c13f3e3ad1e7bdcaf7dac3",
                number: 16265864,
                timestamp: 1579621004,
                difficulty: null,
                gasLimit: bnify("0x989680"),
                gasUsed: bnify("0x0705bf"),
                miner: "0x596e8221A30bFe6e7eFF67Fee664A01C73BA3C56",
                extraData: "0xde830206088f5061726974792d457468657265756d86312e34302e30826c69",
                transactions: [
                    "0x20e6760fa1297fb06c8c20e6ed99581e0ba964d51167ea3c8ff580bfcb10bfc3",
                    "0x0ce7eba48b1bbdee05823b79ae24e741f3f290d0abfef8ae9adf32db108b7dd6",
                    "0x1fa2baafa844bf4853e4abbbf49532bf570210d589dc626dbf7ebc4832bdfa5d",
                    "0xdb5d1fa54d30a4b6aee0b242a2c68ea52d3dd28703f69e6e30871827850aa2fa",
                    "0xcc898db85d7d2493d4778faf640be32a4a3b7f5f987257bdc0009ce75a18eeaa",
                ],
            },
        ],
        transactions: [],
        transactionReceipts: [],
    },
    rinkeby: {
        addresses: [
            {
                address: "0xd09a624630a656a7dbb122cb05e41c12c7cd8c0e",
                balance: bnify("3000000000000000000"),
                code: "0x",
            },
        ],
        blocks: [
            {
                hash: "0x9eb9db9c3ec72918c7db73ae44e520139e95319c421ed6f9fc11fa8dd0cddc56",
                parentHash: "0x9b095b36c15eaf13044373aef8ee0bd3a382a5abb92e402afa44b8249c3a90e9",
                number: 3,
                timestamp: 1492010489,
                nonce: "0x0000000000000000",
                difficulty: 2,
                gasLimit: bnify("0x47e7c4"),
                gasUsed: bnify(0),
                miner: "0x0000000000000000000000000000000000000000",
                extraData:
                    "0xd783010600846765746887676f312e372e33856c696e757800000000000000004e10f96536e45ceca7e34cc1bdda71db3f3bb029eb69afd28b57eb0202c0ec0859d383a99f63503c4df9ab6c1dc63bf6b9db77be952f47d86d2d7b208e77397301",
                transactions: [],
            },
        ],
        transactions: [],
        transactionReceipts: [],
    },
    ropsten: {
        addresses: [
            {
                address: "0x03a6F7a5ce5866d9A0CCC1D4C980b8d523f80480",
                balance: bnify("15861113897828552666"),
                code: "0x",
            },
        ],
        blocks: [
            {
                hash: "0xaf2f2d55e6514389bcc388ccaf40c6ebf7b3814a199a214f1203fb674076e6df",
                parentHash: "0x88e8bc1dd383672e96d77ee247e7524622ff3b15c337bd33ef602f15ba82d920",
                number: 3,
                timestamp: 1479642588,
                nonce: "0x04668f72247a130c",
                difficulty: 996427,
                gasLimit: bnify("0xff4033"),
                gasUsed: bnify("0"),
                miner: "0xD1aEb42885A43b72B518182Ef893125814811048",
                extraData: "0xd883010503846765746887676f312e372e318664617277696e",
                transactions: [],
            },
        ],
        transactions: [
            // Berlin tests
            {
                hash: "0x48bff7b0e603200118a672f7c622ab7d555a28f98938edb8318803eed7ea7395",
                type: 1,
                accessList: [
                    {
                        address: "0x0000000000000000000000000000000000000000",
                        storageKeys: [],
                    },
                ],
                blockHash: "0x378e24bcd568bd24cf1f54d38f13f038ee28d89e82af4f2a0d79c1f88dcd8aac",
                blockNumber: 9812343,
                from: "0x32162F3581E88a5f62e8A61892B42C46E2c18f7b",
                gasPrice: bnify("0x65cf89a0"),
                gasLimit: bnify("0x5b68"),
                to: "0x32162F3581E88a5f62e8A61892B42C46E2c18f7b",
                value: bnify("0"),
                nonce: 13,
                data: "0x",
                r: "0x9659cba42376dbea1433cd6afc9c8ffa38dbeff5408ffdca0ebde6207281a3ec",
                s: "0x27efbab3e6ed30b088ce0a50533364778e101c9e52acf318daec131da64e7758",
                v: 0,
                creates: null,
                chainId: 3,
            },
            {
                hash: "0x1675a417e728fd3562d628d06955ef35b913573d9e417eb4e6a209998499c9d3",
                type: 1,
                accessList: [
                    {
                        address: "0x0000000000000000000000000000000000000000",
                        storageKeys: [
                            "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
                            "0x0000000000111111111122222222223333333333444444444455555555556666",
                            "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
                        ],
                    },
                ],
                blockHash: "0x7565688256f5801768237993b47ca0608796b3ace0c4b8b6e623c6092bef14b8",
                blockNumber: 9812365,
                from: "0x32162F3581E88a5f62e8A61892B42C46E2c18f7b",
                gasPrice: bnify("0x65cf89a0"),
                gasLimit: bnify("0x71ac"),
                to: "0x32162F3581E88a5f62e8A61892B42C46E2c18f7b",
                value: bnify("0"),
                nonce: 14,
                data: "0x",
                r: "0xb0646756f89817d70cdb40aa2ae8b5f43ef65d0926dcf71a7dca5280c93763df",
                s: "0x4d32dbd9a44a2c5639b8434b823938202f75b0a8459f3fcd9f37b2495b7a66a6",
                v: 0,
                creates: null,
                chainId: 3,
            },
        ],
        transactionReceipts: [
            {
                blockHash: "0xc9235b8253fce455942147aa8b450d23081b867ffbb2a1e4dec934827cd80f8f",
                blockNumber: 0x1564d8,
                contractAddress: null,
                cumulativeGasUsed: bnify("0x80b9"),
                from: "0xb346D5019EeafC028CfC01A5f789399C2314ae8D",
                gasUsed: bnify("0x80b9"),
                logs: [
                    {
                        address: "0x6fC21092DA55B392b045eD78F4732bff3C580e2c",
                        blockHash: "0xc9235b8253fce455942147aa8b450d23081b867ffbb2a1e4dec934827cd80f8f",
                        blockNumber: 0x1564d8,
                        data: "0x00000000000000000000000006b5955a67d827cdf91823e3bb8f069e6c89c1d6000000000000000000000000000000000000000000000000016345785d8a0000",
                        logIndex: 0x0,
                        topics: ["0xac375770417e1cb46c89436efcf586a74d0298fee9838f66a38d40c65959ffda"],
                        transactionHash: "0x55c477790b105e69e98afadf0505cbda606414b0187356137132bf24945016ce",
                        transactionIndex: 0x0,
                    },
                ],
                logsBloom:
                    "0x00000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000010000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                root: "0xf1c3506ab619ac1b5e8f1ca355b16d6b9a1b7436b2960b0e9ec9a91f4238b5cc",
                to: "0x6fC21092DA55B392b045eD78F4732bff3C580e2c",
                transactionHash: "0x55c477790b105e69e98afadf0505cbda606414b0187356137132bf24945016ce",
                transactionIndex: 0x0,
            },
            // Byzantium Receipt
            {
                byzantium: true,
                blockHash: "0x61d343e0e081b60ac53bab381e07bdd5d0815b204091a576fd05106b814e7e1e",
                blockNumber: 0x1e1e3b,
                contractAddress: null,
                cumulativeGasUsed: bnify("0x4142f"),
                from: "0xdc8F20170C0946ACCF9627b3EB1513CFD1c0499f",
                gasUsed: bnify("0x1eb6d"),
                logs: [
                    {
                        address: "0xCBf1735Aad8C4B337903cD44b419eFE6538aaB40",
                        blockHash: "0x61d343e0e081b60ac53bab381e07bdd5d0815b204091a576fd05106b814e7e1e",
                        blockNumber: 0x1e1e3b,
                        data: "0x000000000000000000000000b70560a43a9abf6ea2016f40a3e84b8821e134c5f6c95607c490f4f379c0160ef5c8898770f8a52959abf0e9de914647b377fa290000000000000000000000000000000000000000000000000000000000001c20000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000030d4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000355524c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004c6a736f6e2868747470733a2f2f6170692e6b72616b656e2e636f6d2f302f7075626c69632f5469636b65723f706169723d455448555344292e726573756c742e584554485a5553442e632e300000000000000000000000000000000000000000",
                        logIndex: 0x1,
                        topics: ["0xb76d0edd90c6a07aa3ff7a222d7f5933e29c6acc660c059c97837f05c4ca1a84"],
                        transactionHash: "0xf724f1d6813f13fb523c5f6af6261d06d41138dd094fff723e09fb0f893f03e6",
                        transactionIndex: 0x2,
                    },
                ],
                logsBloom:
                    "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000080000000202000000",
                status: 1,
                to: "0xB70560a43A9aBf6ea2016F40a3e84B8821E134c5",
                transactionHash: "0xf724f1d6813f13fb523c5f6af6261d06d41138dd094fff723e09fb0f893f03e6",
                transactionIndex: 0x2,
            },
        ],
    },
    goerli: {
        addresses: [
            {
                address: "0x06B5955A67D827CDF91823E3bB8F069e6c89c1D6",
                balance: bnify("314159000000000000"),
                code: "0x",
            },
        ],
        blocks: [
            {
                hash: "0xd5daa825732729bb0d2fd187a1b888e6bfc890f1fc5333984740d9052afb2920",
                parentHash: "0xe675f1362d82cdd1ec260b16fb046c17f61d8a84808150f5d715ccce775f575e",
                number: 3,
                timestamp: 1548947483,
                difficulty: 2,
                gasLimit: bnify("10455073"),
                gasUsed: bnify("0"),
                miner: "0xe0a2bd4258d2768837baa26a28fe71dc079f84c7",
                extraData:
                    "0x506172697479205465636820417574686f7269747900000000000000000000002822e1b202411c38084d96c84302b8361ec4840a51cd2fad9cb4bd9921cad7e64bc2e5dc7b41f3f75b33358be3aec718cf4d4317ace940e01b3581a95c9259ac01",
                transactions: [],
            },
            // Blockhash with leading zero; see #629
            {
                hash: "0x0f305466552efa183a0de26b6fda26d55a872dbc02aca8b5852cc2a361ce9ee4",
                parentHash: "0x6723e880e01c15c5ac894abcae0f5b55ea809a31eaf5618998928f7d9cbc5118",
                number: 1479831,
                timestamp: 1571216171,
                difficulty: 2,
                gasLimit: bnify(0x7a1200),
                gasUsed: bnify("0x0d0ef5"),
                miner: "0x22ea9f6b28db76a7162054c05ed812deb2f519cd",
                extraData:
                    "0x0000000000000000000000000000000000000000000000000000000000000000f4e6fc1fbd88adf57a272d98f725487f872ef0495a54c2b873a58d14e010bf517cc5650417f18cfd4ad2396272c564a7da1265ae27c397609293f488ec57d68e01",
                transactions: [
                    "0xea29f0764f03c5c67ac53a866a28ce23a4a032c2de4327e452b39f482920761a",
                    "0x0eef23ffb59ac41762fdfa55d9e47e82fa7f0b70b1e8ec486d72fe1fee15f6de",
                    "0xba1eeb67ac6e8d1aa900ff6fbd84ac46869c9e100b33f787acfb234cd9c93f9f",
                    "0x4f412ab735b29ddc8b1ff7abe4bfece7ad4684aa20e260fbc42aed75a0d387ea",
                    "0x2f1fddcc7a2c4b2b7d83c5cadec4e7b71c34cec65da99b1114bd2b044ae0636c",
                ],
            },
        ],
        transactions: [],
        transactionReceipts: [
            {
                blockHash: "0x2384e8e8bdcf6eb87ec7c138fa503ac34adb32cac817e4b35f14d4339eaa1993",
                blockNumber: 47464,
                byzantium: true,
                contractAddress: null,
                cumulativeGasUsed: bnify(21000),
                from: "0x8c1e1e5b47980D214965f3bd8ea34C413E120ae4",
                gasUsed: bnify(21000),
                logsBloom:
                    "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                to: "0x58Bb4221245461E1d4cf886f18a01E3Df40Bd359",
                transactionHash: "0xec8b1ac5d787f36c738cc7793fec606283b41f1efa69df4ae6b2a014dcd12797",
                transactionIndex: 0,
                logs: [],
                status: 1,
            },
        ],
    },
};

blockchainData.default = blockchainData.homestead;

function equals(name: string, actual: any, expected: any): void {
    if (expected && expected.eq) {
        if (actual == null) {
            assert.ok(false, name + " - actual big number null");
        }
        expected = BigNumber.from(expected);
        actual = BigNumber.from(actual);
        assert.ok(expected.eq(actual), name + " matches");
    } else if (Array.isArray(expected)) {
        if (actual == null) {
            assert.ok(false, name + " - actual array null");
        }
        assert.equal(actual.length, expected.length, name + " array lengths match");
        for (let i = 0; i < expected.length; i++) {
            equals("(" + name + " - item " + i + ")", actual[i], expected[i]);
        }
    } else if (typeof expected === "object") {
        if (actual == null) {
            if (expected === actual) {
                return;
            }
            assert.ok(false, name + " - actual object null");
        }

        const keys: { [key: string]: boolean } = {};
        Object.keys(expected).forEach(key => {
            keys[key] = true;
        });
        Object.keys(actual).forEach(key => {
            keys[key] = true;
        });

        Object.keys(keys).forEach(key => {
            equals("(" + name + " - key + " + key + ")", actual[key], expected[key]);
        });
    } else if (typeof expected === "string") {
        if (actual == null) {
            assert.ok(false, name + " - actual null");
        }

        assert.equal(actual.toLowerCase(), expected.toLowerCase(), name + " matches");
    } else {
        if (actual == null) {
            assert.ok(false, name + " - actual null");
        }

        assert.equal(actual, expected, name + " matches");
    }
}

function waiter(duration: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}

type ProviderDescription = {
    name: string;
    networks: Array<string>;
    create: (network: string) => [Provider, jest.MockedFunction<(e: Error) => void>];
};

type CheckSkipFunc = (provider: string, network: string, test: TestDescription) => boolean;

type TestDescription = {
    name: string;
    networks: Array<string>;
    execute: (provider: Provider) => Promise<void>;

    attempts?: number;
    timeout?: number;
    extras?: Array<"nowait" | "funding">;
    checkSkip?: CheckSkipFunc;
};

const allNetworks = ["mainnet", "kovan", "goerli", "ropsten"];

const infuraKeys = ["faulty-key", "0c1adc7b335e4f72aceefd255f339bcc", "f32f45f87fff4522a5d302db74593dc3"];

const getRpcEndpoint = (network: string, apiKey: string) => `https://${network}.infura.io/v3/${apiKey}`;

const getEndpoints = (network: string) => infuraKeys.map(key => getRpcEndpoint(network, key));

const providerFunctions: Array<ProviderDescription> = [
    {
        name: "JsonRpcMultiProvider",
        networks: allNetworks,
        create: (network: string) => {
            const handleErrorMock = jest.fn();

            return [
                new JsonRpcMultiProvider(getEndpoints(network), { handleRequestError: handleErrorMock }),
                handleErrorMock,
            ];
        },
    },
    {
        name: "Web3MultiProvider",
        networks: allNetworks,
        create: (network: string) => {
            const handleErrorMock = jest.fn();

            const fetchFunctions = getEndpoints(network).map(endpoint => getMockFetchFunction(endpoint));
            return [new Web3MultiProvider(fetchFunctions, { handleRequestError: handleErrorMock }), handleErrorMock];
        },
    },
];

// This wallet can be funded and used for various test cases
const fundWallet = Wallet.createRandom();

const testFunctions: Array<TestDescription> = [];

Object.keys(blockchainData).forEach(network => {
    function addSimpleTest(name: string, func: (provider: Provider) => Promise<any>, expected: any) {
        testFunctions.push({
            name,
            networks: [network],
            execute: async (provider: Provider) => {
                const value = await func(provider);
                equals(name, expected, value);
            },
        });
    }

    function addObjectTest(
        name: string,
        func: (provider: Provider) => Promise<any>,
        expected: any,
        checkSkip?: CheckSkipFunc,
    ) {
        testFunctions.push({
            name,
            networks: [network],
            checkSkip,
            execute: async (provider: Provider) => {
                const value = await func(provider);
                Object.keys(expected).forEach(key => {
                    equals(`${name}.${key}`, value[key], expected[key]);
                });
            },
        });
    }

    const tests: TestCases = blockchainData[network];

    // And address test case can have any of the following:
    // - balance
    // - code
    // - storage
    // - ENS name
    tests.addresses.forEach(test => {
        if (test.balance) {
            addSimpleTest(
                `fetches account balance: ${test.address}`,
                (provider: Provider) => {
                    return provider.getBalance(test.address);
                },
                test.balance,
            );
        }

        if (test.code) {
            addSimpleTest(
                `fetches account code: ${test.address}`,
                (provider: Provider) => {
                    return provider.getCode(test.address);
                },
                test.code,
            );
        }

        if (test.storage) {
            Object.keys(test.storage).forEach(position => {
                addSimpleTest(
                    `fetches storage: ${test.address}:${position}`,
                    (provider: Provider) => {
                        return provider.getStorageAt(test.address, bnify(position));
                    },
                    test.storage[position],
                );
            });
        }

        if (test.name) {
            addSimpleTest(
                `fetches ENS name: ${test.address}`,
                (provider: Provider) => {
                    return provider.resolveName(test.name);
                },
                test.address,
            );
        }
    });

    tests.blocks.forEach(test => {
        addObjectTest(
            `fetches block (by number) #${test.number}`,
            (provider: Provider) => {
                return provider.getBlock(test.number);
            },
            test,
        );
    });

    tests.blocks.forEach(test => {
        addObjectTest(
            `fetches block (by hash) ${test.hash}`,
            (provider: Provider) => {
                return provider.getBlock(test.hash);
            },
            test,
            (provider: string, _network: string, _test: TestDescription) => {
                return provider === "EtherscanProvider";
            },
        );
    });

    tests.transactions.forEach(test => {
        addObjectTest(
            `fetches transaction ${test.hash}`,
            async (provider: Provider) => {
                const tx = await provider.getTransaction(test.hash);

                // This changes with every block
                assert.equal(typeof tx.confirmations, "number", "confirmations is a number");

                // @ts-ignore allow deleting non-optional operand
                delete tx.confirmations;

                assert.equal(typeof tx.wait, "function", "wait is a function");

                // @ts-ignore allow deleting non-optional operand
                delete tx.wait;

                return tx;
            },
            test,
            (_provider: string, _network: string, _test: TestDescription) => {
                return false;
            },
        );
    });

    tests.transactionReceipts.forEach(test => {
        addObjectTest(
            `fetches transaction receipt ${test.transactionHash}`,
            async (provider: Provider) => {
                const receipt = await provider.getTransactionReceipt(test.transactionHash);

                if (test.status === null) {
                    assert.ok(receipt.status === undefined, "no status");
                    receipt.status = undefined;
                }

                // This changes with every block; so just make sure it is a number
                assert.equal(typeof receipt.confirmations, "number", "confirmations is a number");

                // @ts-ignore allow deleting non-optional operand
                delete receipt.confirmations;

                return receipt;
            },
            test,
            (_provider: string, _network: string, _test: TestDescription) => {
                return false;
            },
        );
    });
});

(function () {
    function addErrorTest(code: string, func: (provider: Provider) => Promise<any>) {
        testFunctions.push({
            name: `throws correct ${code} error`,
            networks: ["ropsten"],
            execute: async (provider: Provider) => {
                try {
                    const value = await func(provider);
                    console.log(value);
                    assert.ok(false, "did not throw");
                } catch (error) {
                    assert.equal(error.code, code, "incorrect error thrown");
                }
            },
        });
    }

    /*
    @TODO: Use this for testing pre-EIP-155 transactions on specific networks
    addErrorTest(ethers.utils.Logger.errors.NONCE_EXPIRED, async (provider: Provider) => {
        return provider.sendTransaction("0xf86480850218711a0082520894000000000000000000000000000000000000000002801ba038aaddcaaae7d3fa066dfd6f196c8348e1bb210f2c121d36cb2c24ef20cea1fba008ae378075d3cd75aae99ab75a70da82161dffb2c8263dabc5d8adecfa9447fa");
    });
    */

    // Wallet(id("foobar1234"))
    addErrorTest(ethers.utils.Logger.errors.NONCE_EXPIRED, async (provider: Provider) => {
        return provider.sendTransaction(
            "0xf86480850218711a00825208940000000000000000000000000000000000000000038029a04320fd28c8e6c95da9229d960d14ffa3de81f83abe3ad9c189642c83d7d951f3a009aac89e04a8bafdcf618e21fed5e7b1144ca1083a301fd5fde28b0419eb63ce",
        );
    });

    addErrorTest(ethers.utils.Logger.errors.INSUFFICIENT_FUNDS, async (provider: Provider) => {
        const txProps = {
            to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            gasPrice: 9000000000,
            gasLimit: 21000,
            chainId: 3,
            value: 1,
        };

        const wallet = Wallet.createRandom();
        const tx = await wallet.signTransaction(txProps);
        return provider.sendTransaction(tx);
    });

    addErrorTest(ethers.utils.Logger.errors.INSUFFICIENT_FUNDS, async (provider: Provider) => {
        const txProps = {
            to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            gasPrice: 9000000000,
            gasLimit: 21000,
            value: 1,
        };

        const wallet = Wallet.createRandom().connect(provider);
        return wallet.sendTransaction(txProps);
    });

    addErrorTest(ethers.utils.Logger.errors.UNPREDICTABLE_GAS_LIMIT, async (provider: Provider) => {
        return provider.estimateGas({
            to: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", // ENS contract
        });
    });
})();

testFunctions.push({
    name: "sends a transaction",
    extras: ["funding"], // We need funding to the fundWallet
    timeout: 900, // 15 minutes
    networks: ["ropsten"], // Only test on Ropsten
    checkSkip: (_provider: string, _network: string, _test: TestDescription) => {
        return false;
    },
    execute: async (provider: Provider) => {
        const gasPrice = (await provider.getGasPrice()).mul(10);

        const wallet = fundWallet.connect(provider);

        const addr = "0x8210357f377E901f18E45294e86a2A32215Cc3C9";

        const b0 = await provider.getBalance(wallet.address);
        assert.ok(b0.gt(ethers.constants.Zero), "balance is non-zero");

        const tx = await wallet.sendTransaction({
            to: addr,
            value: 123,
            gasPrice,
        });

        await tx.wait();

        const b1 = await provider.getBalance(wallet.address);
        assert.ok(b0.gt(b1), "balance is decreased");
    },
});

testFunctions.push({
    name: "sends an EIP-2930 transaction",
    extras: ["funding"], // We need funding to the funWallet
    timeout: 900, // 15 minutes
    networks: ["ropsten"], // Only test on Ropsten
    checkSkip: (_provider: string, _network: string, _test: TestDescription) => {
        return false;
    },
    execute: async (provider: Provider) => {
        const gasPrice = (await provider.getGasPrice()).mul(10);

        const wallet = fundWallet.connect(provider);

        const addr = "0x8210357f377E901f18E45294e86a2A32215Cc3C9";

        const b0 = await provider.getBalance(wallet.address);
        assert.ok(b0.gt(ethers.constants.Zero), "balance is non-zero");

        const tx = await wallet.sendTransaction({
            type: 1,
            accessList: {
                "0x8ba1f109551bD432803012645Ac136ddd64DBA72": [
                    "0x0000000000000000000000000000000000000000000000000000000000000000",
                    "0x0000000000000000000000000000000000000000000000000000000000000042",
                ],
            },
            to: addr,
            value: 123,
            gasPrice,
        });

        await tx.wait();

        const b1 = await provider.getBalance(wallet.address);
        assert.ok(b0.gt(b1), "balance is decreased");
    },
});

describe("Test Provider Methods", function () {
    let fundReceipt: Promise<ethers.providers.TransactionReceipt>;
    const faucet = "0x8210357f377E901f18E45294e86a2A32215Cc3C9";

    beforeAll(async function () {
        // Get some ether from the faucet
        const provider = new JsonRpcMultiProvider(getEndpoints("ropsten"));
        const funder = await ethers.utils.fetchJson(
            `https:/\/api.ethers.io/api/v1/?action=fundAccount&address=${fundWallet.address.toLowerCase()}`, // eslint-disable-line
        );
        fundReceipt = provider.waitForTransaction(funder.hash);
        fundReceipt.then(_receipt => {
            console.log(`*** Funded: ${fundWallet.address}`);
        });
    }, 300000);

    afterAll(async function () {
        // Wait until the funding is complete
        await fundReceipt;

        // Refund all unused ether to the faucet
        const provider = new JsonRpcMultiProvider(getEndpoints("ropsten"));
        const gasPrice = await provider.getGasPrice();
        const balance = await provider.getBalance(fundWallet.address);
        const tx = await fundWallet.connect(provider).sendTransaction({
            to: faucet,
            gasLimit: 21000,
            gasPrice,
            value: balance.sub(gasPrice.mul(21000)),
        });

        console.log(`*** Sweep Transaction:`, tx.hash);
    }, 300000);

    providerFunctions.forEach(({ name, networks, create }) => {
        networks.forEach(network => {
            const [provider, mockHandleError] = create(network);

            testFunctions.forEach(test => {
                // Skip tests not supported on this network
                if (test.networks.indexOf(network) === -1) {
                    return;
                }
                if (test.checkSkip && test.checkSkip(name, network, test)) {
                    return;
                }

                // How many attempts to try?
                const attempts = test.attempts != null ? test.attempts : 3;
                const timeout = test.timeout != null ? test.timeout : 60;
                const extras = (test.extras || []).reduce((accum, key) => {
                    accum[key] = true;
                    return accum;
                }, <Record<string, boolean>>{});

                it(
                    `${name}.${network || "default"} ${test.name}`,
                    async function () {
                        // Multiply by 2 to make sure this never happens; we want our
                        // timeout logic to success, not allow a done() called multiple
                        // times because our logic returns after the timeout has occurred.

                        // Wait for the funding transaction to be mined
                        if (extras.funding) {
                            await fundReceipt;
                        }

                        // We wait at least 1 seconds between tests
                        if (!extras.nowait) {
                            await waiter(1000);
                        }

                        let error: Error = new Error("failed to execute");
                        for (let attempt = 0; attempt < attempts; attempt++) {
                            try {
                                const result = await Promise.race([
                                    test.execute(provider),
                                    waiter(timeout * 1000).then(_result => {
                                        throw new Error("timeout");
                                    }),
                                ]);

                                if (mockHandleError) {
                                    expect(mockHandleError).toHaveBeenCalled();
                                    mockHandleError.mock.calls = [];
                                }

                                return result;
                            } catch (attemptError) {
                                console.log(`*** Failed attempt ${attempt + 1}: ${attemptError.message}`);
                                error = attemptError;

                                if (mockHandleError) {
                                    mockHandleError.mock.calls = [];
                                }

                                // On failure, wait 5s
                                await waiter(5000);
                            }
                        }
                        throw error;
                    },
                    2 * (1000 + timeout * 1000 * attempts),
                );
            });
        });
    });
});

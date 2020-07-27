const fs = require('fs');
const dotenv = require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {

  networks: {

    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777"
    },

    mainnet:{
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 1,       // mainnet's id
      gas: 6000000,      // Ropsten has a lower block limit than mainnet
      gasPrice: 20000000000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 5000,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

    ropsten: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 3,       // Ropsten's id
      gas: 8000000,        // Ropsten has a lower block limit than mainnet
      gasPrice: 50000000000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 1000,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    kovan: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 42,       // Ropsten's id
      gas: 12400000,        // Ropsten has a lower block limit than mainnet
      gasPrice: 1000000000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 1000,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      "path": "soljson-v0.5.0+commit.1d4f565a.js",
      "version": "0.5.0",
      "build": "commit.1d4f565a",
      "longVersion": "0.5.0+commit.1d4f565a",
      "keccak256": "0x58f38d5282278f80ce27c57cf00d8e7521fd7061d5b164ee5119e88b906590dc",
      "urls": [
        "bzzr://38f84b39ff79bd9a11e4a541737dea28aec4dbe3e403186b79a69c5c4d5d4328"
      ]
    }
      // version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    
  
  }
}

/*
squirrel polar course zebra laundry parent cereal explain mushroom law curve mosquito


portion menu culture inherit okay clean uncle mistake inspire surprise amused labor
*/
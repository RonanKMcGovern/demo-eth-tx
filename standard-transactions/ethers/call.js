const { ethers } = require("ethers");

// Loading the contract ABI
// (the results of a previous compilation step)
const fs = require("fs");
const { abi } = JSON.parse(fs.readFileSync("EtherSplitter.json"));

async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const provider = new ethers.providers.InfuraProvider(
    network,
    process.env.INFURA_PROJECT_ID
  );
  // Creating a signing account from a private key
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
  // Creating a Contract instance connected to the signer
  const contract = new ethers.Contract(
    // Replace this with the address of your deployed contract
    process.env.ETHERSPLITTER_CONTRACT,
    abi,
    signer
  );
  // Issuing a transaction that calls the `echo` method
  const tx = await contract.splitEther([0xdF8b511C3682b093736318A67Fcc2FEC6772D1a6, 0x1E2eBeBB3348B1FeFC29239c20Df1c78668180Cc]);
  console.log("Mining transaction...");
  console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
  // Waiting for the transaction to be mined
  const receipt = await tx.wait();
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}

require("dotenv").config();
main();

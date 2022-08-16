const { ethers } = require("ethers");

// Loading the contract ABI
// (the results of a previous compilation step)
const fs = require("fs");
// const { abi } = JSON.parse(fs.readFileSync("kitty.json")); //Doesn't work - pasted in from etherscan.

const abi = [
    "function getKitty(uint256) external view returns (bool ,bool ,uint256 ,uint256 ,uint256 ,uint256 ,uint256 ,uint256 ,uint256 ,uint256 )",
  ]; //added in manual abi

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
    process.env.KITTY_CONTRACT,
    abi,
    signer
  );
  // Issuing a transaction that calls the `getKitty` method
  const kittyId = 17;
  const kitty = await contract.getKitty(kittyId); //takes in the kitty id for kitty 17
  console.log(`Getting details for kitty #${kittyId}`);
  console.log(`Kitty details are ${kitty}`);

}

require("dotenv").config();
main();

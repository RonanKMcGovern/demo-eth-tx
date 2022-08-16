const Web3 = require("web3");

// Loading the contract ABI
// (the results of a previous compilation step)
const fs = require("fs");
const abi = [
    "function getKitty(uint256) view returns (bool ,bool ,uint256 ,uint256 ,uint256 ,uint256 ,uint256 ,uint256 ,uint256 ,uint256 )",
  ]; //added in manual abi

async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    )
  );
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(signer);
  // Creating a Contract instance
  const contract = new web3.eth.Contract(
    abi,
    // Replace this with the address of your deployed contract
    process.env.KITTY_CONTRACT
  );

    // Issuing a transaction that calls the `getKitty` method
  const kittyId = 17;
  const kitty = await contract.getKitty(kittyId);
  //(,,,,,,,,,kittyDna) = contract.getKitty(kittyId); //takes in the kitty id for kitty 17
  console.log(`Getting details for kitty #${kitty}`);
  console.log(`Kitty details are ${contract.getKitty(kittyId)}`);
}

require("dotenv").config();
main();

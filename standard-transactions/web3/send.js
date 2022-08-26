const Web3 = require("web3");
network = 'ganache'

async function main() {
  // Configuring the connection to an Ethereum node

// Is there is an injected web3 instance?


if (typeof web3 !== 'undefined') {
  const web3 = new Web3(web3.currentProvider);
  console.log("web3 is defined and there is a provider")
} else {
  // If no injected web3 instance is detected, fallback to Ganache CLI.
  web3 = new Web3(
    new Web3.providers.HttpProvider('http://127.0.0.1:7545')
  );
  console.log("web3 is not defined. Setting Ganache as provider")
}
  
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(signer);
  // Creating the transaction object
  const tx = {
    from: signer.address,
    to: "0x8458F09074482d6baCBbeD88E84Acb676205280A", //Ganache wallet #2
    value: web3.utils.toWei("1"),
  };
  // Assigning the right amount of gas
  tx.gas = await web3.eth.estimateGas(tx);

  // Sending the transaction to the network
  const receipt = await web3.eth
    .sendTransaction(tx) //Somehow this transaction is being signed by the private key.
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`tx ID: ${txhash}`);
    });
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}

require("dotenv").config();
main();
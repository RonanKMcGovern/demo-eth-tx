const ethers = require("ethers");
require("dotenv").config();

//Code taken from "https://www.web3byexample.com/transferring-erc20"

(async () => {
  const abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",

    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",

    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)",
  ];

  const usdc = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"; //updated by Ronan to Goerli USDC address
  const usdcDecimals = 6; //USDC only has 6, not 18 decimals.
  const network = process.env.ETHEREUM_NETWORK;
  const provider =  new ethers.providers.InfuraProvider( //Creates a new provider/connection
    network,
    process.env.INFURA_PROJECT_ID
  );
  const privateKey = process.env.SIGNER_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider); //Creates a wallet (which is a signer via inheritance) using the provider
  const erc20_rw = new ethers.Contract(usdc, abi, wallet); //Creates a contract instance that includes a signer (via the wallet)

  const receipt = "0x1E2eBeBB3348B1FeFC29239c20Df1c78668180Cc"; //Ronan's Goerli Test Wallet Hot June 2022
  const amount = ethers.utils.parseUnits("0.1", usdcDecimals); //multiplies by 1e6, the number of decimals.
  const tx = await erc20_rw.transfer(receipt, amount); //calling contract.transfer where transfer is a function in the USDC contract.
  //not clear how the contract knows that this has been signed...maybe because there is an isOwner?
  console.log("tx has been sent, waiting for confirmation. hash is ", tx.hash);

  await tx.wait();

  console.log(
    "balance",
    ethers.utils.formatUnits(await erc20_rw.balanceOf(receipt), usdcDecimals)
  );
})();
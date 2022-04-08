let MS = artifacts.require("MultiSigWallet")
let Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let P1 = "47d54a0bb7305503515b27b18c6cd4ac62dec5755fc5f19c44059ed104b9d836"
let P2 = "e3af2e22f5d9bd8e9c0a25d0c1213424e0cac93eedd65c4220d16c9555e606e4"



let amount = "10000000000000000000"
let nonce = 1
let ms;
contract("Deployement",(accounts) => {
 it("GetInstance", async function() {
     ms = await MS.deployed()
     console.log(ms.address)
 })
 it("Transfer", async function() {
     console.log(accounts[3])
    let sig1 = await web3.eth.accounts.sign(web3.utils.soliditySha3(ms.address,accounts[3],amount,nonce),P1)
    let sig2 = await web3.eth.accounts.sign(web3.utils.soliditySha3(ms.address,accounts[3],amount,nonce),P2)
    let receipt = await ms.transfer(accounts[3],amount,nonce,[sig1.signature,sig2.signature],{from:accounts[2]})
    console.log(receipt)
 })
})
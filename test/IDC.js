let IDC = artifacts.require("IDC")
let Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let P1 = "eca85eb4819b84d95c90bf9f68584e65fdb2f6a5b63d362752661b85cba9fb83"
let P0 = "5d75f2ab213cebd772448cdbf0277a3079fa50661b136c4e826e6b5cd7aa98a7"



let amount = "10000000000000000000"
let nonce = 0
let idc;
contract("Deployement",(accounts) => {
 it("GetInstance", async function() {
     idc = await IDC.deployed()
     console.log(idc.address)
 })
 it("mint tokens",async function() {
     let receipt = await idc.mint(accounts[1],amount);
     let bal = await idc.balanceOf(accounts[1])
     console.log(`${accounts[1]}---->${bal.toString()}`)
 })
 it("Transfer", async function() {
    console.log(accounts[0])
    let sig1 = await web3.eth.accounts.sign(web3.utils.soliditySha3(idc.address,accounts[1],accounts[2],amount,nonce),P1)
    let sig2 = await web3.eth.accounts.sign(web3.utils.soliditySha3(idc.address,accounts[1],accounts[2],amount,nonce),P0)
    let receipt = await idc.transfer(accounts[1],accounts[2],amount,nonce,[sig1.signature,sig2.signature],{from:accounts[0]})
    console.log(receipt)

    let bal = await idc.balanceOf(accounts[2]);
    console.log(`${accounts[2]}---->${bal.toString()}`)
 })
})
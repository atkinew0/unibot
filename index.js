const Web3 = require('web3');
const fs = require('fs');
const { generateKeyPair } = require('crypto');


const abi = fs.readFileSync("IUniswapV2Factory.json",'utf8');
const abi2 = fs.readFileSync("IUniswapV2Pair.json",'utf8');
const abi3 = fs.readFileSync("IUniswapV2ERC20.json","utf8")


let web3 = new Web3( "https://mainnet.infura.io/v3/0a1a8e2b60dc451a83a15364e11c28f2")

let univ2factory = new web3.eth.Contract(JSON.parse(abi).abi, "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f");

async function getPrices(){

    //get first pair contract
    let response = await univ2factory.methods.allPairs(0).call();

    let unipair = new web3.eth.Contract(JSON.parse(abi2).abi, response);

    let token0 = await unipair.methods.token0().call();
    let token1 = await unipair.methods.token1().call();

    let token0C = new web3.eth.Contract(JSON.parse(abi3).abi, token0)
    let name0 = await token0C.methods.symbol().call();
    let token1C =  new web3.eth.Contract(JSON.parse(abi3).abi, token1)
    let name1 = await token1C.methods.symbol().call();


    let {reserve0, reserve1 }= await unipair.methods.getReserves().call();

    

    console.log(`${name0}: ${reserve0} ${name1}: ${reserve1}  price:${reserve0/(reserve1 /1000000000000)}`);



}

getPrices();


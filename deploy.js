const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
    '*Mneumonics*',
    '*Infura link the contract has to be deployed*'
);

const web3 = new Web3(provider);

// We are doing async operations so we declared this method, it has no other use
const deploy = async () => {
    const accounts = await web3.eth.getAccounts(); // The mneumonic have many accounts associated with
    console.log('Attempting to deploy from the account ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
                    .deploy({ data: bytecode, arguments: ['Hi there!'] })
                    .send({ gas: '1000000', from: accounts[0] });
    
    console.log(interface);
    console.log('Contract deployed to', result.options.address);

    provider.engine.stop();
};
deploy();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
    'bright ivory cross absent idle start decorate river bleak baby fault sword',
    'https://rinkeby.infura.io/v3/8ffea91b158e4ec1966aac3d61b3b928'
);

const web3 = new Web3(provider);

// We are doing async operations so we declared this method, it has no other use
const deploy = async () => {
    const accounts = await web3.eth.getAccounts(); // The mneumonic have many accounts associated with
    console.log('Attempting to deploy from the account ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
                    .deploy({ data: bytecode, arguments: ['Hi there!'] })
                    .send({ gas: '1000000', from: accounts[0] });
    
    console.log('Contract deployed to', result.options.address);

    provider.engine.stop();
};
deploy();
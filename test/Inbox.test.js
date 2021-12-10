const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile')

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hi there!'

beforeEach(async () => {
    // Get the list of the accounts
    accounts = await web3.eth.getAccounts();

    // Use the accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments:[INITIAL_MESSAGE] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address); // Checks if the address exists
    });

    it('has a default message', async () => {
        // methods is an property of inbox that contains all the public methods
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('Bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye');
    })
})
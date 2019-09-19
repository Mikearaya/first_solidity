const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); 
const {abi, evm} = require('../compile') 

//set a testing etherium network
const web3 = new Web3(ganache.provider());
let accounts;
let inbox;

beforeEach( async() => {
accounts = await web3.eth.getAccounts();
inbox = await new web3.eth.Contract(abi)
.deploy({data: evm.bytecode["object"], arguments: ["hello ether"]})
.send({from: accounts[0], gas: '1000000'});
} );

describe('Inbox', () => {
    
it('deploys a contract', () => {

    
    assert.ok(inbox._address);
});

it('has default message value', async () => {
    const message  = await inbox.methods.message().call();

    assert.equal(message, 'hello ether');
})


it('modifies message', async () => {
    const message  = await inbox.methods.setMessage("updated")
    .send({from : accounts[0]});

    const updatedMessage  = await inbox.methods.message().call();

       assert.equal(updatedMessage, 'updated');

})


})

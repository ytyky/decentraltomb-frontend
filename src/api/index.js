import contract from '../contract';

import store from '../store'

import Big from 'bignumber.js'

export default {
    async getCount() {
        return await contract.Instance.methods.moralsCount().call();
    },
    async getdata(i) {
        return await contract.Instance.methods.morals(i).call();
    },
    async pressF(count) {
        const response = await contract.Instance.methods.payRespect(count).sendToBlock({
            from: store.state.dapp.account,
            amount: new Big('0').toString()
        });

        if (response.success) {
            console.log('transaction success: ', response);
        } else {
            console.log('transaction failed: ', response);
        }

        return response;
    },
    async approve(name, passday) {
        //const approveAmount = new Big(limit).times('1e18').toString();
        const response = await contract.Instance.methods.addmorals(name, passday).sendToBlock({
            from: store.state.dapp.account,
            amount: new Big('0').toString()
        });

        if (response.success) {
            console.log('transaction success: ', response);
        } else {
            console.log('transaction failed: ', response);
        }

        return response;
    }
}
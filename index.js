



'use strict';
const Store=require('./Store-3');
exports.createStore=function createStore(updaters,defaultState) {
    console.log('test')
    console.log('test')
    const sto=new Store(defaultState);
    sto.setUpdaters(updaters);
    return sto;
}

exports.useMiddleware=function useMiddleware(store,middles) {
    middles.reverse();
    middles.forEach(middle=>{
        let next = store.dispatch;
        store.dispatch=middle(store)(next).bind(store);
    })
    return store;
}















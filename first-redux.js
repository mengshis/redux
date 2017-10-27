const Redux = require('redux');
const reducer=function (state, action) {
    if(action.type=="changeName"){
        var newState = JSON.parse(JSON.stringify(state));
        return newState;//Object.assign({},state,{name:action.name})
    }else {
        return state;
    }
}

const store=Redux.createStore(reducer,{name:'leo'});
var {createStore,dispatch,getState} =store;
store.subscribe(()=>console.log(store.getState()));
/*
* action={
*   type:'changeName',
*   payload:{},
*
* }
*  action={
*   type:'changeName',
*   payload:new Error,
*   error:true
* }
*
*
* */
function callAction() {
    var promiseAction= new Promise(function (resolve, inject) {
        setTimeout(function () {
            var action={
                type:'test',
                data:{name:'leo'}
            }
            resolve(action);
        })
    });
    promiseAction.then(function (action) {
        store.dispatch(action);
    })
}














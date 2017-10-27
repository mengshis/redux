
const Redux= require('redux');
const applyMiddleware= Redux.applyMiddleware;
const logger = store=>next=>action=>{
    console.log('==================');
    let result=next(action);
    console.log('==================');
    return result;
};

const createStore=applyMiddleware(logger)(Redux.createStore);
const reducer=function (state, action) {
    if(typeof state==="undefined") return {name:''};
    if(action.type=="changeName"){
        return {name:action.name};
    }else {
        return state;
    }
};
/*const logger=function (store) {
    return function(next){
        return function (action) {
            console.log('==================');
            let result=next(action);
            console.log('==================');
            return result;
        }
    }
}*/
const store=createStore(reducer,{name:"leo"});
store.subscribe(()=>console.log(store.getState()));
store.dispatch({type:'changeName',name:"ms"});


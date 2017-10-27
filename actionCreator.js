
const createStore =require('redux').createStore;

const reducer=function (state, action) {
    if(action.type=="changeName"){
        var newState = JSON.parse(JSON.stringify(action.name));
        return newState;//Object.assign({},state,{name:action.name})
    }else {
        return state;
    }
}


const store=createStore(reducer,{name:''});


/*function actionCreator(text) {
    return {
        type:"changeName",
        name:text
    }
}*/
store.subscribe(()=>console.log(store.getState()))
//store.dispatch(actionCreator("leo"));


function createAction(action, dispatch) {
    return function (opt) {
        action=Object.assign({},action,opt,{type:action.type});
        dispatch(action);
    }
}
var action=createAction({type:"changeName",name:'leo'},store.dispatch);

action();
action({name:"ms"});










"use strict";
const Redux=require('redux');
const createStore=Redux.createStore;
const combineReducers=Redux.combineReducers;
/*function combineReduceres(reducers) {
    return function reducer(state,action) {
        let newState={};;
        for(let key in reducers){
            newState[key]=reducers[key](state[key],action)
        }
        return newState;
    }
}*/

//state -> {a:[],b:[],c:{name:"",group:[]}}

//action A -> {type,data(String)}

//const reducers={a:aReducer,b:bReducer}
//const reducers={a:function(state,action){},b:function(state,action){}}
function aReducer(state, action) {
    if(typeof state==="undefined") return [];
    if(action.type=="a"){
        //state.push(action.data)
        //return state XXX错误的，不能改变原始的state
        return state.concat([action.data]);
    }else {
        return state;
    }
}

function bReducer(state, action) {
    if(typeof state==="undefined") return [];
    if(action.type=="b"){
        return state.concat([action.data]);
    }else {
        return state;
    }
}

const reducer=combineReducers({a:aReducer,b:bReducer,c:cReducer});
const store=createStore(reducer,{a:[111],b:[222],c:{name:'name init is leo',group:['init']}});

store.subscribe(()=>{console.log(store.getState())})
store.dispatch({
    type:"a",
    data:'哈哈'
})
store.dispatch({
    type:"b",
    data:'哈哈'
})
store.dispatch({
    type:"c",
    name:'name change to ms',
    item:'init changed'
})
function cNameReducer(state, action) {
    if(typeof state==="undefined") return '';
    if(action.type=="c"){
        return action.name;
    }else {
        return state;
    }
}
function cGroupReducer(state, action) {
    if(typeof state==="undefined") return [];
    if(action.type=="c"){
        return state.concat([action.item]);
    }else {
        return state;
    }
}
//cAction:{type,name,item}
function cReducer(state, action) {
    if(typeof state==="undefined") return {name:'',group:[]};
    if(action.type=="c"){
         return combineReducers({name:cNameReducer,group:cGroupReducer})(state,action);
        /*return {
            name:cNameReducer(undefined,action),
            group:cGroupReducer(undefined,action)
        }*/
    }else {
        return state;
    }
}






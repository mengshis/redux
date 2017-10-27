
const EventEmitter =require('events').EventEmitter;
class Store{
    constructor(state){
        this._state=state||{};
        this._updaters={};
        this._emitter=new EventEmitter();
    }
    get state(){
        return JSON.parse(JSON.stringify(this._state));
    }
    //fns || Object
    setUpdaters(fns){
        this._updaters=fns;
    }
    dispatch(action){
        if(this._updaters==="function"){
            this._state= this._updaters(this.state,action);//return new State
        }else {
            let newState={};

            const keys=Object.keys(this._updaters);
            keys.forEach(key=>{
                let updater=this._updaters[key];
                let value=this._state[key];
                let newSubState=updater(value,action);
                newState[key]=newSubState;

            });
            this._state=Object.assign({},this._state,newState);
        }
        this._emitter.emit('change');
    }
    listen(listener){
        this._emitter.on('change',listener)
    }
}


function numUpdater(oldNum,action) {
    switch (action.type){
        case "+":
            return ++oldNum;
        case "-":
            return --oldNum;
        default :
            return oldNum;
    }
};

function nameUpdater(oldName,action){
    switch (action.type){
        case "changeName":
            return action.name;
        default :
            return oldName;
    }
}

function createStore(updaters,defaultState) {
    const sto1=new Store(defaultState);
    sto1.setUpdaters(updaters);
    return sto1;
}
const sto=createStore({name:nameUpdater,num:numUpdater},{name:"ms",num:5});

sto.listen(()=>{
    console.log(sto.state);
});


sto.dispatch({
    type:"+"
});

sto.dispatch({
    type:"-"
});


action1={
    type:'changeName',
    name:'mmmssss'
}
sto.dispatch(action1);
function ajaxData(store) {
    let next=store.dispatch;
    store.dispatch=function (action) {
        if(action.url){
            setTimeout(function () {
                action.name='ajax ok';
                next.call(store,action);
            },1000)
        }else {
            next.call(store,action);
        }
    }
    return store;

}

function createChangeNameAction(name) {
    return{
        type:"changeName",
        name
    }
}

let action3=createChangeNameAction('hero')

function logger(store) {
    let next=store.dispatch;
    store.dispatch=function (action) {
        console.log('======use middleware==========')
        next.call(store,action);
        console.log('==============================')
    }
    return store;
}
const looger2=store=>next=>action=>{
    store.dispatch=function (action) {
        console.log('======use middleware=========')
        next.call(store,action);
        console.log('===============')
    }
}
function useMiddleware(store,middles) {
    middles.reverse();
    middles.forEach(middle=>{
        middle(store);
    })
    return store;
}
useMiddleware(sto,[logger,ajaxData]);
sto.dispatch(action3);
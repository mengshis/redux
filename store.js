
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
            console.log(this._state);
        }else {
            let newState={};
            const keys=Object.keys(this._updaters);
            keys.forEach(key=>{
                let updater=this._updaters[key];
                let value=this._state[key];
                let newSubState=updater(value,action);
                newState[key]=newSubState;
                //console.log(updater);
            });
            this._state=Object.assign({},this._state,newState);
        }
        this._emitter.emit('change');
    }
    listen(listener){
        this._emitter.on('change',listener)
    }
}

const sto=new Store({name:"ms",num:5});
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

sto.setUpdaters({name:nameUpdater,num:numUpdater});
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
action2={
    type:'changeName',
    name:'ss'
}
sto.dispatch(action1);
sto.dispatch(action2);




'use strict';
const EventEmitter =require('events').EventEmitter;
class Store{
    constructor(state){
        this._state=state||{};
        this._updaters={};
        this._emitter=new EventEmitter();
    }
    getState(){
        return JSON.parse(JSON.stringify(this._state));
    }
    //fns || Object
    setUpdaters(fns){
        this._updaters=fns;
    }
    dispatch(action){
        if(this._updaters=="function"){
            console.log('return new state');
            this._state= this._updaters(oldState,action);//return new State
            //console.log(this._state);
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

module.exports=Store;












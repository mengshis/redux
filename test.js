'use strict';


const createStore =require('./index').createStore;
const useMiddleware=require('./index').useMiddleware;

const logger=store=>next=>action=>{
        console.log('===============')
        next.call(store,action);
        console.log('===============')
}
function nameUpdater(oldstate,action) {
    if(action.type=="changeName"){
        console.log(action.name);
        return {name:action.name};
    }
    else {
        console.log(oldstate);
        return oldstate;
    }
}
const store1=createStore(nameUpdater,{name:'s'});
store1.listen(()=>{
    console.log(JSON.stringify(store1))
    console.log(store1.getState())
})
useMiddleware(store1,[logger]);
const action={
    type:"changeName",
    name:'success'
}
store1.dispatch(action);





function aaaUpdater(subState) {
    return {name:'ss'}
}

function bbbUpdater(subState) {
    return {name:'ms'}
}

function update(updaters) {
    let state={
        aaa:{name:"haha"},
        bbb:{name:'xixi'},
        ccc:{name:'lala'}
    };
    let newState={};
    const keys=Object.keys(updaters);
    keys.forEach(key=>{
        let updater=updaters[key];
        let value=state[key];
        let newSubState=updater(value);
        newState[key]=newSubState;
        console.log(key);
    })
    let result=Object.assign({},state,newState);
    console.log(result);
}

update({aaa:aaaUpdater,bbb:bbbUpdater});








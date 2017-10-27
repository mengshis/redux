
const Redux= require('redux');
const applyMiddleware= Redux.applyMiddleware;
const logger = store=>next=>action=>{
    console.log('==================');
    let result=next(action);
    console.log('==================');
    return result;
};
const logger2 = store=>next=>action=>{
    console.log('+++++++++++++++++++');
    let result=next(action);
    console.log('+++++++++++++++++++');
    return result;
};
function thunkAction(name) {
    return dispatch=>{
        setTimeout(function () {
            dispatch({
                type:"changeName",
                name
            })
        },3000)
    }
}

/*
const thunk=store=>nextDispatch=>action=>{
    if(typeof action==="function"){
        action(nextDispatch);
    }else {
        nextDispatch(action);
    }
}

const promise=store=>nextDispatch=>action=>{
    if(action instanceof Promise){
        action.then(function (action) {
            nextDispatch(action)
        })
    }else {
        nextDispatch(action);
    }
}
*/

function* generatorAction() {
    let name =yield new Promise(function (resolve, reject) {
        setTimeout(function (params) {
            resolve('leo')
        },1000)
    })

    return {
        type:'changeName',
        name
    }
}
function promiseAction(name) {
    return new Promise((resolve,reject)=>{
        setTimeout(function (params) {
            resolve({
                type:"changeName",
                name
            })
        })
    })
}
function gAction(name) {
    return function* generatorAction() {
        let name =yield new Promise(function (resolve, reject) {
            setTimeout(function (params) {
                resolve('leo')
            },1000)
        });
        return {
            type:'changeName',
            name
        }
    }
}

/*const generator=store=>nextDispatch=>action=>{
    if(typeof action==="function"&& action.constructor.name==='Generator'){
        let g=action();
        let v=g.next();
        function run(v) {
            if(v.done){
                nextDispatch(v.value);
            }else {
                if(v.value && v.value instanceof Promise){
                    v.value.then(function (name) {
                        run(g.next(name));
                    })
                }else {
                    nextDispatch(v.value);
                }
            }
        }
        run(v);
    }

}*/

//javascript es 实战

const asyncMiddleware =store=>nextDispatch=>action=>{
    if(typeof action==="function"){
        if(typeof action==="function"&& action.constructor.name==='GeneratorFunction'){
            let g=action();
            let v=g.next();
            function run(v) {
                if(v.done){
                    nextDispatch(v.value);
                }else {
                    if(v.value && v.value instanceof Promise){
                        v.value.then(function (name) {
                            run(g.next(name));
                        })
                    }else {
                        nextDispatch(v.value);
                    }
                }
            }
            run(v);
        }else {
            action(nextDispatch);
        }
    }else if(action instanceof Promise){
        action.then(function (action) {
            nextDispatch(action)
        })
    }else {
        nextDispatch(action);
    }

}



// const createStore=applyMiddleware(thunk,logger)(Redux.createStore);
// const createStore=applyMiddleware(promise,logger)(Redux.createStore);
const createStore=applyMiddleware(asyncMiddleware,logger)(Redux.createStore);
const reducer=function (state, action) {
    if(typeof state==="undefined") return {name:''};
    if(action.type=="changeName"){
        return {name:action.name};
    }else {
        return state;
    }
};

const store=createStore(reducer,{name:"leo"});
store.subscribe(()=>console.log(store.getState()));
//store.dispatch(thunkAction('mengshi'));
// store.dispatch(promiseAction('mengshi'));
store.dispatch(gAction('mengshi'));
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



//中间件 redux-thunk redux-promise



















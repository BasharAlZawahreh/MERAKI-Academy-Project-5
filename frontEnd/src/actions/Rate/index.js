export const addRate=(rate)=>{
    return {type:"ADD_RATE",payload:rate}
}

export const setRate=(rates)=>{
    return  {type:"SET_RATE",payload:rates}
}
export const setUser=(users)=>{
    return  {type:"SET_USER",payload:users}
}
export const updateUser=(user)=>{
    return {type:"UPDATE_USER",payload:user}
}
export const addUser=(user)=>{
    return {type:"ADD_USER",payload:user}
}
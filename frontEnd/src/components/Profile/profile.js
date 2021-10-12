import React,{useState} from 'react'
import axios from "axios"
import { useDispatch,useSelector } from 'react-redux'
import{updateUser} from "../../actions/users"

const Profile=()=>{

const dispatch = useDispatch();
const[firstName,setFirstName]=useState()
const[lastName,setLastName]=useState()
const[age,setAge]=useState()
const[city,setCity]=useState()
const[password,setPassword]=useState()
const [user_id,setUserId] = useState(localStorage.getItem("user_id"));
 let state=useSelector((state)=>{
     return {token:state.token.token}
 })

const editProfile=()=>{
    console.log("fff")
    console.log(state.token)
    axios.put(`http://localhost:5000/users/edit` ,{firstName,lastName,age,city,password},
    {headers:{
        Authorization: `Bearer ${state.token}`},
      }).then((result)=>{
        console.log(result.data)
     dispatch(updateUser(result.data.result))
    }).catch((err)=>{
        console.log("wrong")
    })
}

return (
<div className="updateProfile">
 <input type="text" placeholder='firstName ' onChange={(e)=>{setFirstName(e.target.value)}} />
 <input type="text" placeholder='lastName'onChange={(e)=>{setLastName(e.target.value)}} />
 <input type='number' placeholder='Age'onChange={(e)=>{setAge(e.target.value)}}  />
 <input type="text" placeholder='City'onChange={(e)=>{setCity(e.target.value)}} />
 <input type="password" placeholder='Password'onChange={(e)=>{setPassword(e.target.value)}} />
 <button onClick={()=>{editProfile()}}>editProfile</button>
 
</div>
)

}
export default Profile;
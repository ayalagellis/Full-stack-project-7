
import {getAllUsers, getUser, createUser, updateUser, deleteUser} from '../models/users.js'

export const getAllUsers1 = async(req,res)=>{
    const users = await getAllUsers()
    res.send(users)
}
export const getUser1 =  async(req,res)=>{
    const id = req.params.id;
    const user = await getUser(id)
    res.send(user)
}
export const createUser1 =  async(req,res)=>{
    const {first_name, last_name, username, user_password, email, address, is_manager} = req.body;
    const user = await createUser(first_name, last_name, username, user_password, email, address, is_manager)
    res.send(user)
}

export const updateUser1 = async (req, res) => {
    const id = req.params.id;
    const { first_name, last_name, username, user_password, email, address, is_manager } = req.body;
    const updatedUser = await updateUser(id, first_name, last_name, username, user_password, email, address, is_manager);
    res.send(updatedUser);
  }


  export const deleteUser1 =  async (req, res) => {
    const id = req.params.id;
    await deleteUser(id); 
  }
  
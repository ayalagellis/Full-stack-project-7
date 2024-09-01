
import {getAllUsers,getUserByUsername, getUser, createUser, updateUser, deleteUser} from '../models/users.js'
import {createCart1} from '../controllers/cartController.js'
import { verifyPassword, generateToken, hashPassword } from '../helper.js';


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
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
        return res.status(400).send('Username already exists');
    }
    const hashedPassword = await hashPassword(password);
    await createUser(first_name, last_name, username, hashedPassword, email, address, is_manager)
    res.status(201).send('User created');
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
  

  // Logout endpoint
export const logout = async (req, res) => {
    res.clearCookie('User');
    res.send('Logged out');
};




// Login endpoint
export const login =  async (req, res) => {
    const { username, user_password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(401).send('User not found');
        }

        const validPassword = await verifyPassword(user_password, user.user_password);
        
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }

        //const token = generateToken(user.id);

        //res.cookie('User', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.json(
            {
                id: user.id,
                username: user.username
            }
            
        );


    } catch (error) {
        res.status(500).send('Server error');
    }
};






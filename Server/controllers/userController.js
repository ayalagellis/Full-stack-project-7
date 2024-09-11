
import {getAllUsers,getUserByUsername, getUser, createUser, updateUser, deleteUser, is_manager} from '../models/users.js'
import { getCartByCustomerId, createCart } from '../models/cart.js';
import { verifyPassword, generateToken, hashPassword } from '../helper.js';



export const isManager = async (req, res, next) => {
    const userDataCookie = req.cookies['user-data'];
    
    if (!userDataCookie) {
        return res.status(401).send('Unauthorized'); // No user data in cookies
    }

    try {
        const decodedCookie = decodeURIComponent(userDataCookie);
        const userData = JSON.parse(decodedCookie);
        const userId = userData.customer_id;

        const manager = await is_manager(userId);
        let isManager = manager.is_manager;
        //console.log(isManager)
        if (isManager === 1) {
            next(); // User is a manager, proceed to the next middleware or route handler
        } else {
            res.status(403).send('Access Denied'); // Forbidden
        }
    } catch (error) {
        console.error('Error verifying manager status:', error);
        res.status(500).send('Server Error');
    }
};

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
    const hashedPassword = await hashPassword(user_password);
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
    res.clearCookie('user-data', { expires: new Date()});
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

    //     const validPassword = await verifyPassword(user_password, user.user_password);
        
    //     if (!validPassword) {
    //        return res.status(401).send('Invalid password');
    //    }

        const existingCart = await getCartByCustomerId(user.id);

        let cart = null;
        if (existingCart) {
            cart = existingCart  
        }
        else{
            cart = await createCart(user.id, 0);
        }


        
        res.cookie('user-data', JSON.stringify({
            customer_id: user.id,
            username: user.username,
            password: user.user_password,
            manager: user.is_manager,
            cart_id: cart.id,
            total_price: cart.total_price

        }), {
            maxAge: 36000000, // Duration in milliseconds
            httpOnly: false,
        });
        
        res.json({
            id: user.id,
            username: user.username,
            is_manager: user.is_manager
        });
        
    } catch (error) {
        res.status(500).send('Server error');
    }
};






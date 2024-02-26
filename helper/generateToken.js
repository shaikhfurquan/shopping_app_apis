import JWT from 'jsonwebtoken'

export const generateToken = async(user) =>{
    try {
        console.log("user " , user);
        const token =  JWT.sign({_id : user._id} , process.env.JWT_SECRET , {expiresIn : '7d'})
        // console.log(token);
        return token
    } catch (error) {
        console.log('Error generating token' , error.message);
    }
}
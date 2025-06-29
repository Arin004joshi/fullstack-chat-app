import jwt from "jsonwebtoken"

export const generateToken = (userId,res)=>{

    // generate the token 
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn : "7d" // user needs to login again after 7 days
    });

    // sending the token in a cookie
    res.cookie("jwt",token,{
        maxAge : 7*24*60*60*1000,
        httpOnly : true,  // prevent (XSS attack) cross-site sripting attacks
        sameSite : "Strict",  //prevents cross-site request forgery attacks (CSRF)
        secure : process.env.NODE_ENV !== "development",  // in productions this needs to be true i.e whether to decide https or http
    });

    return token;
}
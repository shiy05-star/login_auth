const dbConn = require("../../config/configuration");

const registerUser = async (user_name, user_password, user_email) => {
    try {
        const sql = "CALL cipherbytes.insertUserDetails(?,?,?)"
        const results = await dbConn.query(sql, [user_name,user_password,user_email])
        return results;
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
}


const userLoginDetails = async (user_email,user_password) => {
    const sql = "CALL cipherbytes.GetUserDetailsByEmailAndPassword(?,?)";
    const result = dbConn.query(sql, [user_email,user_password]);
    //console.log(result,"result")
    return result;
};



const insertMembersDetails= async(user_id, post_content, post_profile, post_bg_profile) => {
    const sql = `CALL cipherbytes.INSERT_MEMBERS_DETAILS(?,?,?,?)`;
    const details= await dbConn.query(sql , [user_id, post_content, post_profile, post_bg_profile]);
    console.log(details[0][0], "details0987");
    return details[0][0];
};


const insertRequestDetails= async(con_profile_image_url, con_full_name, con_profession, mutual_connections)=>{
    const sql = `CALL cipherbytes.INSERT_REQUEST_DETAILS (?,?,?,?)`;
    const details= await dbConn.query(sql, [con_profile_image_url, con_full_name, con_profession, mutual_connections]);
    console.log(details[0][0][0], "12344555");
    return  details[0][0][0];
    
}
module.exports = {
    registerUser,userLoginDetails, insertMembersDetails, insertRequestDetails
};
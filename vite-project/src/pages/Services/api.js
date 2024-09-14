import axios from 'axios'
export const getProtecdedData= async (page)=>{
const token=localStorage.getItem("authToken")

if (!token){
    return null;
}
try {
    const response= await axios.get("http://localhost:7261/api/Product?page="+page,{

        headers:{
            Authorization: `bearer ${token}`
        }
    })
    return response;
} catch (error) {
    console.log(error)
}

}


export const getCategoryData= async ()=>{
    
    try {
        const response= await axios.get("http://localhost:7261/api/Category")
        return response;
    } catch (error) {
        console.log(error)
    }
    
    }

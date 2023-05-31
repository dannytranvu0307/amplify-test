import { useDispatch } from "react-redux";
import { verify, selectError } from "../features/auth/loginSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const VerifyCode = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const param = useParams ('verifyCode')
    
    useEffect(()=>{
        if(param){  
        dispatch(verify(param))
            .unwrap().then((res)=>{
                if(res.status === 200)
                console.log("navigate")
                navigate("/login")
            })
        }
    },[])
    // npm install --save-dev vite-plugin-rewrite-all
}
export default VerifyCode
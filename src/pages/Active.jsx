import { useDispatch } from "react-redux";
import { verify, selectError } from "../features/auth/loginSlice";
import { useNavigate, Navigate,useParams } from "react-router-dom";
import { useEffect, memo} from "react";
const VerifyCode = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { verifyCode } = useParams('verifyCode')
    useEffect(()=>{
        dispatch(verify({verifyCode:verifyCode})).unwrap().then(()=>navigate('/login'))
    })
}
export default memo(VerifyCode)
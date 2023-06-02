import { useState, useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ErrorNotification from "../components/ErrorNotification";
import {email, password} from "../instaces"
import Modal from "../components/Modal";
import FormInput from "../components/FormInput";
import ValidatorSubmit from "../functional/ValidatorSubmit";
import { login, authenticate,
    selectIsActive,selectIsActiveMessage,selectErrorLogin,
    selectActiveError } from "../features/auth/loginSlice";

function Login(){
    // change language
    const { t } = useTranslation();
    // message store
    const error = useSelector(selectErrorLogin);
    useEffect(()=>{
        setErrSever(error)
    },[error])
    const navigate = useNavigate()
    const location = useLocation()
    const [errSever, setErrSever] = useState(error)
    const isActiveMessage= useSelector(selectIsActiveMessage)
    const isActiveError = useSelector(selectActiveError)
    const isActive = useSelector(selectIsActive)

    // input elements
    const inputs = [{...email,type:'text'}, password]
    // init function to dispatch action
    const dispatch = useDispatch()

    // init form obj
    const [form, setForm] = useState({});
    const [remember, setRemember] = useState(false);

    // input change
    const onChange = e => {
        setForm({...form, [e.target.name] : e.target.value})
    }

    // check remember me or not?
    const handleCheck = (e) =>{
        setRemember(!remember)
    }

    // send form
    const onSubmit = async e => {
        e.preventDefault();
        const $ = document.querySelector.bind(document)


        // get elements
        const submitEmail = $("input#email")
        const submitPassword = $("input#password")
        const formSubmit = $("#login")
        // pass or not
        if (ValidatorSubmit(formSubmit,[submitEmail,submitPassword])){
            dispatch(login({...form, ["remember"]:remember}))
            .unwrap()
            .then(res=>{
                if (res.status !== 401){
                    dispatch(authenticate())
                }})
                console.log(location)
                navigate(location)
            }
            else{
                setErrSever('')
            }
    }
        
    console.log(import.meta.env)
    return (
        <>
        <section 
        data-aos="fade-right"
        data-aos-offset="3"
        data-aos-easing="ease-in-sine"
        className="bg-gray-50 dark:bg-gray-900"
        >
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        {t("login")}
                    </h1>
                    <form id="login" className="space-y-4 md:space-y-6" onSubmit={e => onSubmit(e)}>
                        {inputs.map((input,i)=>(
                            <FormInput  key={i} 
                            onChange={e=>onChange(e)}
                            {...input}/>
                        ))}

                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember"  value={remember}  name="remember" onChange={e=>handleCheck(e)}  aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" 
                    
                                    className="text-gray-500 dark:text-gray-300">{t("remember")}</label>
                                </div>
                            </div>
                            <Link to="/passwordreset" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">{t("forgot_password")}</Link>
                        </div>
                        <div>

                        <span className= "text-red-500 pt-2 text-xs">{errSever && t(errSever)}</span>
                        </div>
                        <button 
                        type="submit" 
                        className="
                        w-full 
                        text-white 
                        bg-primary-600
                        hover:bg-primary-500
                        focus:ring-4 focus:outline-none 
                        focus:ring-primary-500 font-medium rounded-lg 
                        text-sm px-5 py-2.5 text-center ">{t("login")}</button>
                        <p className="text-sm font-light text-gray-500">
                        {t("sign_up_description")}
                        <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">{t("sign_up_link")}</Link>
                        </p>
                    </form>
                </div>
            </div>
            </div>
       
        </section>  
        {isActive &&  <ErrorNotification>{isActiveMessage}</ErrorNotification>}
        {isActiveError && <Modal />}
    </>
    )
}
export default Login
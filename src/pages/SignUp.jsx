import {useState, memo, useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import ValidatorSubmit from "../functional/ValidatorSubmit";
import { email, department,password, confirm_password, fullName} from "../instaces";
import ErrorNotification from "../components/ErrorNotification";

import { useDispatch } from "react-redux";
import { register, changeActive } from "../features/auth/loginSlice";

const SignUp = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // error message
    const [messageError, setMessageError] = useState()
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(()=>{
       return ()=>dispatch(changeActive())
    },[])
    // input elements
    // const inputs =  [fullName,email,department,password,confirm_password]

    // change language
    const [form, setForm] = useState({})

    const onSubmit = e => {
        e.preventDefault();
        setIsSuccess(false)
        // get elements to validate
        const submitInput = document.querySelectorAll("input")
        const select = document.querySelector('select#departmentId')
        const formSubmit = document.querySelector("#signup")
        
        // pass or not
        if (ValidatorSubmit(formSubmit,[...submitInput,select])){
            let {departmentId, confirm_password,password, fullName, email} = {...form}
            dispatch(register({departmentId:departmentId,password,fullName: fullName.replace(/\s\s+/g, ' '),email:email.replace(/\s\s+/g, '').trim()}))
            .unwrap()
            .then(res => {
                if (res.data.code === 'API002_ER'){
                    setMessageError('API002_ER')
                }else if (res.data.code === 'API002_ER2'){
                    setMessageError('API002_ER2')
                }
                else{
                    setMessageError()
                    setIsSuccess(true)
                }
            })
        }
        else {
            setMessageError('alert')
        }
    }

    // every times typing tha target will be changed value
    const onChange = e => {
        setMessageError()
        setForm({...form, [e.target.name]: e.target.value})
    }

return (
    <section className="bg-gray-50 h-full align-middle pb-12" data-aos="fade-left">
        <div className="flex flex-col items-center justify-center px-2 md:px-6 py-2 md:py-8 mx-auto md:h-full lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    {t("register")}
                </h1>
                <form id="signup" className="space-y-4 md:space-y-6" onSubmit={e => onSubmit(e)} autoComplete="off">
                    {/* {inputs.map((input,i)=>
                    {   
                        return  (
                            <FormInput 
                                onChange={e=>onChange(e)}
                                key={i}  
                                {...input}                      
                            />        
                        )}
                    )} */}
                     <FormInput 
                                onChange={e=>onChange(e)}   {...fullName}               
                            />     
                            <FormInput 
                                onChange={e=>onChange(e)}   {...email}               
                            /> 
                            <FormInput 
                                onChange={e=>onChange(e)}    {...department}              
                            /> 
                            <FormInput 
                                onChange={e=>onChange(e)}    {...password}              
                            /> 
                            <FormInput 
                                onChange={e=>onChange(e)}   {...confirm_password}               
                            /> 
                    <div>
                    {messageError && <span className="text-red-500 text-xs">{t(messageError)}</span>}
                    </div>
                    <button 
                    type=""
                    className="w-full text-white 
                    bg-primary-600
                    hover:bg-primary-500 
                    focus:ring-4 focus:outline-none 
                    focus:ring-primary-300 font-medium rounded-lg 
                    text-sm px-5 py-2.5 text-center ">{t("btnRegister")}</button>
                    <p className="text-sm font-light text-gray-500">
                    {t("sign_in_description")} 
                    <Link to="/login" className="font-medium text-primary-600 hover:underline">{t("sign_in_link")}</Link>
                    </p>
                </form>
            </div>
        </div>
        {
        isSuccess && 
        <ErrorNotification>registerSuccess</ErrorNotification>
        } 
    </div>
    </section>

)

}
 export default memo(SignUp);
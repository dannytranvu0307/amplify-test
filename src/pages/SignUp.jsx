import {useState, memo, useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import ValidatorSubmit from "../functional/ValidatorSubmit";
import { email, department,password, confirm_password, fullName} from "../instaces";
import ErrorNotification from "../components/ErrorNotification";

import { useDispatch, useSelector } from "react-redux";
import { register, selectIsSuccess,selectRegisterError } from "../features/auth/loginSlice";

const SignUp = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch()
    // error message
    const error = useSelector(selectRegisterError)
    const isSuccess = useSelector(selectIsSuccess)

    // input elements
    const inputs =  [fullName,email,department,password,confirm_password]

    // change language
    const [form, setForm] = useState({})
    const onSubmit = e => {
        e.preventDefault();

        // get elements to validate
        const submitInput = document.querySelectorAll("input")
        const select = document.querySelector('select#departmentId')
        const formSubmit = document.querySelector("#signup")
        
        // pass or not
        if (ValidatorSubmit(formSubmit,[...submitInput,select])){
            let {departmentId, confirm_password,password, fullName, email} = {...form}
            dispatch(register({departmentId:departmentId,password,fullName: fullName.replace(/\s\s+/g, ' '),email:email.replace(/\s\s+/g, '').trim()}))
            .unwrap()
        }
    }

    // every times typing tha target will be changed value
    const onChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }


return (
    <section className="bg-gray-50 dark:bg-gray-900 h-full pb-12">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    {t("register")}
                </h1>
                <form id="signup" className="space-y-4 md:space-y-6" onSubmit={e => onSubmit(e)} autoComplete="off">
                    {inputs.map((input,i)=>
                    {   
                        return  (
                            <FormInput 
                                onChange={e=>onChange(e)}
                                key={i}  
                                {...input}                      
                            />        
                        )}
                    )}
                    <div>
                    {error && <span className="text-red-500 text-xs">{t(error)}</span>}
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
                    <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">{t("sign_in_link")}</Link>
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
import {useState} from "react";
import { useTranslation } from 'react-i18next';
import { Link,useParams, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import ValidatorSubmit from "../functional/ValidatorSubmit";
import { confirmPasswordReset,selectConfirmPasswordResetSuccess,selectConfirmPasswordResetReject } from "../features/auth/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import {new_password, confirm_new_password} from "../instaces";
import ErrorNotification from "../components/ErrorNotification";


const ConfirmResetPassword = () => {
// change language
const { t } = useTranslation();
const [form, setForm] = useState({})

const [ message, isMessage] = useState(false)
const [ errSever, setErrSever] = useState('')

const param = useParams()
const navigate = useNavigate()

const inputs = [
    new_password,confirm_new_password
]

const onChange = e => {
    setErrSever('')
    setForm({...form,[e.target.name]:e.target.value})
}

const dispatch = useDispatch();
const onSubmit = e => {
    e.preventDefault();
    const submitInput = document.querySelectorAll("input")
    const formSubmit = document.querySelector("#confirm_reset_password")

    if (ValidatorSubmit(formSubmit,submitInput)){
        dispatch(confirmPasswordReset({newPassword:form.new_password, ...param}))
        .unwrap().then(res =>{
          if (res.status === 200){
            isMessage(true)
            setTimeout(()=>{
                navigate('/login')
            },2000)}
            else if (res.data.code === "API_ER03" && res.data.type === "ERROR"){
                setErrSever('mailTimeOut')
            }
            else if (res.data.code === "API_ER005" && res.data.type === "ERROR"){
                setErrSever('mailTimeOut')
            }
        })
    }
}

return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-2 md:px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    {t("confirm_reset_password_title")}
                </h1>
                <form id="confirm_reset_password" className="space-y-4 md:space-y-6" onSubmit={e => onSubmit(e)}>
                    {inputs.map((input,i)=>
                    {   
                        return  (
                            <FormInput 
                                onChange={e=> onChange(e)}
                                key={i} 
                                {...input}
                            />
                        )}
                    )
                    }
                    <span className="text-red-500 text-sm">{t(errSever)}</span>
                    <div className="flex pt-7 justify-between">
                        <Link to="/login">
                        <button 
                            type="submit" 
                            className="w-auto text-white 
                            bg-primary-600
                            hover:bg-primary-500
                            focus:ring-4 focus:outline-none 
                            focus:ring-primary-300 font-medium rounded-lg 
                            text-sm px-5 py-2.5 text-center ">
                        {t("cancel")}</button>
                    </Link>
            
                    <button 
                        type="submit" 
                        className="w-auto text-white     
                        bg-primary-600
                        hover:bg-primary-500
                        focus:ring-4 focus:outline-none 
                        focus:ring-primary-300 font-medium rounded-lg 
                        text-sm px-5 py-2.5 text-center ">
                    {t("save")}</button>
                </div>
                </form>
            </div>
        </div>
        {
            message && <ErrorNotification>confirmPassWordMessage</ErrorNotification>
        }
    </div>
    </section>
)

}
 export default ConfirmResetPassword;
import FormInput from "../components/FormInput";
import ErrorNotification from "../components/ErrorNotification";
import { email } from "../instaces"
import ValidatorSubmit from "../functional/ValidatorSubmit";
import { useTranslation } from 'react-i18next';
import { passwordReset, changeActive } from "../features/auth/loginSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const PasswordReset = () => {
    const [form, setForm] = useState();
    const { t } = useTranslation();

    useEffect(() => {
        return () => dispatch(changeActive())
    }, [])

    const dispatch = useDispatch()
    const [message, setMessage] = useState(false);
    const [errSever, setErrSever] = useState()

    const onSubmit = e => {
        e.preventDefault();
        setErrSever();
        setMessage(false);
        const submitInput = document.querySelectorAll("input");
        const formSubmit = document.querySelector("#passwordreset");
        if (ValidatorSubmit(formSubmit, submitInput, t)) {
            dispatch(passwordReset(form)).unwrap().then(res => {
                if (res.data.code === "API003_ER01" && res.data.message) {
                    setErrSever('invalidEmail')
                } else if (res.data.code === "API003_ER02" && res.data.message) {
                    setErrSever('API003_ER02')
                } else {
                    setErrSever('')
                    setMessage(true)
                }
            })
        }
    }

    const onChange = e => {
        setErrSever()
        setForm({ [e.target.name]: e.target.value })
    }

    return (
        <section className="bg-gray-50 " data-aos="flip-left">
            <div className="flex flex-col items-center justify-center px-2 md:px-6  py-2 md:py-8 mx-auto md:h-full">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="relative p-6 space-y-4 md:space-y-6 sm:p-8">
                        <Link to="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                className="w-6 h-6 right-2 top-2 cursor-pointer absolute hover:text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>

                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            {t("ResetPassword")}
                        </h1>
                        <div className="py-4 text-gray-500">{t("ConfirmEmaiMessage")}</div>
                        <form id="passwordreset" className="space-y-4 md:space-y-6" onSubmit={e => onSubmit(e)}>
                            <FormInput {...email} onChange={e => onChange(e)} placeholder="ex_email" />
                            <div><span className="absolute text-red-500 text-xs">{t(errSever)}</span></div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="w-auto text-white
                                bg-primary-600
                                hover:bg-primary-500
                                focus:outline-none 
                                font-medium rounded-lg 
                                text-sm px-5 py-2.5 text-center ">
                                    {t("send")}</button>
                            </div>
                        </form>
                    </div>
                    {message && <ErrorNotification>confirm_email_message</ErrorNotification>}
                </div>

            </div>
        </section>
    )
}
export default PasswordReset
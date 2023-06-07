import { useTranslation } from 'react-i18next';
import { useState,useRef,memo,useEffect } from "react";
import Validators from "../functional/Validators";
import { departments  ,selectDepartments} from '../features/department/departmentsSlice';
import { useSelector, useDispatch } from 'react-redux';

const FormInput = (props) => {
    const {label, placeholder,forHtml,value,type,onChange,invalidError,...inputProps} = props
    const dispatch = useDispatch()
    const departments_lst = useSelector(selectDepartments)
    const handleCheckShow = () => {
        checkShow(!show)
    }


    useEffect(()=>{
        dispatch(departments())
    },[])
 
    const [show,checkShow] = useState(true)
    const [error, setError]= useState({ id:"", name:"",});
    const [hidden, setHidden] = useState(false)
    const ref = useRef();
    const { t } = useTranslation();

    const onFocus = e => {
        setHidden(true)
    }   

    const onBlur = () => {
        setError(Validators(ref.current.parentElement.parentElement,ref.current,ref.current.value))
        if (error.name === ""){
                    ref.current.classList.remove("border-red-500","bg-red-100")
        }
    }
    return (
        <div id="input-field"  className= "grid  relative">
            <label 
                htmlFor={forHtml} 
                className="flex mb-2 text-sm font-medium text-gray-900 grow-0 items-end">
                {t(label)}
                </label>
                {
                type !== "departmentId" ? (

                        <input 
                        ref={ref}
                        {...inputProps}
                        onBlur={onBlur}
                        onFocus={e=> onFocus(e)}
                        onChange={onChange}
                        value={value}
                        type = { type ==='password' && show ? 'password':'text'}
                        placeholder={t(placeholder)}
                        className={`
                        peer
                        bg-gray-50 border border-gray-300 
                        text-gray-900 sm:text-sm rounded-lg 
                        disabled:text-gray-600
                        disabled:border-none 
                        focus:ring-primary-600 
                        focus:border-primary-600 w-full p-2.5 ${error.name && ("border-red-500 bg-red-100")}`}
                        {...inputProps}
                />):(
                <select
                    onBlur={onBlur}
                    onChange = {onChange}
                    value ={value}
                    ref={ref}
                    {...inputProps}
                    className={`
                    disabled:appearance-none
                    cursor-pointer
                    bg-gray-50 border border-gray-300 
                    text-gray-700 sm:text-sm rounded-lg 
                    focus:ring-primary-600
                    focus:border-primary-600 w-full p-2.5 ${error.name && ("border-red-500 bg-red-100")}`}>
                    <option className="cursor-pointer" value = "" >{t("chooseDepartmentId")}</option>
                    {departments_lst.map((item,key)=>(
                        <option key={key} value={item.departmentId}>{t(`D${item.departmentId}`)}</option>
                    ))}
                </select>)}
                
                <span className={`text-red-500 text-xs`}>{t("") || t(error.name)}</span>
                {
                    type === "password" && hidden &&
                    <div className="absolute cursor-pointer right-2 top-9" onClick={handleCheckShow}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 peer">
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                    </svg>
                </div>}
                
           
        </div>
    )
}

export default  memo(FormInput)
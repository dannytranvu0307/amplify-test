import { useTranslation } from 'react-i18next';
import { useState,useRef,memo, useMemo,useEffect } from "react";
import Validators from "../functional/Validators";
import { departments  ,selectDepartments} from '../features/department/departmentsSlice';
import { useSelector, useDispatch } from 'react-redux';

const FormInput = (props) => {
    const {label, placeholder,forHtml,value,onChange,invalidError,...inputProps} = props
    const dispatch = useDispatch()
    const departments_lst = useSelector(selectDepartments)

    useEffect(()=>{
        dispatch(departments())
    },[])
    const [error, setError]= useState({ id:"", name:"",});
    const ref = useRef();

    const { t } = useTranslation();

    const onBlur = () => {
        setError(Validators(ref.current.parentElement.parentElement,ref.current,ref.current.value))}
    return (
        <div id="input-field"  className= "grid">
            <label 
                htmlFor={forHtml} 
                className="flex mb-2 text-sm font-medium text-gray-900 grow-0 items-end">
                {t(label)}
                </label>
            {
                inputProps.type !== "departmentId" ? (

                        <input 
                        ref={ref}
                        {...inputProps}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        placeholder={t(placeholder)}
                        className={`
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
                    bg-gray-50 border border-gray-300 
                    text-gray-700 sm:text-sm rounded-lg 
                    focus:ring-primary-600
                    focus:border-primary-600 w-full p-2.5 ${error.name && ("border-red-500 bg-red-100")}`}>
                <option value = "" >{t("chooseDepartmentId")}</option>
                    {departments_lst.map((item,key)=>(
                        <option key={key} value={item.departmentId}>{t(`D${item.departmentId}`)}</option>
                    ))}
                </select>)}
                
                <span className={`text-red-500 text-xs`}>{t("") || t(error.name)}</span>
           
        </div>
    )
}

export default  memo(FormInput)
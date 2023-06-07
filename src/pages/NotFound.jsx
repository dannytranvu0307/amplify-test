import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useEffect,useState } from 'react';
import { selectIsAuthenticated } from '../features/auth/loginSlice';
import { useSelector } from 'react-redux';

const NotFound = () => {
    const { t } = useTranslation();
    const { path }= useParams();
    const isAuth = useSelector(selectIsAuthenticated)
    const [mounted, setMounted] = useState(false);
    useEffect(()=>{
        if (path === "profile" || path === "history"){
            setMounted(false)
            if(!isAuth){
                setTimeout(()=>{
                    setMounted(true)
                },1)
            }
        }
        else{
            setTimeout(()=>{
                setMounted(true)
            },1)
        }

    },[])
    return (
        mounted && <div className="absolute bg-gray-50 top-16 z-50 flex w-full bottom-0 font-body
        text-center justify-center align-middle items-center">
        <div className="text-center">
            <div className="inline-flex rounded-full bg-red-100 p-4">
                <div className="rounded-full stroke-red-600 bg-red-200 p-4">
                    <svg className="w-16 h-16"
                        viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
            </div>
            <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">{t("error404")}</h1>
            <p className="text-slate-600 mt-5 text-md lg:text-lg">{t("error404_des_1")}<br />{t("error404_des_2")}</p>
        </div>
    </div>)
}

export default NotFound
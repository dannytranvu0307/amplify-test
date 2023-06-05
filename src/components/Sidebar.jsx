import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../features/auth/loginSlice';
import AOS from "aos";
AOS.init({
    once: true,
    easing: 'ease-in-out'
});
const Sidebar = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const openSideBar = () => {
        setMounted(!mounted)
    }
    const handleLogout = () => {
        dispatch(logout())
    }

    const sideBarItem = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="w-6 h-6 absolute left-[30px] -translate-x-1/2">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
            ,
            path: "/",
            name: "home"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="w-6 h-6 absolute left-[30px] -translate-x-1/2">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
            ,
            path: "/profile",
            name: "profile"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="w-6 h-6 absolute left-[30px] -translate-x-1/2">
                <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>,
            path: "/history",
            name: "export_history"
        }
    ]
    return (
        <div className={`fixed
            h-12
            md:h-full
            drop-shadow-md
            flex-col items-center 
            w-full
            md:w-16
            text-gray-700 bg-white 
            transition-all
            ${mounted ? ("h-full md:w-[300px]") : ""} 
            duration-200
            overflow-hidden
            z-40
            `}>
            {!mounted ?
                (<div className={`flex items-center ml-2 px-3 py-3 cursor-pointer w-full
               ${mounted && ("md:w-[300px]")} md:active:animate-fadeRight md:active:animate-fadeLeft `}
                    onClick={openSideBar}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                        className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>) :
                (<div className={`flex justify-end mr-2 px-3 pt-3 cursor-pointer w-full ${!mounted && ("md:w-[300px]")} `} onClick={openSideBar}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6  rotate-90 md:rotate-0">
                        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 
                        6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>
                </div>)
            }
            <div className={`flex items-center mx-auto mt-2 border-t border-b border-gray-300`}>
                <div className={`flex flex-col w-full`}>
                        {
                            sideBarItem.map((item, key) => {
                                return (
                                    <NavLink
                                        key={key}
                                        to={item.path}
                                        className={`group ${({ isActive, isPeding }) => isActive ?
                                            "active" : ""} 
                                `}
                                    >
                                        <div className={`w-16 transition ease-in-out duration-200 w-full ${mounted && "md:w-[300px]"}`}>
                                            <div
                                                className={` 
                                            items-center
                                            transition
                                            ease-in-out
                                            group-[.active]:bg-gradient-to-r from-cyan-200 to-blue-300 
                                            h-12 mt-2
                                            hover:bg-gradient-to-r from-cyan-200 to-blue-300 flex  
                                            duration-300
                                            `}>
                                                <>
                                                    {item.icon}
                                                </>
                                                <span className={`
                                        ml-12 leading-4 whitespace-nowrap overflow-hidden text-sm font-medium ${!mounted && "opacity-0"} duration-200`}>{t(item.name)}</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                )
                            })
                        }
                        {
                            <a  className="group" onClick={handleLogout}>
                                <div className={`w-16 transition ease-in-out duration-200 ${mounted && "w-full md:w-[300px] lg:w-[300px]"}`}>
                                    <div
                                        className={` 
                                    items-center
                                    transition
                                    ease-in-out
                                    group-[.active]:bg-gradient-to-r from-cyan-200 to-blue-300 
                                    h-12 mt-2
                                    hover:bg-gradient-to-r from-cyan-200 to-blue-300 flex  
                                    duration-300
                                    `}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            className="w-6 h-6 absolute left-[30px] -translate-x-1/2">
                                            <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                                        </svg>
                                        <span className={`
                                ml-12 leading-4 whitespace-nowrap overflow-hidden text-sm font-medium ${!mounted && "opacity-0"} duration-200`}>{t('logout')}</span>
                                    </div>
                                </div>
                            </a>
                        }
                </div>
            </div>
        </div>


    )
}

export default Sidebar
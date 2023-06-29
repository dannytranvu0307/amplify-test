import { memo, } from "react";
import logo from "../static/img/VTI_logo.png";
const Navbar = () => {
    return (
        <nav className="flex bg-white border-gray-200">
            <div className="w-full flex flex-wrap items-center justify-between">
                <div className="flex items-center cursor-pointer">
                    <span
                        className="text-white flex text-4xl top-5 left-4 cursor-pointer p-2 ml-4 my-1"
                        >
                        <img src={logo} className="flex item-center h-12 rounded" alt="VTI Logo" />
                    </span>
                        <h1 className="font-bold text-gray-900 text-lg" >VTES</h1>
                </div>
            </div>
        </nav>
 
    )
}
export default memo(Navbar);
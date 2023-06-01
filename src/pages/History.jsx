import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useState, useLayoutEffect, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../features/auth/loginSlice';
function History() {
    const { t } = useTranslation();

    const [files, setFiles] = useState([]);

    const getFiles = async () => {
        try {
            const res = await axios.get(`${baseURL}/files`,{withCredentials: true})
            return setFiles([...res.data.data])
        }catch(err){
            return err.response
        }
    }


    useEffect(()=>{
        getFiles()
    },[])
    const renderTable = () => {
        const table = [];
        for (let i = 0; i < (10-files.length); i++) {
          const row = [];
    
          for (let j = 0; j < 2; j++) {
            row.push(
              <td  className="text-sm h-9 border font-extrabold border-borderTable-borderTable font-light px-6 py-2 whitespace-nowrap"key={j}>{``}</td>
            );
          }
    
          table.push(<tr className="bg-white border h-9  border-borderTable-borderTable transition duration-300 ease-in-out hover:bg-gray-100" key={i}>{row}</tr>);
        }
    
        return table;
      };
  
    return (
        <div className="flex flex-col mx-auto items-center -sm:py-4 sm:px-6 mb-16 py-8 h-full xl:w-3/5 lg:w-full sm:w-full 2xl:w-3/5 md:w-full lg:py-0">
            <div className="bg-white rounded-lg shadow md:mt-0 2xl:w-full sm:w-full h-full xl:p-0">
                <div className="flex flex-col  h-full">
                    <h1 className="text-xl pt-8 px-12 sm:px-12 sm:text-lg  md:text-lg  lg:text-lg 2xl:text-2xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        {t("lbviewExportFileHistory")}
                    </h1>
                    <div className="xl:py-8 xl:px-8 sm:py-1 sm:px-1 md:py-8 md:px-8">
                        <div className="mx-auto">
                            <div className="bg-white overflow-hidden">
                                <div className="item mb-2 md:flex md:flex-wrap md:justify-between">
                                    <div className="container">
                                            <div className="overflow-x-hidden">
                                                <div className="border-borderTable-borderTable">
                                                    <div className="table-wrp  max-h-[420px]">
                                                        <table className="border table-fixed w-full border-borderTable-borderTable">
                                                            <thead className="border sticky top-0">
                                                                <tr>
                                                                    <th  className="bg-gray-300 text-md w-1/4 text-center border border-borderTable-borderTable font-medium text-gray-900 px-6 py-2 text-left">
                                                                        {t("lbDate")}
                                                                    </th>
                                                                    <th  className="bg-gray-300 text-md text-center border border-borderTable-borderTable   font-medium text-gray-900 px-6 py-2 text-left">
                                                                        {t("lbFileName")}
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="border bg-white w-1/5 h-96 ">
                                                                {files.map((file, key) => (
                                                                    <tr className="bg-white border h-4  border-borderTable-borderTable transition duration-300 ease-in-out hover:bg-gray-100" key={key}>
                                                                        <td className="text-sm bg-white  h-4   border font-extrabold border-borderTable-borderTable font-light px-6 py-2 whitespace-nowrap">{file.exportedDate}</td>
                                                                        <td  className="text-sm bg-white h-4   text-blue-700 underline px-6 py-2 whitespace-nowrap underline-offset-4"><Link to={'http://localhost:8080/api/v1'+"/files/"+file.fileId}>{file.fileName}</Link></td>
                                                                    </tr>))}
                                                                {renderTable()} 
                                                            </tbody>
                                                        </table>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>     
                            </div>
                        </div>
                    </div>



                    <Link className="flex
                        justify-center
                        mt-auto
                        "
                        to="/"
                    >
                        <button
                            className="w-auto
                            text-white
                            bg-primary-600
                            hover:bg-primary-500
                            focus:ring-4 focus:outline-none 
                            focus:ring-primary-300 font-medium rounded-lg 
                            text-sm px-5 py-2.5 text-center mb-4">
                        
                            {t("btnToHome")}</button></Link>
                </div>
            </div>
        </div>
    )
}
export default History
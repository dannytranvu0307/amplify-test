import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { baseURL } from '../features/auth/loginSlice';
import { useDispatch } from 'react-redux';
import { refreshToken, authenticate } from '../features/auth/loginSlice';
function History() {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const [files, setFiles] = useState([]);

    const getFiles = async () => {

        const res = () => {
            axios.get(`${baseURL}/files`, { withCredentials: true })
                .then(res => setFiles([...res.data.data]))
                .catch(error => {
                    if (error.response.status) {
                        dispatch(refreshToken()).unwrap()
                            .then(res => { if (res.status === 2000) { res() } else { dispatch(authenticate()) } })

                    }
                })
        }
        res();

    }
    useEffect(() => {
        getFiles()
    }, [])
    const renderTable = () => {
        const table = [];
        for (let i = 0; i < (10 - files.length); i++) {
            const row = [];

            for (let j = 0; j < 2; j++) {
                row.push(
                    <td className="text-sm h-9 border font-extrabold border-borderTable-borderTable font-light px-6 py-2 whitespace-nowrap" key={j}>{``}</td>
                );
            }

            table.push(<tr className="bg-white border h-9  border-borderTable-borderTable transition duration-300 ease-in-out hover:bg-gray-100" key={i}>{row}</tr>);
        }

        return table;
    };

    return (
        <div className="flex flex-col 
        mx-auto items-center
        w-full
        px-2
        mb-16 py-8 h-full
        py-2
        md:w-4/5
        lg:w-2/3
        lg:py-8"
            data-aos="zoom-out-up">
            <div className="bg-white rounded-lg shadow md:mt-0 w-full h-full xl:p-0">
                <div className="flex flex-col px-4 h-full">
                    <h1 className="text-xl pt-8 px-2 md:px-12 text-ms md:text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        {t("lbviewExportFileHistory")}
                    </h1>
                    <div className="py-8 flex mx-auto xl:px-8 sm:py-1 sm:px-1 md:py-8 md:px-8">
                        <div className="flex mx-auto">
                            <div className="bg-white flex mx-auto overflow-hidden">
                                <div className="item mb-2 flex flex-wrap ">
                                    {files.length !== 0 ? (<div className="container">
                                        <div className="overflow-y-auto">
                                            <div className="max-h-[403px]">
                                                <div className="max-h-[403px]">
                                                    <table className="table-fixed w-full border-l border-r border-borderTable-borderTable">
                                                        <thead className="sticky top-0">
                                                            <tr>
                                                                <th className="bg-primary-600 text-md w-1/4 text-center 
                                                                    font-medium text-white px-2 md:px-6 py-2 text-left
                                                                    border-r border-borderTable-borderTable
                                                                    ">
                                                                    {t("lbDate")}
                                                                </th>
                                                                <th className="bg-primary-600 text-md text-center font-medium text-white px-2 md:px-6 py-2 text-left">
                                                                    {t("lbFileName")}
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="border bg-white w-1/5 min-h-96
                                                            
                                                            ">
                                                            {files.map((file, key) => (
                                                                <tr className="bg-white border h-4  border-borderTable-borderTable transition duration-300 ease-in-out hover:bg-gray-100" key={key}>
                                                                    <td className="text-sm bg-white h-4  overflow-hidden border font-extrabold text-ellipsis border-borderTable-borderTable font-light px-2 md:px-6 py-2 whitespace-nowrap" title={file.exportedDate} >{file.exportedDate}</td>
                                                                    <td className="text-sm bg-white h-4  overflow-hidden text-blue-700 underline px-2 md:px-6 py-2 text-ellipsis whitespace-nowrap overflow-hidden underline-offset-4" title={file.fileName}><Link to={`${baseURL}` + "/files/" + file.fileId}>{file.fileName}</Link></td>
                                                                </tr>))}
                                                            {renderTable()}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>) : (<div className="h-96 w-full items-center
                                    ">
                                        <span className="flex justify-center text-gray-500">{t("lbviewExportFileHistoryEmpty")}</span>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex
                        justify-center
                        mt-auto
                        outline-none
                        "
                    >
                        <Link
                            to="/"
                            className="w-auto
                            text-white
                            bg-primary-600
                            hover:bg-primary-500
                            focus:ring-4 focus:outline-none 
                            focus:ring-primary-300 font-medium rounded-lg 
                            text-sm px-5 py-2.5 text-center mb-4">
                            {t("btnToHome")}</Link></div>
                </div>
            </div>
        </div>
    )
}
export default memo(History)
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ExcelJS from 'exceljs';
import Worksheet from '../../functional/Worksheet';
import WorksheetImg from '../../functional/WorksheetImg';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authenticate, refreshToken } from '../../features/auth/loginSlice';
import { baseURL } from '../../features/auth/loginSlice';
import ConfirmExport from './ConfirmExport';
import { useState } from 'react';
function HomeFooter2({ onFileChange, tableData, img, deleteAllFile }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [close, setClose] = useState(true)
    const userDetail = useSelector(state => state.login.user)

    const handleExportExcel = () => {
        if (tableData.length >0 && img.length> 0) {
            const user = {
                fullname: userDetail.fullName,
                department: t('D' + userDetail.department.departmentId)
            }
            const evidences = img.map((ob) => ob.fileURL)

            const exportOptions = tableData.map((item) => {
                const { useCommuterPass, payMethod, ...rest } = item; // Lược bỏ thuộc tính useCommuterPass
                if (item.isRoundTrip) {
                    if (item.transportation === 'train') {
                        return { ...rest, isRoundTrip: t('2way'), transportation: t('train') };
                    } else if (item.transportation === 'bus') {
                        return { ...rest, isRoundTrip: t('2way'), transportation: t('bus') };
                    } else if (item.transportation === 'taxi') {
                        return { ...rest, isRoundTrip: t('2way'), transportation: t('taxi') };
                    }

                } else {
                    if (item.transportation === 'train') {
                        return { ...rest, isRoundTrip: t('1way'), transportation: t('train') };
                    } else if (item.transportation === 'bus') {
                        return { ...rest, isRoundTrip: t('1way'), transportation: t('bus') };
                    } else if (item.transportation === 'taxi') {
                        return { ...rest, isRoundTrip: t('1way'), transportation: t('taxi') };
                    }
                }
            });

            //    ExportExcel(user,exportOptions,evidences) 
            const toDay = new Date();
            const workbook = new ExcelJS.Workbook();
            Worksheet(workbook, user, exportOptions)
            WorksheetImg(workbook, evidences)

            workbook.xlsx.writeBuffer().then((buffer) => {
                const blob = new Blob([buffer], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                })
                const url = window.URL.createObjectURL(blob);
                const file = new File([blob], `交通費精算書_${user.fullname.replace(/\s/g, '_')}_${toDay.getMonth() + 1}月分.xlsx`, { type: blob.type });
                
                const formData = new FormData();
                formData.append('file', file);


                axios.post(`${baseURL}/files`, formData, {
                    withCredentials: true,
                })
                    .then(response => {
                        deleteAllFile()
                        const anchor = document.createElement("a");
                        anchor.href = url;
                        anchor.download = `交通費精算書_${user.fullname.replace(/\s/g, '_')}_${toDay.getMonth() + 1}月分.xlsx`;
                        anchor.download;
                        anchor.click()
                        setClose(true)
                        dispatch(authenticate())
                        window.URL.revokeObjectURL(url);
                    })
                    .catch(error => {
                        if (error.response.status === 401) {
                            dispatch(refreshToken())
                                .unwrap()
                                .then(
                                    res => {
                                        if (res.data.type !== 'INFO') {
                                            localStorage.removeItem('auth')
                                            dispatch(authenticate())
                                        } else {
                                            axios.post(`${baseURL}/files`, formData, {
                                                withCredentials: true,
                                            })
                                                .then(response => {
                                                    deleteAllFile()
                                                    const anchor = document.createElement("a");
                                                    anchor.href = url;
                                                    anchor.download = `交通費精算書_${user.fullname.replace(/\s/g, '_')}_${toDay.getMonth() + 1}月分.xlsx`;
                                                    anchor.download;
                                                    anchor.click()
                                                    setClose(true)
                                                    dispatch(authenticate())
                                                    window.URL.revokeObjectURL(url);
                                                })
                                        }
                                    }
                                )
                        }
                    });

            })
        }
    }


    return (
        <div className='flex justify-between w-full px-5'>


            <div className="flex items-start ">
                <label className={`flex items-center px-4 py-[6px]  text-white rounded-md shadow-md cursor-pointer group 
                     ${tableData.length !== 0 ? 'bg-primary-600 hover:bg-primary-500' : 'bg-gray-500'}`}>
                    <div className={`${tableData.length !== 0 ? (' hover:bg-primary-500 group-hover:bg-gray-100  bg-green-500 group-hover:text-green-500 group-hover:rotate-180') : ('bg-gray-300')}
                      duration-300 transition w-[24px] h-[24px] text-white rounded-full flex items-center mr-2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"
                            className="w-4 h-4 flex mx-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                    <span className='text-xs  whitespace-nowrap'>{t("UploadFile")}</span>
                    <input
                        type="file"
                        className="hidden"
                        onChange={e => onFileChange(e.target.files)}
                        multiple
                        disabled={tableData.length === 0}
                        accept=".pnd, .jpeg, .eps, .tiff ,.gif ,.svg , .jpg"
                    />
                </label>
            </div>
            <div className='flex items-end '>

                <button
                    onClick={() => setClose(false)}
                    disabled ={tableData.length === 0||img.length===0 }
                    className={`flex items-center text-center justify-center w-32 h-8 rounded text-white text-xs ${tableData.length > 0 && img.length > 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[24px] h-[24px] pointer-events-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>{t("export")}</button>
            </div>
            <ConfirmExport close={close} setClose={setClose} handleExportExcel={handleExportExcel} recordLength={tableData.length} imgLength={img.length} />
        </div>
    )
}
export default HomeFooter2;
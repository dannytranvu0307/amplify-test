import { useTranslation } from "react-i18next";
const ConfirmExport =({close , setClose , handleExportExcel , recordLength , imgLength})=>{
    const { t } = useTranslation();
return ( <>
 <div className={`${close && "opacity-0 pointer-events-none" }
        absolute w-screen h-full top-0 left-0 flex items-center z-50`}>
    <div className=" absolute w-full h-full bg-gray-900 opacity-80"></div>
    
    <div className=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
    
      <div className=" py-4 text-left ">
     
        <div className="flex justify-between pb-3 border-b-2 ">
          <div className="font-bold px-6">{t('export_Alert_Title')}</div>
          <div  className=" cursor-pointer z-50 px-6" onClick={()=>setClose(true)}>
            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
        </div>
        <div className="py-5 w-full px-6">{t('export_Alert_Header')+" "+recordLength+" "+ t('export_Alert_Body') +" "+ imgLength  +" "+t('export_Alert_Tail')}  </div>
        <div className="flex justify-end p-2">
          <button onClick={()=>handleExportExcel()} className="flex px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600">
            {t('oke')}</button>
        </div>
        
      </div>
    </div>
  </div>

</>)

}

export default ConfirmExport;
import { useTranslation } from 'react-i18next';
function SearchBus({setData, data ,error,setError}){
    const { t } = useTranslation();
    return(
    <div className='pt-3 w-full'>
        <div className='flex pb-[40%] w-full'>
            <div className='flex-auto'>
               <span className='my-2 text-xs'>{t("departure")}</span>
               <div className='relative'>
                <input placeholder={t("start_bus_pla")}
                className={`w-full border-[1px] border-black rounded h-8 px-2 ${error.departure&&("border-red-500 bg-red-100")}`}
                value={data.departure}
                onChange={e=>{setData({...data,departure:e.target.value}),setError({...error,departure:false})}}/>
                   <svg
                    onClick={() => { setData({ ...data, departure: "" }) }}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" absolute right-1 top-1 w-4 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                   </svg>
                
                </div> 
            </div>
            <div className='flex items-end'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-10  translate-y-[3px]"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg></div>
            <div className='flex-auto'>
            <span className='my-2 text-xs'>{t("arrival")}</span>
               <div className='relative '>
                <input  placeholder={t("goal_bus_pla")}  
                className={`w-full border-[1px] border-black rounded h-8 px-2 ${error.arrival&&("border-red-500 bg-red-100")}`} 
                value={data.arrival} onChange={e =>{setData({...data,arrival:e.target.value}),setError({...error,arrival:false})}}/>
                   <svg
                  onClick={() => { setData({ ...data, arrival: "" }) }}
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                   className=" absolute right-1 top-1 w-4 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                      
                </div> 
            </div>
        </div>
    </div>      
    )
}
export default SearchBus
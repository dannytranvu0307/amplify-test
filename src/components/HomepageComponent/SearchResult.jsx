import { useState } from "react"
import { useTranslation } from "react-i18next";
function SearchResult({search,data ,onPrice , isOn}){
    
    const{t}=useTranslation()
    const [selectedObject, setSelectedObject] = useState(null);
    const [selectedObject2, setSelectedObject2] = useState(null);
    

    const handleObjectHover = (object) => {
        setSelectedObject(object);
      };
      const handleObjectClick = (object) => {
        setSelectedObject2(object);
        if(isOn){
         onPrice(object.summary.move.fare.unit114)
        }else{
          if(data.payment===t('ic')&&data.round===t('1way')){
            onPrice(object.summary.move.fare.IC)
        }else if(data.payment===t('ic')&&data.round===t('2way')){
            onPrice(object.summary.move.fare.IC*2)
        }else  if(data.payment===t('cash')&&data.round===t('1way')){
            onPrice(object.summary.move.fare.現金)
        }else if(data.payment===t('cash')&&data.round===t('2way')){
            onPrice(object.summary.move.fare.現金*2)
        }
        
        }
       
      };
     
return(
    <div className=" text-xs my-5">
        {search.map((search,i)=>(
            <div 
            key={i}
            className={`group relative ${selectedObject2 === search ?'bg-primary-500 rounded border border-black' : ''}`}
            onMouseEnter={() => handleObjectHover(search)}
            onMouseLeave={() => handleObjectHover(null)}
            onClick={() => handleObjectClick(search)}
            >
          <div  className="flex  px-4 py-2 rounded hover:border border-black " >
            
           {
          search.sections.length===3&&<div>{search.sections[0].stationName}ー{search.sections[2].stationName}</div>
          }
          {
          search.sections.length>=7&&<div>{search.sections[0].stationName}ー{search.sections[2].stationName}...{search.sections[search.sections.length-3].stationName}ー{search.sections[search.sections.length-1].stationName}</div>
          }
          {
          search.sections.length===5&&<div>{search.sections[0].stationName}ー{search.sections[2].stationName}ー{search.sections[search.sections.length-1].stationName}</div>
          }

          <div className="mx-2">{t('transit')}:{search.summary.move.transitCount}回</div>
          
          {isOn?<div>Price:{search.summary.move.fare.unit114}</div>:<div>
          {data.payment===t('ic')&&<div>{data.round===t('1way')?<span>{data.payment}:{search.summary.move.fare.IC}</span>:<span>{data.payment}:{search.summary.move.fare.IC*2}</span>}</div>}
          {data.payment===t('cash')&&<div>{data.round===t('1way')?<span>{data.payment}:{search.summary.move.fare.現金}</span>:<span>{data.payment}:{search.summary.move.fare.現金*2}</span>}</div>}
          </div>}

          </div>
          <div className={`absolute z-10 w-full bg-white p-2 rounded-md shadow-md transition-opacity duration-300 overflow-auto mx-auto max-h-[200px] overflow-y-scroll
         ${selectedObject === search ? 'opacity-100' : 'opacity-0 invisible'}`}>
            

                          {search.sections.map((section, index)=>(<div key={index} className="">
                         {section.type==='point'&&<div className="text-xs">{section.stationName}</div>}
                         {section.type==='move'&&<div className="flex" >
                        {section.transport?<div className="flex">
                        <div className={`text-[8px]  py-2 w-3 h-10 `} style={{backgroundColor:section.transport.lineColor}}></div>
                         <span className="flex items-center mx-auto font-bold pl-5">{section.transport.lineName}</span>
                        </div>
                        :<div className="bg-gray-300 h-10 w-3">
                           
                        </div>}
                         </div>}
    
                         </div>

))}
          
          </div>
          </div>
           
        ))}
    </div>
)


}

export default SearchResult
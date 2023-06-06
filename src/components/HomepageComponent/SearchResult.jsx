import { useState } from "react"
import { useTranslation } from "react-i18next";
function SearchResult({ search, data, onPrice, isOn }) {
  const { t } = useTranslation()
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedObject2, setSelectedObject2] = useState(null);


  const handleObjectHover = (object) => {
    setSelectedObject(object);
  };
  const handleObjectClick = (object) => {
    setSelectedObject2(object);
    if (isOn) {
      if(object.summary.move.fare.unit114){
        if (data.payment === t('ic') && data.round === t('1way')) {
          onPrice(object.summary.move.fare.unit114)
        } else if (data.payment === t('ic') && data.round === t('2way')) {
          onPrice(object.summary.move.fare.unit114 * 2)
        } else if (data.payment === t('cash') && data.round === t('1way')) {
          onPrice(object.summary.move.fare.unit112)
        } else if (data.payment === t('cash') && data.round === t('2way')) {
          onPrice(object.summary.move.fare.unit112 * 2)
        }
      }else{
        if (data.payment === t('ic') && data.round === t('1way')) {
          onPrice(object.summary.move.fare.IC)
        } else if (data.payment === t('ic') && data.round === t('2way')) {
          onPrice(object.summary.move.fare.IC * 2)
        } else if (data.payment === t('cash') && data.round === t('1way')) {
          onPrice(object.summary.move.fare.現金)
        } else if (data.payment === t('cash') && data.round === t('2way')) {
          onPrice(object.summary.move.fare.現金 * 2)
        }
      }
    } else {
      if (data.payment === t('ic') && data.round === t('1way')) {
        onPrice(object.summary.move.fare.IC)
      } else if (data.payment === t('ic') && data.round === t('2way')) {
        onPrice(object.summary.move.fare.IC * 2)
      } else if (data.payment === t('cash') && data.round === t('1way')) {
        onPrice(object.summary.move.fare.現金)
      } else if (data.payment === t('cash') && data.round === t('2way')) {
        onPrice(object.summary.move.fare.現金 * 2)
      }

    }
  };

  return (
    <div className="relative text-xs my-3">
      {search.noData && <div> <p className='pb-5 text-xs'>{t('Search_Result')}</p>
        <div className="text-center text-gray-500">{search.noData}</div> </div>}
      {search.length > 0 && <div className='pb-5 text-xs'> {t('Search_Result')} </div>}
      {!search.noData &&
        search.map((search, i) => (
          <div
            key={i}
            className={`my-2 group relative rounded border hover:border-black after:content-[""] after:absolute after:-right-[50px] after:-translate-y-1/2 after:h-7 after:w-32 cursor-pointer ${selectedObject2 === search ? 'bg-primary-600 text-white' : ''}`}
            onMouseEnter={() => handleObjectHover(search)}
            onMouseLeave={() => handleObjectHover(null)}
          >
            <div className="flex  px-4 py-2 flex-nowrap " onClick={() => handleObjectClick(search)} >
              <div className=" max-w-[70%] overflow-hidden">

              {
                search.sections.length === 3 && <div>{search.sections[0].stationName}ー{search.sections[2].stationName}</div>
              }
              {
                search.sections.length > 5 && <div>{search.sections[0].stationName} ー {search.sections[2].stationName}...{search.sections[search.sections.length - 1].stationName}</div>
              }
              {
                search.sections.length === 5 && <div>{search.sections[0].stationName}ー{search.sections[2].stationName} ー {search.sections[search.sections.length - 1].stationName}</div>
              }
             </div>
              <div className="mx-2 flex-none absolute right-16">{t('transit')}:{search.summary.move.transitCount}回</div>

              {isOn ? 
              <div className="flex-none  absolute right-1">
               { search.summary.move.fare.unit114 !== undefined ?  <>
                {data.payment === t('ic')&&( <div>{data.round === t('1way') ? <span>{data.payment}:{search.summary.move.fare.unit114}</span> : <span>{data.payment}:{search.summary.move.fare.unit114 * 2}</span>}</div>)}
                {data.payment === t('cash') &&( <div>{data.round === t('1way') ? <span>{data.payment}:{search.summary.move.fare.unit112}</span> : <span>{data.payment}:{search.summary.move.fare.unit112 * 2}</span>}</div>)}
                </>:
                <>
                  {data.payment === t('ic') && <div>{data.round === t('1way') ? <span>{data.payment}:{search.summary.move.fare.IC}</span> : <span>{data.payment}:{search.summary.move.fare.IC * 2}</span>}</div>}
                  {data.payment === t('cash') && <div>{data.round === t('1way') ? <span>{data.payment}:{search.summary.move.fare.現金}</span> : <span>{data.payment}:{search.summary.move.fare.現金 * 2}</span>}</div>}
                </>}
              </div>
                : <div className="flex-none absolute right-1">
                  {data.payment === t('ic') && <div>{data.round === t('1way') ? <span>{data.payment}:{search.summary.move.fare.IC}</span> : <span>{data.payment}:{search.summary.move.fare.IC * 2}</span>}</div>}
                  {data.payment === t('cash') && <div>{data.round === t('1way') ? <span>{data.payment}:{search.summary.move.fare.現金}</span> : <span>{data.payment}:{search.summary.move.fare.現金 * 2}</span>}</div>}
                </div>}

            </div>
            <div className={`absolute z-10 w-[60%] right-[-200px] text-black bg-white p-2 rounded-md shadow-md transition-opacity duration-300 overflow-auto mx-auto max-h-[200px] overflow-y-scroll

            
            ${selectedObject === search ? 'opacity-100' : 'opacity-0 invisible'}`}>
              {search.sections.map((section, index) => (<div key={index} className="">
                {section.type === 'point' && <div className="text-xs">{section.stationName}</div>}
                {section.type === 'move' && <div className="flex" >
                  {section.transport ? <div className="flex gap-3">
                    <div className={` py-2 w-2 h-10 border rounded `} style={{ backgroundColor: section.transport.lineColor }}></div>
                    <span className="flex items-center mx-auto font-bold ">{section.transport.lineName}</span>
                  </div>
                    : <div className=" flex gap-3">
                     <div className={`  py-2 w-2 h-10 border rounded `} ></div>
                    <span className="flex items-center mx-auto font-bold">{t('walk')}</span>
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
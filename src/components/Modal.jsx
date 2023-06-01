import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const Modal = () => {
    const [close, setClose] = useState(false)
    const {t} =useTranslation()

    const handleCloseModal = () => {
        setClose(true)
    }

    return ( <div class={`modal 
    modal-active ${close && "opacity-0 pointer-events-none" }
        absolute w-screen h-full top-0 left-0 flex items-center z-50`}>
    <div onClick={handleCloseModal} class=" modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    
    <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
    
      <div class="modal-content py-4 text-left px-6">
     
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold text-red-500">{t("errorTitle")}</p>
          <div onClick={handleCloseModal} class="modal-close cursor-pointer z-50">
            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
        </div>
        {t("TIMEOUT")}
        <div class="flex justify-end pt-2">
          <button onClick={handleCloseModal} class="modal-close px-4 p-3 rounded-lg text-white bg-primary-600
                        hover:bg-primary-500">{t('close')}</button>
        </div>
        
      </div>
    </div>
  </div>)
}

export default Modal

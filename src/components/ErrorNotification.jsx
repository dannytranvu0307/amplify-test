import { useTranslation } from 'react-i18next';
const ErrorNotification = ({children}) => {
    const {t} = useTranslation()
    return (
        <div className="fixed bottom-10 right-5 w-[280px] duration-5000 transition-all animate-showNotation opacity-0 pointer-events-none">
            <div className="bg-customgray-notication text-sm
            px-5 py-2 rounded-[10px]">
                <span className="text-blue-700">
                    {t(children)}
                    </span>
                </div>
        </div>
    )

}
export default ErrorNotification;
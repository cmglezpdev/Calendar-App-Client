import { useDispatch } from "react-redux"
import { uiOpenModal } from "../../actions/ui";

export const AddNewFab = () => {
    
    const dispatch = useDispatch(); 
  
    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }

    return (
        <div 
            className="fixed rounded-full px-6 py-5 right-6 bottom-6 bg-blue-800 text-white text-2xl hover:bg-blue-600 transition"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </div>
    )
}

import { useDispatch } from "react-redux";
import { eventStartDeleted } from "../../actions/events";

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch( eventStartDeleted() );
    }

    return (
        <div 
            className="fixed rounded-full py-3 px-4 left-6 bottom-6 bg-red-700 text-white text-xl hover:bg-red-600 transition cursor-default z-50"
            onClick={handleDelete}
        >
            <i className="fas fa-trash"></i>
            <span> Delete Event</span>
        </div>
    )
}

import { useDispatch, useSelector } from "react-redux"
import { startLogout } from "../../actions/auth";

export const Navbar = () => {

  const { name } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  }

  return (
    <div className="p-4 bg-slate-700 flex justify-between">
        <span className="text-white font-bold text-2xl">
            { name }
        </span>

        <button 
          className="py-1 px-4 border-2 border-red-600 rounded-lg text-lg text-red-600 font-bold hover:bg-red-600 hover:text-white transition"
          onClick={handleLogout}
        >
            <i className="fa fa-sign-out-alt"></i>
            <span> Salir</span>
        </button>
    </div>
  )
}


export const Navbar = () => {
  return (
    <div className="p-4 bg-slate-700 flex justify-between">
        <span className="text-white font-bold text-2xl">
            Pedrito
        </span>

        <button className="py-1 px-4 border-2 border-red-600 rounded-lg text-lg text-red-600 font-bold hover:bg-red-600 hover:text-white transition">
            <i className="fa fa-sign-out-alt"></i>
            <span> Salir</span>
        </button>
    </div>
  )
}

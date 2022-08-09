import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';


export const LoginScreen = () => {

  const dispatch = useDispatch();

  // Login handling
  const [ formLoginValues, handleLoginInputChanges ] = useForm({
    lEmail: '',
    lPassword: '',
  });
  const { lEmail, lPassword } = formLoginValues;

  const handleLogin = ( event ) => {
    event.preventDefault();
    dispatch( startLogin(lEmail,lPassword) );
  }

  // Register handling

  const [ formRegisterValues, handleRegisterInputChanges ] = useForm({
    rName: '',
    rEmail: '',
    rPassword: '',
    rConfirmPassword: '',
  });
  const { rEmail, rPassword, rName, rConfirmPassword } = formRegisterValues;

  const handleRegister = ( event ) => {
    event.preventDefault();
    
    if( rPassword !== rConfirmPassword ) {
      Swal.fire('Error', 'The password aren\'t the same', 'error');
      return;
    }

    dispatch( startRegister({
      name: rName,
      email: rEmail,
      password: rPassword
    }) );
  }




  return (
    <div className="flex max-w-6xl mx-auto mt-24 shadow-2xl shadow-back">
      <div className="bg-gray-100 w-1/2 flex flex-col py-12 px-14 min-h-max">
        <h1 className="w-full text-center text-2xl p-5 font-bold">Login</h1>
        <form className="bg-purple-20" onSubmit={handleLogin}>
          
          <input
            className="w-full p-3 border-2 focus:border-gray-400 rounded-md mb-4 focus:outline-none text-lg text-gray-600" 
            type="email" 
            placeholder="Email"
            name='lEmail'
            value={lEmail}
            onChange={handleLoginInputChanges}
          />
          
          <input 
            className="w-full p-3 border-2 focus:border-gray-400 rounded-md mb-4 focus:outline-none text-lg" 
            type="password"
            placeholder="Password"
            name='lPassword'
            value={lPassword}
            onChange={handleLoginInputChanges}
          />
          
          <button
            className="w-40 p-2 rounded-full bg-blue-800 text-lg text-white font-semibold hover:bg-blue-700 transition mt-8 focus:ring-4 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>

      <div className="w-1/2 bg-blue-800 flex flex-col py-12 px-14 min-h-max">
        <h1 className="w-full text-center text-2xl p-5 text-white font-bold">Register</h1>
          <form className="bg-purple-20" onSubmit={handleRegister}>
            
            <input
              className="w-full p-3 rounded-md mb-4 focus:outline-none text-lg text-gray-600" 
              type="text" 
              placeholder="Nombre"
              name='rName'
              value={rName}
              onChange={handleRegisterInputChanges}
            />
            <input
              className="w-full p-3 rounded-md mb-4 focus:outline-none text-lg text-gray-600" 
              type="email" 
              placeholder="Email"
              name='rEmail'
              value={rEmail}
              onChange={handleRegisterInputChanges}
            />
            <input 
              className="w-full p-3 rounded-md mb-4 focus:outline-none text-lg" 
              type="password"
              placeholder="Password"
              name='rPassword'
              value={rPassword}
              onChange={handleRegisterInputChanges}
            />
            <input 
              className="w-full p-3 rounded-md mb-4 focus:outline-none text-lg" 
              type="password"
              placeholder="Repeat Password"
              name='rConfirmPassword'
              value={rConfirmPassword}
              onChange={handleRegisterInputChanges}
            />
            
            <button
              className="w-40 p-2 rounded-full bg-white text-lg text-black font-semibold hover:bg-gray-300 transition mt-6 focus:ring-4 focus:outline-none"
            >
              Login
            </button>
          </form>
      </div>
    </div>
  )
}

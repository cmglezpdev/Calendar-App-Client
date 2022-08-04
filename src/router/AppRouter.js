import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { startChecking } from "../actions/auth"
import { LoginScreen } from "../components/auth/LoginScreen"
import { CalendarScreen } from "../components/calendar/CalendarScreen"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"

export const AppRouter = () => {

  const dispatch = useDispatch();
  const { checking } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch( startChecking() );
  }, [dispatch])

  if( checking ) 
    return (<h1>Loading...</h1>)

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          } />
          <Route path="/" element={
            <PrivateRoute>
              <CalendarScreen />
            </PrivateRoute>
          } />
      </Routes>
    </BrowserRouter>
  )
}

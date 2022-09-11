import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getMorty } from '../../services'
import { createUser, resetUser, UserKey } from '../../redux/states/user'
import { PrivateRoutes, PublicRoutes, Roles } from '../../models'
import { clearLocalStorage } from '../../utilities'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    clearLocalStorage(UserKey)
    dispatch(resetUser())
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true })
  }, [])

  const signIn = async () => {
    try {
      const result = await getMorty()
      dispatch(createUser({ ...result, role: Roles.USER }))
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true })
    } catch (error) {}
  }

  return (
    <div>
      <h2>HOLA, ESTE ES EL LOGIN</h2>
      <button onClick={() => signIn()}>Login</button>
    </div>
  )
}

export default Login

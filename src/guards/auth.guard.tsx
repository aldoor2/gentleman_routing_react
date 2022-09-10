import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { PrivateRoutes, PublicRoutes } from '../models'
import { AppStore } from '../redux/store'

interface Props {
  isPrivated: boolean
}

const PrivateValidationFragment = <Outlet />
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.PRIVATE} />

export const AuthGuard = ({ isPrivated }: Props) => {
  const userState = useSelector((store: AppStore) => store.user)
  return userState.name ? (
    isPrivated ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  )
}

export default AuthGuard

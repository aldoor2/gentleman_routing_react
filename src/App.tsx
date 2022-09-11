import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'

import { AuthGuard, RoleGuard } from './guards'
import { PrivateRoutes, PublicRoutes, Roles } from './models'
import { RoutesWithNotFound } from './utilities'
import store from './redux/store'
import './App.css'

const Login = lazy(() => import('./pages/Login/Login'))
const Private = lazy(() => import('./pages/Private/Private'))
const Dashboard = lazy(() => import('./pages/Private/Dashboard/Dashboard'))

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<>Cargando...</>}>
        <Provider store={store}>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route
                path='/'
                element={<Navigate to={PrivateRoutes.PRIVATE} />}
              />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route element={<AuthGuard isPrivated={true} />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
              <Route element={<RoleGuard role={Roles.ADMIN} />}>
                <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </div>
  )
}

export default App

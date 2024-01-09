import { ReactNode } from 'react'
import NavigationMenubarComponent from '../NavbarComponent/NavbarComponent'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavigationMenubarComponent />
      {children}
    </div>
  )
}

export default Layout
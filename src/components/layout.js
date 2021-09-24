import Header from './header'
import Footer from './footer'
import * as style from '../styles/common.module.scss'

const Layout = (props) => {
  return(
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  )
}

export default Layout
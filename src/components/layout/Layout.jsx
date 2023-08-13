import Footer from "./Footer";
import Header from "./Header";

export default function Layout({children}) {
  return (
    <>
        <Header/>
          <div style={{minHeight:'700px'}}>{children}</div>
        <Footer/>
    </>
  )
}

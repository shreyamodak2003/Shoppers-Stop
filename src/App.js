import './App.css'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Allroutes from './router/Allroutes'

export default function App(){
    return(
        <>
        <Navbar/>
        <Allroutes/>
        <Footer/>
        </>
    )
}
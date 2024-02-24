import Footer from '../components/Footer/Footer'
import NavigationBar from '../components/Shared/NavigationBar/NavigationBar'
import { Outlet } from 'react-router-dom'

export default function HomePage() {
    return (
        <div>
            <NavigationBar />

            <div className='home_page_container'>
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}

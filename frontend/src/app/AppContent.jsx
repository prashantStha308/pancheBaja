import BottomPlayer from "../components/BottomPlayer"
import Navbar from "../components/Navbar"
import AppRoutes from "./App.routes"

const AppContent = () => {
  return (
    <main className=" min-h-screen flex flex-col gap-2 " >
        <Navbar />
        <div className="flex justify-center h-max" >
            <AppRoutes />
        </div>
        <div className="sticky bottom-0 left-0 right-0" >
          <BottomPlayer />
        </div>
    </main>
  )
}

export default AppContent
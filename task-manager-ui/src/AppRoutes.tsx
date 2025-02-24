import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import Timeline from "./components/timeline-board";


const AppRoutes = ()=> {
    return (
        <Routes>
            <Route 
                path="/" 
                element={<Layout><HomePage /></Layout>} 
            />
            <Route
                path="/Timeline" 
                element={<Layout><Timeline /></Layout>}
            />
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default AppRoutes;
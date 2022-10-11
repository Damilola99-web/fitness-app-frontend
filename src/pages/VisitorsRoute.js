import { Navigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

export const VisitorsRoute = ({children})=>{
    const {user} = useAuthContext()
    if (!user) {
        return children
    }
    else {
       return <Navigate to='/' />
    }
}
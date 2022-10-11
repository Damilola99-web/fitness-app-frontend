import { useContext } from "react"
import { WorkoutContext } from "../context/WorkoutContext"

export const useWorkouts = ()=>{
    const  context = useContext(WorkoutContext)

    if (!context) {
        throw Error('useworkout must be used inside the index.js')
    }

    return context
}
import Timer from "../../components/Timer"
import TimerHeader from "./TimerHeader"

const TimerPage = () => {
    return (
        <div className="w-screen h-screen ">
            <TimerHeader />
            <div className="h-[60vh] flex flex-col items-center justify-center">
                <Timer />
            </div>
        </div>

    )
}

export default TimerPage
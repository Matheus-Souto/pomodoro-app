import Timer from "../../components/Timer"
import TimerHeader from "./TimerHeader"

const TimerPage = () => {
    return (
        <div className="">
            <TimerHeader />
            <div className="h-[60vh] flex flex-col items-center justify-center mt-6">
                <Timer duration={1500}/>
            </div>
        </div>

    )
}

export default TimerPage
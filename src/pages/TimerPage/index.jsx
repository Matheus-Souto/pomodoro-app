import { useState } from "react";
import Timer from "../../components/Timer"
import TimerHeader from "./TimerHeader"

const TimerPage = () => {

    const [duration, setDuration] = useState(); // Valor inicial de 1500 segundos (25 minutos)

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
  };

    return (
        <div className="">
            <TimerHeader />
            <div className="h-[60vh] flex flex-col items-center justify-center mt-6">
                <Timer duration={duration} onDurationChange={handleDurationChange}/>
            </div>
        </div>

    )
}

export default TimerPage
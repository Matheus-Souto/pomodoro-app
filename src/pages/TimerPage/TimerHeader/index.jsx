const TimerHeader = () => {
    return (
        <div className="flex flex-col justify-center items-center ">
            <div className="w-9/12 max-w-[368px]">
                <h1 className="text-white font-bold text-center my-10">Pomodoro Timer</h1>
                <input className="w-full py-4 px-5 rounded-full bg-purple-900" type="text" placeholder="Digite o nome da tarefa" />
            </div>
        </div>
    )
}

export default TimerHeader
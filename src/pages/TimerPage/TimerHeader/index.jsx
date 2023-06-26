const TimerHeader = () => {
    return (
        <div className="container">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-white font-bold text-center my-10">Pomodoro Timer</h1>
                <input className="w-9/12 py-4 px-5 rounded-full bg-purple-900" type="text" placeholder="Digite o nome da tarefa" />
            </div>
        </div>
    )
}

export default TimerHeader
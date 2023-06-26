import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(1500); // 1500 segundos = 25 minutos
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // O pomodoro terminou, faça algo aqui, como exibir uma notificação ou reproduzir um som de alarme.
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, timeRemaining]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(1500);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='text-white font-bold text-4xl text-center my-6'>{formatTime(timeRemaining)}</div>
      {!isRunning ? (
        <button className='w-14 h-14 bg-cyan-400 rounded-full' onClick={handleStart}>Start</button>
      ) : (
        <button className='w-14 h-14 bg-cyan-400 rounded-full' onClick={handlePause}>Pause</button>
      )}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;

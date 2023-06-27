import React, { useState, useEffect } from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { IoPauseCircleSharp, IoPlayCircleSharp } from 'react-icons/io5'

const Timer = (props) => {
  
  const { duration } = props
  
  const [timeRemaining, setTimeRemaining] = useState(duration); // 1500 segundos = 25 minutos
  const [isRunning, setIsRunning] = useState(false);
  const [activeLink, setActiveLink] = useState('pomodoro')

  useEffect(() => {
    let timer;

    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // O pomodoro terminou, faça algo aqui, como exibir uma notificação ou reproduzir um som de alarme.
      setIsRunning(false)
      alert('Acabou')
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
    setTimeRemaining(duration);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const percent = ((timeRemaining / duration) * 100).toFixed(2)

  const handleLinkClick = (link) => {
    setActiveLink(link)
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='mb-10'>
        <a 
        src="#" 
        className={`text-white mr-3 py-2 px-4 cursor-pointer rounded ${activeLink === 'pomodoro' ? 'bg-white/40' : ''}`}
        onClick={() => handleLinkClick('pomodoro')}
        >
        Pomodoro
        </a>
        <a 
        src="#" 
        className={`text-white mr-3 py-2 px-4 cursor-pointer rounded ${activeLink === 'shortBreak' ? 'bg-white/40' : ''}`}
        onClick={() => handleLinkClick('shortBreak')}
        >Short Break</a>
        <a 
        src="#" 
        className={`text-white mr-3 py-2 px-4 cursor-pointer rounded ${activeLink === 'longBreak' ? 'bg-white/40' : ''}`}
        onClick={() => handleLinkClick('longBreak')}
        >Long Break</a>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <CircularProgressbar className='' value={percent} text={formatTime(timeRemaining)} />
        {!isRunning ? (
          <IoPlayCircleSharp className='w-14 h-14 cursor-pointer rounded-full mt-10' color='#22D3EE' onClick={handleStart} />
        ) : (
          <IoPauseCircleSharp className='w-14 h-14 cursor-pointer rounded-full mt-10' color='#22D3EE' onClick={handlePause} />
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;

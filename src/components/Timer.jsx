import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IoPauseCircleSharp, IoPlayCircleSharp } from 'react-icons/io5';
import { Howl, Howler } from 'howler';
import alarmSound from '../assets/bell.mp3';

const Timer = ({ duration = 10, onDurationChange }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [activeLink, setActiveLink] = useState('pomodoro');
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);

  const [percent, setPercent] = useState(0);
  

  const alarm = new Howl({
    src: [alarmSound],
    html5: true,
    onend: () => {
      setIsAlarmPlaying(false);
    },
  });

  useEffect(() => {
    let timer;

    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsRunning(false);
      setIsAlarmPlaying(true);
      alarm.play();
      showNotification();
      handleTimerEnd();
      if (onDurationChange) {
        onDurationChange(duration, percent);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, timeRemaining]);

  useEffect(() => {
    const calculatedPercent = (timeRemaining / duration) * 100;
    console.log(calculatedPercent)
    setPercent(calculatedPercent)
    // if (calculatedPercent == 0) {
    //   setPercent(calculatedPercent * 2);
    // } 
    
  }, [duration, timeRemaining]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveLink('pomodoro');
    onDurationChange(duration);

    setTimeRemaining(duration);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Tempo Acabou!', {
        body: 'Hora do descanso..',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Tempo Acabou!', {
            body: 'Hora do descanso..',
          });
        }
      });
    }
  };

  const handleTimerEnd = () => {
    switch (activeLink) {
      case 'pomodoro':
        handlePomodoroEnd();
        break;
      case 'shortBreak':
        handleShortBreakEnd();
        break;
      case 'longBreak':
        handleLongBreakEnd();
        break;
      default:
        break;
    }
  };

  const handlePomodoroEnd = () => {
    console.log('Pomodoro ended');
    setActiveLink('shortBreak')
    setTimeRemaining(5)
  };

  const handleShortBreakEnd = () => {
    console.log('Short break ended');
    // Lógica para quando o tempo do short break acabar
    setActiveLink('pomodoro')
    setTimeRemaining(duration);
  };

  const handleLongBreakEnd = () => {
    console.log('Long break ended');
    // Lógica para quando o tempo do long break acabar
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='mb-10'>
        <a
          href='#'
          className={`text-white mr-3 py-2 px-4 cursor-pointer rounded ${
            activeLink === 'pomodoro' ? 'bg-white/40' : ''
          }`}
          onClick={() => handleLinkClick('pomodoro')}
        >
          Pomodoro
        </a>
        <a
          href='#'
          className={`text-white mr-3 py-2 px-4 cursor-pointer rounded ${
            activeLink === 'shortBreak' ? 'bg-white/40' : ''
          }`}
          onClick={() => handleLinkClick('shortBreak')}
        >
          Short Break
        </a>
        <a
          href='#'
          className={`text-white mr-3 py-2 px-4 cursor-pointer rounded ${
            activeLink === 'longBreak' ? 'bg-white/40' : ''
          }`}
          onClick={() => handleLinkClick('longBreak')}
        >
          Long Break
        </a>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <CircularProgressbar className='' value={percent} text={formatTime(timeRemaining)} />
        {!isRunning ? (
          <IoPlayCircleSharp className='w-14 h-14 cursor-pointer rounded-full mt-10' color='#22D3EE' onClick={handleStart} />
        ) : (
          <IoPauseCircleSharp className='w-14 h-14 cursor-pointer rounded-full mt-10' color='#22D3EE' onClick={handlePause} />
        )}
        <button onClick={handleReset}>Reset</button>
        {isAlarmPlaying && <div>Alarm is playing</div>}
      </div>
    </div>
  );
};

export default Timer;

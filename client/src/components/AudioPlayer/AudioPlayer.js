import { useState, useRef, useEffect } from "react";
import rangeStyle from './AudioPlayer.module.css';
import { msToHumanTime } from "../../utlities/helper";
import { RED, GREEN, YELLOW, BLUE } from "../../config/constants";
import { BLUE_PLAYER, RED_PLAYER, GREEN_PLAYER, YELLOW_PLAYER, SMALL_PLAYER } from "../../tailwind/tailwind";

const AudioPlayer = ({source, color}) => {
    let style = null;
    let rangeStyles = [rangeStyle.VolumeSlider];

    switch(color) { 
        case YELLOW:
            style = YELLOW_PLAYER;
            rangeStyles.push(rangeStyle.YellowPlayer);
            break;
        case RED:
            style = RED_PLAYER;
            rangeStyles.push(rangeStyle.RedPlayer);
            break;
        case GREEN:
            style = GREEN_PLAYER;
            rangeStyles.push(rangeStyle.GreenPlayer);
            break;
        case BLUE:
            style = BLUE_PLAYER;
            rangeStyles.push(rangeStyle.BluePlayer);
            break;
        default:
            style = SMALL_PLAYER;
            rangeStyles.push(rangeStyle.BluePlayer);
            break;
    }

    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentPlayTime, setCurrentPlayTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [prevVolume, setPrevVolume] = useState(1);        // use this for mute to go back to the inital volume before we muted.

    const audioRef = useRef(new Audio(source));
    const timerRef = useRef();

    audioRef.current.addEventListener('ended', () => {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsFinished(true);
    });

    useEffect(() => {
        audioRef.current.addEventListener('loadedmetadata', e => {
            setDuration(audioRef.current.duration);
            setVolume(audioRef.current.volume);
        });
    }, []);

    useEffect(() => {
        if (isPlaying) {
            if (isFinished) setCurrentPlayTime(0);
            setIsFinished(false);
            audioRef.current.play();
            timerRef.current = setInterval(() => {
                setCurrentPlayTime(currentPlayTime => currentPlayTime + 100);
            }, 100);
        } else {
            audioRef.current.pause();
            clearInterval(timerRef.current);
        }
    }, [isPlaying]);

    useEffect(() => {
        if (isMuted) {
            setPrevVolume(audioRef.current.volume);
            audioRef.current.volume = 0;
            setVolume(0);
        } else {
            audioRef.current.volume = prevVolume;
            setVolume(prevVolume);
        }
    }, [isMuted]);

    useEffect(() => {
        if (volume > 0) setIsMuted(false);
    }, [volume]);

    const changeVolumeHandler = e => {
        setVolume(e.target.value/100);
        audioRef.current.volume = e.target.value/100;
    }

    const scrubPlayerHandler = e => {
        setIsPlaying(false);
        if (audioRef.current.duration - e.target.value < 0.01) { // the interval is small enough that we can consider as a finished track.
            setIsFinished(true);
            audioRef.current.currentTime = audioRef.current.duration;
        } else {
            audioRef.current.currentTime = e.target.value;
            setIsFinished(false);
        }
        setCurrentPlayTime(e.target.value*1000);
    }

    return (
        <div className={style}>
            <div className="flex gap-x-2 mx-1 items-center">
                <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center">
                    <span className="!text-4xl material-icons">{isPlaying ? "pause" : "play_arrow"}</span>
                </button>
                <input 
                    type="range" 
                    className={rangeStyles.join(" ")} 
                    max={duration} 
                    value={currentPlayTime/1000}
                    min={0}
                    step={0.0001} 
                    onChange={e => scrubPlayerHandler(e)}
                    />
                <p className="justify-self-center">{msToHumanTime(currentPlayTime)}</p>
            </div>
            <div className="flex ">
                <button onClick={() => setIsMuted(!isMuted)}>
                    <span className="material-icons !text-3xl">{isMuted || volume === 0 ? "volume_mute" : "volume_up"}</span>
                </button>
                <input 
                    type="range"
                    className={rangeStyles.join(" ")} 
                    max={100} 
                    value={volume*100} 
                    min={0} 
                    step={1} 
                    onChange={e => changeVolumeHandler(e)}/>
            </div>
        </div>
    );
}

export default AudioPlayer;
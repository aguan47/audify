import { useEffect, useState } from 'react';
import { msToHumanTime } from '../../utlities/helper';

let mediaRecorder = null;
let audioChunks = [];
const Recorder = () => {

    const [recording, setRecording] = useState(false);
    const [time, setTime] = useState(0);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        if (!recording) return;
        
        // Start recording time
        let newInterval = setInterval(() => {
            setTime(time => time + 1000);
        }, 1000);
        return () => clearInterval(newInterval);
    }, [recording]);

    const recordAudio = async () => {
        setTime(0);
        setAudio(null);
        // Create an audio stream 
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        setRecording(true);

        // Start recording the audio
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        // If we are currently recording, we will save the audio chunks by using "dataavailable" event handler
        mediaRecorder.addEventListener("dataavailable", e => {
            audioChunks.push(e.data);
        });
    }   

    const stopRecording = async () => {
        await mediaRecorder.stop();
        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);

            // Clear the chunks that we've recorded.
            audioChunks.length = 0;
            setRecording(false);
        });
    }

    let buttonClass = "bg-primary-btn text-white hover:bg-secondary-btn transition cursor-pointer px-5 py-3 my-2 rounded-full font-bold";
    let buttonAction = recordAudio;
    let buttonText = "Record"


    if (recording) {
        buttonClass = "bg-red-500 text-white hover:bg-red-600 transition cursor-pointer px-5 py-3 my-2 rounded-full font-bold";
        buttonAction = stopRecording;
        buttonText = `Stop`;
    }

    return (
        <>
            <>
                { 
                    audio && <audio controls preload='auto'>
                        <source src={audio} type="audio/ogg"/>
                        Not working
                    </audio>
                }
            </>
             <button 
                className={buttonClass}
                onClick={() => buttonAction()}
            >{buttonText} {recording && msToHumanTime(time)}</button>
        </>
    );
}

export default Recorder;
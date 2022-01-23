import { useState } from 'react';

let mediaRecorder = null;
let audioChunks = [];
let audioRecordings = [];
const Recorder = () => {

    const [recording, setRecording] = useState(false);


    const recordAudio = async () => {
        setRecording(true);
        // Create an audio stream 
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});

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
            audioRecordings.push(audioUrl);

            // Clear the chunks that we've recorded.
            audioChunks.length = 0;
            setRecording(false);
        });
    }

    let buttonClass = "bg-blue-400 rounded m-5 px-2 py-3 text-white hover:bg-blue-500 transition";
    let buttonAction = recordAudio;
    let buttonText = "Record"


    if (recording) {
        buttonClass = "bg-red-400 rounded m-5 px-2 py-3 text-white hover:bg-red-500 transition";
        buttonAction = stopRecording;
        buttonText = "Stop";
    }

    return (
        <>
             <button 
                className={buttonClass}
                onClick={() => buttonAction()}
            >{buttonText}</button>
            <>
                {
                    audioRecordings && audioRecordings.map((audio, index) => {
                        return (
                            <audio controls>
                                <source src={audio} type="audio/mpeg"/>
                            </audio>
                        );
                    })
                }
            </>
        </>
    );
}

export default Recorder;
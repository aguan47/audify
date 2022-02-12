import { render, screen } from '@testing-library/react';
import AudioPlayer from '../AudioPlayer';

const MockAudioPlayer = ({color}) => {
    return(
        <AudioPlayer source={"./sample_audio.mp3"} color={color}/>
    );
}


describe("AudioPlayer", () => {
    it("should render the audio player", () => {
        render(<MockAudioPlayer color={"RED"}/>);
        expect(screen.getByText("pause")).toBeInTheDocument();
    });
});
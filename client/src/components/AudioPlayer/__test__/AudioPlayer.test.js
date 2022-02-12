import { fireEvent, render, screen } from '@testing-library/react';
import AudioPlayer from '../AudioPlayer';
import sampleAudio from './sample_audio.mp3'

const MockAudioPlayer = ({color}) => {
    return(
        <AudioPlayer source={sampleAudio} color={color}/>
    );
}


describe("AudioPlayer: Rendering the proper parts", () => {
    it("should render the play arrow", () => {
        render(<MockAudioPlayer color={"RED"}/>);
        expect(screen.getByText("play_arrow")).toBeInTheDocument();
    });

    it("should render the pause arrow", () => {
        render(<MockAudioPlayer color={"RED"}/>);
        fireEvent.click(screen.getByText("play_arrow"));
        expect(screen.getByText("pause")).toBeInTheDocument();
    });

    it("should render the playback bar", () => {
        render(<MockAudioPlayer color={"RED"}/>);
        expect(screen.getByTestId("playback-bar")).toBeInTheDocument();
    });

    it("should render the volume up button", () => {
        render(<MockAudioPlayer color={"RED"}/>);
        expect(screen.getByText("volume_up")).toBeInTheDocument();
    });

    it("should render the muted volume button", () => {
        render(<MockAudioPlayer color={"RED"}/>);
        fireEvent.click(screen.getByText("volume_up"));
        expect(screen.getByText("volume_mute")).toBeInTheDocument();
    });

    it("should render the volume bar", () => {
        render(<MockAudioPlayer color={"RED"}/>);
        expect(screen.getByTestId("volume-bar")).toBeInTheDocument();
    });

    it("should render the duration text", () => {
        render(<MockAudioPlayer color={"RED"}/>);
        expect(screen.getByText("00:00:00")).toBeInTheDocument();
    });

    it("should render the audio player to be red", () => {
        render(<MockAudioPlayer color={"RED"}/>);
        expect(screen.getByTestId("volume-bar")).toHaveClass("RedPlayer");
    });

    it("should render the audio player to be blue", () => {
        render(<MockAudioPlayer color={"BLUE"}/>);
        expect(screen.getByTestId("volume-bar")).toHaveClass("BluePlayer");
    });

    it("should render the audio player to be green", () => {
        render(<MockAudioPlayer color={"GREEN"}/>);
        expect(screen.getByTestId("volume-bar")).toHaveClass("GreenPlayer");
    });

    it("should render the audio player to be yellow", () => {
        render(<MockAudioPlayer color={"YELLOW"}/>);
        expect(screen.getByTestId("volume-bar")).toHaveClass("YellowPlayer");
    });
});
import { fireEvent, render, screen } from '@testing-library/react';
import Recorder from '../Recorder';


const mockSetAudioJournal = jest.fn();
const mockMedia = {
    getUserMedia: jest.fn().mockImplementation(() => {
        Promise.resolve(("stream"));
    })
}

const mockMediaRecorder = {
    start: jest.fn(),
    ondataavailable: jest.fn(),
    onerror: jest.fn(),
    state: "",
    stop: jest.fn(),
    addEventListener: jest.fn()
};

global.navigator.mediaDevices = mockMedia;


const MockRecorder = ({shouldOutput}) => {
    return(
        <Recorder
            setAudioJournal={mockSetAudioJournal}
            shouldOutput={shouldOutput}
        />
    )
}


describe("Recorder: Check if its properly rendered", () => {
    beforeEach(() => {
        window.MediaRecorder = (jest.fn()).mockImplementation(
          () => mockMediaRecorder,
        );
    });

    it("should render the 'record' button if we're not recording yet", () => {
        render(<MockRecorder shouldOutput={false}/>);
        expect(screen.getByText("Record")).toBeInTheDocument();
    });

    it("should render the 'stop' button if we're recording yet", async () => {
        render(<MockRecorder shouldOutput={false}/>);
        fireEvent.click(screen.getByText("Record"));
        expect(await screen.findByText("Stop 00:00:00")).toBeInTheDocument();
    });
}); 

describe("Recorder: Should record if clicked", () => {
    beforeEach(() => {
        window.MediaRecorder = (jest.fn()).mockImplementation(
          () => mockMediaRecorder,
        );
    });

    it("should record once we click the record button", () => {
        render(<MockRecorder shouldOutput={true}/>);
        fireEvent.click(screen.getByText("Record"));
        expect(mockSetAudioJournal).toBeCalled();
    });

    it("should stop recording once we click the record button", async () => {
        render(<MockRecorder shouldOutput={true}/>);
        fireEvent.click(screen.getByText("Record"));
        fireEvent.click(await screen.findByText("Stop 00:00:00"));
        expect(mockMediaRecorder.stop).toHaveBeenCalledTimes(1);
    });
}); 
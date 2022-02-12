import { fireEvent, render, screen } from '@testing-library/react';
import Journal from '../Journal';

const createMockDates = (daysFromToday) => {
    const date = new Date();
    date.setDate(date.getDate() - daysFromToday);
    return date.toString();
}


const mockTitle = "Journal 1";
const mockCaption = "Caption 1";
const mockAudioSource = "http://localhost/sample.mp3";
const mockCreateDate = createMockDates(5);
const mockColor = "RED";
const mockClickHandler = jest.fn();
const mockDeleteHandler = jest.fn();
const mockEditHandler = jest.fn();

const MockJournal = ({withLastModified, showOptions}) => {
    let mockLastModified = null;
    if(withLastModified) mockLastModified = createMockDates(1);
    return(
        <Journal
            title={mockTitle}
            caption={mockCaption}
            audioSource={mockAudioSource}
            createDate={mockCreateDate}
            lastModified={mockLastModified}
            color={mockColor}
            showOptions={showOptions}
            clickHandler={mockClickHandler}
            deleteHandler={mockDeleteHandler}
            editHandler={mockEditHandler}
        />
    );
}

describe("Journal: Checking if the elements are rendered properly", () => {
    it("should render the journal div itself", () => {
        render(<MockJournal withLastModified={false} showOptions={false}/>);
        expect(screen.getByTestId("journal")).toBeInTheDocument();
    });

    it("should render the title", () => {
        render(<MockJournal withLastModified={false} showOptions={false}/>);
        expect(screen.getByText(mockTitle)).toBeInTheDocument();
    });

    it("should render the caption", () => {
        render(<MockJournal withLastModified={false} showOptions={false}/>);
        expect(screen.getByText(mockCaption)).toBeInTheDocument();
    });

    it("should render the create date (per moment js)", () => {
        render(<MockJournal withLastModified={false} showOptions={false}/>);
        expect(screen.getByText(/5 days ago/)).toBeInTheDocument();
    });

    it("should render the last modified date (per moment js)", () => {
        render(<MockJournal withLastModified={true} showOptions={false}/>);
        expect(screen.getByText(/last modified a day ago/i)).toBeInTheDocument();
    });

    it("should render the play arrow", () => {
        render(<MockJournal withLastModified={true} showOptions={false}/>);
        expect(screen.getByText("play_arrow")).toBeInTheDocument();
    });

    it("should render the playback bar", () => {
        render(<MockJournal withLastModified={true} showOptions={false}/>);
        expect(screen.getByTestId("playback-bar")).toBeInTheDocument();
    });

    it("should render the volume up button", () => {
        render(<MockJournal withLastModified={true} showOptions={false}/>);
        expect(screen.getByText("volume_up")).toBeInTheDocument();
    });

    it("should render the volume bar", () => {
        render(<MockJournal withLastModified={true} showOptions={false}/>);
        expect(screen.getByTestId("volume-bar")).toBeInTheDocument();
    });

    it("should render the duration text", () => {
        render(<MockJournal withLastModified={true} showOptions={false}/>);
        expect(screen.getByText("00:00:00")).toBeInTheDocument();
    });

    it("should render the audio player to be red", () => {
        render(<MockJournal withLastModified={true} showOptions={false}/>);
        expect(screen.getByTestId("volume-bar")).toHaveClass("RedPlayer");
    });

    it("should render the word Edit Journal correctly", () => {
        render(<MockJournal withLastModified={true} showOptions={true}/>);
        expect(screen.getByText("Edit journal")).toBeInTheDocument();
    });

    it("should render the word Delete journal correctly", () => {
        render(<MockJournal withLastModified={true} showOptions={true}/>);
        expect(screen.getByText("Delete journal")).toBeInTheDocument();
    });

    it("should render the word Download correctly", () => {
        render(<MockJournal withLastModified={true} showOptions={true}/>);
        expect(screen.getByText("Download")).toBeInTheDocument();
    });
});

describe("Journal: Check if the mock functions are called", () => {
    it("should call the clickHandler", () => {
        render(<MockJournal withLastModified={false} showOptions={false}/>);
        fireEvent.click(screen.getByTestId("journal"));
        expect(mockClickHandler).toBeCalled();
    });

    it("should call the editHandler", () => {
        render(<MockJournal withLastModified={false} showOptions={true}/>);
        fireEvent.click(screen.getByText("Edit journal"));
        expect(mockEditHandler).toBeCalled();
    });

    it("should call the deleteHandler", () => {
        render(<MockJournal withLastModified={false} showOptions={true}/>);
        fireEvent.click(screen.getByText("Delete journal"));
        expect(mockDeleteHandler).toBeCalled();
    });
});
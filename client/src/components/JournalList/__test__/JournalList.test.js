import { fireEvent, render, screen } from '@testing-library/react';
import JournalList from '../JournalList';

const createMockDates = (daysFromToday) => {
    const date = new Date();
    date.setDate(date.getDate() - daysFromToday);
    return date.toString();
}

const mockJournals = [
    {
        "journal_id": "1",
        "title": "Testing",
        "caption": "Testing this again.",
        "create_date": createMockDates(5),
        "journal_path": "http://localhost:5000/audio/1643995786783.mp3",
        "color": "GREEN",
        "is_edited": 0,
        "last_modified": null
    }
]

const mockSetShowDeleteModal = jest.fn();
const mockSetEditJournalModal = jest.fn();
const mockSetCurrentJournal = jest.fn();


const MockJournalList = () => {
    return(
        <JournalList
            userJournals={mockJournals}
            currentJournal={mockJournals[0]}
            setCurrentJournal={mockSetCurrentJournal}
            setShowDeleteModal={mockSetShowDeleteModal}
            setEditJournalModal={mockSetEditJournalModal}
        />
    );
}


describe("JournalList: Properly render journal 1", () => {
    it("should render the journal title", () => {
        render(<MockJournalList/>);
        expect(screen.getByText(mockJournals[0].title)).toBeInTheDocument();
    });

    it("should render the caption title", () => {
        render(<MockJournalList/>);
        expect(screen.getByText(mockJournals[0].caption)).toBeInTheDocument();
    });

    it("should render the create date", () => {
        render(<MockJournalList/>);
        expect(screen.getByText(/5 days ago/i)).toBeInTheDocument();
    });

    it("should be a green journal", () => {
        render(<MockJournalList/>);
        expect(screen.getByTestId("volume-bar")).toHaveClass("GreenPlayer");
    });

    it("should render the play arrow", () => {
        render(<MockJournalList/>);
        expect(screen.getByText("play_arrow")).toBeInTheDocument();
    });

    it("should render the playback bar", () => {
        render(<MockJournalList/>);
        expect(screen.getByTestId("playback-bar")).toBeInTheDocument();
    });

    it("should render the volume up button", () => {
        render(<MockJournalList/>);
        expect(screen.getByText("volume_up")).toBeInTheDocument();
    });

    it("should render the volume bar", () => {
        render(<MockJournalList/>);
        expect(screen.getByTestId("volume-bar")).toBeInTheDocument();
    });

    it("should render the duration text", () => {
        render(<MockJournalList/>);
        expect(screen.getByText("00:00:00")).toBeInTheDocument();
    });

    it("should render the word Edit Journal correctly", () => {
        render(<MockJournalList/>);
        expect(screen.getByText("Edit journal")).toBeInTheDocument();
    });

    it("should render the word Delete journal correctly", () => {
        render(<MockJournalList/>);
        expect(screen.getByText("Delete journal")).toBeInTheDocument();
    });

    it("should render the word Download correctly", () => {
        render(<MockJournalList/>);
        expect(screen.getByText("Download")).toBeInTheDocument();
    });
});

describe("JournalList: Check if the mock functions are called", () => {
    it("should call the editHandler", () => {
        render(<MockJournalList/>);
        fireEvent.click(screen.getByText("Edit journal"));
        expect(mockSetEditJournalModal).toBeCalled();
    });

    it("should call the deleteHandler", () => {
        render(<MockJournalList/>);
        fireEvent.click(screen.getByText("Delete journal"));
        expect(mockSetShowDeleteModal).toBeCalled();
    });
});
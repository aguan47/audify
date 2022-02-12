import { fireEvent, render, screen } from '@testing-library/react';
import JournalOptions from '../JournalOptions';

const mockDeleteJournalHandler = jest.fn();
const mockEditJournalHandler = jest.fn();
const mockJournalLink = "http://localhost/sample.mp3";

const MockJournalOptions = () => {
    return(
        <JournalOptions
            deleteJournalHandler={mockDeleteJournalHandler}
            editJournalHandler={mockEditJournalHandler}
            journalLink={mockJournalLink}
        />
    );
}

describe("JournalOptions: Properly render the component", () => {
    it("should render the word Edit Journal correctly", () => {
        render(<MockJournalOptions/>);
        expect(screen.getByText("Edit journal")).toBeInTheDocument();
    });

    it("should render the icon for Edit Journal correctly", () => {
        render(<MockJournalOptions/>);
        expect(screen.getByText("edit")).toBeInTheDocument();
    });

    it("should render the word Delete journal correctly", () => {
        render(<MockJournalOptions/>);
        expect(screen.getByText("Delete journal")).toBeInTheDocument();
    });

    it("should render the icon for Delete journal correctly", () => {
        render(<MockJournalOptions/>);
        expect(screen.getByText("delete")).toBeInTheDocument();
    });

    it("should render the word Download correctly", () => {
        render(<MockJournalOptions/>);
        expect(screen.getByText("Download")).toBeInTheDocument();
    });

    it("should render the icon for Download correctly", () => {
        render(<MockJournalOptions/>);
        expect(screen.getByText("file_download")).toBeInTheDocument();
    });
});

describe("JournalOptions: Edit and delete journals are clickable", () => {
    it("should be able to click the edit journal button", () => {
        render(<MockJournalOptions/>);
        fireEvent.click(screen.getByText("Edit journal"));
        expect(mockEditJournalHandler).toBeCalled();
    });

    it("should be able to click the delete journal button", () => {
        render(<MockJournalOptions/>);
        fireEvent.click(screen.getByText("Delete journal"));
        expect(mockDeleteJournalHandler).toBeCalled();
    });
});

describe("JournalOptions: Should be able to download", () => {
    it("should be able to click the edit journal button", () => {
        render(<MockJournalOptions/>);
        expect(screen.getByText("Download").parentElement.href).toBe(mockJournalLink);
    });
});
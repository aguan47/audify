import { fireEvent, render, screen } from '@testing-library/react';
import JournalModal from '../JournalModal';


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

const mockClickHandler = jest.fn();
const mockSetJournals = jest.fn();
const mockSetIsEdit = jest.fn();
const mockJournal = {
    "journal_id": "1",
    "title": "Testing",
    "caption": "Testing this again.",
    "create_date": new Date(),
    "journal_path": "http://localhost:5000/audio/1643995786783.mp3",
    "color": "GREEN",
    "is_edited": 0,
    "last_modified": null
}


const MockJournalModal = ({show, shouldFilter, isEdit, currentJournal}) => {
    return(
        <JournalModal
            show={show}
            clickHandler={mockClickHandler}
            journals={[]}
            setJournals={mockSetJournals}
            allJournalsRef={{current: []}}
            shouldColorFilter={shouldFilter}
            filterColor={"BLUE"}
            isAscending={true}
            isEdit={isEdit}
            setIsEdit={mockSetIsEdit}
            currentJournal={currentJournal}
        />
    );
}

describe("JournalModal: Properly rendering when creating a journal", () => {
    beforeEach(() => {
        window.MediaRecorder = (jest.fn()).mockImplementation(
          () => mockMediaRecorder,
        );
    });

    it("should render the 'Create a new journal' as title of the modal", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
        expect(screen.getByText("Create a new journal")).toBeInTheDocument();
    });

    it("should render the title input as empty", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
        expect(screen.getByPlaceholderText("Enter journal title").value).toBe("");
    });

    it("should render the caption input as empty", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
        expect(screen.getByPlaceholderText("Enter journal caption").value).toBe("");
    });

    it("should render the red color", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
        const redColor = screen.getByText(/red/i);
        expect(redColor).toBeInTheDocument();
    });

    it("should render the blue color", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
        const blueColor = screen.getByText(/blue/i);
        expect(blueColor).toBeInTheDocument();
    });

    it("should render the green color", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
        const greenColor = screen.getByText(/green/i);
        expect(greenColor).toBeInTheDocument();
    });

    it("should render the yellow color", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
        const yellowColor = screen.getByText(/yellow/i);
        expect(yellowColor).toBeInTheDocument();
    });

    it("should render the record button", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
        expect(screen.getByText("Record")).toBeInTheDocument();
    });

    it("should render the stop button after clicking the record button", async () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
        fireEvent.click(screen.getByText("Record"));
        expect(await screen.findByText("Stop 00:00:00")).toBeInTheDocument();
    });

    it("should render the 'Save journal' button", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
        expect(screen.getByText("Save journal")).toBeInTheDocument();
    });

    it("should render the toast after clicking the 'save journal' button", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
        fireEvent.click(screen.getByText("Save journal"));
        expect(screen.getByTestId("toast")).toBeInTheDocument();
    });
});

describe("JournalModal: Properly rendering when editing a journal", () => {
    beforeEach(() => {
        window.MediaRecorder = (jest.fn()).mockImplementation(
          () => mockMediaRecorder,
        );
    });

    it("should render the 'Edit your journal' as title of the modal", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={true} currentJournal={mockJournal}/>);
        expect(screen.getByText("Edit your journal")).toBeInTheDocument();
    });

    it("should render the title input as the one given in the mocks", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={true} currentJournal={mockJournal}/>);
        expect(screen.getByPlaceholderText("Enter journal title").value).toBe(mockJournal.title);
    });

    it("should render the caption input as the one given in the mocks", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={true} currentJournal={mockJournal}/>);
        expect(screen.getByPlaceholderText("Enter journal caption").value).toBe(mockJournal.caption);
    });

    it("should render the red color", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={true} currentJournal={mockJournal}/>);
        const redColor = screen.getByText(/red/i);
        expect(redColor).toBeInTheDocument();
    });

    it("should render the blue color", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={true} currentJournal={mockJournal}/>);
        const blueColor = screen.getByText(/blue/i);
        expect(blueColor).toBeInTheDocument();
    });

    it("should render the green color", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={true} currentJournal={mockJournal}/>);
        const greenColor = screen.getByText(/green/i);
        expect(greenColor).toBeInTheDocument();
    });

    it("should render the yellow color", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={true} currentJournal={mockJournal}/>);
        const yellowColor = screen.getByText(/yellow/i);
        expect(yellowColor).toBeInTheDocument();
    });

    it("should render the record button", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={true} currentJournal={mockJournal}/>);
        expect(screen.getByText("Record")).toBeInTheDocument();
    });

    it("should render the 'Save journal' button", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={true} currentJournal={mockJournal}/>);
        expect(screen.getByText("Save journal")).toBeInTheDocument();
    });

    it("should render the toast after clicking the 'save journal' button", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
        fireEvent.click(screen.getByText("Save journal"));
        expect(screen.getByTestId("toast")).toBeInTheDocument();
    });
});

describe("JournalModal: Testing if the inputs work when creating a journal", () => {
    beforeEach(() => {
        jest.resetModules();
        window.MediaRecorder = (jest.fn()).mockImplementation(
          () => mockMediaRecorder,
        );
    });

    it("should show the title to be set", () => {
        render(<MockJournalModal show={true} isEdit={false}/>);
        fireEvent.change(screen.getByPlaceholderText("Enter journal title"), {target:{value: "Journal title"}});
        expect(screen.getByPlaceholderText("Enter journal title").value).toBe("Journal title");
    });

    it("should show the caption to be set", () => {
        render(<MockJournalModal show={true} isEdit={false}/>);
        fireEvent.change(screen.getByPlaceholderText("Enter journal caption"), {target:{value: "Journal caption"}});
        expect(screen.getByPlaceholderText("Enter journal caption").value).toBe("Journal caption");
    });

    // it("should render the stop button after clicking the record button", async () => {
    //     render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
    //     fireEvent.click(screen.getByText("Record"));
    //     expect(await screen.findByText("Stop 00:00:00")).toBeInTheDocument();
    // });

    //
    it("should be able to submit", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
        fireEvent.change(screen.getByPlaceholderText("Enter journal title"), {target:{value: "Journal title"}});
        fireEvent.change(screen.getByPlaceholderText("Enter journal caption"), {target:{value: "Journal caption"}});
        fireEvent.click(screen.getByText("Save journal"));
        expect(screen.getByTestId("toast")).toBeInTheDocument();
    });
});

describe("JournalModal: Testing if the inputs work when editing a journal", () => {
    beforeEach(() => {
        jest.resetModules();
        window.MediaRecorder = (jest.fn()).mockImplementation(
          () => mockMediaRecorder,
        );
    });

    it("should show the title to be set", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={true} currentJournal={mockJournal}/>);
        fireEvent.change(screen.getByPlaceholderText("Enter journal title"), {target:{value: "Journal title"}});
        expect(screen.getByPlaceholderText("Enter journal title").value).toBe("Journal title");
    });

    it("should show the caption to be set", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={true} currentJournal={mockJournal}/>);
        fireEvent.change(screen.getByPlaceholderText("Enter journal caption"), {target:{value: "Journal caption"}});
        expect(screen.getByPlaceholderText("Enter journal caption").value).toBe("Journal caption");
    });

    // it("should render the stop button after clicking the record button", async () => {
    //     render(<MockJournalModal show={true} shouldFilter={false} isEdit={false} />);
    //     fireEvent.click(screen.getByText("Record"));
    //     expect(await screen.findByText("Stop 00:00:00")).toBeInTheDocument();
    // });

    //
    it("should be able to submit", () => {
        render(<MockJournalModal show={true} shouldFilter={false} isEdit={true} currentJournal={mockJournal}/>);
        fireEvent.change(screen.getByPlaceholderText("Enter journal title"), {target:{value: "Journal title"}});
        fireEvent.change(screen.getByPlaceholderText("Enter journal caption"), {target:{value: "Journal caption"}});
        fireEvent.click(screen.getByText("Save journal"));
        expect(screen.getByTestId("toast")).toBeInTheDocument();
    });
});
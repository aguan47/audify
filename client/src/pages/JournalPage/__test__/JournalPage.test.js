import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../../../context/UserContext';
import JournalPage from '../JournalPage';

const mockUserContext = {
    name: "First name Last name",
    isAuth: true,
    accessToken: '',
    refreshToken: ''
}

const MockJournalPage = () => {
    return(
        <BrowserRouter>
            <UserContext.Provider value={{user: mockUserContext}}>
                <JournalPage/>
            </UserContext.Provider>
        </BrowserRouter>
    )
}


describe("Journal Page: It should properly render the components", () => {
    it("should render the journals tab properly", () => {
        render(<MockJournalPage/>);
        expect(screen.getByText("Journals")).toBeInTheDocument();
    });

    it("should render the profile tab properly", () => {
        render(<MockJournalPage/>);
        expect(screen.getByText("Profile")).toBeInTheDocument();
    });

    it("should render the Log out tab properly", () => {
        render(<MockJournalPage/>);
        expect(screen.getByText("Log out")).toBeInTheDocument();
    });

    it("should render the Sort journals tab properly", () => {
        render(<MockJournalPage/>);
        expect(screen.getByText("Sort journals")).toBeInTheDocument();
    });

    it("should render the Create new journal tab properly", () => {
        render(<MockJournalPage/>);
        expect(screen.getByText("Create new journal")).toBeInTheDocument();
    });
}); 

describe("Journal Page: Validating inputs", () => {
    it("should limit the title input to 50 characters", () => {
        const sixtyCharTitle = "Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.";
        render(<MockJournalPage/>);
        fireEvent.click(screen.getByText("Create new journal"));
        fireEvent.change(screen.getByPlaceholderText("Enter journal title"), {target: {value: sixtyCharTitle}});
        expect(screen.getByPlaceholderText("Enter journal title").value).toBe("");
    });

    it("should allow inputs of title input up to 50 characters", () => {
        const fiftyCharTitle = "Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.";
        render(<MockJournalPage/>);
        fireEvent.click(screen.getByText("Create new journal"));
        fireEvent.change(screen.getByPlaceholderText("Enter journal title"), {target: {value: fiftyCharTitle}});
        expect(screen.getByPlaceholderText("Enter journal title").value).toBe(fiftyCharTitle);
    });

    it("should limit the caption input to 150 characters", () => {
        const twoHundredCharText = "Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.";
        render(<MockJournalPage/>);
        fireEvent.click(screen.getByText("Create new journal"));
        fireEvent.change(screen.getByPlaceholderText("Enter journal caption"), {target: {value: twoHundredCharText}});
        expect(screen.getByPlaceholderText("Enter journal caption").value).toBe("");
    });

    it("should allow inputs of caption input up to 150 characters", () => {
        const oneFiftyCharText = "Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.Journal 1.";
        render(<MockJournalPage/>);
        fireEvent.click(screen.getByText("Create new journal"));
        fireEvent.change(screen.getByPlaceholderText("Enter journal caption"), {target: {value: oneFiftyCharText}});
        expect(screen.getByPlaceholderText("Enter journal caption").value).toBe(oneFiftyCharText);
    });
});

describe("Journal Page: It should add journals", () => {
    it("should open the journal modal tab", () => {
        render(<MockJournalPage/>);
        fireEvent.click(screen.getByText("Create new journal"));
        expect(screen.getByText("Create a new journal")).toBeInTheDocument();
    });

    it("should add values in the title input", () => {
        render(<MockJournalPage/>);
        fireEvent.click(screen.getByText("Create new journal"));
        fireEvent.change(screen.getByPlaceholderText("Enter journal title"), {target: {value: "Journal 1"}});
        expect(screen.getByPlaceholderText("Enter journal title").value).toBe("Journal 1");
    });

    it("should add values in the caption input", () => {
        render(<MockJournalPage/>);
        fireEvent.click(screen.getByText("Create new journal"));
        fireEvent.change(screen.getByPlaceholderText("Enter journal caption"), {target: {value: "Caption 1"}});
        expect(screen.getByPlaceholderText("Enter journal caption").value).toBe("Caption 1");
    });

    it("should submit", () => {
        render(<MockJournalPage/>);
        fireEvent.click(screen.getByText("Create new journal"));
        fireEvent.change(screen.getByPlaceholderText("Enter journal title"), {target: {value: "Journal 1"}});
        fireEvent.change(screen.getByPlaceholderText("Enter journal caption"), {target: {value: "Caption 1"}});
        fireEvent.click(screen.getByText("Save journal"));
        expect(screen.getByPlaceholderText("Enter journal title").value).toBe("");
    });
});
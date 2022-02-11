import { fireEvent, render, screen } from '@testing-library/react';
import ConfirmationModal from '../ConfirmationModal';

const mockCloseModalHandler = jest.fn();
const mockDisagreeHandler = jest.fn();
const mockAgreeHandler = jest.fn();

const MockConfirmationModal = ({show, title, body, disagreeBtnText, agreeBtnText}) => {
    return(
        <ConfirmationModal
            show={show}
            title={title || ""}
            body={body || ""}
            clickHandler={mockCloseModalHandler}
            disagreeBtnText={disagreeBtnText || ""}
            agreeBtnText={agreeBtnText || ""}
            disagreeHandler={mockDisagreeHandler}
            agreeHandler={mockAgreeHandler}
        />
    );   
}



describe("ConfirmationModal: Showing modal", () => {
    it("should show the confirmation modal", () => {
        render(<MockConfirmationModal show={true}/>);
        expect(screen.getByText(/yes/i)).toBeInTheDocument();
    });

    it("should NOT show the confirmation modal", () => {
        render(<MockConfirmationModal show={false}/>);
        expect(screen.queryByText(/yes/i)).not.toBeInTheDocument();
    });
});

describe("ConfirmationModal: Rendering props", () => {
    it("should show the given title", () => {
        render(<MockConfirmationModal show={true} title={"Hello World"}/>);
        expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    it("should show the given body", () => {
        render(<MockConfirmationModal show={true} body={"Body"}/>);
        expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("should show the given disagree button text", () => {
        render(<MockConfirmationModal show={true} disagreeBtnText={"Disagree"}/>);
        expect(screen.getByText("Disagree")).toBeInTheDocument();
    });

    it("should show the given agree button text", () => {
        render(<MockConfirmationModal show={true} agreeBtnText={"Agree"}/>);
        expect(screen.getByText("Agree")).toBeInTheDocument();
    });
});

describe("ConfirmationModal: Clicking the yes/no buttons", () => {
    it("should call the agree button handler", () => {
        render(<MockConfirmationModal show={true}/>);
        fireEvent.click(screen.getByText("Yes"));
        expect(mockAgreeHandler).toBeCalled();
    });

    it("should call the disagree button handler", () => {
        render(<MockConfirmationModal show={true}/>);
        fireEvent.click(screen.getByText("No"));
        expect(mockDisagreeHandler).toBeCalled();
    });

    it("should call the close modal handler", () => {
        render(<MockConfirmationModal show={true}/>);
        fireEvent.click(screen.getByText("close"));
        expect(mockCloseModalHandler).toBeCalled();
    });
});
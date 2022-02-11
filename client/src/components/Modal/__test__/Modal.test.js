import { fireEvent, render, screen } from '@testing-library/react';
import Modal from '../Modal';

const mockCloseModalHandler = jest.fn();

describe("Modal: Showing the modal", () => {
    it("should show the modal", () => {
        render(<Modal show={true} />);
        expect(screen.getByText("close")).toBeInTheDocument();          //close button
    });

    it("should NOT show the modal", () => {
        render(<Modal show={false} />);
        expect(screen.queryByText("close")).not.toBeInTheDocument();    //close button
    });
});

describe("Modal: Rendering the props", () => {
    it("should show the given title", () => {
        render(<Modal show={true} title={"Hello World"}/>);
        expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    it("should show the given children", () => {
        render(<Modal show={true}> <h1>Children</h1> </Modal>);
        expect(screen.getByText("Children")).toBeInTheDocument();
    });

    it("should NOT show the given children", () => {
        render(<Modal show={true}></Modal>);
        expect(screen.queryByText("Children")).not.toBeInTheDocument();
    });
});

describe("Modal: Calling events", () => {
    it("should show the given title", () => {
        render(<Modal show={true} clickHandler={mockCloseModalHandler}/>);
        fireEvent.click(screen.getByText("close"));
        expect(mockCloseModalHandler).toBeCalled();
    });
});
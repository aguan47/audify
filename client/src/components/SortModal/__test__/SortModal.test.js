import { fireEvent, render, screen } from  '@testing-library/react';
import SortModal from '../SortModal';

const mockSortAndFilter = jest.fn();
const mockCloseModalHandler = jest.fn();
const mockSetIsAscendingHandler = jest.fn();
const mockSetShouldColorFilter = jest.fn();
const mockSetCurrentColor = jest.fn();

jest.mock('../../../events/Journals.js', () => {
    const originalModules = jest.requireActual('../../../events/Journals.js');
    return {
        ...originalModules,
        sortAndFilter: () => mockSortAndFilter()
    }
});

const MockSortModal = ({show, isAscending, shouldColorFilter}) => {
    return(
        <SortModal
            show={show}
            clickHandler={mockCloseModalHandler}
            isAscending={isAscending}
            setIsAscending={mockSetIsAscendingHandler}
            setShouldColorFilter={mockSetShouldColorFilter}
            shouldColorFilter={shouldColorFilter}
            setCurrentColor={mockSetCurrentColor}
        />
    );
}


describe("SortModal: Show modal", () => {
    it("should show the modal", () => {
        render(<MockSortModal show={true} isAscending={true}/>);
        expect(screen.getByText("close")).toBeInTheDocument();
    });

    it("should NOT show the modal", () => {
        render(<MockSortModal show={false} isAscending={true}/>);
        expect(screen.queryByText("close")).not.toBeInTheDocument();
    });
});

describe("SortModal: Render the proper buttons", () => {
    it("should show the ascending button to be an on button", () => {
        render(<MockSortModal show={true} isAscending={true}/>);
        expect(screen.getByText(/ascending/i)).not.toHaveClass('text-blue-1');
    });

    it("should show the ascending button to be an off button", () => {
        render(<MockSortModal show={true} isAscending={false}/>);
        expect(screen.queryByText(/ascending/i)).toHaveClass('text-blue-1');
    });

    it("should show the descending button to be an on button", () => {
        render(<MockSortModal show={true} isAscending={false}/>);
        expect(screen.getByText(/descending/i)).not.toHaveClass('text-blue-1');
    });

    it("should show the descending button to be an off button", () => {
        render(<MockSortModal show={true} isAscending={true}/>);
        expect(screen.queryByText(/descending/i)).toHaveClass('text-blue-1');
    });

    it("should show the yes filter button to be an off button", () => {
        render(<MockSortModal show={true} isAscending={true}/>);
        expect(screen.queryByText(/yes/i)).toHaveClass('text-blue-1');
    });

    it("should show the no filter button to be an on button", () => {
        render(<MockSortModal show={true} isAscending={false}/>);
        expect(screen.getByText(/no/i)).not.toHaveClass('text-blue-1');
    });
});

describe("SortModal: Clicking the ascending and descending buttons", () => {
    it("should be clickable: ascending button", () => {
        render(<MockSortModal show={true} isAscending={false}/>);
        fireEvent.click(screen.getByText(/ascending/i));
        expect(mockSetIsAscendingHandler).toBeCalled();
    });

    it("should be clickable: descending button", () => {
        render(<MockSortModal show={true} isAscending={false}/>);
        fireEvent.click(screen.getByText(/descending/i));
        expect(mockSetIsAscendingHandler).toBeCalled();
    });
});

describe("SortModal: Clicking the yes and no buttons for filtering", () => {
    it("should be clickable: yes button for filtering", () => {
        render(<MockSortModal show={true} isAscending={false}/>);
        fireEvent.click(screen.getByText(/yes/i));
        expect(mockSetShouldColorFilter).toBeCalled();
    });

    it("should be clickable: no button for filtering", () => {
        render(<MockSortModal show={true} isAscending={false}/>);
        fireEvent.click(screen.getByText(/no/i));
        expect(mockSetShouldColorFilter).toBeCalled();
    });
});

describe("SortModal: Render the correct colors", () => {
    it("should render the red color", () => {
        render(<MockSortModal show={true} shouldColorFilter={true}/>);
        const redColor = screen.getByText(/red/i);
        expect(redColor).toBeInTheDocument();
    });

    it("should render the blue color", () => {
        render(<MockSortModal show={true} shouldColorFilter={true}/>);
        const blueColor = screen.getByText(/blue/i);
        expect(blueColor).toBeInTheDocument();
    });

    it("should render the green color", () => {
        render(<MockSortModal show={true} shouldColorFilter={true}/>);
        const greenColor = screen.getByText(/green/i);
        expect(greenColor).toBeInTheDocument();
    });

    it("should render the yellow color", () => {
        render(<MockSortModal show={true} shouldColorFilter={true}/>);
        const yellowColor = screen.getByText(/yellow/i);
        expect(yellowColor).toBeInTheDocument();
    });
});

describe("SortModal: Selecting colors", () => {
    it("should select the red color", () => {
        render(<MockSortModal show={true} shouldColorFilter={true}/>);
        const redColor = screen.getByText(/red/i);
        fireEvent.click(redColor);
        expect(mockSetCurrentColor).toBeCalled();    });

    it("should select the blue color", () => {
        render(<MockSortModal show={true} shouldColorFilter={true}/>);
        const blueColor = screen.getByText(/blue/i);
        fireEvent.click(blueColor);
        expect(mockSetCurrentColor).toBeCalled();
    });

    it("should select the green color", () => {
        render(<MockSortModal show={true} shouldColorFilter={true}/>);
        const greenColor = screen.getByText(/green/i);
        fireEvent.click(greenColor);
        expect(mockSetCurrentColor).toBeCalled();
    });

    it("should select the yellow color", () => {
        render(<MockSortModal show={true} shouldColorFilter={true}/>);
        const yellowColor = screen.getByText(/yellow/i);
        fireEvent.click(yellowColor);
        expect(mockSetCurrentColor).toBeCalled();
    });
});

describe("SortModal: Clicking save button", () => {
    it("should show the save button", () => {
        render(<MockSortModal show={true}/>);
        expect(screen.getByText(/save/i)).toBeInTheDocument();
    });

    it("should click the save button", () => {
        render(<MockSortModal show={true}/>);
        fireEvent.click(screen.getByText(/save/i));
        expect(mockSortAndFilter).toBeCalled();
    });
});
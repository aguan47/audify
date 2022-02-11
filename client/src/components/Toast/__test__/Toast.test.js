import { fireEvent, render, screen } from '@testing-library/react';
import Toast from '../Toast';

describe("Toast: Showing the toast", () => {
    it("should show the toast", () => {
        render(<Toast show={true}/>);
        expect(screen.getByText("close")).toBeInTheDocument();
    });

    it("should NOT show the toast", () => {
        render(<Toast show={false}/>);
        expect(screen.queryByText("close")).not.toBeInTheDocument();
    });
});

describe("Toast: Rendering the props", () => {
    it("should show the given message", () => {
        render(<Toast show={true} message={"Hello World"} />);
        expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    it("should be an error message", () => {
        render(<Toast show={true} message={"Hello World"} isError={true}/>);
        expect(document.querySelector(".bg-red-1")).toBeInTheDocument();        // this is a red div
    });

    it("should NOT be an error message", () => {
        render(<Toast show={true} message={"Hello World"} isError={false}/>);
        expect(document.querySelector(".bg-red-1")).not.toBeInTheDocument();        // this is a red div
    });
});
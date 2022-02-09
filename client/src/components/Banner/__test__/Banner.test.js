import { render, screen } from '@testing-library/react';
import Banner from '../Banner';


describe("Banner component for non-error messages", () => {
    it("should NOT show a banner if it's a non-error and has a message but not shown", () => {
        render(<Banner message={"Hello World"} show={false} isError={false} />);
        const messageElement = screen.queryByRole("heading", {level: 1});
        expect(messageElement).not.toBeInTheDocument();
    });

    it("should show a banner if it's a non-error and has a message", () => {
        render(<Banner message={"Hello World"} show={true} isError={false} />);
        const messageElement = screen.getByText("Hello World");
        expect(messageElement).toBeInTheDocument();
    });
});

describe("Banner component for error messages", () => {
    it("should NOT show a banner if it's an error and has a message but not shown", () => {
        render(<Banner message={"Hello World"} show={false} isError={true} />);
        const messageElement = screen.queryByRole("heading", {level: 1});
        expect(messageElement).not.toBeInTheDocument();
    });

    it("should show a banner if it's an error and has a message", () => {
        render(<Banner message={"Hello World"} show={true} isError={true} />);
        const messageElement = screen.getByText("Hello World");
        expect(messageElement).toBeInTheDocument();
    });
});
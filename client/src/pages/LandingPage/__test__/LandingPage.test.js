import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "../LandingPage";

const MockLandingPage = () => {
    return (
        <BrowserRouter>
            <LandingPage/>
        </BrowserRouter>
    );
}


describe("Landing Page component", () => {
    it("should display Audify", () => {
        render(<MockLandingPage/>);
        const audifyElement = screen.getByText(/audify/i);
        expect(audifyElement).toBeInTheDocument();
    });

    it('should display "A voice journal"', () => {
        render(<MockLandingPage/>);
        const subtitleElement = screen.getByText(/a voice journal/i);
        expect(subtitleElement).toBeInTheDocument();
    });

    it("should display two links to log in and register", () => {
        render(<MockLandingPage/>);
        const linksElement = screen.getAllByRole("link");
        expect(linksElement.length).toBe(2);
    });

    it("should display a log in link", () => {
        render(<MockLandingPage/>);
        const linksElement = screen.getAllByRole("link");
        expect(linksElement[0].textContent).toBe("Log in");
    });

    it("should display a register link", () => {
        render(<MockLandingPage/>);
        const linksElement = screen.getAllByRole("link");
        expect(linksElement[1].textContent).toBe("Register");
    });
});
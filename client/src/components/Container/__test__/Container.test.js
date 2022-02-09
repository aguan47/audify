import { render, screen } from '@testing-library/react';
import Container from '../Container';

const MockContainer = () => {
    return(
        <Container>
            <h1>Hello World</h1>
        </Container>
    );
}


describe('Container component', () => {
    it("should display a header when the component is wrapped around it", () => {
        render(<MockContainer/>);
        const headerElement = screen.getByRole("heading", {level: 1});
        expect(headerElement).toBeInTheDocument();
    });
});
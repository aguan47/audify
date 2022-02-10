import { render, screen } from '@testing-library/react';
import 'react-router';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../../../context/UserContext';
import NavBar from '../NavBar';

const mockUserContext = {
    user: {
        name: "First name Last name",
        isAuth: true,
        accessToken: '',
        refreshToken: ''
    }
}

const mockPaths = [
    {name: "Journals", path: "/journals"}
];

const mockUseLocation = jest.fn();

jest.mock('react-router', () => {
    const originalModule = jest.requireActual('react-router');
    return {
        ...originalModule,
        useLocation: () => mockUseLocation
    }
});

const MockNavBar = () => {
    return(
        <BrowserRouter>
            <UserContext.Provider value={mockUserContext}>
                <NavBar paths={mockPaths} />
            </UserContext.Provider>
        </BrowserRouter>
    );
}

describe("NavBar", () => {
    it("should render the correct path name", () => {
        render(<MockNavBar/>);
        const pathTab = screen.getByText(mockPaths[0].name);
        expect(pathTab).toBeInTheDocument();
    }); 

    it("should show the correct path", () => {
        render(<MockNavBar/>);
        const pathTab = screen.getByText(mockPaths[0].name);
        expect(pathTab.parentElement.href).toBe(`http://localhost${mockPaths[0].path}`);
    }); 
})
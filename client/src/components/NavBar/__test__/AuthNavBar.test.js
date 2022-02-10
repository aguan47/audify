import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../../../context/UserContext';
import AuthNavBar from '../AuthNavBar';

const mockUserContext = {
    name: "First name Last name",
    isAuth: true,
    accessToken: '',
    refreshToken: ''
}

const MockAuthNavBar = () => {
    return(
        <BrowserRouter>
            <UserContext.Provider value={{user: mockUserContext}}>
                <AuthNavBar/>
            </UserContext.Provider>
        </BrowserRouter>
    )
}


describe("NavBar when authenticated", () => {
    it("should have a 'Journals' tab", () => {
        render(<MockAuthNavBar/>);
        const journalTab = screen.getByText("Journals");
        expect(journalTab).toBeInTheDocument();
    });

    it("should show the correct journal path", () => {
        render(<MockAuthNavBar/>);
        const homeLink = screen.getByText("Journals");
        expect(homeLink.parentElement.href).toBe("http://localhost/journals");
    });

    it("should have a 'Profile' tab", () => {
        render(<MockAuthNavBar/>);
        const profileTab = screen.getByText("Profile");
        expect(profileTab).toBeInTheDocument();
    });

    it("should show the correct profile path", () => {
        render(<MockAuthNavBar/>);
        const homeLink = screen.getByText("Profile");
        expect(homeLink.parentElement.href).toBe("http://localhost/profile");
    });

    it("should have a 'Log out' tab", () => {
        render(<MockAuthNavBar/>);
        const logoutBtn = screen.getByText("Log out");
        expect(logoutBtn).toBeInTheDocument();
    });

    it("should show the correct log out path", () => {
        render(<MockAuthNavBar/>);
        const homeLink = screen.getByText("Log out");
        expect(homeLink.parentElement.href).toBe("http://localhost/logout");
    });
});
import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import { WHITE_BUTTON } from '../../tailwind/tailwind';

const LandingPage = () => {
    document.title = "Welcome"

    return (
        <Container>
            <div className='w-screen h-screen bg-primary-btn flex flex-col justify-center items-center'>
                <h1 className='text-7xl text-white font-bold'>Audify.</h1>
                <p className='text-white text-xl font-thin'>A voice journal </p>
                <div className='m-10'>
                    <Link to={"/log-in"} className={WHITE_BUTTON}>Log in</Link>
                    <Link to={"/register"} className={WHITE_BUTTON}>Register</Link>
                </div>
            </div>
        </Container>
    );
}

export default LandingPage;
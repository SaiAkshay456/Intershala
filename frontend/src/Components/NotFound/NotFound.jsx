import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const NotFound = () => {
    const [float, setFloat] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFloat((prev) => (prev === 0 ? -10 : 0));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="not-found-container">
            <h1 className="error-code">404</h1>
            <p className="error-text">Oops! The page you are looking for doesn’t exist.</p>

            <img
                src="https://i.imgur.com/qIufhof.png"
                alt="Lost Astronaut"
                className="floating-image"
                style={{ transform: `translateY(${float}px)` }}
            />

            <Link to="/" className="back-home">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;

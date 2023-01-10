import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import styles from './NotFound.scss';

const NotFound = () => {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '500px',
                margin: '3em auto',
                textAlign: 'center',
            }}
            className={styles['not-found']}
        >
            <h1>404</h1>
            <p>The page you are looking for cannot be found.</p>
            <Link className="link" to="/">Home</Link>
        </Box>
    )
}

export default NotFound;
import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
    return (
        <div style={styles.loader}>
            <FaSpinner style={styles.icon} />
        </div>
    );
};

const styles = {
    loader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    icon: {
        fontSize: '50px',
        animation: 'spin 1s linear infinite',
        color: '#f3f3f3'
    },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`, styleSheet.cssRules.length);

export default Loader;
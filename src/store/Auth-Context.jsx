import React, { useCallback, useState } from 'react';
import useJwtDecode from '../components/Shared/useJwtDecode';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    // eslint-disable-next-line no-unused-vars
    login: (token) => { },
    logout: () => { },
});

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('user_id');
    const storedOrganizationId = localStorage.getItem('organization_id');
    const storedOrganizationName = localStorage.getItem('organization_name');
    const storedUserRole = localStorage.getItem('user_role');
    const storedExpirationTime = localStorage.getItem('expirationTime');

    if (!storedToken || !storedExpirationTime) {
        return null;
    }

    const expirationTime = parseInt(storedExpirationTime);
    if (expirationTime <= Date.now() / 1000) {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('organization_id');
        localStorage.removeItem('organization_name');
        localStorage.removeItem('user_role');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('wbe');
        return null;
    }

    return {
        token: storedToken,
        user_id: storedUserId,
        organization_id: storedOrganizationId,
        organization_name: storedOrganizationName,
        user_role: storedUserRole,
        expirationTime: expirationTime,
    };
};

export const AuthContextProvider = ({ children }) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);

    var userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        userIsLoggedIn = false;
    }, []);

    // eslint-disable-next-line max-len
    const loginHandler = ({ access_token }) => {
        setToken(access_token);
        localStorage.setItem('token', access_token);
    };


    const decodedToken = token ? useJwtDecode(token) : null;
    const user = decodedToken ? decodedToken : {};

    const contextValue = {
        user: { ...user },
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;

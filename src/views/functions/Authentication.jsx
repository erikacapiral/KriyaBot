// useUserAuthentication.js
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Authentication = (setValues = null) => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/authentication');
                if (!response.data.valid) {
                    navigate('/login');
                } else if (setValues) {
                    const data = response.data.user;
                    setValues({ ...data });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [navigate, setValues]);


};

export default Authentication;

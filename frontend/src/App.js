import './App.css';
import HomePage from './pages/HomePage';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import React, { useContext } from 'react';
import SavedCoursesContext from './context/saved-courses-context'
import useRealtimeSavedCourses from './hooks/use-realtime-saved-courses';

function App() {
    const [savedCourses] = useRealtimeSavedCourses()

    return (
        <SavedCoursesContext.Provider value={{
            savedCourses
        }}>
            <HomePage />
        </SavedCoursesContext.Provider>
    );
}

export default App;

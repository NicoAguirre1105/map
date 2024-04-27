import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/about';
import Home from './pages/home';
import Presets from './pages/presets';
import Download from './pages/download';
import "./css/App.css"

import ProcessFile from "./pages/processfile";
import { setRuleSet } from './reducers/counterReducer';
import Header from './components/Header/Header';

interface Rule {
  id: number;
  name: string;
  description: string;
}
function App(): JSX.Element {
  const replaceLinks = (text: string): string => {
    const linkRegex = /(https?:\/\/[^\s]+)/gi;
    let counter = 1;
    const replacedText = text.replace(linkRegex, (match: string, url: string) => {
      return `<a href="${url}">${counter++}</a>`;
    });
    return replacedText;
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDocuments = async (): Promise<void> => {
      try {
        const response = await axios.get('http://localhost:8081/api/viewRULE_SET');
        console.log(response);
        const rules: Rule[] = response.data.rules;
        const modifiedRules = rules.map((rule: Rule) => ({
          ...rule,
          description: replaceLinks(rule.description),
        }));
        dispatch(setRuleSet(modifiedRules));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  useEffect(() => {
    const fetchDocuments = async (): Promise<void> => {
      try {
        const response = await axios.post('http://localhost:8081/auth/login',
        {"email":"user@gmail.com", "password": "100"},{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
           },
        },);
        console.log(response);
      } catch (error) {
        console.error('Error testing auth backend:', error);
      }
    };
    fetchDocuments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>

      <div className="App">

        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/download" element={<Download />} />
            <Route path="/presets" element={<Presets />} />
            <Route path='/processFile' element={<ProcessFile />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
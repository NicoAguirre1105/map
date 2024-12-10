import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import "./index.css";
import About from "./pages/about";
import Home from "./pages/home";
import Presets from "./pages/presets";
import Download from "./pages/download";

import ProcessFile from "./pages/processfile";
import { setRuleSet } from "./reducers/counterReducer";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { Navbar } from "./components/Navbar";

// Импортируем компоненты модальных окон

interface Rule {
    id: number;
    name: string;
    description: string;
}

function App(): JSX.Element {
    const replaceLinks = (text: string): string => {
        const linkRegex = /(https?:\/\/[^\s]+)/gi;
        let counter = 1;
        const replacedText = text.replace(
            linkRegex,
            (_: string, url: string) => {
                return `<a href="${url}">${counter++}</a>`;
            }
        );
        return replacedText;
    };

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDocuments = async (): Promise<void> => {
            try {
                const response = await axios.get(
                    "http://localhost:8081/api/viewRULE_SET"
                );
                const rules: Rule[] = response.data.rules;
                const modifiedRules = rules.map((rule: Rule) => ({
                    ...rule,
                    description: replaceLinks(rule.description),
                }));
                dispatch(setRuleSet(modifiedRules));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching documents:", error);
                setLoading(false);
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
                    <ModalSwitch />
                </Router>
            </div>
        </Provider>
    );
}

export default App;

// Добавляем новый компонент ModalSwitch для обработки маршрутов и модальных окон
function ModalSwitch() {
    const location = useLocation();

    // Проверяем, есть ли backgroundLocation в состоянии локации
    const state = location.state as { backgroundLocation?: Location };
    const backgroundLocation = state && state.backgroundLocation;

    return (
        <>
            {/* Общие элементы интерфейса, например, меню */}
            <Navbar />
            {/* Основные маршруты */}
            <Routes location={backgroundLocation || location}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/download" element={<Download />} />
                <Route path="/presets" element={<Presets />} />
                <Route path="/processFile" element={<ProcessFile />} />
            </Routes>

            {/* Маршруты для модальных окон */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>
        </>
    );
}

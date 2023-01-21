import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";

import { HomePage, ComicsPage, Page404} from '../pages';
const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/comics" element={<ComicsPage />}/>
                        <Route path="/" element={<HomePage />}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;
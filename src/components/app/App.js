import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";

import { HomePage, ComicsPage, Page404, SinglePage, ComicLayout, CharterLayout} from '../pages';
const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />}/>
                        <Route path="/comics" element={<ComicsPage />}/>
                        <Route path="/comics/:id" element={<SinglePage Component={ComicLayout} dataType='comic'/>}/>
                        <Route path="/characters/:id" element={<SinglePage Component={CharterLayout} dataType='character'/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;
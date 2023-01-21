import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from '../charInfo/CharInfo';
import decoration from '../../resources/img/vision.png';

const HomePage = () => {

    const [selectCharacter, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
                <RandomChar />
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected} />
                    <CharInfo onCharId={selectCharacter} />
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}
export default HomePage;
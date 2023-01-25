import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';
import SetContent from '../../utils/SetContent';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const {getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.onCharId])

    const updateChar = () => {
        if (!props.onCharId) {
            return;
        }
        getCharacter(props.onCharId)
        .then(char=> setChar(char))
        .then(()=> setProcess('confirmed'))
    }
    return (
        <div className="char__info">
            {SetContent(process, View, char)}
        </div>
    )
}
const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;
    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'unset' };
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length < 1 ? 'Not Found' : null}
                {
                    comics.map((item, i) => {
                        while (i < 10) {
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        }
                    })
                }

            </ul>
        </>
    )
}

export default CharInfo;
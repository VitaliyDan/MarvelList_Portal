import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../../resources/img/Spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';
import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offsetComics, setOffsetComics] = useState(0);
    const [loadingItems, setLoadingItems] = useState(false);
    const [endList, setEndList] = useState(false);

    const {error, loading, getAllComics} = useMarvelService();

    useEffect(() => {
        onReqest(offsetComics, true);
    }, [])

    const onReqest = (offset, init) => {
    init ?  setLoadingItems(false) :  setLoadingItems(true);
            getAllComics(offset)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (newComicsList) => {
        let end = false;
        if (newComicsList.length < 8) {
            end = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setLoadingItems(false);
        setOffsetComics(offsetComics => offsetComics + 8);
        setEndList(end);
    }


    function renderComicsItems(arr){
        const items = arr.map((item, i)=>{
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
                )
        })
        return (
            <ul className="comics__grid">
               {items}
            </ul>
        )
    }

    const items = renderComicsItems(comicsList);
    const errorMessage = error ? <ErrorMassage/> : null;
    const spinner = loading && !loadingItems ? <Spinner /> : null;
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
             className="button button__main button__long"
             disabled={loadingItems}
             style={{ 'display': endList ? 'none' : 'block' }}
             onClick={() => onReqest(offsetComics)}
             >
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default ComicsList;

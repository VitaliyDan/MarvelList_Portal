import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../../resources/img/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';


const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offsetComics, setOffsetComics] = useState(0);
    const [loadingItems, setLoadingItems] = useState(false);
    const [endList, setEndList] = useState(false);

    const {error, loading, getAllComics, process, setProcess} = useMarvelService();



    useEffect(() => {
        onReqest(offsetComics, true);
    }, [])

    const onReqest = (offset, init) => {
    init ?  setLoadingItems(false) :  setLoadingItems(true);
            getAllComics(offset)
            .then(onComicsLoaded)
            .then(()=> setProcess('confirmed'));
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
    const elements = useMemo(() => {
        return setContent(process, () => renderComicsItems(comicsList), loadingItems);
    }, [process])
    return (
        <div className="comics__list">
            {elements}
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

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../resources/img/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loadingItems, setLoadingItems] = useState(false);
    const [offset, setOffset] = useState(0);
    const [endList, setEndList] = useState(false);
    const {error, getAllCharacters, loading} = useMarvelService();

    useEffect(() => {
        onReqest(offset, true);
    }, [])

    const onReqest = (offset, init) => {
        init ?  setLoadingItems(false) :  setLoadingItems(true);
            getAllCharacters(offset)
            .then(onCharListLoaded)

    }

    const onCharListLoaded = (newCharList) => {
        let end = false;
        if (newCharList.length < 9) {
            end = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setLoadingItems(false);
        setOffset(offset => offset + 9);
        setEndList(end);
    }

    const itemRefs = useRef([]);
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <li
                    className="char__item"
                    ref={item => itemRefs.current[i] = item}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )

        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !loadingItems ? <Spinner /> : null;
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={loadingItems}
                style={{ 'display': endList ? 'none' : 'block' }}
                onClick={() => { onReqest(offset) }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}
export default CharList;
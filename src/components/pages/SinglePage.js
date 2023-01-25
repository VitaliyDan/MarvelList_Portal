import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


import useMarvelService from '../../services/MarvelService';
import SetContent from '../../utils/SetContent';
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {process, setProcess, getComics, getCharacter, clearError} = useMarvelService();

        useEffect(() => {
            updateData()
        }, [id])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comic':
                    getComics(id).then(onDataLoaded)
                    .then(()=> setProcess('confirmed'));
                    break;
                case 'character':
                    getCharacter(id).then(onDataLoaded)
                    .then(()=> setProcess('confirmed'));
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        return (
            <>
                <AppBanner/>
                {SetContent(process, Component, data)}
            </>
        )
}

export default SinglePage;
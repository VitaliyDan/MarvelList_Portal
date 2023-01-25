import { useHttp } from "../components/hooks/http.hooks";

const useMarvelService = () => {
    const { loading, request, error, clearError, process, setProcess } = useHttp(),
        _apiBase = 'https://gateway.marvel.com:443/v1/public/',
        _apiKey = 'apikey=1ff913102da7e737045e2149a30d569b',
        _offsetCharacters = 211;

    const getAllCharacters = async (offset = _offsetCharacters) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_characterInfo);
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _characterInfo(res.data.results[0]);
    }
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_characterInfo);
    };
    const _characterInfo = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    //comicsItems
    const getComics = async (offsetComics = _offsetCharacters) => {
        const res = await request(`${_apiBase}comics?limit=9&offset=${offsetComics}&${_apiKey}`);
        return _comicsInfo(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_comicsInfo);
    };

    const _comicsInfo = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "There is no description",
            pageCount: comics.pageCount
                ? `${comics.pageCount} p.`
                : "No information about the number of pages",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || "en-us",
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : "not available",
        };
    }
    return {
        loading,
        error,
        process,
        setProcess,
        getAllCharacters,
        getCharacter,
        getComics,
        getAllComics,
        clearError,
        getCharacterByName
    }
}
export default useMarvelService;
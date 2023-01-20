import { useHttp } from "../components/hooks/http.hooks";

const  useMarvelService =()=> {
    const {loading,reqest,error,clearError} = useHttp(),
    _apiBase = 'https://gateway.marvel.com:443/v1/public/',
    _apiKey =  'apikey=1ff913102da7e737045e2149a30d569b',
    _offsetCharacters = 210;

    const getAllCharacters = async (offset = _offsetCharacters)=>{
        const res = await reqest(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`); 
        return res.data.results.map(_characterInfo);
    }
    const getCharacter = async (id)=>{
        const res = await reqest(`${_apiBase}characters/${id}?${_apiKey}`); 
        return _characterInfo(res.data.results[0]);
    }
    const _characterInfo =(char)=> {
        return{
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path+'.'+char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    return {loading,error,getAllCharacters,getCharacter,clearError}
}
export default useMarvelService;
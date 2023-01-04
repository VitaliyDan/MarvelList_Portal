

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey =  'apikey=1ff913102da7e737045e2149a30d569b';

    getResourse = async (url)=>{
        let result = await fetch(url);
        if(!result.ok){
            throw new Error(`Not fetch ${url}, status: ${result.status}`);
        }
        return await result.json();
    }

    getAllCharacters = async ()=>{
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=200&${this._apiKey}`); 
        return res.data.results.map(this._characterInfo);
    }
    getCharacter = async (id)=>{
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`); 
        return this._characterInfo(res.data.results[0]);
    }
    _characterInfo =(char)=> {
        return{
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path+'.'+char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }

}
export default MarvelService;
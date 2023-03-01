import { fetchAPI, fetchHW } from './fetch-api';
import { useState, useEffect } from 'react';

function StarWars() {
    const [value, setValue] = useState('');
    const [char, setChar] = useState(null);
    const [homeworld, setHomeworld] = useState(null);
    const [charList, setCharList] = useState([]);
    const [filmsList, setFilmsList] = useState([]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const charData = await fetchAPI(value);
            setChar(charData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = () => {
        if (char) {
            setCharList((prevState) => [...prevState, char])
        }
    };

    useEffect(() => {
        async function fetchData() {
            if (char) {
                try {
                    const hwData = await fetchHW(char.homeworld);
                    setHomeworld(hwData);
                } catch (error) {
                    console.error(error)
                    return <h6>Sorry, invalid data.</h6>
                }

                const filmPromises = char.filmsList.map((url) => fetch(url).then((response) => response.json()));
                Promise.all(filmPromises).then((filmData) => setFilmsList(filmData));
            }
        }
        fetchData(); 
    }, [char]);

    return (
        <div>
            <div className="search">
                <div className="top">
                    <label>Enter a number from 1 to 16, or 18 to 83.</label>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={value} onChange={handleChange} placeholder="Enter an ID Number" />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div className="top">
                    <h2 className="characters">Saved Characters</h2>
                    <ul className="characters">
                        {charList.map((char) => (
                            <li key={char.url}>{char.name}, {char.mass}, {char.height}, {char.birth_year}, {char.gender}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {char && (
                <div>
                    <h1>{char.name}</h1>
                    <ul>
                        <li>Mass: {char.mass}</li>
                        <li>Height: {char.height}</li>
                        <li>Birth: {char.birth_year}</li>
                        <li>Gender: {char.gender}</li>
                    </ul>
                    <h2>Films</h2>
                    <ul>
                        {filmsList.map((film) => (
                            <li key={film.url}>{film.title}</li>
                        ))}
                    </ul>
                    <h3>Homeworld: {homeworld && homeworld.name}</h3>
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
        </div>
    );
}

export default StarWars;
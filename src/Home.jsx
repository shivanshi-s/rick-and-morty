import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Input from './components/Input'
import Button from './components/Button'
import CardsList from './components/CardsList'
import Error from './components/Error'

const Home = () => {

    const [ characters, setCharacters] = useState();
    const [initData, setInitData] = useState();
    const [searchTermCharacters, setSearchTermCharacters] = useState();
    const [noResults, setNoResults] = useState(false);
    const [totalResults, setTotalResults] = useState();

    const searchTerm = (e) => {
        setSearchTermCharacters(e.target.value);
        searchCharacters()
    }

    const searchCharacters = () => {
        if(searchTermCharacters) {
            const searchResults = characters.filter((character) =>
                character.name.toLowerCase().includes(searchTermCharacters.toLowerCase())
            )
            setCharacters(searchResults)
            setNoResults(searchResults.length === 0)
        } else {
            setCharacters(initData)
        }
    }

    const getCharacters = async () => {
        try {
            const data = await fetch("https://rickandmortyapi.com/api/character");
            const response = await data.json();
            setCharacters(response.results);
            setInitData(response.results);
            setTotalResults(response.info.count);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect( () => {
        getCharacters();

    },[])

    return <section>
        <Header />
            <Input type="search" placeholder="type your character" changeHandler={searchTerm} />
            { totalResults && <p className='mt-4'>Total Characters are : <span className='font-black'>{totalResults}</span> </p>}
            {noResults ? <Error/> : <CardsList characters={characters} />}
            <Button clickHandler={() => {}}>Next</Button>
        <Footer />
    </section>
}

export default Home;
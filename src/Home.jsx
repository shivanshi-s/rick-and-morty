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
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);

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

    const getCharacters = async (page=1) => {
        try {
            const data = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const response = await data.json();
            console.log(response)
            setCharacters(response.results);
            setInitData(response.results);
            setTotalResults(response.info.count);
            setTotalPages(response.info.pages);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect( () => {
        getCharacters();

    },[])

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        getCharacters(newPage);
    }

    return <section>
        <Header />
            <Input type="search" placeholder="type your character" changeHandler={searchTerm} />
            { totalResults && <p className='mt-4'>Total Characters are : <span className='font-black'>{totalResults}</span> </p>}
            {noResults ? <Error/> : <CardsList characters={characters} />}
            {totalPages && 
                <div className='flex gap-2 my-4 justify-center'>
                <Button classes="bg-black text-white p-2 rounded-md" clickHandler={() => handlePageChange(currentPage - 1)} buttonLabel="Prev"
                disabled={currentPage === 1} />
                    <p>Page {currentPage} of {totalPages}</p>
                <Button classes="bg-black text-white p-2 rounded-md" clickHandler={() => handlePageChange(currentPage + 1)} buttonLabel="Next"
                disabled={currentPage === totalPages} />
                </div> }
        <Footer />
    </section>
}

export default Home;
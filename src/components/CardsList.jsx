import Card from "./Card";

const CardsList = ({characters}) => {

    const createCards = () => {
        return characters.map((character, id) => {
            return <Card key={id} character={character} />
        })
    }

    return <ul className="flex flex-wrap gap-4 justify-center mt-4">
        {characters && createCards()}
    </ul>
}

export default CardsList;
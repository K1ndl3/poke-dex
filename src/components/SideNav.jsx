import {first151Pokemon, getFullPokedexNumber, pokemonTypeColors} from "../utils"

export function SideNav() {

    return (
    <nav>
        <div className={"header"}>
            <h1 className="text-gradient">Pokemon</h1>
        </div>
        <input type="text" />
        {first151Pokemon.map((pokemon, index) => {
            return (
                <button key={index} className={'nav-card '}>
                    <p>{getFullPokedexNumber(index)}</p>
                    <p>{pokemon}</p>
                </button>
            )
        })}
    </nav>)
}
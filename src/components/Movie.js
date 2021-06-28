const Movie = props => {
    return (
        <li>
            <h1>{props.title}</h1>
            <p>{props.releaseDate}</p>
            <p>{props.openingText}</p>
        </li>
    )
}

export default Movie;
import { useRef } from "react";

const AddMovie = props => {
    const titleRef = useRef("");
    const openingTextRef = useRef("");
    const releaseDateRef = useRef("");

    const addMovie = (e) => {
        e.preventDefault();
        const movie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value,
        };
        props.onAddMovie(movie);
    }

    return (
        <form onSubmit={addMovie}>
            <label>
                Title:
                <input type="text" id="" ref={titleRef} />
            </label>
            <label>
                Opening Text:
                <input type="text" id="" ref={openingTextRef} />
            </label>
            <label>
                Release Date
                <input type="text" id="" ref={releaseDateRef} />
            </label>
            <button>Submit</button>
        </form>
    )

}

export default AddMovie;
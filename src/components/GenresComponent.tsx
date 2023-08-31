import { Genre } from "../types/movieAPI.types"

interface IProps {
    result: Genre
}

const GenresComponent: React.FC<IProps> = () => {


    return (
        <div>Genres</div>
    )
}
export default GenresComponent
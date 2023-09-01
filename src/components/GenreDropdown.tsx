import { Genre } from "../types/movieAPI.types"
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { SetURLSearchParams } from "react-router-dom"

interface IProps {
    result: Genre
    title: string
    setSearchParams: SetURLSearchParams
    setTitle: (value: React.SetStateAction<string>) => void
}

const GenresComponent: React.FC<IProps> = ({ result, title, setSearchParams, setTitle }) => {


    return (
        <div className="d-flex justify-content-stretch align-items-center genres">
            <h2 className="movies-title mt-3">Sort by Genre:</h2>
            <DropdownButton className="ms-3" variant="transparent" data-bs-theme="dark" title={title ? title : 'Filter genres'}>
                {result.genres.map(data => (
                    <Dropdown.Item
                        key={data.id}
                        onClick={() => {
                            setSearchParams({ page: String(1), genre: String(data.id) })
                            setTitle(data.name)
                        }}
                    >
                        {data.name}
                    </Dropdown.Item>
                ))
                }
            </DropdownButton>
        </div>
    )
}
export default GenresComponent
import Select from 'react-select'
import ReviewSelector from '../books/ReviewSelector';
import { Button, Typography } from '@material-tailwind/react';
import { FaSearch } from 'react-icons/fa';


const Filter = ({ selectedPoints, onChangePoints, categories, onChangeCategory, selectedCategories,onFilter}) => {
    return (<div className="px-10 border-b border-gray-300 pb-3">
        <div className="flex flex-col _md:flex-row gap-10 ">
            <div className="w-full _md:w-1/3">
                <div className='flex flex-col'>
                    <Typography variant="h6" color="blue-gray">
                        Categoría
                    </Typography>
                    <Select 
                       options={categories}
                       value={selectedCategories} 
                       onChange={onChangeCategory}
                       isMulti
                    />
                </div>

            </div>
            <div className="col-span-12 _md:col-span-3">
                <Typography variant="h6" color="blue-gray" >
                    Reseña
                </Typography>
                <ReviewSelector onSelect={onChangePoints} currentPoint={selectedPoints} />
            </div>
            <div className="col-span-12 _md:col-span-4 _lg:col-span-4 flex items-center">
                <Button 
                    color='gray'
                    onClick={onFilter}
                    className='flex justify-between items-center gap-3'
                >
                    Aplicar Filtros
                    <FaSearch />
                </Button>
            </div>
        </div>
    </div>);
}

export default Filter;
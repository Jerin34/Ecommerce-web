// EditProductWrapper.js

import { useParams } from 'react-router-dom';
import EditProducts from './../pages/EditProducts';

const EditProductWrapper = () => {
    const { id } = useParams();

    return <EditProducts id={id} />;
};

export default EditProductWrapper;
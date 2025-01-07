import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CollectionEle from '../components/CollectionEle';
import PlaceEle from '../components/PlaceEle';

function CollectionLayout() {
    const { id } = useParams();
     const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [location, setLocation] = useState(null);
    const [collections, setCollections] = useState([]);

    const getCollections = async () => {
        try {
            const response = await fetch(`http://localhost:3000/collection/getbyuserid/${localStorage.getItem("authToken")}`);
            const result = await response.json();

            if (response.ok && result.isSuccess) {
                setCollections(result.data);  // Gán dữ liệu vào state
            } else {
                console.error(result.error || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getLocations = async () => {
        try {
            const response = await fetch(`http://localhost:3000/collection/getbyid/${id}`);
            const result = await response.json();

            if (response.ok && result.isSuccess) {
                setLocation(result.data);  // Gán dữ liệu vào state
            } else {
                console.error(result.error || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getLocations();
        getCollections();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0.5);
        window.scrollTo(0, 0);
    }, [location]);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // Handle clicking outside to close the filter
    const handleClickOutside = (e) => {
        if (isFilterOpen && !e.target.closest('.collection_header')) {
            setIsFilterOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isFilterOpen]);

    const handleCollectionClick = (collectionId) => {
        navigate(`/user/storage/collection/${collectionId}`);
    };

    
    if (location) {
        console.log(location.item)
        return (
            <div>
                <div className='collection_header'>

                    <span>{location.name}</span>
                    <i class="fa-solid fa-list" onClick={toggleFilter}></i>
                    {/* <i class="fa-solid fa-cubes-stacked" onClick={toggleFilter}></i> */}
                    {isFilterOpen && (
                        <div className='booking_filter_selection'>
                            {collections.map((ele, index) => (
                                <div className='filter_option'
                                    onClick={() => handleCollectionClick(ele._id)}
                                >{ele.name}</div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='user_booking_frame'>

                    {/* locations.map */}
                    {location.item
                        .slice() // Tạo một bản sao của mảng gốc để không làm thay đổi nó
                        .reverse() // Đảo ngược thứ tự của mảng
                        .map((ele, index) => (
                            <PlaceEle
                                key={index}
                                ele={ele}
                                path={ele._id}
                                favrorited={true}
                            />
                        ))}
                </div>
            </div>
        );
    }

}

export default CollectionLayout;
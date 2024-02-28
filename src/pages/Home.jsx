import { useState } from "react";
import Header from "../layout/header/Header";
import ListingItem from "../components/listingitem/ListingItem";
import LoginModal from "../components/modals/LoginModal";

const Home = () => {
    const [favorite, setFavorite] = useState(false)
    const favoriteButton = () =>{
        setFavorite(!favorite)
    }
    const hotel = [
        {
            id:1,
            name: 'khach san 1',
            url: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGV8ZW58MHx8MHx8fDA%3D',
            country: 'Da nang',
            city: 'Viet Nam',
            category: 'Beach',
            price:'200'
        },
        {
            id:2,
            name: 'khach san 1',
            url: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGV8ZW58MHx8MHx8fDA%3D',
            country: 'My tho',
            city: 'Viet Nam',
            category: 'Nui',
            price:'500'
        },

    ]
    return (
        <>
            <Header />
            <div className=" pt-3 h-screen pl-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {hotel?.map((item)=>{
                    return(
                        <ListingItem key={item?.id} data={item} isFavorite={favorite} btn={()=>{favoriteButton()}}/>
                    )
                })}
            </div>
            <LoginModal/>
        </>
    )
}

export default Home;
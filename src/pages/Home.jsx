import { useEffect, useState } from "react";
import Header from "../layout/header/Header";
import ListingItem from "../components/list/ListingItem";
import LoginModal from "../components/modals/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../redux/room/roomThunks";

const Home = () => {
    const dispatch = useDispatch()
    const [favorite, setFavorite] = useState(false)
    const favoriteButton = () => {
        setFavorite(!favorite)
    }
    const { room } = useSelector((state) => state.room)
    useEffect(() => {
        dispatch(getAllRooms())
    }, [])
console.log(room)
    return (
        <>
            <div className="relative h-24 z-10">
                <Header />
            </div>
            <div className=" mx-12 sm:container  ">
                <div className=" pt-3 h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 transition-all duration-500 ">
                    {room?.map((item) => {
                        return (
                            <ListingItem key={item?.id} data={item} isFavorite={favorite} btn={() => { favoriteButton() }} />
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Home;
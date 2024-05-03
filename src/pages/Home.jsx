import { useEffect, useState } from "react";
import Header from "../layout/header/Header";
import ListingItem from "../components/list/ListingItem";
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

    return (
        <>
            <div className="relative h-24 sm:h-20 z-10">
                <Header />
            </div>
            <div className=" w-full sm:w-[90%] mx-auto ">
                <div className=" pt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 transition-all duration-500 ">
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
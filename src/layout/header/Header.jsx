import HeaderItem from "../../components/header/HeaderItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/category/categoryThunk";
import "./Header.scss"
import { getAllRooms } from "../../redux/room/roomThunks";

const Header = () => {
    const dispatch = useDispatch()
    const [activeCategory, setActiveCategory] = useState(null);
    const { categories } = useSelector((state) => state.category)
    const [isAtTop, setIsAtTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 0) {
            setIsAtTop(true);
          } else {
            setIsAtTop(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const handleClickCategory = (id) => {
        setActiveCategory(id)
        dispatch(getAllRooms({categoryId: id}))
    }

    return (
        <>
            <div className={`fixed h-20 w-full z-10 bg-white ${!isAtTop ? '' : 'border-b border-b-gray-200 '} `}>
                <div className="flex overflow-hidden overflow-x-auto py-4 flex-row items-center md:items-start md:justify-start justify-center mx-2 px-4  sm:py-2  sm:px-6 gap-0 lg:gap-8 scrollable-div " >
                    {categories?.map((item) => {
                        return (

                            <HeaderItem
                                key={item?.name}
                                name={item?.name}
                                btn={() => { handleClickCategory(item?.id) }}
                                isActive={item?.id === activeCategory}
                            />

                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default Header;
import HeaderItem from "../../components/header/HeaderItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/category/categoryThunk";


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

    const handleClickCategory = (name) => {
        setActiveCategory(name)
    }

    return (
        <>
            <div className={`fixed h-20  w-full z-10 bg-white ${!isAtTop ? '' : 'border-b border-b-gray-200 '} `}>
                <div className="flex flex-row mx-2 px-4 py-2  sm:px-8 gap-8 lg:gap-8">

                    {categories?.map((item) => {
                        return (

                            <HeaderItem
                                key={item?.name}
                                name={item?.name}
                                btn={() => { handleClickCategory(item?.name) }}
                                isActive={item?.name === activeCategory}
                            />

                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default Header;
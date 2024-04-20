import HeaderItem from "../../components/header/HeaderItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/category/categoryThunk";


const Header = () =>{
    const dispatch = useDispatch()
    const [activeCategory, setActiveCategory] = useState(null);
    const {category} = useSelector((state) => state.category)

    useEffect(()=>{
        dispatch(getAllCategory())
    },[])
    const handleClickCategory = (name) =>{
        setActiveCategory(name)
    }

    return(
        <>
        <div className="fixed top-[60px] w-full z-1 bg-white shadow-md  ">
            <div className="flex flex-row mx-2 px-4 py-4 sm:px-8 gap-8 lg:gap-8">

            {category?.map((item)=>{
                return (
                    
                    <HeaderItem 
                    key={item?.name}
                    name={item?.name} 
                    btn={()=> {handleClickCategory(item?.name)}} 
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
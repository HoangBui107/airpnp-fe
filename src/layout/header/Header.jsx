import { TbBeach } from "react-icons/tb";
import HeaderItem from "../../components/HeaderItem/HeaderItem";
import { useState } from "react";


const Header = () =>{
    const [activeCategory, setActiveCategory] = useState(null);
    const Category = [
        {
            name: 'Beach'
        },
        {
            name: 'Cabin'
        }
    ]

    const handleClickCategory = (name) =>{
        setActiveCategory(name)
    }

    return(
        <>
        <div className="flex flex-row ">
            {Category?.map((item)=>{
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
        </> 
    )
}
export default Header;
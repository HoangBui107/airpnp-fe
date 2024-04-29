import { TbBeach } from "react-icons/tb";

const HeaderItem = ({name, btn, isActive}) => {
    return (
        <>
            <div className="flex">
                <div className={` flex flex-col ${isActive? "border-b-2 border-b-black border-solid" : ''} w-32 sm:w-20 pl-2 h-full sm:h-16 border-b-2 border-b-transparent border-solid hover:border-b-2 hover:border-b-black hover:border-solid items-center`} onClick={btn}>
                    <TbBeach className="pt-1" size={30} color="" />
                    <h1 className={`{${isActive? "" : ''} text-sm`}>{name}</h1>
                </div>
            </div>
        </>
    )
}
export default HeaderItem;
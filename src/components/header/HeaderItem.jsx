import { TbBeach } from "react-icons/tb";

const HeaderItem = ({name, btn, isActive}) => {
    return (
        <>
            <div className="flex">
                <div className="flex flex-col pl-2 h-20 border-b-2 border-b-transparent border-solid hover:border-b-2 hover:border-b-black hover:border-solid items-center " onClick={btn}>
                    <TbBeach className="pt-1" size={30} color="" />
                    <h1 className={isActive? "" : ''}>{name}</h1>
                </div>
            </div>
        </>
    )
}
export default HeaderItem;
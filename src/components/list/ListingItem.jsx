import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ListingItem = ({data, isFavorite, btn}) => {
    const navigate = useNavigate()
    console.log(data?.roomImages?.[0]?.url)
    const navigateDetails = () =>{
        navigate(`/details/${data?.id}`)
    }
    return (
        <>
            <div className="col-span-1 cursor-pointer group ">
                <div className="flex flex-col gap-0 w-full">
                    <div 
                    className="aspect-square w-full relative overflow-hidden rounded-xl bg-black"
                    onClick={()=>{navigateDetails()}}
                    >
                        <img
                            className="object-cover h-full w-full group-hover:scale-110 transition"
                            src={data?.roomImages?.[0]?.url}
                            alt=""
                        />
                        <div className="absolute top-3 right-3">
                            <div className=" relative hover:opacity-80 transition cursor-pointer" onClick={btn}>
                                <AiOutlineHeart
                                    size={28}
                                    className="fill-white absolute -top-[2px] -right-[2px]"
                                />
                                <AiFillHeart
                                    size={24}
                                    className={
                                        isFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="font-semibold text-lg">
                        {data?.name} 
                    </div>
                    <div className="font-semi text">
                        {data?.country} , {data?.city}
                    </div>
                    <div className="font-light text-neutral-500">
                        {data?.category}
                    </div>
                    <div className="flex flex-row">
                        <div className="font-semibold">
                            ${data?.price}
                        </div>
                        <div className="font-light">/night</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListingItem;
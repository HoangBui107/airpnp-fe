import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomById, sendFeedback } from "../../redux/room/roomThunks";
import TextField from '@mui/material/TextField';
import DatePicker from "../../components/calendar/Calendar";
import { openLogin } from "../../redux/modal/modalSlice";
import useTotalPrice, { calculateNumberOfDays } from './useTotalPrice';
import moment from "moment";

const Details = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { details } = useSelector((state) => state.room)
    const { isLogin } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getRoomById({ id: id }))
    }, [])
    const [feedback, setFeedback] = useState('')
    const handleChange = (event) => {
        const newFeedback = event.target.value;
        setFeedback(newFeedback);
    };

    const handleSendFeedback = (event) => {
        dispatch(sendFeedback({ id: id, feedback: feedback }))
    };
    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        key: 'selection',
    });

    const totalPrice = useTotalPrice(selectedDateRange, details?.price);
const diffDay = calculateNumberOfDays(selectedDateRange?.startDate, selectedDateRange?.endDate)

    const handleDateChange = (selected) => {
        setSelectedDateRange(selected.selection);
    };

   
    const handleSubmit = () => {
        if (!isLogin) {
            dispatch(openLogin())
        }
        navigate(`/order/${id}`,  { state: { date: selectedDateRange, totalPrice: totalPrice,price: details?.price, diffDay: diffDay } })
    }
    return (
        <>
            <div className="sm:container mx-auto">
                <div>
                    <div className="relative">
                        <div className="grid gap-1 grid-cols-2 overflow-hidden">
                            <div className="aspect-square w-full ">
                                <img
                                    className="aspect-square rounded-l-xl object-cover cursor-pointer "
                                    src={details?.roomImages?.[0]?.url}
                                    alt=""
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2 ">
                                {details?.roomImages?.map((item, index) => {
                                    return (
                                        <div className="aspect-square cursor-pointer object-cover " key={item?.id}>
                                            <img
                                                className={`h-full w-full 
                                            ${index === 1 ? 'rounded-tr-xl' : ''} 
                                            ${index === 3 ? 'rounded-br-xl' : ''}
                                            ` }
                                                src={item?.url} alt="" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex py-5 px-5 sm:px-0 flex-col  lg:flex-row ">
                        <div className="flex w-full lg:w-2/3 flex-col">
                            <div className="mb-6">
                                <h1 className="font-semibold text-xl mb-4">{details.name}</h1>
                                <h2>{details.street}</h2>
                            </div>
                            <div className="py-5 px-2 border border-black rounded-xl grid grid-cols-3">
                                <div className="flex items-center justify-center border-r border-gray-400">
                                    <svg viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg" height="32"><g clipPath="url(#clip0_5880_37773)"><path fillRule="evenodd" clipRule="evenodd" d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z" fill="#222222"></path></g><defs><clipPath id="clip0_5880_37773"><rect width="18.8235" height="32" fill="white" transform="translate(0.453125 0.000488281)"></rect></clipPath></defs></svg>
                                    <h1 className="text-center"> Guest Like</h1>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 32"
                                        fill="none"
                                        height="32"><g clipPath="url(#clip0_5880_37786)"><path fillRule="evenodd" clipRule="evenodd" d="M4.06516 25.417L4.72713 24.4547L3.02437 23.6492L2.3624 24.6116L3.21378 25.0143L2.3624 24.6116C0.890857 26.751 1.60381 29.3868 3.95483 30.4989C4.69986 30.8513 5.55423 31.0196 6.43257 30.987L6.75025 30.9752L6.82494 29.2305L6.50726 29.2423C5.98026 29.2618 5.46764 29.1608 5.02062 28.9494C3.61001 28.2821 3.18223 26.7007 4.06516 25.417Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M11.2303 10.235C9.47283 8.96204 8.62998 7.4878 8.70171 5.81232C8.77344 4.13685 9.7454 2.59524 11.6176 1.18749C13.375 2.46049 14.2179 3.93473 14.1462 5.6102C14.0744 7.28568 13.1025 8.82729 11.2303 10.235Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M12.3604 0.489275C11.9975 0.226387 11.4472 0.246818 11.0605 0.537533C9.01618 2.07473 7.84763 3.84975 7.76242 5.84026C7.6772 7.83076 8.69724 9.52453 10.6163 10.9146C10.9792 11.1775 11.5296 11.157 11.9162 10.8663C13.9605 9.32914 15.1291 7.55411 15.2143 5.56361C15.2995 3.57311 14.2795 1.87933 12.3604 0.489275ZM11.6311 2.3684C12.7748 3.38355 13.2568 4.47199 13.2069 5.63813C13.157 6.80428 12.5801 7.93203 11.3456 9.03547C10.2019 8.02032 9.71991 6.93187 9.76983 5.76573C9.81975 4.59959 10.3966 3.47184 11.6311 2.3684Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M3.87411 24.0529C5.42328 22.353 7.12208 21.4688 8.97051 21.4001C10.8189 21.3315 12.4473 22.0923 13.8556 23.6824C12.3065 25.3823 10.6077 26.2666 8.75924 26.3352C6.9108 26.4038 5.28243 25.6431 3.87411 24.0529Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M14.6494 24.1787C14.9466 23.8526 14.9656 23.4097 14.6954 23.1046C13.1648 21.3765 11.2793 20.4331 9.03368 20.5164C6.78805 20.5998 4.81561 21.6864 3.13199 23.5339C2.83478 23.86 2.81582 24.303 3.08601 24.608C4.61655 26.3361 6.50208 27.2795 8.74771 27.1962C10.9933 27.1128 12.9658 26.0262 14.6494 24.1787ZM12.5669 23.7198C11.3316 24.8808 10.0869 25.4045 8.82241 25.4515C7.55791 25.4984 6.35415 25.0656 5.21452 23.9928C6.44977 22.8318 7.69449 22.3081 8.95899 22.2611C10.2235 22.2142 11.4272 22.6471 12.5669 23.7198Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.87809 20.7043C9.34099 18.5957 10.3908 17.0928 12.0274 16.1956C13.6641 15.2984 15.5603 15.1864 17.716 15.8596C17.2531 17.9683 16.2033 19.4712 14.5667 20.3684C12.93 21.2656 11.0338 21.3775 8.87809 20.7043Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M18.7627 15.9443C18.8516 15.5393 18.6104 15.1569 18.1814 15.023C15.821 14.2859 13.5833 14.3695 11.6022 15.4554C9.6302 16.5364 8.45336 18.3139 7.95247 20.5956C7.86356 21.0006 8.10482 21.3829 8.5338 21.5169C10.8942 22.254 13.1319 22.1704 15.113 21.0844C17.085 20.0034 18.2618 18.226 18.7627 15.9443ZM16.6012 16.4656C16.1209 17.9951 15.2748 19.007 14.1415 19.6282C13.0241 20.2407 11.7105 20.4286 10.114 20.0743C10.5943 18.5448 11.4404 17.5329 12.5737 16.9116C13.6911 16.2991 15.0047 16.1113 16.6012 16.4656Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M11.6456 15.6267C10.8982 13.6743 11.0176 11.9555 12.004 10.4702C12.9903 8.98484 14.6462 8.03014 16.9718 7.60605C17.7192 9.55846 17.5997 11.2773 16.6134 12.7626C15.6271 14.2479 13.9711 15.2026 11.6456 15.6267Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M17.8943 7.28295C17.7454 6.89397 17.2889 6.67525 16.8087 6.76282C14.2562 7.22831 12.291 8.31371 11.1107 10.0911C9.93513 11.8614 9.84602 13.854 10.6566 15.9715C10.8055 16.3605 11.262 16.5792 11.7422 16.4916C14.2947 16.0261 16.26 14.9407 17.4402 13.1634C18.6158 11.393 18.7049 9.40048 17.8943 7.28295ZM16.2162 8.6613C16.6143 10.1267 16.4088 11.3465 15.7201 12.3835C15.0407 13.4067 13.9538 14.1584 12.3348 14.5931C11.9366 13.1278 12.1421 11.9079 12.8308 10.8709C13.5102 9.84774 14.5972 9.09607 16.2162 8.6613Z" fill="#222222"></path></g><defs><clipPath id="clip0_5880_37786"><rect width="18.8235" height="32" fill="white" transform="matrix(-1 0 0 1 19.1016 0.000488281)"></rect></clipPath></defs></svg>
                                </div>
                                <div className="flex flex-col items-center justify-center border-r border-gray-400">
                                    <h1>4.95</h1>
                                    <FaStar />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <h1>64</h1>
                                    <h2 className="font-smibold underline">Review</h2>
                                </div>
                            </div>
                            <div className="flex flex-row py-5">
                                <div className="w-16 h-16 rounded-full object-cover">
                                    <img src="https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg" alt="" />
                                </div>
                                <div className="flex px-5 flex-col justify-center">
                                    <h1 className="font-semibold">Owner home/Person create: {details?.user?.profile?.fullName}</h1>
                                    <h2> Super host 4 years of experience welcoming guests</h2>
                                </div>
                            </div>
                            <div className="border border-gray-200 w-full"></div>
                            <div className="py-5">
                                <h1 className="font-semibold pb-2">Description</h1>
                                <div dangerouslySetInnerHTML={{ __html: details?.description }}></div>
                            </div>

                            <div className="border border-gray-200 w-full"></div>
                            <div className="py-6">
                                <h1 className="py-2 font-semibold text-2xl">Type of accommodation service</h1>
                                <div className="grid grid-cols-2">
                                    <div className="flex flex-row items-center">
                                        <h1 className="px-4"> {details?.category?.name}</h1>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <h1 className="px-4">  {details?.category?.description}</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-gray-200 w-full"></div>
                            <div className="flex flex-row py-5">
                                <div className="w-16 h-16 rounded-full object-cover">
                                    <img src={details?.user?.profile?.avatarUrl} alt="" />
                                </div>
                                <div className="flex px-5 flex-col justify-center">
                                    <h1 className="text-2xl font-bold">Hoster By : {details?.user?.profile?.fullName}</h1>
                                    <h2> Joined in November: {moment(details?.user?.profile?.createdAt).format('DD/MM/YYYY')}</h2>
                                    
                                </div>
                            </div>
                            <div className="flex flex-col-reverse lg:flex-row py-4">
                                <div className="flex w-full lg:w-2/4 flex-col">
                                    <div className="py-2">
                                        <h1 className="font-bold text-lg"> Introduction</h1>
                                        <div dangerouslySetInnerHTML={{ __html: details?.user?.profile?.description }}></div>
                                    </div>
                                </div>
                                <div className="flex w-full lg:w-2/4 flex-col lg:ml-40">
                                <h1 className="font-bold text-lg"> Feedback: </h1>

                                    <TextField id="outlined-multiline-static"
                                        value={feedback}
                                        onChange={handleChange}
                                        multiline
                                        rows={12}
                                        placeholder="If you have any problems, please enter here and the system will send an email to the store owner"
                                    />


                                    <div className="py-4">
                                        <button className="py-3 px-6 border border-black rounded-xl font-semibold" onClick={handleSendFeedback}>
                                            Send feedback to owner room
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-gray-200 w-full"></div>
                            <div className="hidden sm:flex justify-center flex-col py-4 w-full ">
                                <div>
                                    <h4 className=" text-xl font-bold ">Please choose start date and end date:</h4>
                                </div>
                                <DatePicker
                                    value={selectedDateRange}
                                    onChange={handleDateChange}
                                    disabledDates={details?.busyDates}
                                />
                            </div>

                        </div>
                        <div class="lg:hidden  fixed z-50 w-full h-20 -translate-x-1/2 bg-white bottom-0 left-1/2 shadow-[1px_1px_5px_-1px_rgba(0,0,0,0.3)] ">

                            <div class="grid h-full grid-cols-2 mx-auto">
                                <div className="flex flex-col justify-start px-6 py-4">
                                    <h1>1231231</h1>
                                    <p className=" font-medium underline underline-offset-4 cursor-pointer">ngay 09 - ngay 12 thang 4</p>


                                </div>
                                <div className="flex items-center justify-center">
                                    <button className="flex py-3 px-8 border border-none justify-center items-center w-full rounded-2xl bg-primary text-white">
                                        Booking
                                    </button><i className="fas fa-eye  ms-2"></i>
                                </div>


                            </div>

                        </div>
                        <div className="hidden lg:flex  lg:w-1/3  lg:justify-end  ">
                            <div
                                className=
                                "hidden w-[80%] lg:flex flex-col border border-gray-200 py-4 px-4 rounded-lg shadow-2xl sm:max-h-[40vh]  lg:max-h-[30vh] sm:sticky sm:top-20 lg:top-44 object-cover"
                            >
                                <div className="flex flex-row items-center">
                                    <h1 className="font-bold text-2xl">{details?.price}</h1>
                                    <h1>/night</h1>
                                </div>
                                <span className="py-2">
                                    {/* <Link to={`/order/${id}`}> */}
                                    <button className="flex py-2 border border-none justify-center items-center w-full rounded-lg bg-primary text-white" onClick={() => { handleSubmit() }}>
                                        Booking
                                    </button><i className="fas fa-eye  ms-2"></i>
                                    {/* </Link> */}

                                </span>

                                <div className="flex py-2 justify-between">
                                    <h1 className="underline">${details?.price} x {diffDay} day</h1>
                                    <h1>{totalPrice}</h1>
                                </div>

                                <div className="flex py-2 justify-between">
                                    <h1 className="underline">Long stay discount</h1>
                                    <h1 className="text-green-600">-$43</h1>
                                </div>
                                <div className="mt-2 border border-gray-200 w-full"></div>

                                <div className="flex py-2 justify-between">
                                    <h1 className="font-bold text-xl">Total before taxes</h1>
                                    <h1 className="font-blod text-xl">${totalPrice}</h1>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="border border-gray-200 w-full"></div>
                    <div className="py-10">
                        <div className="flex items-center justify-center border-r border-gray-400">
                            <img className="object-cover h-40" loading="lazy" src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png" />

                            <h1 className="text-center text-6xl font-bold"> 5.0</h1>
                            <img className="object-cover h-40" loading="lazy" src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png" />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <h1 className="text-3xl font-bold text-center">Guest Is Like</h1>
                            <p className="text-xl text-gray-400 text-center">One of the most popular homes on Airbnb based on ratings, reviews, and trust</p>
                        </div>
                    </div>
                    <div className="border border-gray-200 w-full"></div>
                    <div className="grid grid-cols-2 gap-12">
                    {details?.feedbacks?.map((item) => (

                        <div className="flex flex-col px-4 py-4 gap-4 w-4/5">
                            <div className="flex flex-row gap-4 ">
                                <div className="max-h-24 max-w-24">
                                    <img className="object-cover h-12 w-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqKRdNTUVE6P28Z1Gjw-fwnfsE6icmFmf4eiXXEpmc4A&s" alt="" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-medium">{item.userName}</h2>
                                    <p className="text-gray-400">Active two year ago</p>
                                </div>
                            </div>
                            <div>
                                <p className="">{item.content}</p>
                            </div>

                        </div>
                    ))}

                    </div>

                    <div className="border border-gray-200 w-full"></div>

                    <div className="py-8 px-5">
                        <h1 className="text-xl font-semibold py-4">Things to now</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-3">
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-lg">House rule</h1>
                                <h1>Check in</h1>
                                <h1>Check out</h1>
                                <h1>4 guest maximum</h1>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-lg">Safety & property</h1>
                                <h1>Nearby lake, river, other body of water</h1>
                                <h1>Carbon monoxide alarm</h1>
                                <h1>Smoke alarm</h1>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-lg">Cancellation policy</h1>
                                <h1>This reservation is non-refundable.</h1>
                                <h1>Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.</h1>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Details;
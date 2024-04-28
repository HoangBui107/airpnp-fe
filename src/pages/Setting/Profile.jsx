import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProfilePage = () =>{
    return(
        <>
        <div className="flex flex-col lg:flex-row container mx-auto gap-8 my-8 max-h-[85vh]   "> 
            <div className="flex flex-col lg:w-1/3 mt-8">
                <div className="flex flex-row sm:px-0 lg:px-12 py-8 shadow-xl rounded-2xl">
                    <div className=" flex flex-col justify-center items-center w-1/2">
                        <img className="object-cover h-24 w-24 rounded-full" loading="lazy"src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png" alt=""/>
                        <h1 className="text-3xl font-semibold">Hoang Bui</h1>
                        <h3 className="text-xl font-medium" >Guest</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/2">
                            <h2 className="text-2xl font-semibold">2</h2>
                            <span className="text-xl font-medium">Active in Airbnb</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:w-2/3">
                <div className="flex flex-col py-8 gap-8 ">
                    <h1 className="text-4xl font-bold">Information about hoang</h1>
                    <button className="px-2 py-1 border border-black rounded-lg w-1/4 ">Edit profile</button>
                </div>
                <div className="flex flex-col gap-4 mb-8">
                    <p className='text-gray-600'>Nơi tôi từng học: Đại học greenwich</p>
                    <p className='text-gray-600'>My job: Đại học greenwich</p>
                    <p className='text-gray-600'>Language: Vietnamese</p>
                    <p className='text-gray-600'>I Think : Girl </p>
                    <p className='text-gray-600'>Live at Da Nang Viet Nam </p>
                    <p className='text-gray-600'>Tôi là hoàng bùi nè </p>

                </div>
                <div className="border border-gray-200 w-full"></div>
                <div className='py-8 flex flex-col gap-4'>
                    <h1 className='text-4xl font-semibold'>Thông tin đã được xác nhận của Hoang</h1>
                    <p><FontAwesomeIcon icon="fa-solid fa-check" />Confirm </p>
                </div>

                <div className="border border-gray-200 w-full"></div>

                <div className='py-8 flex flex-col gap-6'>
                    <h1 className='text-4xl font-semibold'>Xác minh danh tính của bạn</h1>
                    <p className='text-gray-600'>You need to complete this step before making a reservation or hosting guests on Airbnb.</p>
                    <button className='px-2 py-1 border border-black w-1/5 rounded-lg ' >Verification</button>
                </div>

                <div className="border border-gray-200 w-full"></div>
            </div>
        </div>
        </>
    )
}

export default ProfilePage;

const PersonalInfo = () => {
    return (
        <>
            <div className="flex flex-col px-6 sm:container sm:mx-atuo">
                <div className="flex flex-col w-full sm:px-12 md:px-24 py-14 gap-4">

                    <div className="flex flex-row gap-4">
                        <a href="#" className="font-[500] text-xl hover:underline">Account</a>
                        <p>Personal info</p>
                    </div>
                    <div>
                        <h1>Personal info</h1>
                    </div>
                </div>
                <div className="flex flex-row sm:px-12 md:px-24 gap-4 ">
                    <div className="flex flex-col gap-4 w-2/3">
                        <div className="py-4 border-b ">
                            <div className="flex justify-between">
                                <p>Legal Name</p>
                                <a href="" className="underline">Edit</a>
                            </div>
                            <div>
                                <p>123312</p>
                            </div>
                        </div>
                        <div className="py-4 border-b ">
                            <div className="flex justify-between">
                                <p>Legal Name</p>
                                <a href="" className="underline">Edit</a>
                            </div>
                            <div>
                                <p>123312</p>
                            </div>
                        </div>
                        <div className="py-4 border-b ">
                            <div className="flex justify-between">
                                <p>Legal Name</p>
                                <a href="" className="underline">Edit</a>
                            </div>
                            <div>
                                <p>123312</p>
                            </div>
                        </div>
                        <div className="py-4 border-b ">
                            <div className="flex justify-between">
                                <p>Legal Name</p>
                                <a href="" className="underline">Edit</a>
                            </div>
                            <div>
                                <p>123312</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/3">

                    </div>
                </div>

            </div>

        </>
    )
}

export default PersonalInfo;
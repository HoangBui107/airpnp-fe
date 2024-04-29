

const TopBox = ({data}) => {
  return (
    <div className="p-4">
    <h1 className="mb-5 text-2xl font-bold text-white">Top Deals</h1>
    <div>
      {data?.map((user) => (
        <div key={user?.id} className="flex items-center justify-between mb-7">

          <div className="flex items-center gap-5">
      
            <img src={user?.profile?.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover " />
         
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-white">{user?.profile?.fullName}</span>
              <span className="text-xs hidden lg:block text-white">{user?.email}</span>
            </div>
          </div>
          <span className="font-semibold text-white">${user.amount}</span>
        </div>
      ))}
    </div>
  </div>
  );
};

export default TopBox;

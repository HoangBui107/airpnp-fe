import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="flex flex-col gap-5 bg-[#222b3c] border-r-2 border-solid border-[#384256] h-[93vh] px-6">
        <div className="text-sm font-extralight text-[white] uppercase flex flex-col  py-6">
        <Link to={`/admin/dashboard`} className="flex items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-[#384256]">
            <span>Dashboard</span>
          </Link>
          <Link to={`/admin/categories`} className="flex items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-[#384256]">
            <span>Manage Categories</span>
          </Link>
          <Link to={`/admin/users`} className="flex items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-[#384256]">
            <span>Manage User</span>
          </Link>
          <Link to={`/categories`} className="flex items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-[#384256]">
            <span>Manage Owner Hotel</span>
          </Link>
          <Link to={`/categories`} className="flex items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-[#384256]">
            <span>Manage </span>
          </Link>
        </div>
    </div>
  );
};

export default Menu;
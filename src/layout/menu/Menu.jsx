import { Link } from "react-router-dom";
import { menu } from "../../data";


const Menu = () => {
  return (
    <div className="flex flex-col gap-5 bg-[#222b3c] border-r-2 border-solid border-[#384256] h-[93vh] px-6">
      {menu.map((item) => (
        <div className="text-sm font-extralight text-[white] uppercase flex flex-col  " key={item.id}>
          <span className="text-sm font-extralight text-[#ddd] uppercase ">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className="flex items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-[#384256]" key={listItem.id}>
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
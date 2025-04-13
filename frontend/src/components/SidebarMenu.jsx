/*import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ClipboardListIcon,
  IdentificationIcon,
  OfficeBuildingIcon,
  
  UsersIcon,
} from "@heroicons/react/outline";

const menuItems = [
  { label: "Главная", icon: <HomeIcon className="h-5 w-5" />, to: "/" },
  { label: "Завершенные объекты", icon: <ClipboardListIcon className="h-5 w-5" />, to: "/completed" },
  { label: "Карточка объекта", icon: <IdentificationIcon className="h-5 w-5" />, to: "/object" },
  { label: "О деятельности", icon: <OfficeBuildingIcon className="h-5 w-5" />, to: "/about" },
  { label: "Структура", icon: <UsersIcon className="h-5 w-5" />, to: "/structure" },
];

export default function SidebarMenu() {
  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-4 fixed">
      <h2 className="text-xl font-bold mb-6">Меню</h2>
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-100 transition ${
                isActive ? "bg-blue-500 text-white" : "text-gray-800"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
*/
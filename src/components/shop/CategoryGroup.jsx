import { NavLink } from "react-router-dom";

const CategoryGroup = ({ title, items }) => {
    return (
        <div>
            <div className={` px-3 py-1 text-sm font-semibold italic ${title === "APPLE"
                ? 'bg-neutral-900 text-white'
                : 'bg-gray-200 text-gray-600 hover:underline'
                }`}>{title}</div>
            <ul className="ml-4 space-y-1 mt-1">
                {items.map(item => (
                    <li
                        key={item}
                        className="text-sm text-gray-600 hover:underline"
                    >
                        <NavLink to={`/shop/${item}`}>
                            {item}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default CategoryGroup;
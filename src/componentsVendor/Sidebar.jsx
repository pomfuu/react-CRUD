import { Link } from "react-router-dom";
import { useState } from "react";
import ".././index.css";

const SideBar = ({ activePath, role = "vendor" }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const menus = {
        vendor: [
            { name: "Product", value: "/product" },
            { name: "Order", value: "/order" },
            { name: "Profile", value: "/profile" },
            { name: "Logout", value: "/login" },
        ],
        admin: [
            { name: "Role and Banner", value: "/admin/role-and-banner" },
            { name: "Logout", value: "/login" },
        ],
    };
    const menu = menus[role] || [];
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <>
            <p className="d-lg-none" onClick={toggleSidebar}>
                {showSidebar ? "Close Sidebar" : "☰"}
            </p>
            <div
                className={`position-fixed top-0 bottom-0 rounded-end-4 start-0 vh-100% ${
                    showSidebar ? "col-6" : "col-2"
                } ${showSidebar ? "d-block" : "d-none"} d-lg-block`}
                style={{ backgroundColor: "#1A47BC" }}
            >
                <div className="m-5">
                    <Link className="font2 text-decoration-none fs-3 fw-semibold text-white">
                        {role === "admin" ? "KOSU ADMIN" : "KOSU VENDOR"}
                    </Link>
                    <nav className="nav mt-5 flex-column">
                        {menu.map((item, index) => (
                            <Link
                                to={item.value}
                                key={index}
                                className={`${
                                    item.value === activePath
                                        ? "bg-white rounded-2 px-4 py-2 text-decoration-none fs-5 mb-5 text-blue fw-semibold"
                                        : "text-decoration-none fs-5 text-white mb-5"
                                }`}
                            >
                                <div>{item.name}</div>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default SideBar;

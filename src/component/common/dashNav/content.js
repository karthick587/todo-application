import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import profileIcon from "../../../asset/image/pngegg.png";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap"; // Make sure to import from react-bootstrap
import { Link, useNavigate } from "react-router-dom";
import { CiCircleList, CiHome } from "react-icons/ci";

export default function DashNav({ children }) {
    const [navOpen, setNavOpen] = useState(false);
    return (
        <div>
            <div className="nav-bar">
                <div className="d-flex align-items-center">
                    <div>
                        <button className="toggle-btn btn-none" onClick={() => setNavOpen(!navOpen)}>
                            {navOpen ? <MdArrowBackIos /> : <MdArrowForwardIos />}
                        </button>
                    </div>
                    <div className="nav-title">
                        Next Action AI
                    </div>
                </div>
                <div className="profile">
                    <img alt="profile-img" src={profileIcon} />
                </div>
            </div>
            <div className="nav-body">
                <div className="side-nav" style={{ width: navOpen ? "200px" : "60px" }}>
                    <div className="">

                        <Link to={"/"} className="link">
                            <div className="icon">
                                <CiHome />
                            </div>
                            Home
                        </Link>
                    </div>
                    <div className="">

                        <Link to={"/context-engine-list"} className="link">
                            <div className="icon">
                                <CiCircleList />
                            </div>
                            Context Engine
                        </Link>
                    </div>
                </div>
                <div className="body">
                    {children}
                </div>
            </div>
        </div >
    );
}

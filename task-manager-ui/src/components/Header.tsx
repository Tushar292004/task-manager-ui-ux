import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
const Header = () => {
    return (
        <div className=" p-5 border-b-2  py-6 flex justify-between">
            <div className="container mx-auto  flex justify-between items-center">
                <Link className=" text-2xl font-bold tracking-tight" to={"/"}>EXCEL-MANAGER</Link>
            </div>
            <ModeToggle />
        </div>
    );
}

export default Header;
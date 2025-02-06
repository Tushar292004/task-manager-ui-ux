import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div className=" px-10 border-b-2 border-[#BA532D] bg-muted/50 py-4 flex justify-between">
            <div className="container mx-auto  flex justify-between items-center">
                <Link className=" text-4xl  text-[#BA532D] font-bold tracking-tight " to={"/"}>Wrike.</Link>
            </div>
        </div>
    );
}

export default Header;
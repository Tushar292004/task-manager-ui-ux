import { LineShadowText } from "./line-shadow-text";
const Header = () => {
    return (
        <div className=" px-4 border-b-2 border-[#BA532D] bg-muted/50 py-4 flex justify-between">
            <div className="container mx-auto  flex justify-between items-center">
                <LineShadowText  shadowColor="#BA555D" className=" text-4xl  text-[#BA532D] font-bold tracking-tight ">Wrike.</LineShadowText>
            </div>
        </div>
    );
}

export default Header;
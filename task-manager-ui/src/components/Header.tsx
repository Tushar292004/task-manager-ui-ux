<<<<<<< HEAD
import { AlignRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const Header = () => {
    return (
        <div className=" px-10 border-b-2 border-[#BA532D] bg-muted/50 py-4 flex justify-between">
            <div className="container mx-auto  flex justify-between items-center align-middle">
                <Link className=" text-4xl  text-[#BA532D] font-bold tracking-tight " to={"/"}>Wrike.</Link>

                <Sheet>
                    <SheetTrigger><AlignRight className="text-4xl  font-bold tracking-tight" /></SheetTrigger>
                    <SheetContent className="border-[#BA532D]">
                        <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                            <SheetDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

=======
import { LineShadowText } from "./line-shadow-text";
const Header = () => {
    return (
        <div className=" px-4 border-b-2 border-[#BA532D] bg-muted/50 py-4 flex justify-between">
            <div className="container mx-auto  flex justify-between items-center">
                <LineShadowText  shadowColor="#BA555D" className=" text-4xl  text-[#BA532D] font-bold tracking-tight ">Wrike.</LineShadowText>
>>>>>>> 6415bc4aae0b736e486b174a2c29bd3772e34529
            </div>
        </div>
    );
}

export default Header;
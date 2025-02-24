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
                            <SheetTitle>Menu</SheetTitle>
                            <SheetDescription>
                                 <Link to={"/"}>Timeline Chart</Link>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
        </div>
        </div>
    );
}

export default Header;
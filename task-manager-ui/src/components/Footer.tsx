import { Github, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
    return (
      <div className="px-8 items-center py-3 flex w-full justify-between border-t-2 bg-muted/50 border-t-[#BA532D]" >
        <div className="flex flex-row gap-4 items-start text-[#BA532D] ">
        <Github  className="hover:text-white"/>
        <Linkedin  className="hover:text-white"/>
        <Instagram className="hover:text-white" />
        </div>
          <div className="">
              <span className="text-[#BA532D] text-2xl font-semibold tracking-tighter">
                  created by <a href="https://tinyurl.com/TusharChandak" target="_blank">Tushar Chandak</a>
  
              </span>
          </div>
      </div>
    );
  }
export default Footer; 

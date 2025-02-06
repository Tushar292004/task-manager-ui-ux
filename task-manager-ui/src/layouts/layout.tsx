import Header from "@/components/Header";
import Footer from "@/components/Footer"
type Props = {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
      <div className="flex flex-col max-h-screen">
        <Header />
        <div className="p-4">
          {children}
        </div>
        <Footer />
    </div> 
  )
}

export default Layout;
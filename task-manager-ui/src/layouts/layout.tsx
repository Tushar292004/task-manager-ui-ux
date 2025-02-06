import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto flex-1">
          {children}
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Layout;
import { ReactNode, useState } from "react";
import { Link } from "react-scroll";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md z-50 fixed top-0 left-0">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Organizasyon Logo" className="h-12 w-auto" />
          <span className="text-xl md:text-2xl font-serif font-semibold tracking-wide text-pink-600">
            Nostalji Şekerleme
          </span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <NavItem to="home">Anasayfa</NavItem>
          <NavItem to="products">Ürünler</NavItem>
          <NavItem to="about">Hakkımızda</NavItem>
          <NavItem to="gallery">Galeri</NavItem>
          <NavItem to="contact">İletişim</NavItem>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg transition-all duration-300 overflow-hidden ${open ? "max-h-96" : "max-h-0"
          }`}
      >

        <nav className="flex flex-col items-center py-4 space-y-4">
          <MobileItem to="home" onClick={() => setOpen(false)}>Anasayfa</MobileItem>
          <MobileItem to="about" onClick={() => setOpen(false)}>Hakkımızda</MobileItem>
          <MobileItem to="products" onClick={() => setOpen(false)}>Ürünler</MobileItem>
          <MobileItem to="gallery" onClick={() => setOpen(false)}>Galeri</MobileItem>
          <MobileItem to="contact" onClick={() => setOpen(false)}>İletişim</MobileItem>
        </nav>
      </div>
    </header>
  );
}


interface NavItemProps {
  to: string;
  children: ReactNode;
}

export function NavItem({ to, children }: NavItemProps) {
  return (
    <Link
      to={to}
      smooth
      duration={500}
      offset={-80}
      className="cursor-pointer font-medium text-gray-900 hover:text-pink-600 transition"
    >
      {children}
    </Link>
  );
}

interface MobileItemProps {
  to: string;
  children: ReactNode;
  onClick: () => void;
}

export function MobileItem({ to, children, onClick }: MobileItemProps) {
  return (
    <Link
      to={to}
      smooth
      duration={500}
      offset={-80}
      onClick={onClick}
      className="cursor-pointer text-lg font-medium text-gray-900 hover:text-pink-600 transition"
    >
      {children}
    </Link>
  );
}

import { Link } from "react-scroll";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-md z-50 h-20 flex items-center">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Organizasyon Logo" className="h-12 w-auto" />
        </a>

        <nav className="space-x-6">
          <Link to="home" smooth duration={500} className="cursor-pointer text-gray-700 hover:text-pink-600">Anasayfa</Link>
          <Link to="about" smooth duration={500} className="cursor-pointer text-gray-700 hover:text-pink-600">Hakkımızda</Link>
          <Link to="products" smooth duration={500} className="cursor-pointer text-gray-700 hover:text-pink-600">Ürünler</Link>
          <Link to="gallery" smooth duration={500} className="cursor-pointer text-gray-700 hover:text-pink-600">Galeri</Link>
          <Link to="contact" smooth duration={500} className="cursor-pointer text-gray-700 hover:text-pink-600">İletişim</Link>
        </nav>
      </div>
    </header>
  );
}

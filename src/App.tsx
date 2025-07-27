import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import ScrollToTopButton from './components/ScrollToTopButton';

export default function App() {
  return (
   <>
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Gallery />
      <Contact />
      <ScrollToTopButton />
    </>
  );
}

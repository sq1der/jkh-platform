import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import InfoCards from "./components/InfoCards";
import ImageGallery from "./components/ImageGallery";
import NavButtons from "./components/NavButtons";
import DebtChecker from "./components/DebtChecker";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans">
      <Header />
      <HeroSection />
      <InfoCards />
      <ImageGallery />
      <NavButtons />
      <DebtChecker />
      <Footer />
    </div>
  );
}

export default App;

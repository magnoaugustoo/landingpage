import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
    
    if (sectionId === 'home' && homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'about' && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (aboutRef.current && contactRef.current) {
        const aboutPosition = aboutRef.current.offsetTop - 100;
        const contactPosition = contactRef.current.offsetTop - 100;
        
        if (scrollPosition >= contactPosition) {
          setActiveSection('contact');
        } else if (scrollPosition >= aboutPosition) {
          setActiveSection('about');
        } else {
          setActiveSection('home');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-['Poppins'] text-gray-800 min-h-screen bg-gray-50">
      <Head>
        <title>Magno Augusto Rodrigues | Portfolio</title>
        <meta name="description" content="Portfolio de Magno Augusto Rodrigues" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Hamburger Menu Button */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={toggleMenu} 
          className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
        >
          <span className={`block w-8 h-0.5 bg-gray-800 transform transition duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-8 h-0.5 bg-gray-800 transition duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-8 h-0.5 bg-gray-800 transform transition duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col justify-center items-center`}
      >
        <nav className="flex flex-col items-center space-y-8 text-2xl">
          <button 
            onClick={() => scrollToSection('home')}
            className={`transition-colors duration-300 ${activeSection === 'home' ? 'text-black font-medium' : 'text-gray-500'}`}
          >
            home
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className={`transition-colors duration-300 ${activeSection === 'about' ? 'text-black font-medium' : 'text-gray-500'}`}
          >
            about me
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className={`transition-colors duration-300 ${activeSection === 'contact' ? 'text-black font-medium' : 'text-gray-500'}`}
          >
            contact me
          </button>
        </nav>
      </div>

      {/* Home Section */}
      <section ref={homeRef} className="min-h-screen flex flex-col justify-between px-8 pt-0 pb-4">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-[115px] font-extralight leading-none mb-0">hello,</h1>
          <p className="text-sm mb-8 pt-[-4px]">- It&gt;s magno augusto rodrigues</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4 w-full max-w-[350px] place-items-center">
            <div>
              <h2 className="font-light mb-1">designer</h2>
              <p className="text-xs font-extralight  leading-relaxed w-[150px]">
                Crafting intuitive UIs & design systems as a product designer
              </p>
            </div>
            <div>
              <h2 className="font-light mb-1">&lt;coder&gt;</h2>
              <p className="text-xs font-extralight leading-relaxed w-[150px]">
                Building elegant front-ends with logic, style, and precision
              </p>
            </div>
          </div>
        </div>
        
        <div className="mx-auto mb-12">
          <Image 
            src="/home.png" 
            alt="Magno Augusto Rodrigues" 
            width={300} 
            height={400} 
            className="object-cover"
            priority
          />
        </div>
        
        <div className="text-center mb-8">
          <p className="text-sm">scroll down</p>
          <svg className="w-6 h-6 mx-auto mt-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Me Section */}
      <section ref={aboutRef} id="about" className="min-h-screen flex flex-col px-8 py-16">
        <h2 className="text-2xl mb-8 text-center">about me</h2>
        
        <div className="mx-auto mb-8 w-48 h-48 overflow-hidden rounded-lg">
          <Image 
            src="/about-me.png" 
            alt="About Magno" 
            width={192} 
            height={192} 
            className="object-cover w-full h-full"
          />
        </div>
        
        <p className="font-extralight text-center text-sm leading-relaxed mb-12 max-w-[300px] mx-auto">
          Creative-minded IT professional with a passion for human-centered technology. 
          I blend technical skills with empathy and design to create meaningful digital experiences. 
          Currently finishing a Bachelor&apos;s in Information Technology and looking for global 
          opportunities where I can grow, lead and contribute with purpose.
        </p>
        
        <div className="mb-8">
          <h3 className="text-center text-xl mb-6">technologies</h3>
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image 
                  src="/javascript.svg" 
                  alt="JavaScript" 
                  width={30} 
                  height={30} 
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image 
                  src="/next-js.svg" 
                  alt="Next.js" 
                  width={30} 
                  height={30} 
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image 
                  src="/react.png" 
                  alt="React" 
                  width={30} 
                  height={30} 
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image 
                  src="/html.svg" 
                  alt="HTML5" 
                  width={30} 
                  height={30} 
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image 
                  src="/css.svg" 
                  alt="CSS3" 
                  width={30} 
                  height={30} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Me Section */}
      <section ref={contactRef} id="contact" className="flex flex-col px-8 py-16">
        <h2 className="text-2xl mb-12 text-center">contact me</h2>
        
        <div className="text-center mb-24">
          <p className="font-light text-sm leading-relaxed mb-6 max-w-[300px] mx-auto">
            Ideas are just dreams until design makes them real, turning visions into experiences.
          </p>
          
          <p className="text-sm font-extralight leading-relaxed mb-6 max-w-[300px] mx-auto">
            Have an idea that could make a difference?
            If you&apos;re holding onto a bold vision, a meaningful project, or just a spark of inspiration—you don&apos;t have to build it alone.
            I&apos;m here to help turn your ideas into powerful, real-world designs that connect, inspire, and make an impact.
          </p>
          
          <p className="text-sm font-extralight leading-relaxed mb-6 max-w-[300px] mx-auto">
            Let&apos;s bring your vision to life. Get in touch and let&apos;s create something remarkable together.
          </p>
          <div className="flex items-center justify-center mb-2 gap-2">
            <Image 
              src="/linked-in.svg" 
              alt="LinkedIn" 
              width={30} 
              height={30} 
            />
            <a 
              href="https://www.linkedin.com/in/magnoaugusto/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-800 hover:underline"
            >
              linkedin.com/in/magnoaugusto
            </a>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-8">
          <div className="flex justify-center space-x-6 text-sm">
            <button 
              onClick={() => scrollToSection('home')}
              className={`transition-colors duration-300 ${activeSection === 'home' ? 'text-white' : 'text-gray-400'}`}
            >
              home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`transition-colors duration-300 ${activeSection === 'about' ? 'text-white' : 'text-gray-400'}`}
            >
              about me
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`transition-colors duration-300 ${activeSection === 'contact' ? 'text-white' : 'text-gray-400'}`}
            >
              contact me
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

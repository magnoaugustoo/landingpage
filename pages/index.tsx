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

  // Função para verificar se um elemento está realmente visível na viewport
  const isElementInViewport = (el: Element | null): boolean => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    
    // Verifica se pelo menos 50% do elemento está visível na tela
    const elementHeight = rect.bottom - rect.top;
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const percentVisible = visibleHeight / elementHeight;
    
    // Elemento deve estar pelo menos 50% visível e não pode estar completamente fora da tela
    return percentVisible >= 0.5 && rect.top < window.innerHeight && rect.bottom > 0;
  };

  // Função para aplicar animações aos elementos quando eles entram na viewport
  const handleScrollAnimations = () => {
    const animatedElements = document.querySelectorAll(
      '.animate-from-left, .animate-from-right, .animate-from-bottom'
    );
    
    animatedElements.forEach((element) => {
      if (isElementInViewport(element) && !element.classList.contains('animate-visible')) {
        element.classList.add('animate-visible');
      }
    });
  };

  // Inicializar as animações
  useEffect(() => {
    // Aplicar animações aos elementos já visíveis na carga inicial
    setTimeout(() => {
      handleScrollAnimations();
    }, 100);

    // Adicionar listener de scroll para animar elementos conforme a página é rolada
    window.addEventListener('scroll', handleScrollAnimations, { passive: true });
    
    // Limpar o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('scroll', handleScrollAnimations);
    };
  }, []);

  // Garantir que as animações sejam verificadas quando a página carrega completamente
  useEffect(() => {
    // Verificar animações após o carregamento completo da página
    window.addEventListener('load', handleScrollAnimations);
    
    // Verificar animações periodicamente nos primeiros segundos após o carregamento
    const intervalId = setInterval(handleScrollAnimations, 500);
    
    // Limpar após 5 segundos
    setTimeout(() => {
      clearInterval(intervalId);
      window.removeEventListener('load', handleScrollAnimations);
    }, 5000);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('load', handleScrollAnimations);
    };
  }, []);

  return (
    <div className="font-['Poppins'] text-gray-800 min-h-screen bg-gray-50">
      <Head>
        <title>Magno Augusto Rodrigues | Portfolio</title>
        <meta name="description" content="Portfolio de Magno Augusto Rodrigues" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#f9fafb" />
        <link rel="icon" href="/favicon.ico" />
        <style dangerouslySetInnerHTML={{ __html: `
          @media (prefers-color-scheme: dark) {
            html {
              color-scheme: light;
            }
            body {
              background-color: #f9fafb;
              color: #1f2937;
            }
          }

          /* Keyframes para animação da esquerda para a direita */
          @keyframes slideInFromLeft {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }

          /* Keyframes para animação da direita para a esquerda */
          @keyframes slideInFromRight {
            0% {
              transform: translateX(100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }

          /* Keyframes para animação de baixo para cima */
          @keyframes slideInFromBottom {
            0% {
              transform: translateY(50px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          /* Classes para aplicar as animações */
          .animate-from-left {
            opacity: 0;
            transform: translateX(-100%);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }

          .animate-from-right {
            opacity: 0;
            transform: translateX(100%);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }

          .animate-from-bottom {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }

          /* Classe para quando o elemento está visível */
          .animate-visible {
            opacity: 1;
            transform: translate(0);
          }

          /* Atrasos para criar efeito em cascata */
          .delay-100 {
            transition-delay: 0.1s;
          }

          .delay-200 {
            transition-delay: 0.2s;
          }

          .delay-300 {
            transition-delay: 0.3s;
          }

          .delay-400 {
            transition-delay: 0.4s;
          }

          .delay-500 {
            transition-delay: 0.5s;
          }
        `}} />
      </Head>

      {/* Desktop Navigation - Apenas na página inicial (home) */}
      <nav className={`hidden md:flex justify-center items-center space-x-8 p-8 absolute top-0 left-0 right-0 z-50 ${activeSection !== 'home' ? 'md:hidden' : ''}`}>
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

      {/* Hamburger Menu Button - Apenas Mobile */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <button 
          onClick={toggleMenu} 
          className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
        >
          {/* Linha de cima - 100% */}
          <span className={`block w-7 h-0.5 bg-[#282828] transform transition duration-300 self-end
            ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>

          {/* Linha de baixo - 75% */}
          <span className={`block w-5 h-0.5 bg-[#282828] transform transition duration-300 self-end
            ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col justify-center items-center md:hidden`}
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
      <section ref={homeRef} className="min-h-screen flex flex-col justify-between px-8 pt-0 pb-4 md:flex-row md:items-center md:justify-center md:gap-8 md:px-16 lg:px-24" style={{ minHeight: '100dvh' }}>
        {/* Image container - Mobile: bottom, Desktop: left */}
        <div className="mx-auto order-2 md:order-1 md:mb-0 md:w-1/2 md:flex md:justify-end animate-from-left">
          <Image 
            src="/home.png" 
            alt="Magno Augusto Rodrigues" 
            width={500} 
            height={500} 
            className="object-cover"
            priority
          />
        </div>
        
        {/* Text content - Mobile: top, Desktop: right */}
        <div className="flex-1 flex flex-col justify-center items-center text-center order-1 md:order-2 md:w-1/2 animate-from-right">
          <h1 className="text-[150px] font-extralight leading-none mb-0 md:text-[180px]">hello,</h1>
          <p className="text-xl mb-8 -mt-4 md:mb-12">
            <span className="font-light">- It&apos;s</span>{' '}
            <span className="font-normal">magno augusto rodrigues</span>
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4 w-full max-w-[350px] place-items-center md:gap-8">
            <div className="animate-from-right delay-200">
              <h2 className="text-lg font-light mb-1">designer</h2>
              <p className="text-base font-extralight leading-relaxed w-[150px] md:w-auto">
                Crafting intuitive UIs & design systems as a product designer
              </p>
            </div>
            <div className="animate-from-right delay-300">
              <h2 className="text-lg font-light mb-1">&lt;coder&gt;</h2>
              <p className="text-base font-extralight leading-relaxed w-[150px] md:w-auto">
                Building elegant front-ends with logic, style, and precision
              </p>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator - posicionado abaixo da imagem em ambas as versões - Sempre visível mas sem funcionalidade de clique */}
        <div className="text-center w-full order-3 mt-8 mb-4 md:absolute md:bottom-8 md:left-0 md:mt-0 z-10">
          <p className="text-sm">scroll down</p>
          <svg className="w-6 h-6 mx-auto mt-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Me Section */}
      <section ref={aboutRef} id="about" className="min-h-screen bg-white flex flex-col px-8 py-16 md:py-24" style={{ minHeight: '100dvh' }}>
        <h2 className="text-2xl mb-8 text-center animate-from-bottom">about me</h2>
        
        <div className="mx-auto mb-8 w-48 h-48 overflow-hidden rounded-lg animate-from-bottom delay-100">
          <Image 
            src="/about-me.png" 
            alt="About Magno" 
            width={192} 
            height={192} 
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Texto com animação garantida */}
        <div className="animate-from-bottom delay-200">
          <p className="font-extralight text-center text-lg leading-relaxed mb-12 max-w-[350px] mx-auto md:max-w-[700px]">
            Creative-minded IT professional with a passion for human-centered technology. 
            I blend technical skills with empathy and design to create meaningful digital experiences. 
            Currently finishing a Bachelor&apos;s in Information Technology and looking for global 
            opportunities where I can grow, lead and contribute with purpose.
          </p>
        </div>
        
        <div className="mb-8 animate-from-bottom delay-300">
          <h3 className="text-center text-xl mb-6">technologies</h3>
          <div className="flex justify-center space-x-4 md:space-x-8">
            <div className="flex flex-col items-center animate-from-bottom delay-300">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image 
                  src="/javascript.svg" 
                  alt="JavaScript" 
                  width={30} 
                  height={30} 
                />
              </div>
            </div>
            <div className="flex flex-col items-center animate-from-bottom delay-350">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image 
                  src="/next-js.svg" 
                  alt="Next.js" 
                  width={30} 
                  height={30} 
                />
              </div>
            </div>
            <div className="flex flex-col items-center animate-from-bottom delay-400">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image 
                  src="/react.png" 
                  alt="React" 
                  width={30} 
                  height={30} 
                />
              </div>
            </div>
            <div className="flex flex-col items-center animate-from-bottom delay-450">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image 
                  src="/html.svg" 
                  alt="HTML5" 
                  width={30} 
                  height={30} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="min-h-screen flex flex-col px-8 py-16 md:py-24" style={{ minHeight: '100dvh' }}>
        <h2 className="text-2xl mb-8 text-center animate-from-bottom">contact me</h2>
        
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-full max-w-md animate-from-bottom delay-100">
            <p className="font-regular text-xl text-center leading-relaxed mb-6 max-w-[350px] mx-auto md:max-w-[700px]">
            Ideas are just dreams until design makes them real, turning visions into experiences.
            </p>
            <p className="text-center font-extralight text-lg mb-8">
            Have an idea that could make a difference?
            If you&apos;re holding onto a bold vision, a meaningful project, or just a spark of inspiration—you don&apos;t have to build it alone.
            I&apos;m here to help turn your ideas into powerful, real-world designs that connect, inspire, and make an impact.
            </p>
            <p className="text-center font-extralight text-lg mb-8">
            Let&apos;s bring your vision to life. Get in touch and let&apos;s create something remarkable together.
            </p>
            
            <div className="flex justify-center space-x-6 mb-12">
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
                className="text-[#282828] hover:underline"
              >
                linkedin.com/in/magnoaugusto
              </a>
            </div>
          </div>
          
          <footer className="w-full text-center mt-auto animate-from-bottom delay-200">
            <p className="text-sm font-extralight mb-4">© 2025 Magno Augusto Rodrigues</p>
            <div className="flex justify-center space-x-4 text-xs text-gray-500">
              <button 
                onClick={() => scrollToSection('home')}
                className="hover:text-gray-800 transition-colors"
              >
                home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="hover:text-gray-800 transition-colors"
              >
                about me
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="hover:text-gray-800 transition-colors"
              >
                contact me
              </button>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

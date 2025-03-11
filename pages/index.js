import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, MessageCircle, Code, Layers, Zap, BarChart, ChevronRight } from 'lucide-react';

// Components
import Navbar from '../components/NavBar.jsx';
import ContactForm from '../components/ContactForm';
import ReturnPortalToggle from '../components/ReturnPortalToggle';

function ProjectImageCarousel({ lightImages, darkImages, labels }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Ensure we have valid image arrays
  const validLightImages = lightImages || [];
  const validDarkImages = darkImages || validLightImages;

  useEffect(() => {
    // If not hovered, auto-switch images every 5 seconds
    if (!isHovered && validLightImages.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % validLightImages.length);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [isHovered, validLightImages.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % validLightImages.length);
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="block dark:hidden">
        <Image 
          src={validLightImages[currentIndex]}
          alt={labels ? labels[currentIndex] : `Project image ${currentIndex + 1}`}
          width={600}
          height={400}
          className="w-full aspect-video object-cover"
        />
      </div>
      <div className="hidden dark:block">
        <Image 
          src={validDarkImages[currentIndex]}
          alt={labels ? labels[currentIndex] : `Project image ${currentIndex + 1}`}
          width={600}
          height={400}
          className="w-full aspect-video object-cover"
        />
      </div>

      {/* Navigation dots */}
      {validLightImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {validLightImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Next button */}
      {validLightImages.length > 1 && (
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-all duration-300 z-10 opacity-0 group-hover:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight className="text-white w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const videoRefs = useRef([]);
  
  // Projekter data
  const projects = [
    {
      title: "Shopify-system for Unaas Cycling",
      description: "Unaas Cycling brukte flere timer hver dag på manuell ordrehåndtering. Jeg utviklet et skreddersydd system som automatiserte disse prosessene og frigjorde over 15 timer i uken for teamet.",
      images: [
        "/images/unaas_system_wht.png",
        "/images/unaas_system_admin_wht.png",
        "/images/unaas_system_warehouse_wht.png"
      ],
      darkImages: [
        "/images/unaas_system_blk.png",
        "/images/unaas_system_admin_blk.png",
        "/images/unaas_system_warehouse_blk.png"
      ],
      imageLabels: [
        "Hovedoversikt",
        "Admin-panel",
        "Lageroppfølging"
      ],
      tech: ["Shopify", "Automatisering", "Systemintegrasjon"],
      results: [
        { label: "Tidsbesparelse", value: "15+ timer/uke" },
        { label: "Reduserte feil", value: "60%" }
      ]
    },
    {
      title: "Retur-portal for Silly Santa",
      description: "Under utvikling: En skreddersydd returportal som vil eliminere manuelle returprosesser for nettbutikker og gi verdifull innsikt i hvorfor produkter returneres.",
      images: [
        "/images/return_demo.mp4",
        "/images/admin_return.mp4"
      ],
      imageLabels: [
        "Foreløpig demo",
        "Admin dashboard konsept"
      ],
      tech: ["Kundeopplevelse", "Automatisering", "Prosessoptimalisering"],
      results: [
        { label: "Status", value: "Utvikles" },
        { label: "Forventet lansering", value: "Vår 2025" }
      ]
    },
    {
      title: "AI-kundeservice for Silly Santa",
      description: "En intelligent chatbot som kategoriserer og besvarer kundehenvendelser automatisk basert på tidligere svar og bedriftens retningslinjer. Koblet opp mot CRM-systemet slik at kundeservice enkelt kan ta over krevende henvendelser. ",
      image: "/images/sillyAI.mp4",
      isVideo: true,
      tech: ["AI", "Kundeservice", "Integrasjon"],
      results: [
        { label: "Responstid", value: "↓ 70%" },
        { label: "Løsningsgrad", value: " 55%" }
      ]
    },
    {
      title: "PostNord-integrasjon for Unaas",
      description: "Automatisert forsendelsessystem som genererer fraktbrev, håndterer sporing og sender oppdateringer til kundene automatisk.",
      image: "/images/sending_video.mp4",
      isVideo: true,
      tech: ["API-integrasjon", "Logistikk", "Automatisering"],
      results: [
        { label: "Behandlingstid", value: "↓ 70%" },
        { label: "Feilsendinger", value: "↓ 40%" }
      ]
    }
  ];
  
  // Tjenester data
  const services = [
    {
      title: "E-commerce løsninger",
      description: "Jeg utvikler skreddersydde løsninger som gjør nettbutikken din enklere å drive og gir kundene dine en bedre handleopplevelse.",
      icon: <Code className="h-6 w-6" />,
      color: "bg-blue-600 dark:bg-blue-500",
    },
    {
      title: "Systemintegrasjon",
      description: "Jeg får systemene dine til å jobbe sammen, slik at informasjonen flyter problemfritt og du slipper tidkrevende dobbeltarbeid.",
      icon: <Layers className="h-6 w-6" />,
      color: "bg-blue-600 dark:bg-blue-500",
    },
    {
      title: "Automatisering",
      description: "Jeg skaper løsninger som tar seg av de repetitive oppgavene, så du kan bruke tiden din på det som virkelig betyr noe for virksomheten.",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-blue-600 dark:bg-blue-500",
    },
    {
      title: "Tilpassede løsninger",
      description: "Jeg lytter til dine behov og designer tilpassede løsninger som gjør hverdagen din enklere.",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-blue-600 dark:bg-blue-500",
    }
  ];

  // Kundesitater data
  const testimonials = [
    {
      quote: "Henrik har vært superkjapp og enkel å jobbe med, og både kommunikasjon og løsninger har vært 10/10!                       ",
      name: "Kristoffer Wright",
      title: "Co-Founder",
      company: "Silly Santa",
      image: "/images/testimonial-1.png",
    },
    {
      quote: "Superenkelt samarbeid og raske leveranser! Systemet har gjort ordre- og lagerstyringen vår mye enklere og mer oversiktlig.",
      name: "Espen Unaas",
      title: "Daglig leder",
      company: "Unaas Cycling",
      image: "/images/testimonial-2.jpg",
    }
  ];
  
  // Video avspilling
  useEffect(() => {
    // Filter out undefined or null refs so only actual video elements are processed
    const videoElements = videoRefs.current.filter(el => el);
    
    const observers = videoElements.map(videoEl => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            videoEl.play();
          } else {
            videoEl.pause();
            videoEl.currentTime = 0;
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(videoEl);
      return observer;
    });
    
    return () => {
      observers.forEach(observer => observer && observer.disconnect());
    };
  }, []);
  

  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>ithappens | Shopify-utvikling & automatisering</title>
        <meta name="description" content="Jeg hjelper bedrifter med å automatisere arbeid og effektivisere e-handel. Spesialist på Shopify, systemintegrasjon og smarte løsninger." />
        <meta name="keywords" content="Shopify, automatisering, e-handel, systemintegrasjon, kundeservice, Norge" />
        <link rel="icon" href="/favicon.ico" />
        <style jsx global>{`
          html, body {
            overflow-x: hidden;
            position: relative;
            width: 100%;
            max-width: 100vw;
            margin: 0;
            padding: 0;
          }
          html {
            scroll-behavior: smooth;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          .blur-3xl {
            max-width: 100vw;
          }
        `}</style>
      </Head>
      
      <div className="min-h-screen bg-white dark:bg-slate-900 overflow-x-hidden">
        <Navbar onContactClick={() => setIsContactOpen(true)} />
        
{/* Hero Section with 16:9 Image Ratio */}
<section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 -z-10"></div>
    
  {/* Decorative elements */}
  <div className="absolute top-0 right-0 w-2/3 h-2/3 opacity-20 dark:opacity-10 pointer-events-none">
  <div className="absolute right-0 top-0 w-full h-full bg-blue-400 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
</div>

    
  <div className="container mx-auto px-4 md:px-6">
    <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
      <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300 mb-6">
            <span className="mr-1.5">•</span>
            ECOMMERCE & AUTOMATISERING
          </div>
            
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Jeg gjør <span className="text-blue-600 dark:text-blue-400">netthandel enklere</span> for bedrifter
          </h1>
            
          <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
            Jeg bygger smarte løsninger som automatiserer arbeid, eliminerer feil, og lar deg fokusere på å drive virksomheten din.
          </p>
            
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
            >
              Ta kontakt
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
              
            <button 
              onClick={() => scrollToSection('prosjekter')}
              className="px-6 py-3 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-slate-700 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm"
            >
              Se prosjekter
            </button>
          </div>
        </motion.div>
      </div>
        
      <div className="w-full md:w-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-blue-600 rounded-xl blur-xl opacity-10 dark:opacity-20 -m-2"></div>
          <div className="relative rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="h-1.5 bg-blue-600"></div>
            <div className="p-1">
              <div className="flex space-x-1.5 mb-1 px-1.5 pt-1">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
              </div>
                
              <div className="relative aspect-[16/9] bg-slate-50 dark:bg-slate-900 rounded overflow-hidden">
                {/* Use different images based on theme */}
                <div className="hidden dark:block">
                  <Image 
                    src="/images/unaas_system_blk.png"
                    alt="Dashboard example dark"
                    width={1600} 
                    height={900}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="block dark:hidden">
                  <Image 
                    src="/images/unaas_system_wht.png"
                    alt="Dashboard example light"
                    width={1600} 
                    height={900}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-bold text-white">Unaas Cycling sin platform</h3>
                  <p className="text-slate-300 text-sm">Alt av systemer samlet på et sted</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</section>
        
        {/* Tjenester Section with Integrated Results */}
        <section id="tjenester" className="relative pt-16 pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300 mb-4">
                <span className="mr-1.5">•</span>
                TJENESTER
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Hvordan jeg kan hjelpe
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Praktiske løsninger for faktiske utfordringer med resultater du kan måle
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start p-6 md:p-8">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white mr-5 ${service.color}`}>
                      {service.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                        {service.title}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-5">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Decorative blue blob for the section */}
          <div className="absolute top-0 left-0 -z-10 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
            <div className="absolute -left-40 top-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl">            </div>
          </div>
        </section>
        
{/* Fordeler med meg Section */}
<section className="relative py-24 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-end">
              <div>
                <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300 mb-4">
                  <span className="mr-1.5">•</span>
                  FORDELER
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Hvorfor velge meg?
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                  Jeg ser forbi koden til det som virkelig betyr noe - de konkrete resultatene for din bedrift.
                </p>
                
                <ul className="space-y-6">
                  <li className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                        Erfaring fra butikk
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Med bakgrunn fra butikk forstår jeg hverdagens praktiske utfordringer - ikke bare den tekniske siden.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                        Resultater, ikke timer
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        For meg handler det om verdiskapning, ikke fakturerte timer. Hvis løsningen ikke sparer deg for tid eller penger, koster den deg ingenting.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                        Moderne teknologi
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Jeg holder meg oppdatert på det nyeste innen AI og automatisering for å gi deg de smarteste løsningene på markedet.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="self-end"
              >
                <div className="relative rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-blue-600 rounded-xl blur-xl opacity-10 dark:opacity-20 -m-2"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src="/images/slack_bot.mp4" type="video/mp4" />
                      Din nettleser støtter ikke HTML5 video.
                    </video>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Mine Prosjekter Section - Redesigned */}
<section id="prosjekter" className="relative py-24">
  <div className="container mx-auto px-4 md:px-6">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300 mb-4">
        <span className="mr-1.5">•</span>
        PROSJEKTER
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
        Mine tidligere prosjekter
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400">
        Løsninger som har gitt kundene mine mer tid, færre feil og bedre inntjening
    
      </p>
    </div>
    
    {projects.map((project, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-20 last:mb-0"
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-5 px-4 md:px-0">
            {project.title}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className={`${index % 2 === 1 ? 'md:order-last' : ''}`}>
            <div className="overflow-hidden rounded-lg shadow-md">
            {project.title === "Retur-portal for Silly Santa" ? (
  <ReturnPortalToggle
    media={project.images}
    labels={project.imageLabels}
  />
) : project.images ? (
  <ProjectImageCarousel 
    lightImages={project.images} 
    darkImages={project.darkImages} 
    labels={project.imageLabels}
  />
) : project.isVideo ? (
  project.image.includes("sending_video") ? (
    <div className="relative" style={{ aspectRatio: "1918/820" }}>
      <video
        ref={el => {
          if (el && !videoRefs.current.includes(el)) {
            videoRefs.current.push(el);
          }
        }}
        src={project.image}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        Din nettleser støtter ikke videoavspilling.
      </video>
    </div>
  ) : (
    <video
      ref={el => {
        if (el && !videoRefs.current.includes(el)) {
          videoRefs.current.push(el);
        }
      }}
      src={project.image}
      loop
      muted
      playsInline
      className="w-full aspect-video object-cover"
    >
      Din nettleser støtter ikke videoavspilling.
    </video>
  )
) : (
  <Image 
    src={project.image}
    alt={project.title}
    width={600}
    height={400}
    className="w-full aspect-video object-cover"
  />
)}

            </div>
          </div>
            
            <div className="flex flex-col md:px-0">
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-5">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 rounded-full text-sm font-medium text-blue-700 dark:text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {project.results.map((result, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-4 border border-slate-200/50 dark:border-slate-700/50"
                  >
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{result.label}</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {index < projects.length - 1 && (
          <div className="w-24 h-px bg-slate-200 dark:bg-slate-700 mx-auto mt-16"></div>
        )}
      </motion.div>
    ))}
  </div>
  
  <div className="absolute top-1/2 right-0 -z-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-10 dark:opacity-5 transform translate-x-1/3 -translate-y-1/2"></div>
</section>
        
        {/* Kundesitater */}
        <section className="relative py-24 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300 mb-4">
                <span className="mr-1.5">•</span>
                TILBAKEMELDINGER
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Hva kundene sier
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col h-full"
                >
                  <div className="flex-grow">
                    <svg className="h-8 w-8 text-blue-200 dark:text-blue-800 mb-3" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-slate-700 dark:text-slate-300 text-lg">
                      {testimonial.quote}
                    </p>
                  </div>
                  
                  <div className="flex items-center mt-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-slate-200 dark:border-slate-700">
                      <Image 
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-lg">{testimonial.name}</p>
                      <p className="text-blue-600 dark:text-blue-400 text-base">{testimonial.title}, {testimonial.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white dark:bg-slate-900 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-blue-600 opacity-10 dark:opacity-20"></div>
              
              {/* Glass effect card */}
              <div className="relative p-10 md:p-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-center border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-slate-900 dark:text-white">
                  La oss løse utfordringene dine sammen
                </h2>
                <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                  Ta en uforpliktende samtale om hvordan jeg kan hjelpe din virksomhet å spare tid og ressurser.
                </p>
                
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Book samtale
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 -z-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-10 dark:opacity-5 transform -translate-x-1/3 -translate-y-1/2"></div>
        </section>

        {/* Footer med light/dark mode support */}
        <footer className="pt-20 pb-10 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-10 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 text-white dark:bg-blue-600 h-10 w-10 rounded-lg flex items-center justify-center font-bold text-xl shadow-md">it</div>
                <h3 className="text-slate-900 dark:text-white font-bold text-2xl">happens</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Skreddersydde løsninger for nettbutikker og automatisering
                <br />
                <span className="text-sm mt-2 block">Org nr: 934876296</span>
              </p>
                          
              {/* Social media links commented out for now
              <div className="flex space-x-4 mt-6">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition-all duration-300 shadow-sm">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition-all duration-300 shadow-sm">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              */}
            </div>

              <div className="md:col-span-2 grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-xl mb-6">Tjenester</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                    <li>Shopify-utvikling</li>
                    <li>Systemintegrasjon</li>
                    <li>Automatisering</li>
                    <li>E-commerce løsninger</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-xl mb-6">Kontakt</h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <a href="mailto:info@ithappens.no" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        info@ithappens.no
                      </a>
                    </li>
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <span>Oslo, Norge</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-8 text-center text-slate-500 dark:text-slate-400 text-sm">
              © {new Date().getFullYear()} ithappens. Alle rettigheter reservert.
            </div>
          </div>
        </footer>

        {/* Contact Form Modal */}
        <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 dark:hover:bg-blue-700 transition-all duration-300 z-50 opacity-80 hover:opacity-100"
          aria-label="Tilbake til toppen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
        </div>
    </>
  );
}
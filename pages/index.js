import React, { useState, useRef, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Image from 'next/image';
import ContactForm from '../components/ContactForm';
import { useTheme } from '../context/ThemeContext';

const ProjectMedia = ({ project, videoRef }) => {
  const isVideo = project.imageUrl.endsWith('.gif') || project.imageUrl.endsWith('.mp4');

  if (isVideo) {
    return (
      <video
        ref={videoRef}
        src={project.imageUrl.replace('.gif', '.mp4')}
        alt={project.title}
        loop
        muted
        playsInline
        preload="none"
        onLoadedMetadata={(e) => {
          const video = e.target;
          video.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
          video.parentElement.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
        }}
        className="w-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <Image
      src={project.imageUrl}
      alt={project.title}
      width={800}
      height={600}
      className="w-full h-auto object-cover"
    />
  );
};

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { darkMode } = useTheme();
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const projects = [
    {
      title: "Mail Assistent",
      description: "E-post assistenten vår bruker kraftig AI for å generere profesjonelle og personlige e-postutkast for rask og effektiv kommunikasjon med kunder.",
      imageUrl: "/images/mail-assistant.gif",
      tags: ["OpenAI", "Gmail", "Automatisering"],
      reversed: false,
    },
    {
      title: "PostNord Integrasjon",
      description: "Integrert fraktløsning som automatisk håndterer label-generering, sporing og automatiske statusoppdateringer til kunder.",
      imageUrl: "/images/postnord-integration.gif",
      tags: ["PostNord", "API", "Logistikk"],
      reversed: true,
    },
    {
      title: "Skreddersydd Plattform",
      description: "Tilpasset systemintegrasjon som forenkler arbeidsflyten ved å koble sammen alle deres forretningssystemer i ett intuitivt grensesnitt.",
      imageUrl: "/images/custom-plattform.png",
      tags: ["Integrasjon", "Dashboard", "API"],
      reversed: false,
    }
  ];

  // Create refs for video elements
  const videoRefs = useRef(projects.map(() => React.createRef()));

  useEffect(() => {
    const observers = videoRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            ref.current.play();
          } else {
            ref.current.pause();
            ref.current.currentTime = 0;
          }
        },
        { threshold: 0.2 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    // Cleanup observers
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Hero Section */}
      <div id="hero" className="bg-gradient-to-br from-[#1E293B] to-[#334BA1] dark:from-[#0F172A] dark:to-[#1E293B]">
        <NavBar onContactClick={() => setIsContactOpen(true)} />
        
        <section className="relative min-h-screen flex items-center justify-center text-center pt-28 pb-10">
          <Image
            src="/bg_hero.svg"
            alt="Hero background"
            width={900}
            height={800}
            priority
            className="absolute bottom-0 right-0 max-w-xs md:max-w-sm lg:max-w-md -z-10 opacity-60"
          />
          
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <h1 className="font-display font-extrabold text-3xl md:text-5xl mb-4 leading-tight">
              <span className="text-white">Fokuser på det viktigste,</span><br />
              <span className="text-blue-400">la oss automatisere resten</span>
            </h1>

            <p className="text-md md:text-lg text-gray-300 mb-8">
              ithappens effektiviserer driften for små og mellomstore bedrifter, med smarte løsninger 
              for nettbutikk, logistikk og kundeservice.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsContactOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 
                         text-white rounded-lg font-medium transition-all duration-300 
                         shadow-lg hover:shadow-xl hover:to-blue-700">
                Kom i gang
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
              <button 
                onClick={scrollToProjects}
                className="px-8 py-4 bg-white/10 text-white rounded-lg font-medium 
                        hover:bg-white/20 transition-all duration-300 backdrop-blur-sm
                        border border-white/10 hover:border-white/20">
                Se våre løsninger
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Services Section */}
      <section id="services" className="relative py-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Skreddersydde løsninger
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Vi leverer effektive løsninger som vokser med din bedrift
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
          {/* Automation Card */}
          <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-xl p-8 
                        transition-all duration-300 hover:shadow-xl border border-gray-100
                        dark:border-gray-700 flex flex-col">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/50 rounded-lg mb-6 
                          flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Automatisering</h3>
            <p className="text-gray-600 dark:text-gray-300 flex-grow">
              Vi identifiserer flaskehalser og erstatter manuelle prosesser med smarte systemer. 
              Effektiviser arbeidsflyten og frigjør verdifull tid for dine ansatte.
            </p>
          </div>

          {/* System Integration Card */}
          <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-xl p-8 
                        transition-all duration-300 hover:shadow-xl border border-gray-100
                        dark:border-gray-700 flex flex-col">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/50 rounded-lg mb-6 
                          flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Systemintegrasjon</h3>
            <p className="text-gray-600 dark:text-gray-300 flex-grow">
              Vi kobler sammen dine eksisterende systemer for sømløs dataflyt og bedre oversikt. 
              Integrer alt fra ERP og CRM til e-post og regnskapssystemer for optimal effektivitet.
            </p>
          </div>

          {/* Custom Development Card */}
          <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-xl p-8 
                        transition-all duration-300 hover:shadow-xl border border-gray-100
                        dark:border-gray-700 flex flex-col">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/50 rounded-lg mb-6 
                          flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Kundetilpasset Utvikling</h3>
            <p className="text-gray-600 dark:text-gray-300 flex-grow">
              Vi utvikler spesialtilpassede løsninger som møter dine unike behov. Fra enkle verktøy til 
              komplekse forretningssystemer, skreddersydd for å optimalisere din bedrifts prosesser.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative bg-gradient-to-br from-[#1E293B] to-[#334BA1] 
                                      dark:from-[#0F172A] dark:to-[#1E293B]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Se våre løsninger i praksis
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Fra idé til virkelighet, med fokus på verdi og vekst
            </p>
          </div>

          <div className="space-y-24">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  project.reversed ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-12`}
              >
                <div className="flex-1">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl group">
                    {project.imageUrl.endsWith('.png') ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                      />
                    ) : (
                      <video
                        ref={videoRefs.current[index]}
                        src={project.imageUrl.replace('.gif', '.mp4')}
                        alt={project.title}
                        loop
                        muted
                        playsInline
                        preload="none"
                        onLoadedMetadata={(e) => {
                          const video = e.target;
                          video.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
                          video.parentElement.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
                        }}
                        className="w-full object-cover"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B]/20 to-transparent" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-white/10 rounded-full text-sm 
                                text-blue-200 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  {/*<button className="group px-6 py-3 bg-blue-600 text-white rounded-lg font-medium 
                                hover:bg-blue-700 transition-all duration-300">
                    Se mer
                    <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>*/}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Consultation Section */}
      <section id="consultation" className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-900 
                        rounded-xl p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Start med en gratis konsultasjon
            </h3>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Fortell oss om dine utfordringer, og vi hjelper deg å finne den beste løsningen. 
              Du betaler kun for løsninger som gir verdi for din bedrift.
            </p>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium 
                      hover:bg-blue-50 transition-all duration-300">
              Book en uforpliktende samtale
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-br from-[#1E293B] to-[#334BA1] dark:from-[#0F172A] 
                         dark:to-[#1E293B]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-white font-bold text-xl">ithappens</h3>
              </div>
              <p className="text-gray-300">
                Vi hjelper bedrifter med å vokse gjennom smarte IT-løsninger
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">Kontakt</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@ithappens.no
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Oslo, Norge
                </li>
              </ul>
            </div>

            <div className="md:text-right">
              <h4 className="text-white font-bold text-lg mb-6">Bedriftsinformasjon</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300 justify-end">
                  <span>Org.nr: 934 876 296</span>
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </li>
              </ul>
            </div>

            
            {/*<div className="flex flex-col items-end md:text-right">
              <h4 className="text-white font-bold text-lg mb-6">Følg oss</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  GitHub
                </a>
              </div>
            </div> */}
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} ithappens. Alle rettigheter reservert.
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

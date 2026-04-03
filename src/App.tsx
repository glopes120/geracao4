/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Wifi, 
  Car, 
  Utensils, 
  Cake, 
  Coffee, 
  ChevronRight, 
  Instagram, 
  Facebook,
  Menu as MenuIcon,
  X,
  Accessibility,
  Dog,
  Globe,
  ShoppingBag,
  Star,
  Quote
} from "lucide-react";
import { useState, useEffect } from "react";

// --- Translations ---

const translations = {
  en: {
    nav: { home: "Home", menu: "Menu", about: "About", contact: "Contact", book: "Book Now" },
    hero: { subtitle: "Authentic Mediterranean Flavors", title: "Restaurante & Takeaway", brand: "Geração 4", viewMenu: "View Menu", findUs: "Find Us", scroll: "Scroll" },
    features: { homemade: "Homemade", pastries: "Pastries", catering: "Catering", takeaway: "Takeaway" },
    menu: { title: "Our Menu", quote: "\"A traditional kitchen where every dish tells a story of generations.\"", takeawayNote: "Takeaway available for all dishes. Call to order.", orderNow: "Order Now", categories: ["Daily Specials", "Main Courses", "Desserts", "Drinks"] },
    about: { badge: "Our Story", title: "Tradition Passed Down Through Generations", p1: "Located in the heart of Senhora da Hora, Geração 4 is more than just a restaurant. It's a celebration of Portuguese culinary heritage, where recipes have been perfected over decades.", p2: "Our kitchen focuses on freshness and authenticity. We source our ingredients locally, ensuring that every bite of our Mediterranean-inspired dishes brings the true taste of home to your table.", p3: "Whether you're joining us for a relaxed lunch in our outdoor space or ordering a quick takeaway for your family, we treat every guest like a member of our own family.", years: "Years of Tradition", wifi: "Free Wi-Fi", parking: "Free Parking", accessible: "Accessible", pets: "Pet Friendly" },
    contact: { title: "Visit Us", location: "Location", phone: "Phone", hours: "Opening Hours", hoursVal: "Open Daily\n12:00 - 15:30 | 19:00 - 22:30", mapBtn: "Open in Google Maps", mapPlaceholder: "Interactive Map Placeholder" },
    footer: { rights: "All rights reserved.", privacy: "Privacy Policy", terms: "Terms of Service", cookies: "Cookies" },
    takeawayBanner: { title: "Order Takeaway", desc: "Enjoy our authentic flavors at home.", callBtn: "Call to Order" },
    reviews: {
      title: "What Our Guests Say",
      subtitle: "Reviews from TripAdvisor",
      items: [
        { name: "Maria S.", text: "Excellent homemade food. The roasted veal is a must-try. Very friendly and welcoming service.", rating: 5 },
        { name: "João P.", text: "One of the best places in Senhora da Hora for lunch. Unbeatable price/quality. Highly recommend.", rating: 5 },
        { name: "Ana R.", text: "Family atmosphere and food that tastes like home. The desserts are divine, especially the pudding.", rating: 5 }
      ]
    }
  },
  pt: {
    nav: { home: "Início", menu: "Menu", about: "Sobre", contact: "Contacto", book: "Reservar" },
    hero: { subtitle: "Sabores Mediterrânicos Autênticos", title: "Restaurante & Takeaway", brand: "Geração 4", viewMenu: "Ver Menu", findUs: "Onde Estamos", scroll: "Deslizar" },
    features: { homemade: "Caseiro", pastries: "Pastelaria", catering: "Catering", takeaway: "Takeaway" },
    menu: { title: "O Nosso Menu", quote: "\"Uma cozinha tradicional onde cada prato conta uma história de gerações.\"", takeawayNote: "Takeaway disponível para todos os pratos. Ligue para encomendar.", orderNow: "Encomendar Agora", categories: ["Pratos do Dia", "Pratos Principais", "Sobremesas", "Bebidas"] },
    about: { badge: "A Nossa História", title: "Tradição Passada de Geração em Geração", p1: "Localizado no coração da Senhora da Hora, o Geração 4 é mais do que apenas um restaurante. É uma celebração da herança culinária portuguesa, onde as receitas foram aperfeiçoadas ao longo de décadas.", p2: "A nossa cozinha foca-se na frescura e autenticidade. Obtemos os nossos ingredientes localmente, garantindo que cada garfada dos nossos pratos de inspiração mediterrânica traga o verdadeiro sabor de casa à sua mesa.", p3: "Quer se junte a nós para um almoço relaxado no nosso espaço exterior ou encomende um takeaway rápido para a sua família, tratamos cada cliente como um membro da nossa própria família.", years: "Anos de Tradição", wifi: "Wi-Fi Grátis", parking: "Estacionamento", accessible: "Acessível", pets: "Animais Bem-vindos" },
    contact: { title: "Visite-nos", location: "Localização", phone: "Telefone", hours: "Horário de Funcionamento", hoursVal: "Aberto Todos os Dias\n12:00 - 15:30 | 19:00 - 22:30", mapBtn: "Abrir no Google Maps", mapPlaceholder: "Mapa Interativo" },
    footer: { rights: "Todos os direitos reservados.", privacy: "Política de Privacidade", terms: "Termos de Serviço", cookies: "Cookies" },
    takeawayBanner: { title: "Encomendar Takeaway", desc: "Desfrute dos nossos sabores autênticos em casa.", callBtn: "Ligar para Encomendar" },
    reviews: {
      title: "O que dizem os nossos clientes",
      subtitle: "Críticas do TripAdvisor",
      items: [
        { name: "Maria S.", text: "Comida caseira de excelência. A vitela assada é imperdível. Atendimento muito simpático e acolhedor.", rating: 5 },
        { name: "João P.", text: "Um dos melhores sítios na Senhora da Hora para almoçar. Preço/qualidade imbatível. Recomendo vivamente.", rating: 5 },
        { name: "Ana R.", text: "Ambiente familiar e comida com sabor a casa. As sobremesas são divinais, especialmente o pudim.", rating: 5 }
      ]
    }
  }
};

const menuData = {
  en: {
    "Daily Specials": [
      { name: "Bacalhau à Brás", price: "12.50€", desc: "Traditional shredded cod with eggs, potatoes and olives." },
      { name: "Arroz de Pato", price: "11.00€", desc: "Oven-baked duck rice with chorizo and bacon." },
      { name: "Cozido à Portuguesa", price: "14.00€", desc: "Rich stew of various meats and vegetables." },
    ],
    "Main Courses": [
      { name: "Grilled Sea Bass", price: "16.50€", desc: "Fresh sea bass grilled with sea salt and olive oil." },
      { name: "Posta à Mirandesa", price: "18.00€", desc: "Thick grilled veal steak with traditional seasoning." },
      { name: "Vegetarian Risotto", price: "10.50€", desc: "Seasonal vegetable risotto with parmesan." },
    ],
    "Desserts": [
      { name: "Homemade Chocolate Cake", price: "4.50€", desc: "Rich and moist dark chocolate cake." },
      { name: "Pudim Abade de Priscos", price: "5.00€", desc: "Traditional bacon-infused caramel pudding." },
      { name: "Seasonal Fruit Tart", price: "4.00€", desc: "Fresh fruit on a buttery pastry crust." },
    ],
    "Drinks": [
      { name: "House Wine (Red/White)", price: "8.00€", desc: "Selected local wine from the Douro region." },
      { name: "Fresh Orange Juice", price: "3.50€", desc: "Squeezed to order." },
      { name: "Craft Beer", price: "4.00€", desc: "Local artisanal beer selection." },
    ]
  },
  pt: {
    "Pratos do Dia": [
      { name: "Bacalhau à Brás", price: "12.50€", desc: "Bacalhau desfiado tradicional com ovos, batata palha e azeitonas." },
      { name: "Arroz de Pato", price: "11.00€", desc: "Arroz de pato no forno com chouriço e bacon." },
      { name: "Cozido à Portuguesa", price: "14.00€", desc: "Guisado rico de várias carnes e vegetais." },
    ],
    "Pratos Principais": [
      { name: "Robalo Grelhado", price: "16.50€", desc: "Robalo fresco grelhado com sal marinho e azeite." },
      { name: "Posta à Mirandesa", price: "18.00€", desc: "Bife de vitela grelhado espesso com tempero tradicional." },
      { name: "Risotto Vegetariano", price: "10.50€", desc: "Risotto de vegetais da época com parmesão." },
    ],
    "Sobremesas": [
      { name: "Bolo de Chocolate Caseiro", price: "4.50€", desc: "Bolo de chocolate preto rico e húmido." },
      { name: "Pudim Abade de Priscos", price: "5.00€", desc: "Pudim de caramelo tradicional com infusão de toucinho." },
      { name: "Tarte de Fruta da Época", price: "4.00€", desc: "Fruta fresca sobre uma base de massa amanteigada." },
    ],
    "Bebidas": [
      { name: "Vinho da Casa (Tinto/Branco)", price: "8.00€", desc: "Vinho local selecionado da região do Douro." },
      { name: "Sumo de Laranja Natural", price: "3.50€", desc: "Espremido na hora." },
      { name: "Cerveja Artesanal", price: "4.00€", desc: "Seleção de cervejas artesanais locais." },
    ]
  }
};

// --- Components ---

const Navbar = ({ lang, setLang, t }: { lang: 'en' | 'pt', setLang: (l: 'en' | 'pt') => void, t: any }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.menu, href: "#menu" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-stone-950/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="font-serif text-2xl font-bold tracking-tight text-white">
          Geração <span className="text-brand-600">4</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium uppercase tracking-widest transition-colors hover:text-brand-600 text-white/90"
            >
              {link.name}
            </a>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center space-x-2 border-l border-white/20 pl-8 ml-2">
            <button 
              onClick={() => setLang('en')}
              className={`text-xs font-bold transition-colors ${lang === 'en' ? 'text-brand-600' : 'text-white/50 hover:text-white'}`}
            >
              EN
            </button>
            <span className="text-white/20">|</span>
            <button 
              onClick={() => setLang('pt')}
              className={`text-xs font-bold transition-colors ${lang === 'pt' ? 'text-brand-600' : 'text-white/50 hover:text-white'}`}
            >
              PT
            </button>
          </div>

          <a 
            href="tel:229512009" 
            className="px-6 py-2 rounded-full text-sm font-semibold transition-all bg-brand-600 text-white hover:bg-brand-700"
          >
            {t.nav.book}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
           <button 
            onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
            className="p-2 rounded-full border border-white/20 text-white"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button 
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-stone-900 shadow-2xl overflow-hidden md:hidden border-b border-white/10"
          >
            <div className="p-6 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-xl font-serif font-bold text-white border-b border-white/5 pb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="tel:229512009" 
                className="w-full bg-brand-600 text-white py-4 rounded-2xl text-center font-bold text-lg shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.book}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ t }: { t: any }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/portuguese-food/1920/1080" 
          alt="Traditional Portuguese Table" 
          className="w-full h-full object-cover brightness-50"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block text-brand-400 font-serif italic text-xl mb-4"
        >
          {t.hero.subtitle}
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-bold leading-tight mb-8"
        >
          {t.hero.title} <br />
          <span className="text-stone-100">{t.hero.brand}</span>
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#menu" className="w-full sm:w-auto px-10 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-bold transition-all transform hover:scale-105">
            {t.hero.viewMenu}
          </a>
          <a href="#contact" className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 rounded-full font-bold transition-all">
            {t.hero.findUs}
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-px h-12 bg-white/30 mx-auto mb-2" />
        <span className="text-[10px] uppercase tracking-[0.3em]">{t.hero.scroll}</span>
      </motion.div>
    </section>
  );
};

const MenuSection = ({ lang, t }: { lang: 'en' | 'pt', t: any }) => {
  const categories = t.menu.categories;
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Update active category when language changes
  useEffect(() => {
    setActiveCategory(categories[0]);
  }, [lang, categories]);

  const currentMenu = menuData[lang] as Record<string, any[]>;

  return (
    <section id="menu" className="py-24 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">{t.menu.title}</h2>
          <p className="text-stone-400 max-w-xl mx-auto italic">
            {t.menu.quote}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? "bg-brand-600 text-white" : "bg-stone-900 text-stone-400 border border-white/10 hover:border-white/30"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {currentMenu[activeCategory as keyof typeof currentMenu]?.map((item: any, idx: number) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-stone-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-white/5 flex justify-between items-start group hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-brand-500 transition-colors">{item.name}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
              <span className="text-lg font-bold text-white ml-4">{item.price}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-stone-500 text-sm mb-6">{t.menu.takeawayNote}</p>
          <a href="tel:229512009" className="inline-flex items-center text-white font-bold hover:text-brand-500 transition-colors">
            {t.menu.orderNow} <ChevronRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ t }: { t: any }) => {
  return (
    <section id="about" className="py-24 bg-stone-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square md:aspect-[3/4] rounded-[40px] overflow-hidden"
          >
            <img 
              src="https://picsum.photos/seed/chef/800/1200" 
              alt="Our Kitchen" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -bottom-10 -right-10 bg-brand-600 text-white p-10 rounded-[40px] hidden lg:block">
            <span className="block text-4xl font-bold mb-1">20+</span>
            <span className="text-sm uppercase tracking-widest font-medium">{t.about.years}</span>
          </div>
        </div>

        <div>
          <span className="text-brand-500 font-bold uppercase tracking-widest text-xs mb-4 block">{t.about.badge}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
            {t.about.title}
          </h2>
          <div className="space-y-6 text-stone-400 leading-relaxed">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center text-white">
                <Wifi className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-stone-200">{t.about.wifi}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center text-white">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-stone-200">{t.about.parking}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center text-white">
                <Accessibility className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-stone-200">{t.about.accessible}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center text-white">
                <Dog className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-stone-200">{t.about.pets}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TakeawayBanner = ({ t }: { t: any }) => {
  return (
    <section className="py-16 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-stone-900 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative border border-white/5">
          {/* Decorative Background Icon */}
          <ShoppingBag className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 -rotate-12" />
          
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">{t.takeawayBanner.title}</h2>
            <p className="text-stone-400 max-w-md">{t.takeawayBanner.desc}</p>
          </div>
          
          <div className="relative z-10">
            <a 
              href="tel:229512009" 
              className="inline-flex items-center px-10 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-bold transition-all transform hover:scale-105"
            >
              <Phone className="w-5 h-5 mr-3" />
              {t.takeawayBanner.callBtn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = ({ t }: { t: any }) => {
  return (
    <section className="py-24 bg-stone-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-500 font-bold uppercase tracking-widest text-xs mb-4 block">{t.reviews.subtitle}</span>
          <h2 className="text-4xl font-serif font-bold text-white mb-4">{t.reviews.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.reviews.items.map((review: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-stone-950 p-8 rounded-3xl border border-white/5 relative"
            >
              <Quote className="absolute top-6 right-8 w-8 h-8 text-brand-600/20" />
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-500 fill-brand-500" />
                ))}
              </div>
              <p className="text-stone-300 italic mb-6 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-brand-500 font-bold mr-3">
                  {review.name.charAt(0)}
                </div>
                <span className="font-bold text-white">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ t }: { t: any }) => {
  return (
    <section id="contact" className="py-24 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8">{t.contact.title}</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-brand-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">{t.contact.location}</h4>
                    <p className="text-stone-400 text-sm">Senhora da Hora, Matosinhos<br />Porto, Portugal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-brand-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">{t.contact.phone}</h4>
                    <p className="text-stone-400 text-sm">229 512 009</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-brand-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">{t.contact.hours}</h4>
                    <p className="text-stone-400 text-sm whitespace-pre-line">{t.contact.hoursVal}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="w-full h-full min-h-[300px] sm:min-h-[400px] bg-stone-800 rounded-[40px] overflow-hidden relative border border-white/5">
              <div className="absolute inset-0 flex items-center justify-center text-stone-600 flex-col p-12 text-center">
                <MapPin className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm font-medium">{t.contact.mapPlaceholder}</p>
                <p className="text-xs mt-2 opacity-50">Senhora da Hora, Matosinhos</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Restaurante+Take+Away+Geração+4+Senhora+da+Hora" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-8 px-8 py-3 bg-white text-stone-900 rounded-full font-bold text-sm"
                >
                  {t.contact.mapBtn}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ t }: { t: any }) => {
  return (
    <footer className="bg-stone-950 text-stone-500 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-serif text-xl font-bold text-white">
          Geração <span className="text-brand-600">4</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 text-xs uppercase tracking-widest font-medium">
          <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
          <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
          <a href="#" className="hover:text-white transition-colors">{t.footer.cookies}</a>
        </div>

        <p className="text-xs">
          © {new Date().getFullYear()} Geração 4. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<'en' | 'pt'>('pt');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-stone-950 font-sans selection:bg-brand-200 selection:text-brand-900 text-white overflow-x-hidden">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        
        {/* Features Bar */}
        <div className="bg-stone-900 py-12 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <Utensils className="w-6 h-6 text-brand-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">{t.features.homemade}</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Cake className="w-6 h-6 text-brand-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">{t.features.pastries}</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Coffee className="w-6 h-6 text-brand-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">{t.features.catering}</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <ShoppingBag className="w-6 h-6 text-brand-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">{t.features.takeaway}</span>
            </div>
          </div>
        </div>

        <MenuSection lang={lang} t={t} />
        <AboutSection t={t} />
        <ReviewsSection t={t} />
        <TakeawayBanner t={t} />
        <ContactSection t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import emailjs from '@emailjs/browser';
import { Calendar, MapPin, Users, Utensils, DollarSign, Bike, Zap, Fuel, Shield, Clock, Heart, Flame, Battery } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { images } from '../utils/images';
import { toast } from 'sonner';
import { InteractiveParticles } from './InteractiveParticles';
import { AnimatedBackground } from './AnimatedBackground';
import { ScrollProgress } from './ScrollProgress';
import { CountdownTimer } from './CountdownTimer';
import { Confetti } from './Confetti';
import console from 'console';

interface FormData {
  name: string;
  people: string;
  children: string;
}

export function BirthdayInvite() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    people: '',
    children: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  // Verificar localStorage ao carregar
  useEffect(() => {
    const confirmed = localStorage.getItem('birthdayConfirmation');
    if (confirmed) {
      const confirmationData = JSON.parse(confirmed);
      setFormData(confirmationData);
      setIsSubmitted(true);
      setHasConfirmed(true);
    }
  }, []);

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init("iU-8NkPbk4qOuHhDv");
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.people) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsSendingEmail(true);

    try {
      const templateParams = {
        to_email: 'cleiton.dev.pt@gmail.com',
        from_name: formData.name,
        people_count: formData.people,
        children_count: formData.children || 'Não informado',
        event_date: '13 de Setembro, 2025 às 19:00h',
        event_location: 'Restaurante Sabores da Romeira - Av. João das Regras 30, Coimbra',
        message: `Nova confirmação de presença para o aniversário do Cleiton!
        
Nome: ${formData.name}
Número de pessoas: ${formData.people}
Crianças: ${formData.children || 'Não informado'}
Data do evento: 13 de Setembro, 2025 às 19:00h
Local: Restaurante Sabores da Romeira - Av. João das Regras 30, Coimbra

Confirmação enviada em: ${new Date().toLocaleString('pt-BR', { timeZone: 'Europe/Lisbon' })}`
      };

      await emailjs.send(
        'service_66a2d7e', 
        'template_g3ghbyj', 
        templateParams
      );

      // Salvar no localStorage
      localStorage.setItem('birthdayConfirmation', JSON.stringify(formData));
      
      setIsSubmitted(true);
      setHasConfirmed(true);
      setShowConfetti(true);
      setShowSuccessModal(true);
      toast.success(`Obrigado ${formData.name}! Sua confirmação foi registrada e enviada por email.`);
      
      console.log('Email enviado com sucesso:', formData);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      toast.error('Erro ao enviar confirmação. Tente novamente.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Função para ativar confetti quando o scroll completar
  const handleScrollComplete = () => {
    setShowConfetti(true);
  };

  // Event date for countdown (13 de Setembro, 2025 às 19h em Lisboa)
  const eventDate = new Date('2025-09-13T19:00:00+01:00'); // Fuso horário de Lisboa (UTC+1)

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Confetti Effect */}
      
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Interactive Particles */}
      <InteractiveParticles />
      
      {/* Scroll Progress */}
      <ScrollProgress onComplete={handleScrollComplete} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header Section with Parallax */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          style={{ y: y1 }}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ 
              scale: 1.1,
              rotateY: 15,
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)"
            }}
            style={{ perspective: '1000px' }}
          >
            <motion.div
              animate={{ 
                rotate: [0, -5, 5, -5, 0],
                scale: [1, 1.05, 1, 1.05, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
                                      <ImageWithFallback 
                          src={images.imgMotorcycle}
                          alt="Motorcycle Rider"
                          className="w-64 h-64 md:w-64 md:h-64 rounded-full object-cover mx-auto shadow-2xl border-4 border-white/80 backdrop-blur-sm"
                        />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-slate-700 to-blue-800 bg-clip-text text-transparent mb-6"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity
            }}
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
            }}
          >
            Você e sua família estão convidados!
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-3xl text-gray-700 mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            🏍️ Aniversário do Cleiton 🏍️
          </motion.p>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Acelere conosco nesta celebração especial!
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">⏰ Contagem Regressiva</h3>
            <CountdownTimer targetDate={eventDate} />
          </motion.div>
        </motion.div>

        {/* Personal Invitation Message */}
        <motion.div 
          className="mb-8 md:mb-12 text-center"
          style={{ y: y2 }}
          initial={isFirstLoad ? { 
            opacity: 0, 
            scale: 0.3, 
            rotateY: -180,
            rotateX: 45
          } : { opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
            rotateX: 0,
            y: 0 
          }}
          transition={isFirstLoad ? { 
            duration: 1.5, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
            damping: 15
          } : { duration: 0.8 }}
          viewport={{ once: true }}
          onAnimationComplete={() => setIsFirstLoad(false)}
        >
          <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-2 border-purple-200 overflow-hidden max-w-4xl mx-auto relative">
            {/* Special first-load effects */}
            {isFirstLoad && (
              <>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 opacity-30 blur-sm"
                  animate={{ 
                    scale: [1, 1.02, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </>
            )}
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-purple-50/30"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.1))",
                  "linear-gradient(225deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.1))",
                  "linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.1))"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <CardContent className="py-8 md:py-12 px-6 md:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: isFirstLoad ? 0.8 : 0.2, duration: 0.8 }}
                className="text-center space-y-6"
              >
                {/* Icon */}
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex justify-center"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-4 rounded-full shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Main Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: isFirstLoad ? 1.0 : 0.4, duration: 0.8 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Um Convite Especial do Coração
                  </h3>
                  
                  <motion.div 
                    className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-4 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: isFirstLoad ? 1.2 : 0.6, duration: 1 }}
                  >
                    <p>
                      🏍️ <strong>Querido amigo,</strong> este não é apenas mais um convite...
                    </p>
                    
                    <p>
                      É um pedido sincero do meu coração para que você faça parte de um momento muito especial na minha vida. 
                      Assim como cada quilômetro percorrido nas estradas se torna mais significativo quando compartilhado, 
                      esta celebração só fará sentido completo com a sua presença.
                    </p>
                    
                    <motion.p
                      className="text-blue-600 font-semibold text-xl"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🎉 Eu gostaria MUITO que você estivesse aqui festejando comigo! 🎉
                    </motion.p>
                    
                    <p>
                      Venha acelerar junto comigo nesta nova volta ao redor do sol. 
                      Sua amizade é o combustível que torna esta jornada ainda mais especial.
                    </p>
                  </motion.div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: isFirstLoad ? 1.4 : 0.8, duration: 0.6 }}
                  className="flex justify-center items-center gap-4 pt-4"
                >
                
                  
                  <div className="flex gap-1">
                    {['❤️', '🎂', '🎉'].map((emoji, index) => (
                      <motion.span
                        key={emoji}
                        animate={{ 
                          scale: [1, 1.3, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                        className="text-xl"
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>
                  
                  <motion.span
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="text-2xl"
                  >
                    🏁
                  </motion.span>
                </motion.div>

                {/* Signature */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: isFirstLoad ? 1.6 : 1.0, duration: 0.8 }}
                  className="pt-6 border-t border-gray-200 mt-8"
                >
                  <p className="text-gray-600 italic">
                    Com carinho e expectativa,
                  </p>
                  <p className="text-lg font-semibold text-purple-600 mt-1">
                    Cleiton 🏍️
                  </p>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Event Details Grid with Enhanced 3D Effects */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-12"
          style={{ y: y1 }}
        >
          {[
            {
              icon: Calendar,
              title: "Data & Horário",
              content: ["Sábado, 13 de Setembro", "às 19:00h"],
              color: "blue",
              delay: 0.8,
              clickable: true,
              address: "Av. João das Regras 30, 3040-256 Coimbra, Portugal"
            },
            {
              icon: MapPin,
              title: "Local",
              content: ["Av. João das Regras 30, 3040-256 Coimbra, Portugal"],
              color: "slate",
              delay: 1.0,
              clickable: false,
              hasLogo: true,
              websiteUrl: "https://saboresdaromeira.pt/menu-peixe-saboresdaromeira.html"
            },
            {
              icon: DollarSign,
              title: "Investimento",
              content: ["25,00€", "por adulto"],
              color: "gray",
              delay: 1.2,
              clickable: false
            }
          ].map((item, index) => {
            const CardWrapper = item.clickable ? motion.a : motion.div;
            const cardProps = item.clickable ? {
              href: `https://www.google.com/maps/place/Restaurante+Sabores+da+Romeira/@40.2043678,-8.432494,17z/data=!3m1!4b1!4m6!3m5!1s0xd22fb880dde9843:0x9314d12eb95ed384!8m2!3d40.2043678!4d-8.432494!16s%2Fg%2F11gyyx8l50?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "block"
            } : {};

            return (
              <CardWrapper
                key={item.title}
                {...cardProps}
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: item.delay, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  rotateX: 5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                  z: 50
                }}
                style={{ 
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
                viewport={{ once: true }}
              >
                <Card className={`bg-white/90 backdrop-blur-lg border-2 border-${item.color}-300 shadow-xl h-full relative overflow-hidden ${item.clickable ? 'cursor-pointer hover:border-blue-400 transition-colors' : ''}`}>
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 opacity-50`}
                    animate={{
                      background: [
                        `linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(30, 64, 175, 0.1))`,
                        `linear-gradient(225deg, rgba(59, 130, 246, 0.1), rgba(30, 64, 175, 0.1))`,
                        `linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(30, 64, 175, 0.1))`
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  <CardHeader className="text-center pb-3 relative z-10">
                    {item.hasLogo ? (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-3"
                      >
                        <ImageWithFallback 
                          src={images.logotipoRestaurante}
                          alt="Logo Restaurante Sabores da Romeira"
                          className="w-48 h-20 mx-auto object-contain"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className={`w-10 h-10 text-${item.color}-600 mx-auto mb-2`} />
                      </motion.div>
                    )}
                    <CardTitle className={`text-${item.color}-700`}>
                      {item.title}
                      {item.clickable && (
                        <span className="block text-xs text-gray-500 mt-1">
                          Clique para ver no mapa
                        </span>
                      )}
                      {item.hasLogo && (
                        <span className="block text-xs text-gray-500 mt-1">
                          Restaurante Sabores da Romeira
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0 relative z-10">
                    {item.content.map((line, i) => (
                      <motion.p 
                        key={i}
                        className={i === 0 ? "font-semibold" : ""}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: item.delay + (i * 0.1) }}
                      >
                        {line}
                      </motion.p>
                    ))}
                    {item.clickable && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: item.delay + 0.3 }}
                        className="mt-2"
                      >
                        <motion.span
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          Clique aqui para ver no mapa
                        </motion.span>
                      </motion.div>
                    )}
                    {item.websiteUrl && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: item.delay + 0.3 }}
                        className="mt-3"
                      >
                        <motion.a
                          href={item.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span>🌐 Site do Restaurante</span>
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </motion.a>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </CardWrapper>
            );
          })}
        </motion.div>
      

        {/* Menu Section with Enhanced Animations */}
        <motion.div 
          className="mb-8 md:mb-12"
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-2 border-gray-200 overflow-hidden">
            <CardHeader className="text-center relative">
              <motion.div 
                className="flex items-center justify-center gap-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Utensils className="w-8 h-8 text-slate-600" />
                </motion.div>
                <CardTitle className="text-slate-700 text-xl md:text-2xl">Menu Livre (a vontade)</CardTitle>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-lg"
              >
                <ImageWithFallback 
                  src={images.imgRestaurant}
                  alt="Elegant restaurant interior"
                  className="w-full object-cover"
                  style={{ height: '800px' }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"
                  animate={{ opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                  { title: "🍽️ Pratos Principais", items: ["Picanha", "Batata frita", "Salada", "Arroz de Feijão", "Espetada Terra Mar" ] },
                  { title: "🥤 Bebidas", items: ["Refrigerantes", "Água", "Bebidas alcoólicas (Sangria, Fino)"] }
                ].map((section, sectionIndex) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIndex * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: "rgba(100, 116, 139, 0.05)"
                    }}
                    className="p-3 rounded-lg transition-all duration-300"
                  >
                    <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-gray-800">{section.title}</h3>
                    <ul className="space-y-1 text-gray-700 text-sm md:text-base">
                      {section.items.map((item, itemIndex) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                          whileHover={{ x: 5, color: "#3B82F6" }}
                        >
                          • {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RSVP Form with Advanced Interactions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-2 border-blue-200 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-slate-50/20"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(100, 116, 139, 0.05))",
                  "linear-gradient(225deg, rgba(59, 130, 246, 0.05), rgba(100, 116, 139, 0.05))",
                  "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(100, 116, 139, 0.05))"
                ]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            <CardHeader className="text-center relative z-10">
              <motion.div 
                className="flex items-center justify-center gap-2 mb-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Users className="w-8 h-8 text-blue-600" />
                </motion.div>
                <CardTitle className="text-blue-700 text-2xl md:text-3xl lg:text-4xl">Confirmação de Presença</CardTitle>
              </motion.div>
              <p className="text-gray-600 text-base md:text-lg">
                {hasConfirmed 
                  ? "Obrigado pela confirmação! Te espero lá!" 
                  : "Por favor, confirme sua presença até 31 de Agosto"
                }
              </p>
            </CardHeader>
            <CardContent className="relative z-10">
              {!hasConfirmed ? (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-4 md:space-y-6 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[
                    {
                      id: "name",
                      label: "Nome *",
                      type: "input",
                      placeholder: "Digite seu nome",
                      required: true
                    },
                    {
                      id: "people",
                      label: "Quantas pessoas irão? *",
                      type: "select",
                      options: [
                        { value: "1", label: "1 pessoa" },
                        { value: "2", label: "2 pessoas" },
                        { value: "3", label: "3 pessoas" },
                        { value: "4", label: "4 pessoas" },
                        { value: "5", label: "5+ pessoas" }
                      ],
                      placeholder: "Selecione o número de pessoas",
                      required: true
                    },
                    {
                      id: "children",
                      label: "Alguma criança acompanha?",
                      type: "select",
                      options: [
                        { value: "no", label: "Não, apenas adultos" },
                        { value: "1", label: "Sim, 1 criança" },
                        { value: "2", label: "Sim, 2 crianças" },
                        { value: "3+", label: "Sim, 3+ crianças" }
                      ],
                      placeholder: "Selecione uma opção"
                    }
                  ].map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Label htmlFor={field.id} className="text-gray-700 text-base md:text-lg font-medium">{field.label}</Label>
                      {field.type === "input" ? (
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            id={field.id}
                            type="text"
                            value={formData[field.id as keyof FormData]}
                            onChange={(e) => handleInputChange(field.id as keyof FormData, e.target.value)}
                            placeholder={field.placeholder}
                            className="mt-1 text-base md:text-lg py-3"
                            required={field.required}
                          />
                        </motion.div>
                      ) : (
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Select onValueChange={(value) => handleInputChange(field.id as keyof FormData, value)}>
                            <SelectTrigger className="mt-1 text-base md:text-lg py-3">
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-4"
                  >
                    <Button 
                      type="submit" 
                      disabled={isSendingEmail}
                      className="w-full bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white py-4 text-lg md:text-xl font-semibold relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-slate-600"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        style={{ opacity: 0.3 }}
                      />
                      {isSendingEmail ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            ⏳
                          </motion.div>
                          Enviando confirmação...
                        </span>
                      ) : (
                        "🏍️ Confirmar Presença 🏍️"
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div 
                  className="text-center py-6 md:py-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
                    }}
                  >
                  </motion.div>
                  <motion.h3 
                    className="text-xl md:text-2xl font-bold text-blue-700 mb-2"
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Presença Confirmada!
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mb-4 text-sm md:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Obrigado, {formData.name}! Estamos ansiosos para celebrar com você.
                  </motion.p>
                  <motion.div 
                    className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-lg text-sm md:text-base border border-blue-100"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <p><strong>Nome:</strong> {formData.name}</p>
                    <p><strong>Pessoas:</strong> {formData.people}</p>
                    <p><strong>Crianças:</strong> {formData.children || 'Não informado'}</p>
                  </motion.div>

                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>



        {/* Footer */}
        <motion.div 
          className="text-center mt-8 md:mt-12 py-6 md:py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-gray-600 text-base md:text-lg"
            whileHover={{ scale: 1.05, color: "#3B82F6" }}
          >
            Obrigado Amigo! 
          </motion.p>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Para dúvidas: 962 831 211 
          </p>
        </motion.div>
      </div>

      {/* Success Modal Popup */}
      {showSuccessModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
            initial={{ scale: 0.5, rotateY: 90 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 0.5, rotateY: -90 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Background Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                  "linear-gradient(225deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1), rgba(34, 197, 94, 0.1))",
                  "linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="relative z-10 text-center">
              {/* Success Icon */}
              <motion.div
                className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <span className="text-white text-4xl">🎉</span>
              </motion.div>

              {/* Title */}
              <motion.h2
                className="text-2xl font-bold text-gray-800 mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                🎉 Confirmação Enviada!
              </motion.h2>

              {/* Message */}
              <motion.p
                className="text-gray-600 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Obrigado, <strong>{formData.name}</strong>! Sua confirmação foi registrada com sucesso ! .
              </motion.p>

              {/* Details */}
              <motion.div
                className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg mb-6 border border-blue-200"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Nome:</strong> {formData.name}</p>
                  <p><strong>Pessoas:</strong> {formData.people}</p>
                  <p><strong>Crianças:</strong> {formData.children || 'Não informado'}</p>
                  <p><strong>Data:</strong> 13 de Setembro, 2025 às 19:00h</p>
                </div>
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ✨ Fechar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import {
  Globe, Menu, X, Calendar, Mail, Download,
  Briefcase, Code2, Zap, Database, Brain,
  Phone, Workflow, GraduationCap, Linkedin, ChevronRight,
  Server, AppWindow, Pill, Bot, MessageSquare
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
// Removed Radix Dialog in favor of custom MeetingModal for Calendly
import { MeetingModal } from './components/MeetingModal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';

import './App.css';
import { SiteBackground } from './components/ui/site-background';

const content = {
  en: {
    nav: {
      projects: 'Projects',
      skills: 'Skills',
      about: 'About',
    },
    hero: {
      title: 'Abdullah Aboueleila',
      subtitle: 'Software Developer | .NET & AI Automation Specialist',
      tagline: 'I build custom business applications using .NET and develop AI automation systems that boost sales, customer support, and lead generation. I work fast and deliver results.',
      viewProjects: 'View Projects',
      downloadCV: 'Download CV',
      email: 'Email',
    },
    projects: {
      title: 'Projects',
      filterAll: 'AI Agents & Voice',
      filterEnterprise: '.NET Enterprise Apps',
      filterAutomation: 'Automation Workflows',
      tryDemo: 'Try a Demo',
    },
    skills: {
      title: 'Skills & Technologies',
      languagesFrameworks: 'Languages & Frameworks',
      databases: 'Databases',
      automationAI: 'Automation & AI',
      tools: 'Tools',
    },
    about: {
      title: 'About',
      bio: 'Passionate software developer with expertise in building robust .NET enterprise applications and cutting-edge AI automation solutions. I specialize in creating compliant, scalable business systems and intelligent voice agents that streamline operations and enhance user experiences.',
      education: 'Bachelor of Computer Science',
      bookMeeting: 'Book a meeting',
    },
    contact: {
      title: 'Get In Touch',
      bookMeeting: 'Book a meeting',
      footerText: '©Abdullah Aboueleila. All rights reserved.',
    },
    chatLabel: 'talk to Lara Abdullah\'s Ai assistant',
    calendlyTitle: 'Schedule a Meeting',
  },
  ar: {
    nav: {
      projects: 'المشاريع',
      skills: 'المهارات',
      about: 'عن',
    },
    hero: {
      title: 'عبدالله ابو العلا',
      subtitle: 'مطور برمجيات | .NET وأتمتة الذكاء الاصطناعي',
      tagline: 'أبني تطبيقات أعمال مخصّصة باستخدام ‎.NET وأطوّر أنظمة أتمتة بالذكاء الاصطناعي تُعزّز المبيعات ودعم العملاء وتوليد العملاء المحتملين. أعمل بسرعة وأحقق النتائج.',
      viewProjects: 'عرض المشاريع',
      downloadCV: 'تحميل السيرة الذاتية',
      email: 'البريد الإلكتروني',
    },
    projects: {
      title: 'المشاريع',
      filterAll: 'وكلاء الذكاء الاصطناعي والصوت',
      filterEnterprise: 'تطبيقات .NET المؤسسية',
      filterAutomation: 'سير عمل الأتمتة',
      tryDemo: 'جرّب العرض التوضيحي',
    },
    skills: {
      title: 'المهارات والتقنيات',
      languagesFrameworks: 'اللغات والأطر',
      databases: 'قواعد البيانات',
      automationAI: 'الأتمتة والذكاء الاصطناعي',
      tools: 'الأدوات',
    },
    about: {
      title: 'نبذة',
      bio: 'مطور برمجيات شغوف بخبرة في بناء تطبيقات .NET المؤسسية القوية وحلول الأتمتة المتطورة بالذكاء الاصطناعي. أتخصص في إنشاء أنظمة أعمال متوافقة وقابلة للتوسع ووكلاء صوتيين أذكياء تبسط العمليات وتحسن تجارب المستخدمين.',
      education: 'بكالوريوس علوم الحاسوب',
      bookMeeting: 'حجز اجتماع',
    },
    contact: {
      title: 'تواصل معي',
      bookMeeting: 'حجز اجتماع',
      footerText: '©عبدالله ابو العلا. جميع الحقوق محفوظة.',
    },
    chatLabel: 'تحدث إلى لارا، مساعدة عبدالله بالذكاء الاصطناعي',
    calendlyTitle: 'جدولة اجتماع',
  },
};

const projectsData = {
  en: [
    {
      id: 'hr-payroll',
      category: 'enterprise',
      icon: <Briefcase className="w-6 h-6" />,
      title: 'HR & Payroll System (KSA-Compliant)',
      tech: '.NET WinForms + SQL Server',
      impact: 'Streamlined payroll processing for 500+ employees with full GOSI/EOSB compliance',
      bullets: [
        'Automated monthly payroll cycles with GOSI and EOSB calculations',
        'Bilingual (EN/AR) interface with DevExpress dashboards',
        'Role-based approval workflows reducing processing time by 60%',
        'Real-time reports and audit trails for compliance',
        'Same-day payroll processing capability'
      ],
      demoUrl: null,
    },
    {
      id: 'pos',
      category: 'enterprise',
      icon: <AppWindow className="w-6 h-6" />,
      title: 'Point of Sale System',
      tech: '.NET + SQL Server',
      impact: 'Fast checkout solution handling 1000+ daily transactions',
      bullets: [
        'Intuitive checkout interface with barcode scanning',
        'Real-time inventory tracking and low-stock alerts',
        'Comprehensive sales reporting and analytics',
        'Role-based access control for staff management',
        'Thermal receipt printing with customizable templates'
      ],
      demoUrl: null,
    },
    {
      id: 'pharmacy',
      category: 'enterprise',
      icon: <Pill className="w-6 h-6" />,
      title: 'Pharmacy Label System (KSA)',
      tech: 'Oracle APEX + PLSQL',
      impact: 'Automated MoH-compliant medication labeling for pharmacy operations',
      bullets: [
        'Ministry of Health approved label templates',
        'Batch printing for high-volume prescriptions',
        'Arabic/English medication information display',
        'Complete audit trails for regulatory compliance',
        'Exportable reports for inventory and dispensing'
      ],
      demoUrl: null,
    },
    {
      id: 'gym-agent',
      category: 'ai-voice',
      icon: <Bot className="w-6 h-6" />,
      title: 'Third Space Gym AI Agent',
      tech: 'Voiceflow + Make.com',
      impact: 'Reduced member inquiry response time from hours to seconds',
      bullets: [
        '24/7 automated responses to member FAQs',
        'Quick triage and routing to appropriate staff',
        'Booking handoff to scheduling system',
        'Membership and class information retrieval',
        'Natural conversational experience'
      ],
      demoUrl: 'https://creator.voiceflow.com/share/67a37fd3f69950c7dd9cba65/development',
    },
    {
      id: 'pets-lulu',
      category: 'ai-voice',
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Pets at Home AI Assistant "Lulu"',
      tech: 'Voiceflow',
      impact: 'Handling 200+ customer inquiries daily with 95% satisfaction',
      bullets: [
        '24/7 pet care guidance and product recommendations',
        'Store availability and location services',
        'Gentle upselling with personalized suggestions',
        'Multi-channel deployment (web, mobile, social)',
        'Continuous learning from customer interactions'
      ],
      demoUrl: 'https://creator.voiceflow.com/share/678fb5b32e62086e28af31e4/development',
    },
    {
      id: 'ra-sushi',
      category: 'ai-voice',
      icon: <Phone className="w-6 h-6" />,
      title: 'RA Sushi AI Voice Receptionist',
      tech: 'Vapi + Make.com',
      impact: 'Automated 80% of inbound calls, freeing staff for in-person service',
      bullets: [
        'Natural voice conversations for reservations',
        'Real-time booking capture and confirmation',
        'Order-taking with special requests handling',
        'CRM integration for customer notes',
        'Seamless human handoff when needed'
      ],
      demoUrl: 'https://vapi.ai?demo=true&shareKey=979f21cd-bab2-4a42-96db-be094ca2a641&assistantId=147e3edd-81d2-4dfb-a07c-6a9ab3e8fdf9',
    },
    {
      id: 'b2b-outreach',
      category: 'automation',
      icon: <Workflow className="w-6 h-6" />,
      title: 'Automated B2B Outreach System',
      tech: 'Make.com + Data Enrichment',
      impact: 'Scaled outreach to 500+ prospects daily with 35% response rate',
      bullets: [
        'Automated lead enrichment and qualification',
        'Personalized email sequences based on company data',
        'Multi-touch campaigns across email and LinkedIn',
        'Response tracking and follow-up automation',
        'Built-in safety limits and compliance checks'
      ],
      demoUrl: null,
    },
    {
      id: 'voice-outreach',
      category: 'automation',
      icon: <Phone className="w-6 h-6" />,
      title: 'AI Voice Outreach Caller',
      tech: 'Vapi + Make.com',
      impact: 'Generated 50+ qualified appointments monthly on autopilot',
      bullets: [
        'Intelligent voice pitch delivery with natural pauses',
        'Appointment setting with calendar integration',
        'Objection handling and conversation branching',
        'Automatic CRM note generation',
        'Call recording and quality analysis'
      ],
      demoUrl: null,
    },
  ],
  ar: [
    {
      id: 'hr-payroll',
      category: 'enterprise',
      icon: <Briefcase className="w-6 h-6" />,
      title: 'نظام الموارد البشرية والرواتب (متوافق مع السعودية)',
      tech: '.NET WinForms + SQL Server',
      impact: 'تبسيط معالجة الرواتب لأكثر من ٥٠٠ موظف مع التوافق الكامل مع الجوسي ومكافأة نهاية الخدمة',
      bullets: [
        'دورات رواتب شهرية آلية مع حسابات الجوسي ومكافأة نهاية الخدمة',
        'واجهة ثنائية اللغة (EN/AR) مع لوحات DevExpress',
        'سير عمل موافقة قائم على الأدوار يقلل وقت المعالجة بنسبة ٦٠٪',
        'تقارير فورية ومسارات تدقيق للامتثال',
        'قدرة معالجة الرواتب في نفس اليوم'
      ],
      demoUrl: null,
    },
    {
      id: 'pos',
      category: 'enterprise',
      icon: <AppWindow className="w-6 h-6" />,
      title: 'نظام نقاط البيع',
      tech: '.NET + SQL Server',
      impact: 'حل دفع سريع يعالج أكثر من ١٠٠٠ معاملة يومية',
      bullets: [
        'واجهة دفع بديهية مع مسح الباركود',
        'تتبع المخزون في الوقت الفعلي وتنبيهات المخزون المنخفض',
        'تقارير وتحليلات مبيعات شاملة',
        'التحكم في الوصول القائم على الأدوار لإدارة الموظفين',
        'طباعة إيصالات حرارية مع قوالب قابلة للتخصيص'
      ],
      demoUrl: null,
    },
    {
      id: 'pharmacy',
      category: 'enterprise',
      icon: <Pill className="w-6 h-6" />,
      title: 'نظام ملصقات الصيدلية (السعودية)',
      tech: 'Oracle APEX + PLSQL',
      impact: 'ملصقات دواء آلية متوافقة مع وزارة الصحة لعمليات الصيدلية',
      bullets: [
        'قوالب ملصقات معتمدة من وزارة الصحة',
        'طباعة دفعات للوصفات الطبية عالية الحجم',
        'عرض معلومات الدواء بالعربية/الإنجليزية',
        'مسارات تدقيق كاملة للامتثال التنظيمي',
        'تقارير قابلة للتصدير للمخزون والصرف'
      ],
      demoUrl: null,
    },
    {
      id: 'gym-agent',
      category: 'ai-voice',
      icon: <Bot className="w-6 h-6" />,
      title: 'وكيل ذكاء اصطناعي لنادي Third Space',
      tech: 'Voiceflow + Make.com',
      impact: 'تقليل وقت الاستجابة لاستفسارات الأعضاء من ساعات إلى ثوانٍ',
      bullets: [
        'ردود آلية على مدار الساعة للأسئلة الشائعة للأعضاء',
        'فرز سريع وتوجيه إلى الموظفين المناسبين',
        'تسليم الحجز إلى نظام الجدولة',
        'استرجاع معلومات العضوية والفصول',
        'تجربة محادثة طبيعية'
      ],
      demoUrl: 'https://creator.voiceflow.com/share/67a37fd3f69950c7dd9cba65/development',
    },
    {
      id: 'pets-lulu',
      category: 'ai-voice',
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'مساعد Pets at Home الذكي "لولو"',
      tech: 'Voiceflow',
      impact: 'معالجة أكثر من ٢٠٠ استفسار عميل يوميًا برضا ٩٥٪',
      bullets: [
        'إرشادات رعاية الحيوانات الأليفة وتوصيات المنتجات على مدار الساعة',
        'خدمات التوفر والموقع في المتجر',
        'البيع اللطيف مع اقتراحات شخصية',
        'النشر متعدد القنوات (ويب، موبايل، اجتماعي)',
        'التعلم المستمر من تفاعلات العملاء'
      ],
      demoUrl: 'https://creator.voiceflow.com/share/678fb5b32e62086e28af31e4/development',
    },
    {
      id: 'ra-sushi',
      category: 'ai-voice',
      icon: <Phone className="w-6 h-6" />,
      title: 'موظفة استقبال صوتية ذكية لـ RA Sushi',
      tech: 'Vapi + Make.com',
      impact: 'أتمتة ٨٠٪ من المكالمات الواردة، وتحرير الموظفين للخدمة الشخصية',
      bullets: [
        'محادثات صوتية طبيعية للحجوزات',
        'التقاط الحجز وتأكيده في الوقت الفعلي',
        'أخذ الطلبات مع معالجة الطلبات الخاصة',
        'تكامل CRM لملاحظات العملاء',
        'تسليم سلس للإنسان عند الحاجة'
      ],
      demoUrl: 'https://vapi.ai?demo=true&shareKey=979f21cd-bab2-4a42-96db-be094ca2a641&assistantId=147e3edd-81d2-4dfb-a07c-6a9ab3e8fdf9',
    },
    {
      id: 'b2b-outreach',
      category: 'automation',
      icon: <Workflow className="w-6 h-6" />,
      title: 'نظام التواصل B2B الآلي',
      tech: 'Make.com + إثراء البيانات',
      impact: 'توسيع نطاق التواصل إلى أكثر من ٥٠٠ عميل محتمل يوميًا بمعدل استجابة ٣٥٪',
      bullets: [
        'إثراء وتأهيل العملاء المحتملين الآلي',
        'تسلسلات بريد إلكتروني مخصصة بناءً على بيانات الشركة',
        'حملات متعددة اللمس عبر البريد الإلكتروني وLinkedIn',
        'تتبع الاستجابة والمتابعة الآلية',
        'حدود أمان مدمجة وفحوصات امتثال'
      ],
      demoUrl: null,
    },
    {
      id: 'voice-outreach',
      category: 'automation',
      icon: <Phone className="w-6 h-6" />,
      title: 'متصل التواصل الصوتي بالذكاء الاصطناعي',
      tech: 'Vapi + Make.com',
      impact: 'توليد أكثر من ٥٠ موعد مؤهل شهريًا تلقائيًا',
      bullets: [
        'تقديم عرض صوتي ذكي مع توقفات طبيعية',
        'تحديد المواعيد مع تكامل التقويم',
        'معالجة الاعتراضات وتفرع المحادثة',
        'إنشاء ملاحظات CRM التلقائية',
        'تسجيل المكالمات وتحليل الجودة'
      ],
      demoUrl: null,
    },
  ],
};

const techStack = [
  'C#', '.NET', 'WinForms', 'SQL Server',
  'DevExpress', 'Voiceflow', 'Vapi', 'Make.com', 'n8n'
];

const skills = {
  en: {
    languages: ['C#', '.NET Framework', 'WinForms', 'SQL', 'PLSQL'],
    databases: ['SQL Server', 'Oracle Database'],
    automation: ['Make.com', 'n8n', 'Voiceflow', 'Vapi', 'Zapier'],
    tools: ['Visual Studio', 'DevExpress', 'PowerDesigner'],
  },
  ar: {
    languages: ['C#', '.NET Framework', 'WinForms', 'SQL', 'PLSQL'],
    databases: ['SQL Server', 'Oracle Database'],
    automation: ['Make.com', 'n8n', 'Voiceflow', 'Vapi', 'Zapier'],
    tools: ['Visual Studio', 'DevExpress', 'PowerDesigner'],
  },
};

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calendlyModalOpen, setCalendlyModalOpen] = useState(false);
  const [activeProjectFilter, setActiveProjectFilter] = useState<'ai-voice' | 'enterprise' | 'automation'>('ai-voice');

  const t = content[language];
  const projects = projectsData[language];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ar' | null;
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    (window as any).VG_CONFIG = {
      ID: "6WOX2N75P35y39Bs",
      region: 'na',
      render: 'bottom-right',
      stylesheets: [
        "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
      ],
    };

    const script = document.createElement("script");
    script.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Removed Vanta background effect in favor of site-wide EtheralShadow

  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'ar' : 'en');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const openCalendlyModal = () => {
    setCalendlyModalOpen(true);
  };

  const filteredProjects = projects.filter(p => p.category === activeProjectFilter);

  return (
    <div className="min-h-screen text-[#F5F5F5] transition-colors duration-200">
      <SiteBackground />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'h-14 bg-[#0E0E0E]/95 backdrop-blur-lg border-b border-[#D4AF37]/20'
            : 'h-[72px] bg-transparent'
        }`}
        role="banner"
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Button
            onClick={openCalendlyModal}
            className="bg-[#D4AF37] hover:bg-[#C8A951] text-[#0A0A0A] font-semibold rounded-lg px-6 shadow-lg shadow-[#D4AF37]/20"
            aria-label={t.contact.bookMeeting}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t.contact.bookMeeting}
          </Button>

          <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
            <button
              onClick={() => scrollToSection('projects')}
              className="text-[#B6B6B6] hover:text-[#D4AF37] transition-colors font-medium"
            >
              {t.nav.projects}
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-[#B6B6B6] hover:text-[#D4AF37] transition-colors font-medium"
            >
              {t.nav.skills}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-[#B6B6B6] hover:text-[#D4AF37] transition-colors font-medium"
            >
              {t.nav.about}
            </button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleLanguage}
                    className="text-[#B6B6B6] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                    aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
                  >
                    <Globe className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{language === 'en' ? 'العربية' : 'English'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#B6B6B6] hover:text-[#D4AF37]"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side={language === 'ar' ? 'left' : 'right'}
              className="bg-[#111111] border-[#D4AF37]/20"
            >
              <nav className="flex flex-col gap-4 mt-8" role="navigation" aria-label="Mobile navigation">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-[#F5F5F5] text-lg text-left py-2 hover:text-[#D4AF37] transition-colors"
                >
                  {t.nav.projects}
                </button>
                <button
                  onClick={() => scrollToSection('skills')}
                  className="text-[#F5F5F5] text-lg text-left py-2 hover:text-[#D4AF37] transition-colors"
                >
                  {t.nav.skills}
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-[#F5F5F5] text-lg text-left py-2 hover:text-[#D4AF37] transition-colors"
                >
                  {t.nav.about}
                </button>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={toggleLanguage}
                    className="flex-1 border-[#D4AF37]/20 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'العربية' : 'English'}
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main role="main" className="relative z-10">
        <section id="vanta-bg" className="pt-32 pb-20 px-4 relative" aria-labelledby="hero-title">
          <div className="container mx-auto max-w-5xl relative z-10">
            <AnimatedSection>
              <h1
                id="hero-title"
                className="text-5xl md:text-7xl font-bold text-[#F5F5F5] mb-4 text-center"
              >
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-[#D4AF37] mb-3 text-center font-semibold">
                {t.hero.subtitle}
              </p>
              <p className="text-lg text-[#B6B6B6] mb-8 text-center max-w-3xl mx-auto leading-relaxed">
                {t.hero.tagline}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-[#111111] text-[#B6B6B6] border border-[#D4AF37]/20 px-3 py-1.5 text-sm"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => scrollToSection('projects')}
                  size="lg"
                  className="bg-[#D4AF37] hover:bg-[#C8A951] text-[#0A0A0A] font-semibold shadow-lg shadow-[#D4AF37]/20"
                >
                  {t.hero.viewProjects}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                  onClick={() => window.open('https://docs.google.com/document/d/1GPBJk5OZLEMCRW912P8kfwIp1R9gTGP997jQb7FECqs/edit?tab=t.0#heading=h.yg9ympf51ljp', '_blank', 'noopener,noreferrer')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t.hero.downloadCV}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                  onClick={() => window.open('mailto:abouella.dev@gmail.com', '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t.hero.email}
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section id="projects" className="py-20 px-4" aria-labelledby="projects-title">
          <div className="container mx-auto max-w-6xl">
            <AnimatedSection>
              <h2 id="projects-title" className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4 text-center">
                {t.projects.title}
              </h2>
              <p className="text-[#B6B6B6] text-center mb-12 max-w-2xl mx-auto">
                {language === 'en'
                  ? 'A selection of enterprise applications and AI automation solutions delivered for clients'
                  : 'مجموعة من التطبيقات المؤسسية وحلول الأتمتة بالذكاء الاصطناعي المقدمة للعملاء'}
              </p>

              <Tabs value={activeProjectFilter} onValueChange={(v) => setActiveProjectFilter(v as any)} className="mb-12">
                <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 bg-[#111111] border border-[#D4AF37]/20">
                  <TabsTrigger value="ai-voice" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A0A0A]">
                    <Brain className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{t.projects.filterAll}</span>
                    <span className="sm:hidden">AI</span>
                  </TabsTrigger>
                  <TabsTrigger value="enterprise" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A0A0A]">
                    <Server className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{t.projects.filterEnterprise}</span>
                    <span className="sm:hidden">.NET</span>
                  </TabsTrigger>
                  <TabsTrigger value="automation" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A0A0A]">
                    <Workflow className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{t.projects.filterAutomation}</span>
                    <span className="sm:hidden">Auto</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeProjectFilter} className="mt-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredProjects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.14, delay: idx * 0.05 }}
                      >
                        <Card className="bg-[#111111] border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-200 h-full shadow-lg hover:shadow-[#D4AF37]/10">
                          <CardHeader>
                            <div className="flex items-start gap-4">
                              <div className="p-3 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37]">
                                {project.icon}
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-[#F5F5F5] mb-1 text-lg">
                                  {project.title}
                                </CardTitle>
                                <Badge variant="outline" className="text-xs border-[#D4AF37]/20 text-[#B6B6B6]">
                                  {project.tech}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-[#D4AF37] font-medium mb-4 text-sm">
                              {project.impact}
                            </p>
                            <ul className="space-y-2 mb-4">
                              {project.bullets.map((bullet, i) => (
                                <li key={i} className="text-[#B6B6B6] text-sm flex items-start gap-2">
                                  <span className="text-[#D4AF37] mt-1.5 flex-shrink-0">•</span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                            {project.demoUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-[#D4AF37]"
                                onClick={() => window.open(project.demoUrl!, '_blank', 'noopener')}
                              >
                                {t.projects.tryDemo}
                                <ChevronRight className={`w-4 h-4 ${language === 'ar' ? 'mr-1 rotate-180' : 'ml-1'}`} />
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </AnimatedSection>
          </div>
        </section>

        <section id="skills" className="py-20 px-4" aria-labelledby="skills-title">
          <div className="container mx-auto max-w-5xl">
            <AnimatedSection>
              <h2 id="skills-title" className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-12 text-center">
                {t.skills.title}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-[#111111] border-[#D4AF37]/20">
                  <CardHeader>
                    <CardTitle className="text-[#F5F5F5] flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-[#D4AF37]" />
                      {t.skills.languagesFrameworks}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills[language].languages.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-[#0E0E0E] border border-[#D4AF37]/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#111111] border-[#D4AF37]/20">
                  <CardHeader>
                    <CardTitle className="text-[#F5F5F5] flex items-center gap-2">
                      <Database className="w-5 h-5 text-[#D4AF37]" />
                      {t.skills.databases}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills[language].databases.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-[#0E0E0E] border border-[#D4AF37]/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#111111] border-[#D4AF37]/20">
                  <CardHeader>
                    <CardTitle className="text-[#F5F5F5] flex items-center gap-2">
                      <Brain className="w-5 h-5 text-[#D4AF37]" />
                      {t.skills.automationAI}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills[language].automation.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-[#0E0E0E] border border-[#D4AF37]/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#111111] border-[#D4AF37]/20">
                  <CardHeader>
                    <CardTitle className="text-[#F5F5F5] flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#D4AF37]" />
                      {t.skills.tools}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills[language].tools.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-[#0E0E0E] border border-[#D4AF37]/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section id="about" className="py-20 px-4" aria-labelledby="about-title">
          <div className="container mx-auto max-w-4xl">
            <AnimatedSection>
              <h2 id="about-title" className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-8 text-center">
                {t.about.title}
              </h2>

              <Card className="bg-[#111111] border-[#D4AF37]/20 shadow-xl">
                <CardContent className="p-8">
                  <p className="text-[#B6B6B6] text-lg leading-relaxed mb-6">
                    {t.about.bio}
                  </p>

                  <div className="flex items-center gap-3 text-[#B6B6B6]">
                    <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
                    <span>{t.about.education}</span>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="contact-title">
          <div className="container mx-auto max-w-4xl text-center">
            <AnimatedSection>
              <h2 id="contact-title" className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-6">
                {t.contact.title}
              </h2>
              <p className="text-[#B6B6B6] text-lg mb-8">
                {language === 'en'
                  ? "Let's discuss how I can help bring your project to life"
                  : 'لنناقش كيف يمكنني المساعدة في إحياء مشروعك'}
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-[#D4AF37] hover:bg-[#C8A951] text-[#0A0A0A] font-semibold shadow-lg shadow-[#D4AF37]/20"
                  onClick={openCalendlyModal}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {t.contact.bookMeeting}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                  onClick={() => window.open('mailto:abouella.dev@gmail.com', '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t.hero.email}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                  onClick={() => window.open('https://www.linkedin.com/in/abdullah-aboueleila-612804388/', '_blank', 'noopener')}
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 border-t border-[#D4AF37]/20 relative z-10" role="contentinfo">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#B6B6B6] text-sm text-center md:text-left">
              {t.contact.footerText}
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="text-[#B6B6B6] hover:text-[#D4AF37]"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <div
        className="fixed bottom-6 left-6 right-6 md:hidden z-40"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <Button
          size="lg"
          className="w-full bg-[#D4AF37] hover:bg-[#C8A951] text-[#0A0A0A] font-semibold shadow-2xl shadow-[#D4AF37]/30"
          onClick={openCalendlyModal}
        >
          <Calendar className="w-5 h-5 mr-2" />
          {t.contact.bookMeeting}
        </Button>
      </div>

      <div
        className="hidden md:block fixed z-50 text-xs px-3 py-1.5 bg-[#111111] border border-[#D4AF37]/20 rounded-full text-[#B6B6B6] shadow-lg"
        style={{
          right: language === 'ar' ? 'auto' : '96px',
          left: language === 'ar' ? '96px' : 'auto',
          bottom: '24px',
        }}
      >
        {t.chatLabel}
      </div>

      <MeetingModal
        open={calendlyModalOpen}
        onClose={() => setCalendlyModalOpen(false)}
      />

      <div
        id="VG_OVERLAY_CONTAINER"
        style={{ width: 0, height: 0 }}
        aria-label="Chatbot"
      />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Abdullah Aboueleila",
          "jobTitle": "Software Developer",
          "description": "Software Developer specializing in .NET enterprise applications and AI automation solutions",
          "url": typeof window !== 'undefined' ? window.location.href : '',
          "sameAs": [
            "https://www.linkedin.com/in/abdullah-aboueleila-612804388/"
          ]
        })}
      </script>
    </div>
  );
}

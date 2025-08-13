
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇿🇦' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', flag: '🇿🇦' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦' },
  { code: 'st', name: 'Sotho', nativeName: 'Sesotho', flag: '🇿🇦' },
  { code: 'tn', name: 'Tswana', nativeName: 'Setswana', flag: '🇿🇦' },
  { code: 'ss', name: 'Swati', nativeName: 'siSwati', flag: '🇿🇦' },
  { code: 've', name: 'Venda', nativeName: 'Tshivenḓa', flag: '🇿🇦' },
  { code: 'ts', name: 'Tsonga', nativeName: 'Xitsonga', flag: '🇿🇦' },
  { code: 'nr', name: 'Ndebele', nativeName: 'isiNdebele', flag: '🇿🇦' },
  { code: 'nso', name: 'Northern Sotho', nativeName: 'Sepedi', flag: '🇿🇦' }
];

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    community: 'Community',
    aiHealth: 'AI Health',
    alerts: 'Alerts',
    challenges: 'Challenges',
    
    // Landing Page
    heroTitle: 'HealthyHer Guardian',
    heroSubtitle: 'Empowering women with AI-powered health insights, preventive care, and comprehensive maternal support — protecting your health journey',
    heroDescription: 'Sawubona Sisi! Your intelligent health guardian providing personalized care, early risk detection, and community support.',
    getStarted: 'Get Started',
    aiHealthAssistant: 'AI Health Assistant',
    
    // Features
    essentialHealthCare: 'Essential Health Care Support',
    essentialHealthCareSubtitle: 'Ikusasa Impilo Yakho',
    essentialHealthCareDesc: 'Access comprehensive healthcare guidance and support whenever you need it',
    
    maternalHealthSupport: 'Maternal Health Support',
    maternalHealthSupportSubtitle: 'Ukukhulisa Impilo',
    maternalHealthSupportDesc: 'Specialized care and monitoring throughout your pregnancy journey',
    
    preventiveCareAlerts: 'Preventive Care & Risk Alerts',
    preventiveCareAlertsSubtitle: 'Ukuvimbela Izifo',
    preventiveCareAlertsDesc: 'Early warning system and preventive health challenges',
    
    // Mission
    ourMission: 'Our Mission',
    missionTitle: 'Protecting Every Woman\'s Health Journey',
    missionDescription: 'HealthyHer Guardian combines advanced AI technology with community care to provide personalized health protection, early risk detection, and comprehensive maternal support for women in KwaZulu-Natal.',
    
    // Stats
    aiPowered: 'AI Powered Health Assistant',
    riskMonitoring: '24/7 Risk Alert Monitoring',
    gamifiedHealth: 'Fun Gamified Health Challenges',
    localNetwork: 'Local Community Healthcare Network',
    
    // Emergency
    emergencyTitle: 'Your Health Guardian is Always Watching',
    emergencyDescription: 'Advanced AI monitoring provides instant alerts for health risks, ensuring you\'re never alone in your health journey',
    riskAlerts: 'Risk Alerts',
    viewActiveAlerts: 'View Active Alerts',
    emergency: 'Emergency',
    
    // Language
    selectLanguage: 'Select Language',
    changeLanguage: 'Change Language'
  },
  
  zu: {
    // Navigation
    home: 'Ikhaya',
    community: 'Umphakathi',
    aiHealth: 'Ubuhlakani Bezempilo',
    alerts: 'Izexwayiso',
    challenges: 'Izinselelo',
    
    // Landing Page
    heroTitle: 'HealthyHer Guardian',
    heroSubtitle: 'Sinikeza abesifazane amandla ngolwazi lwezempilo oluqhutshwa yi-AI, ukunakekelwa okuvimbayo, nokusekelwa okubanzi kokuzala — sivikela uhambo lwakho lwezempilo',
    heroDescription: 'Sawubona Sisi! Umgcini wakho wezempilo ohlakaniphile onikeza ukunakekelwa komuntu siqu, ukubona ubungozi kusenesikhathi, nokusekelwa komphakathi.',
    getStarted: 'Qala',
    aiHealthAssistant: 'Umsizi Wezempilo we-AI',
    
    // Features
    essentialHealthCare: 'Ukusekelwa Kwezempilo Okubalulekile',
    essentialHealthCareSubtitle: 'Ikusasa Impilo Yakho',
    essentialHealthCareDesc: 'Thola ukuqondiswa kwezempilo okubanzi nokusekelwa noma nini lapho ukudinga khona',
    
    maternalHealthSupport: 'Ukusekelwa Kwezempilo Zomama',
    maternalHealthSupportSubtitle: 'Ukukhulisa Impilo',
    maternalHealthSupportDesc: 'Ukunakekelwa okukhethekile nokuqashwa kuyo yonke imizamo yakho yokukhulelwa',
    
    preventiveCareAlerts: 'Ukunakekelwa Okuvimbayo & Izexwayiso Zobungozi',
    preventiveCareAlertsSubtitle: 'Ukuvimbela Izifo',
    preventiveCareAlertsDesc: 'Uhlelo lwexwayiso lwangaphambi kwesikhathi nezinselelo zezempilo ezivimbayo',
    
    // Mission
    ourMission: 'Umsebenzi Wethu',
    missionTitle: 'Ukuvikela Uhambo Lwezempilo Lwawo Wonke Owesifazane',
    missionDescription: 'I-HealthyHer Guardian ihlanganisa ubuchwepheshe be-AI obuthuthukile nokunakekelwa komphakathi ukunikeza ukuvikelwa kwezempilo komuntu siqu, ukubona ubungozi kusenesikhathi, nokusekelwa okubanzi kokuzala kwabesifazane eKwaZulu-Natal.',
    
    // Stats
    aiPowered: 'Umsizi Wezempilo Oqhutshwa yi-AI',
    riskMonitoring: 'Ukuqashwa Kwezexwayiso Zobungozi 24/7',
    gamifiedHealth: 'Izinselelo Zezempilo Ezijabulisayo',
    localNetwork: 'Inethiweki Yezempilo Yomphakathi Wendawo',
    
    // Emergency
    emergencyTitle: 'Umgcini Wakho Wezempilo Uhlale Ebuka',
    emergencyDescription: 'Ukuqashwa kwe-AI okuthuthukile kunikeza izexwayiso ezisheshayo zobungozi bezempilo, kuqinisekisa ukuthi awusoze ube wedwa ohambweni lwakho lwezempilo',
    riskAlerts: 'Izexwayiso Zobungozi',
    viewActiveAlerts: 'Buka Izexwayiso Ezisebenzayo',
    emergency: 'Isimo Esiphuthumayo',
    
    // Language
    selectLanguage: 'Khetha Ulimi',
    changeLanguage: 'Shintsha Ulimi'
  },
  
  xh: {
    // Navigation
    home: 'Ikhaya',
    community: 'Uluntu',
    aiHealth: 'Ubukrelekrele Bezempilo',
    alerts: 'Izilumkiso',
    challenges: 'Imingeni',
    
    // Landing Page
    heroTitle: 'HealthyHer Guardian',
    heroSubtitle: 'Ukuxhobisa abafazi ngolwazi lwezempilo oluqhutywa yi-AI, ukhathalelo oluthintela izifo, kunye nenkxaso ebanzi yokuzala — ukukhusela uhambo lwakho lwezempilo',
    heroDescription: 'Molo Sisi! Umgcini wakho wezempilo okrelekrele onika ukhathalelo lomntu ngamnye, ukubona umngcipheko kwangethuba, kunye nenkxaso yoluntu.',
    getStarted: 'Qala',
    aiHealthAssistant: 'Umncedisi Wezempilo we-AI',
    
    // Features
    essentialHealthCare: 'Inkxaso Yezempilo Ebalulekileyo',
    essentialHealthCareSubtitle: 'Ikusasa Impilo Yakho',
    essentialHealthCareDesc: 'Fumana isikhokelo esipheleleyo sezempilo kunye nenkxaso nanini na xa uyifuna',
    
    maternalHealthSupport: 'Inkxaso Yezempilo Zoomama',
    maternalHealthSupportSubtitle: 'Ukukhulisa Impilo',
    maternalHealthSupportDesc: 'Ukhathalelo olukhethekileyo kunye nokubekwa esweni kuyo yonke imizamo yakho yokukhulelwa',
    
    preventiveCareAlerts: 'Ukhathalelo Oluthintela Izifo & Izilumkiso Zomngcipheko',
    preventiveCareAlertsSubtitle: 'Ukuvimbela Izifo',
    preventiveCareAlertsDesc: 'Inkqubo yolumkiso lwangaphambi kwexesha kunye nemingeni yezempilo ethintela izifo',
    
    // Mission
    ourMission: 'Injongo Yethu',
    missionTitle: 'Ukukhusela Uhambo Lwezempilo Lomntu Wonke Ongumfazi',
    missionDescription: 'I-HealthyHer Guardian idibanisa iteknoloji ye-AI ephucukileyo kunye nokhathalelo loluntu ukunika ukukhuseleka kwezempilo komntu ngamnye, ukubona umngcipheko kwangethuba, kunye nenkxaso ebanzi yokuzala kubafazi baseKwaZulu-Natal.',
    
    // Stats
    aiPowered: 'Umncedisi Wezempilo Oqhutywa yi-AI',
    riskMonitoring: 'Ukubekwa Esweni Kwezilumkiso Zomngcipheko 24/7',
    gamifiedHealth: 'Imingeni Yezempilo Ekonwabisayo',
    localNetwork: 'Inethiweki Yezempilo Yoluntu Lwendawo',
    
    // Emergency
    emergencyTitle: 'Umgcini Wakho Wezempilo Usoloko Ebukele',
    emergencyDescription: 'Ukubekwa esweni kwe-AI okuphucukileyo kunika izilumkiso ezikhawulezayo zomngcipheko wezempilo, kuqinisekisa ukuba awusoze ube wedwa kuhambo lwakho lwezempilo',
    riskAlerts: 'Izilumkiso Zomngcipheko',
    viewActiveAlerts: 'Jonga Izilumkiso Ezisebenzayo',
    emergency: 'Imeko Yongxamiseko',
    
    // Language
    selectLanguage: 'Khetha Ulwimi',
    changeLanguage: 'Tshintsha Ulwimi'
  },
  
  af: {
    // Navigation
    home: 'Tuis',
    community: 'Gemeenskap',
    aiHealth: 'KI Gesondheid',
    alerts: 'Waarskuwings',
    challenges: 'Uitdagings',
    
    // Landing Page
    heroTitle: 'HealthyHer Guardian',
    heroSubtitle: 'Bemagtiging van vroue met KI-gedrewe gesondheidsinsigte, voorkomende sorg, en omvattende moederlike ondersteuning — beskerm jou gesondheidsreis',
    heroDescription: 'Hallo Sus! Jou intelligente gesondheidsbewaker wat persoonlike sorg, vroeë risikodeteksie, en gemeenskapsondersteuning bied.',
    getStarted: 'Begin',
    aiHealthAssistant: 'KI Gesondheidsassistent',
    
    // Features
    essentialHealthCare: 'Noodsaaklike Gesondheidsorgondersteuning',
    essentialHealthCareSubtitle: 'Ikusasa Impilo Yakho',
    essentialHealthCareDesc: 'Kry toegang tot omvattende gesondheidsleiding en ondersteuning wanneer jy dit nodig het',
    
    maternalHealthSupport: 'Moederlike Gesondheidsondersteuning',
    maternalHealthSupportSubtitle: 'Ukukhulisa Impilo',
    maternalHealthSupportDesc: 'Gespesialiseerde sorg en monitering regdeur jou swangerskapreis',
    
    preventiveCareAlerts: 'Voorkomende Sorg & Risiko Waarskuwings',
    preventiveCareAlertsSubtitle: 'Ukuvimbela Izifo',
    preventiveCareAlertsDesc: 'Vroeë waarskuwingstelsel en voorkomende gesondheidsuitdagings',
    
    // Mission
    ourMission: 'Ons Missie',
    missionTitle: 'Beskerming van Elke Vrou se Gesondheidsreis',
    missionDescription: 'HealthyHer Guardian kombineer gevorderde KI-tegnologie met gemeenskapssorg om persoonlike gesondheidbeskerming, vroeë risikodeteksie, en omvattende moederlike ondersteuning vir vroue in KwaZulu-Natal te bied.',
    
    // Stats
    aiPowered: 'KI-gedrewe Gesondheidsassistent',
    riskMonitoring: '24/7 Risiko Waarskuwing Monitering',
    gamifiedHealth: 'Prettige Gespelletjie Gesondheidsuitdagings',
    localNetwork: 'Plaaslike Gemeenskap Gesondheidsnetwerk',
    
    // Emergency
    emergencyTitle: 'Jou Gesondheidsbewaker Kyk Altyd',
    emergencyDescription: 'Gevorderde KI-monitering bied onmiddellike waarskuwings vir gesondheidsrisikos, wat verseker dat jy nooit alleen is in jou gesondheidsreis nie',
    riskAlerts: 'Risiko Waarskuwings',
    viewActiveAlerts: 'Bekyk Aktiewe Waarskuwings',
    emergency: 'Noodgeval',
    
    // Language
    selectLanguage: 'Kies Taal',
    changeLanguage: 'Verander Taal'
  },
  
  st: {
    // Navigation
    home: 'Hae',
    community: 'Setjhaba',
    aiHealth: 'Bohlale ba Bophelo',
    alerts: 'Ditemoso',
    challenges: 'Diphephetso',
    
    // Landing Page
    heroTitle: 'HealthyHer Guardian',
    heroSubtitle: 'Ho matlafatsa basadi ka tsebo ya bophelo e tsamaiswang ke AI, tlhokomelo e thibelang, le tshehetso e felletseng ya bomme — ho sireletsa leeto la hao la bophelo',
    heroDescription: 'Dumela Sesi! Mohlokomedi wa hao wa bophelo ya bohlale ya fanang ka tlhokomelo ya motho ka mong, ho bona kotsi pele, le tshehetso ya setjhaba.',
    getStarted: 'Qala',
    aiHealthAssistant: 'Mothusi wa Bophelo wa AI',
    
    // Features
    essentialHealthCare: 'Tshehetso ya Tlhokomelo ya Bophelo e Bohlokwa',
    essentialHealthCareSubtitle: 'Ikusasa Impilo Yakho',
    essentialHealthCareDesc: 'Fumana tataiso e felletseng ya bophelo le tshehetso nako efe kapa efe ha o e hloka',
    
    maternalHealthSupport: 'Tshehetso ya Bophelo ba Bomme',
    maternalHealthSupportSubtitle: 'Ukukhulisa Impilo',
    maternalHealthSupportDesc: 'Tlhokomelo e ikgethileng le ho shebella ho pholletsa le leeto la hao la boitshwaro',
    
    preventiveCareAlerts: 'Tlhokomelo e Thibelang & Ditemoso tsa Kotsi',
    preventiveCareAlertsSubtitle: 'Ukuvimbela Izifo',
    preventiveCareAlertsDesc: 'Tsamaiso ya temoso e pele le diphephetso tsa bophelo tse thibelang',
    
    // Mission
    ourMission: 'Boikarabelo ba Rona',
    missionTitle: 'Ho Sireletsa Leeto la Bophelo la Mosadi e Mong le e Mong',
    missionDescription: 'HealthyHer Guardian e kopanya theknoloji e tsoetseng pele ya AI le tlhokomelo ya setjhaba ho fana ka tshireletso ya bophelo ya motho ka mong, ho bona kotsi pele, le tshehetso e felletseng ya bomme ho basadi ba KwaZulu-Natal.',
    
    // Stats
    aiPowered: 'Mothusi wa Bophelo o Tsamaiswang ke AI',
    riskMonitoring: 'Ho Shebella Ditemoso tsa Kotsi 24/7',
    gamifiedHealth: 'Diphephetso tsa Bophelo tse Monate',
    localNetwork: 'Marang-rang a Bophelo a Setjhaba sa Lehae',
    
    // Emergency
    emergencyTitle: 'Mohlokomedi wa Hao wa Bophelo o Shebile Kamehla',
    emergencyDescription: 'Ho shebella ha AI ho tsoetseng pele ho fana ka ditemoso tse potlakileng tsa dikotsi tsa bophelo, ho netefatsa hore ha o ke wa ba le wena feela leetong la hao la bophelo',
    riskAlerts: 'Ditemoso tsa Kotsi',
    viewActiveAlerts: 'Sheba Ditemoso tse Sebetsang',
    emergency: 'Tshohanyetso',
    
    // Language
    selectLanguage: 'Kgetha Puo',
    changeLanguage: 'Fetola Puo'
  },
  
  tn: {
    // Navigation
    home: 'Gae',
    community: 'Setshaba',
    aiHealth: 'Botlhale jwa Boitekanelo',
    alerts: 'Dikgakololo',
    challenges: 'Dikgwetlho',
    
    // Landing Page
    heroTitle: 'HealthyHer Guardian',
    heroSubtitle: 'Go nonotsha basadi ka kitso ya boitekanelo e e kaelwang ke AI, tlhokomelo e e thibang, le tshegetso e e feletseng ya bomme — go sireletsa loeto lwa gago lwa boitekanelo',
    heroDescription: 'Dumelang Kgaitsadi! Molebedi wa gago wa boitekanelo yo o botlhale yo o fanang ka tlhokomelo ya motho mongwe le mongwe, go bona kotsi pele ga nako, le tshegetso ya setshaba.',
    getStarted: 'Simolola',
    aiHealthAssistant: 'Mothusi wa Boitekanelo wa AI',
    
    // Features
    essentialHealthCare: 'Tshegetso ya Tlhokomelo ya Boitekanelo e e Botlhokwa',
    essentialHealthCareSubtitle: 'Ikusasa Impilo Yakho',
    essentialHealthCareDesc: 'Bona kaelo e e feletseng ya boitekanelo le tshegetso nako nngwe le nngwe fa o e tlhoka',
    
    maternalHealthSupport: 'Tshegetso ya Boitekanelo jwa Bomme',
    maternalHealthSupportSubtitle: 'Ukukhulisa Impilo',
    maternalHealthSupportDesc: 'Tlhokomelo e e kgethegileng le go lebelela mo loetong lotlhe lwa gago lwa boitshwaro',
    
    preventiveCareAlerts: 'Tlhokomelo e e Thibang & Dikgakololo tsa Kotsi',
    preventiveCareAlertsSubtitle: 'Ukuvimbela Izifo',
    preventiveCareAlertsDesc: 'Thulaganyo ya kgakololo e e pele le dikgwetlho tsa boitekanelo tse di thibang',
    
    // Mission
    ourMission: 'Maikaelelo a Rona',
    missionTitle: 'Go Sireletsa Loeto lwa Boitekanelo lwa Mosadi mongwe le mongwe',
    missionDescription: 'HealthyHer Guardian e kopanya thekenoloji e e tswetseng pele ya AI le tlhokomelo ya setshaba go neela tshireletso ya boitekanelo ya motho mongwe le mongwe, go bona kotsi pele ga nako, le tshegetso e e feletseng ya bomme mo basading ba KwaZulu-Natal.',
    
    // Stats
    aiPowered: 'Mothusi wa Boitekanelo o o Kaelwang ke AI',
    riskMonitoring: 'Go Lebelela Dikgakololo tsa Kotsi 24/7',
    gamifiedHealth: 'Dikgwetlho tsa Boitekanelo tse di Itumedisang',
    localNetwork: 'Mafaratlhatlha a Boitekanelo a Setshaba sa Selegae',
    
    // Emergency
    emergencyTitle: 'Molebedi wa Gago wa Boitekanelo o Lebile Kamehla',
    emergencyDescription: 'Go lebelela ga AI go go tswetseng pele go neela dikgakololo tse di bonako tsa dikotsi tsa boitekanelo, go netefatsa gore ga o kitla o nna o le esi mo loetong lwa gago lwa boitekanelo',
    riskAlerts: 'Dikgakololo tsa Kotsi',
    viewActiveAlerts: 'Bona Dikgakololo tse di Dirang',
    emergency: 'Kgogolego',
    
    // Language
    selectLanguage: 'Tlhopha Puo',
    changeLanguage: 'Fetola Puo'
  },
  
  ss: {
    // Navigation
    home: 'Ekhaya',
    community: 'Umphakathi',
    aiHealth: 'Buhlakani Bempilo',
    alerts: 'Tixwayiso',
    challenges: 'Tinselelo',
    
    // Landing Page
    heroTitle: 'HealthyHer Guardian',
    heroSubtitle: 'Kuniketa besifazane emandla ngelwati lempilo leliqhutjwa yi-AI, kunakekela lokuvimbela, kanye nekusekela lokuphelele kwekuzala — kuvikela luhambo lwakho lwempilo',
    heroDescription: 'Sawubona Sisi! Umgcini wakho wempilo lohlakaniphile loniketa kunakekela komuntfu ngamunye, kubona ingoti ngesikhathi, kanye nekusekela komphakathi.',
    getStarted: 'Cala',
    aiHealthAssistant: 'Umsiti Wempilo we-AI',
    
    // Features
    essentialHealthCare: 'Kusekela Kunakekela Kwempilo Lokubalulekile',
    essentialHealthCareSubtitle: 'Ikusasa Impilo Yakho',
    essentialHealthCareDesc: 'Thola kucondzisa lokuphelele kwempilo kanye nekusekela noma nini lapho ukudzinga khona',
    
    maternalHealthSupport: 'Kusekela Kwempilo Yemake',
    maternalHealthSupportSubtitle: 'Ukukhulisa Impilo',
    maternalHealthSupportDesc: 'Kunakekela lokukhethekile kanye nekubukela kuyo yonke imizamo yakho yekukhulelwa',
    
    preventiveCareAlerts: 'Kunakekela Lokuvimbela & Tixwayiso Tengoti',
    preventiveCareAlertsSubtitle: 'Ukuvimbela Izifo',
    preventiveCareAlertsDesc: 'Luhlelo lwetixwayiso lwangaphambi kwesikhathi kanye netinselelo tempilo letivimbelako',
    
    // Mission
    ourMission: 'Umsebenzi Wetfu',
    missionTitle: 'Kuvikela Luhambo Lwempilo Lwasifazane Ngamunye',
    missionDescription: 'I-HealthyHer Guardian ihlanganisa buchwepheshe be-AI lobuthuthukile kanye nekunakekela komphakathi kuniketa kuvikela kwempilo komuntfu ngamunye, kubona ingoti ngesikhathi, kanye nekusekela lokuphelele kwekuzala kubesifazane base-KwaZulu-Natal.',
    
    // Stats
    aiPowered: 'Umsiti Wempilo Loqhutjwa yi-AI',
    riskMonitoring: 'Kubukela Tixwayiso Tengoti 24/7',
    gamifiedHealth: 'Tinselelo Tempilo Letijabulisako',
    localNetwork: 'Linethiweki Yempilo Yomphakathi Wendawo',
    
    // Emergency
    emergencyTitle: 'Umgcini Wakho Wempilo Ubuka Njalo',
    emergencyDescription: 'Kubukela kwe-AI lokuthuthukile kuniketa tixwayiso letisheshako tengoti yempilo, kucinisekisa kutsi awusoze ube wedvwa luhambweni lwakho lwempilo',
    riskAlerts: 'Tixwayiso Tengoti',
    viewActiveAlerts: 'Buka Tixwayiso Letisebentako',
    emergency: 'Simo Lesiphuthumako',
    
    // Language
    selectLanguage: 'Khetsa Lulwimi',
    changeLanguage: 'Shintja Lulwimi'
  },
  
  ve: {
    // Navigation
    home: 'Hayani',
    community: 'Tshitshavha',
    aiHealth: 'Vhuhwanwa ha Mutakalo',
    alerts: 'Khagiso',
    challenges: 'Thaidzo',
    
    // Landing Page
    heroTitle: 'HealthyHer Guardian',
    heroSubtitle: 'U fhulufhedzisa vhafumakadzi nga ndivho ya mutakalo i shumisaho AI, u takalela u thivhelaho, na u thikhedzo ho fhelelaho ha vhomakoma — u tshitshavha lwendo lwanu lwa mutakalo',
    heroDescription: 'Ndaa Khotsi! Mulindi wanu wa mutakalo a re na vhuhwanwa a fanaho u takalela ha munwe na munwe, u vhona khombo nga u fhambana, na u thikhedzo ha tshitshavha.',
    getStarted: 'Thoma',
    aiHealthAssistant: 'Muthusi wa Mutakalo wa AI',
    
    // Features
    essentialHealthCare: 'U thikhedzo ha U takalela ha Mutakalo ho Kongolosaho',
    essentialHealthCareSubtitle: 'Ikusasa Impilo Yakho',
    essentialHealthCareDesc: 'Wana khongolose yo fhelelaho ya mutakalo na u thikhedzo tshifhinga tshiṅwe na tshiṅwe musi ni tshi khou i toda',
    
    maternalHealthSupport: 'U thikhedzo ha Mutakalo wa Vhomakoma',
    maternalHealthSupportSubtitle: 'Ukukhulisa Impilo',
    maternalHealthSupportDesc: 'U takalela ho khethaho na u sedza kha lwendo lwoṱhe lwa vhukati hwanu',
    
    preventiveCareAlerts: 'U takalela u Thivhelaho & Khagiso dza Khombo',
    preventiveCareAlertsSubtitle: 'Ukuvimbela Izifo',
    preventiveCareAlertsDesc: 'Maitele a khagiso a u fhambana na thaidzo dza mutakalo dzi thivhelaho',
    
    // Mission
    ourMission: 'Ndivho yasu',
    missionTitle: 'U tshitshavha Lwendo lwa Mutakalo lwa Mufumakadzi muṅwe na muṅwe',
    missionDescription: 'HealthyHer Guardian i kanganyisa thekinolodzhi ya AI yo ḓoweleaho na u takalela ha tshitshavha u fana u tshitshavha ha mutakalo ha munwe na munwe, u vhona khombo nga u fhambana, na u thikhedzo ho fhelelaho ha vhomakoma kha vhafumakadzi vha KwaZulu-Natal.',
    
    // Stats
    aiPowered: 'Muthusi wa Mutakalo u shumisaho AI',
    riskMonitoring: 'U sedza Khagiso dza Khombo 24/7',
    gamifiedHealth: 'Thaidzo dza Mutakalo dzi Fharisaho',
    localNetwork: 'Netiweke ya Mutakalo ya Tshitshavha tsha Fhano',
    
    // Emergency
    emergencyTitle: 'Mulindi wanu wa Mutakalo u khou Sedza Tshifhinga tshoṱhe',
    emergencyDescription: 'U sedza ha AI ho ḓoweleaho hu fana khagiso dzi fhufhaho dza khombo ya mutakalo, hu tikedza uri a ni nga sosha ni tshi khou ri hoyu kha lwendo lwanu lwa mutakalo',
    riskAlerts: 'Khagiso dza Khombo',
    viewActiveAlerts: 'Vhona Khagiso dzi re na Mushumo',
    emergency: 'Tshiitisi',
    
    // Language
    selectLanguage: 'Nanga Luambo',
    changeLanguage: 'Shandukisa Luambo'
  },
  
  ts: {
    // Navigation
    home: 'Kaya',
    community: 'Vaaki',
    aiHealth: 'Vutlhari bya Rihanyu',
    alerts: 'Swileriso',
    challenges: 'Swiphiqo',
    
    // Landing Page
    heroTitle: 'HealthyHer Guardian',
    heroSubtitle: 'Ku tiyisisa vanwana hi vutivi bya rihanyu lebyi fambisiwaka hi AI, vuhlayisi byo sivela, na nseketelo wo helela wa vamakoma — ku sireletsa riendzo ra wena ra rihanyu',
    heroDescription: 'Avuxeni Sesi! Mulanguti wa wena wa rihanyu loyi a nga na vutlhari loyi a nyikaka vuhlayisi bya munhu hi xiyexe, ku vona khombo hi nkarhi, na nseketelo wa vaaki.',
    getStarted: 'Sungula',
    aiHealthAssistant: 'Mupfuni wa Rihanyu wa AI',
    
    // Features
    essentialHealthCare: 'Nseketelo wa Vuhlayisi bya Rihanyu byo Boha',
    essentialHealthCareSubtitle: 'Ikusasa Impilo Yakho',
    essentialHealthCareDesc: 'Kuma nhlamuselo yo helela ya rihanyu na nseketelo nkarhi wun\'wana na wun\'wana loko u swi lavaka',
    
    maternalHealthSupport: 'Nseketelo wa Rihanyu ra Vamakoma',
    maternalHealthSupportSubtitle: 'Ukukhulisa Impilo',
    maternalHealthSupportDesc: 'Vuhlayisi byo hlawuleka na ku langutisisa eka riendzo hinkwaro ra wena ra ku mitha',
    
    preventiveCareAlerts: 'Vuhlayisi byo Sivela & Swileriso swa Khombo',
    preventiveCareAlertsSubtitle: 'Ukuvimbela Izifo',
    preventiveCareAlertsDesc: 'Sisiteme ya swileriso swo famba ni nkarhi na swiphiqo swa rihanyu leswi sivelako',
    
    // Mission
    ourMission: 'Xikongomelo xa Hina',
    missionTitle: 'Ku Sireletsa Riendzo ra Rihanyu ra Wansati un\'wana na un\'wana',
    missionDescription: 'HealthyHer Guardian yi hlanganisa thekinoloji ya AI leyi hundzukeke na vuhlayisi bya vaaki ku nyika ku sireletiwa ka rihanyu ka munhu hi xiyexe, ku vona khombo hi nkarhi, na nseketelo wo helela wa vamakoma eka vanwana va KwaZulu-Natal.',
    
    // Stats
    aiPowered: 'Mupfuni wa Rihanyu loyi a Fambisiwaka hi AI',
    riskMonitoring: 'Ku Langutisisa Swileriso swa Khombo 24/7',
    gamifiedHealth: 'Swiphiqo swa Rihanyu leswi Tsakisako',
    localNetwork: 'Netiweke ya Rihanyu ya Vaaki va Laha Kaya',
    
    // Emergency
    emergencyTitle: 'Mulanguti wa Wena wa Rihanyu u Langutile Nkarhi hinkwawo',
    emergencyDescription: 'Ku langutisisa ka AI loku hundzukeke ku nyika swileriso swo hatlisa swa khombo ya rihanyu, ku tiyisisa leswaku a wu nge tshami u ri wexe eka riendzo ra wena ra rihanyu',
    riskAlerts: 'Swileriso swa Khombo',
    viewActiveAlerts: 'Vona Swileriso leswi Tirhako',
    emergency: 'Xiphiqo',
    
    // Language
    selectLanguage: 'Hlawula Ririmi',
    changeLanguage: 'Cinca Ririmi'
  },
  
  nr: {
    // Navigation
    home: 'Ekhaya',
    community: 'Umphakathi',
    aiHealth: 'Ubuhlakani Bezempilo',
    alerts: 'Izexwayiso',
    challenges: 'Izinselelo',
    
    // Landing Page
    heroTitle: 'HealthyHer Guardian',
    heroSubtitle: 'Ukunikeza abesifazane amandla ngolwazi lwezempilo oluqhutshwa yi-AI, ukunakekelwa okuvimbayo, nokusekelwa okubanzi kokuzala — ukuvikela uhambo lwakho lwezempilo',
    heroDescription: 'Sawubona Sisi! Umgcini wakho wezempilo ohlakaniphile onikeza ukunakekelwa komuntu siqu, ukubona ubungozi kusenesikhathi, nokusekelwa komphakathi.',
    getStarted: 'Qala',
    aiHealthAssistant: 'Umsizi Wezempilo we-AI',
    
    // Features
    essentialHealthCare: 'Ukusekelwa Kwezempilo Okubalulekile',
    essentialHealthCareSubtitle: 'Ikusasa Impilo Yakho',
    essentialHealthCareDesc: 'Thola ukuqondiswa kwezempilo okubanzi nokusekelwa noma nini lapho ukudinga khona',
    
    maternalHealthSupport: 'Ukusekelwa Kwezempilo Zomama',
    maternalHealthSupportSubtitle: 'Ukukhulisa Impilo',
    maternalHealthSupportDesc: 'Ukunakekelwa okukhethekile nokuqashwa kuyo yonke imizamo yakho yokukhulelwa',
    
    preventiveCareAlerts: 'Ukunakekelwa Okuvimbayo & Izexwayiso Zobungozi',
    preventiveCareAlertsSubtitle: 'Ukuvimbela Izifo',
    preventiveCareAlertsDesc: 'Uhlelo lwexwayiso lwangaphambi kwesikhathi nezinselelo zezempilo ezivimbayo',
    
    // Mission
    ourMission: 'Umsebenzi Wethu',
    missionTitle: 'Ukuvikela Uhambo Lwezempilo Lwawo Wonke Owesifazane',
    missionDescription: 'I-HealthyHer Guardian ihlanganisa ubuchwepheshe be-AI obuthuthukile nokunakekelwa komphakathi ukunikeza ukuvikelwa kwezempilo komuntu siqu, ukubona ubungozi kusenesikhathi, nokusekelwa okubanzi kokuzala kwabesifazane eKwaZulu-Natal.',
    
    // Stats
    aiPowered: 'Umsizi Wezempilo Oqhutshwa yi-AI',
    riskMonitoring: 'Ukuqashwa Kwezexwayiso Zobungozi 24/7',
    gamifiedHealth: 'Izinselelo Zezempilo Ezijabulisayo',
    localNetwork: 'Inethiweki Yezempilo Yomphakathi Wendawo',
    
    // Emergency
    emergencyTitle: 'Umgcini Wakho Wezempilo Uhlale Ebuka',
    emergencyDescription: 'Ukuqashwa kwe-AI okuthuthukile kunikeza izexwayiso ezisheshayo zobungozi bezempilo, kuqinisekisa ukuthi awusoze ube wedwa ohambweni lwakho lwezempilo',
    riskAlerts: 'Izexwayiso Zobungozi',
    viewActiveAlerts: 'Buka Izexwayiso Ezisebenzayo',
    emergency: 'Isimo Esiphuthumayo',
    
    // Language
    selectLanguage: 'Khetha Ulimi',
    changeLanguage: 'Shintsha Ulimi'
  },
  
  nso: {
    // Navigation
    home: 'Gae',
    community: 'Setšhaba',
    aiHealth: 'Bohlale bja Maphelo',
    alerts: 'Ditemošo',
    challenges: 'Ditlhohlo',
    
    // Landing Page
    heroTitle: 'HealthyHer Guardian',
    heroSubtitle: 'Go maatlafatša basadi ka tsebo ya maphelo ye e sepetšwago ke AI, tlhokomelo ya go thibela, le thekgo ye e feletšego ya bomme — go šireletša leeto la gago la maphelo',
    heroDescription: 'Thobela Kgaitsadi! Molebedi wa gago wa maphelo yo a nago le bohlale yo a fanago ka tlhokomelo ya motho ka noši, go bona kotsi pele ga nako, le thekgo ya setšhaba.',
    getStarted: 'Thoma',
    aiHealthAssistant: 'Mothušiši wa Maphelo wa AI',
    
    // Features
    essentialHealthCare: 'Thekgo ya Tlhokomelo ya Maphelo ye Bohlokwa',
    essentialHealthCareSubtitle: 'Ikusasa Impilo Yakho',
    essentialHealthCareDesc: 'Hwetša tlhahlo ye e feletšego ya maphelo le thekgo nako efe goba efe ge o e nyaka',
    
    maternalHealthSupport: 'Thekgo ya Maphelo a Bomme',
    maternalHealthSupportSubtitle: 'Ukukhulisa Impilo',
    maternalHealthSupportDesc: 'Tlhokomelo ye e kgethegile le go lebelela go ralala leeto la gago la go ithwala',
    
    preventiveCareAlerts: 'Tlhokomelo ya go Thibela & Ditemošo tša Kotsi',
    preventiveCareAlertsSubtitle: 'Ukuvimbela Izifo',
    preventiveCareAlertsDesc: 'Tshepedišo ya temošo ya pele le ditlhohlo tša maphelo tše di thibelago',
    
    // Mission
    ourMission: 'Maikemišetšo a Rena',
    missionTitle: 'Go Šireletša Leeto la Maphelo la Mosadi yo Mongwe le yo Mongwe',
    missionDescription: 'HealthyHer Guardian e kopanya theknolotši ye e tšwetšego pele ya AI le tlhokomelo ya setšhaba go fa tšhireletšo ya maphelo ya motho ka noši, go bona kotsi pele ga nako, le thekgo ye e feletšego ya bomme go basadi ba KwaZulu-Natal.',
    
    // Stats
    aiPowered: 'Mothušiši wa Maphelo yo a Sepetšwago ke AI',
    riskMonitoring: 'Go Lebelela Ditemošo tša Kotsi 24/7',
    gamifiedHealth: 'Ditlhohlo tša Maphelo tše di Thabišago',
    localNetwork: 'Netweke ya Maphelo ya Setšhaba sa Gae',
    
    // Emergency
    emergencyTitle: 'Molebedi wa Gago wa Maphelo o Lebelela Kamehla',
    emergencyDescription: 'Go lebelela ga AI go go tšwetšego pele go fa ditemošo tše di bonako tša dikotsi tša maphelo, go netefatša gore ga o kitla o ba o le noši leetong la gago la maphelo',
    riskAlerts: 'Ditemošo tša Kotsi',
    viewActiveAlerts: 'Lebelela Ditemošo tše di Šomago',
    emergency: 'Tšhohanyetšo',
    
    // Language
    selectLanguage: 'Kgetha Polelo',
    changeLanguage: 'Fetola Polelo'
  }
};

export const getTranslation = (key: string, language: string = 'en'): string => {
  const langTranslations = translations[language as keyof typeof translations] || translations.en;
  return langTranslations[key as keyof typeof langTranslations] || key;
};

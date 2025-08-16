'use client';

import { useState, useEffect } from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useRouter } from 'next/navigation';

interface WeekInfo {
  week: number;
  babySize: string;
  babyComparison: string;
  babyDevelopment: string;
  motherChanges: string;
  doctorTip: string;
  symptoms: string[];
  babyImage: string;
  babyImageUrl?: string;
  weight: string;
  length: string;
}

export default function PregnancyTrackerPage() {
  const { user, loading } = useFirebase();
  const router = useRouter();
  const [lmpDate, setLmpDate] = useState<string>('');
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>('');
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  const calculatePregnancyWeek = (lmp: string) => {
    if (!lmp) return 0;
    
    const lmpDate = new Date(lmp);
    const today = new Date();
    const diffTime = today.getTime() - lmpDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const week = Math.floor(diffDays / 7);
    
    return Math.min(Math.max(week, 0), 40);
  };

  // Comprehensive pregnancy week data with realistic information
  const pregnancyWeeks: WeekInfo[] = [
    {
      week: 1,
      babySize: "Microscopic",
      babyComparison: "Size of a poppy seed",
      babyDevelopment: "Fertilization occurs and the zygote begins to divide rapidly. The journey begins!",
      motherChanges: "You may not notice any changes yet, but your body is already preparing for pregnancy.",
      doctorTip: "Start taking prenatal vitamins with folic acid if you haven't already.",
      symptoms: ["No visible symptoms yet", "Possible implantation bleeding"],
      babyImage: "🥚",
      babyImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      weight: "0.001g",
      length: "0.1mm"
    },
    {
      week: 2,
      babySize: "0.1-0.2 mm",
      babyComparison: "Size of a sesame seed",
      babyDevelopment: "The fertilized egg implants in the uterine wall and begins to form the placenta.",
      motherChanges: "Your body starts producing pregnancy hormones, though you may not feel different yet.",
      doctorTip: "Continue taking prenatal vitamins and maintain a healthy diet.",
      symptoms: ["No visible symptoms yet", "Possible early pregnancy signs"],
      babyImage: "🌱",
      babyImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      weight: "0.002g",
      length: "0.2mm"
    },
    {
      week: 3,
      babySize: "0.2-0.3 mm",
      babyComparison: "Size of a poppy seed",
      babyDevelopment: "The neural tube begins to form, which will become the brain and spinal cord.",
      motherChanges: "You may start to experience early pregnancy symptoms like fatigue and breast tenderness.",
      doctorTip: "Avoid alcohol, smoking, and certain medications. Stay hydrated.",
      symptoms: ["Fatigue", "Breast tenderness", "Mild cramping"],
      babyImage: "🌿",
      babyImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      weight: "0.003g",
      length: "0.3mm"
    },
    {
      week: 4,
      babySize: "0.4-0.5 mm",
      babyComparison: "Size of a poppy seed",
      babyDevelopment: "The embryo is now visible and the heart begins to form.",
      motherChanges: "You may miss your period and start experiencing more pregnancy symptoms.",
      doctorTip: "Schedule your first prenatal appointment. Start tracking your symptoms.",
      symptoms: ["Missed period", "Nausea", "Fatigue", "Frequent urination"],
      babyImage: "💎",
      babyImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      weight: "0.005g",
      length: "0.5mm"
    },
    {
      week: 5,
      babySize: "1-2 mm",
      babyComparison: "Size of a sesame seed",
      babyDevelopment: "The heart starts beating and major organs begin to develop.",
      motherChanges: "Pregnancy symptoms become more noticeable, including morning sickness.",
      doctorTip: "Eat small, frequent meals to help with nausea. Stay well-rested.",
      symptoms: ["Morning sickness", "Fatigue", "Breast changes", "Mood swings"],
      babyImage: "🫘",
      babyImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      weight: "0.01g",
      length: "1.5mm"
    },
    {
      week: 6,
      babySize: "2-4 mm",
      babyComparison: "Size of a lentil",
      babyDevelopment: "The baby's face begins to form with eyes, nose, and ears developing.",
      motherChanges: "You may experience increased fatigue and food aversions.",
      doctorTip: "Listen to your body's cues. Rest when you need to and eat what you can tolerate.",
      symptoms: ["Morning sickness", "Fatigue", "Food aversions", "Breast tenderness"],
      babyImage: "🫘",
      weight: "0.02g",
      length: "3mm"
    },
    {
      week: 7,
      babySize: "4-6 mm",
      babyComparison: "Size of a blueberry",
      babyDevelopment: "The baby's arms and legs begin to form as tiny buds.",
      motherChanges: "Your uterus is growing and you may start to feel bloated.",
      doctorTip: "Continue with prenatal care and discuss any concerns with your healthcare provider.",
      symptoms: ["Bloating", "Morning sickness", "Fatigue", "Breast changes"],
      babyImage: "🫐",
      weight: "0.05g",
      length: "5mm"
    },
    {
      week: 8,
      babySize: "8-11 mm",
      babyComparison: "Size of a kidney bean",
      babyDevelopment: "The baby's major organs are developing and the heart is beating strongly.",
      motherChanges: "You may start to show a small bump and experience more pregnancy symptoms.",
      doctorTip: "Stay active with gentle exercise like walking or prenatal yoga.",
      symptoms: ["Small bump visible", "Morning sickness", "Fatigue", "Breast tenderness"],
      babyImage: "🫘",
      weight: "0.1g",
      length: "9.5mm"
    },
    {
      week: 9,
      babySize: "13-17 mm",
      babyComparison: "Size of a grape",
      babyDevelopment: "The baby's facial features become more defined and tiny fingers and toes form.",
      motherChanges: "Your pregnancy may become more visible and you may feel more pregnant.",
      doctorTip: "Continue with healthy eating habits and stay hydrated.",
      symptoms: ["Visible bump", "Morning sickness", "Fatigue", "Breast changes"],
      babyImage: "🍇",
      babyImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      weight: "0.2g",
      length: "15mm"
    },
    {
      week: 10,
      babySize: "18-22 mm",
      babyComparison: "Size of a kumquat",
      babyDevelopment: "The baby's major organs are fully formed and functioning.",
      motherChanges: "You may start to feel better as some early pregnancy symptoms improve.",
      doctorTip: "This is a good time to start thinking about childbirth classes and birth plans.",
      symptoms: ["Improving symptoms", "Visible bump", "Breast changes", "Mood swings"],
      babyImage: "🍊",
      weight: "0.4g",
      length: "20mm"
    },
    {
      week: 11,
      babySize: "25-30 mm",
      babyComparison: "Size of a lime",
      babyDevelopment: "The baby's head makes up about half of their body length.",
      motherChanges: "Your energy may start to return and morning sickness may improve.",
      doctorTip: "Continue with prenatal care and consider starting gentle exercise if approved.",
      symptoms: ["Improving energy", "Less nausea", "Visible bump", "Breast tenderness"],
      babyImage: "🍋",
      weight: "0.7g",
      length: "27.5mm"
    },
    {
      week: 12,
      babySize: "35-40 mm",
      babyComparison: "Size of a plum",
      babyDevelopment: "The baby's reflexes begin to develop and they may start moving.",
      motherChanges: "You're entering the second trimester, often called the 'honeymoon phase' of pregnancy.",
      doctorTip: "The risk of miscarriage significantly decreases after this week.",
      symptoms: ["Feeling better", "More energy", "Visible bump", "Less nausea"],
      babyImage: "🫐",
      weight: "1.2g",
      length: "37.5mm"
    },
    {
      week: 13,
      babySize: "45-50 mm",
      babyComparison: "Size of a lemon",
      babyDevelopment: "The baby's bones are hardening and they can make sucking motions.",
      motherChanges: "You may start to feel more like yourself and have more energy.",
      doctorTip: "This is a great time to start or continue with gentle exercise routines.",
      symptoms: ["More energy", "Feeling better", "Visible bump", "Less morning sickness"],
      babyImage: "🍋",
      weight: "1.8g",
      length: "47.5mm"
    },
    {
      week: 14,
      babySize: "55-60 mm",
      babyComparison: "Size of a peach",
      babyDevelopment: "The baby's facial muscles are developing and they can make expressions.",
      motherChanges: "Your pregnancy bump becomes more noticeable and you may feel the baby move.",
      doctorTip: "Start sleeping on your left side for better blood flow to the baby.",
      symptoms: ["Visible bump", "Possible baby movements", "More energy", "Better mood"],
      babyImage: "🍑",
      weight: "2.5g",
      length: "57.5mm"
    },
    {
      week: 15,
      babySize: "65-70 mm",
      babyComparison: "Size of an apple",
      babyDevelopment: "The baby's bones continue to harden and they can hear sounds.",
      motherChanges: "You may start to feel the baby's first movements, called 'quickening'.",
      doctorTip: "Start talking and singing to your baby - they can hear you now!",
      symptoms: ["Baby movements", "Visible bump", "More energy", "Breast changes"],
      babyImage: "🍎",
      weight: "3.5g",
      length: "67.5mm"
    },
    {
      week: 16,
      babySize: "75-80 mm",
      babyComparison: "Size of an avocado",
      babyDevelopment: "The baby's heart is pumping about 25 quarts of blood daily.",
      motherChanges: "Your pregnancy becomes more visible and you may feel more confident.",
      doctorTip: "Continue with regular prenatal appointments and healthy lifestyle habits.",
      symptoms: ["Visible bump", "Baby movements", "More energy", "Better mood"],
      babyImage: "🥑",
      weight: "4.5g",
      length: "77.5mm"
    },
    {
      week: 17,
      babySize: "85-90 mm",
      babyComparison: "Size of a pear",
      babyDevelopment: "The baby's fat stores begin to develop and their skin becomes less transparent.",
      motherChanges: "You may experience round ligament pain as your uterus grows.",
      doctorTip: "Practice good posture and gentle stretching to help with pregnancy discomforts.",
      symptoms: ["Round ligament pain", "Visible bump", "Baby movements", "Breast changes"],
      babyImage: "🍐",
      weight: "5.8g",
      length: "87.5mm"
    },
    {
      week: 18,
      babySize: "95-100 mm",
      babyComparison: "Size of a bell pepper",
      babyDevelopment: "The baby's ears are in their final position and they can hear your heartbeat.",
      motherChanges: "Your pregnancy becomes more obvious and you may feel more pregnant.",
      doctorTip: "Start thinking about your birth plan and discuss options with your healthcare provider.",
      symptoms: ["Visible bump", "Baby movements", "Round ligament pain", "Breast tenderness"],
      babyImage: "🫑",
      weight: "7.2g",
      length: "97.5mm"
    },
    {
      week: 19,
      babySize: "105-110 mm",
      babyComparison: "Size of a mango",
      babyDevelopment: "The baby's skin is developing a protective coating called vernix.",
      motherChanges: "You may experience more pregnancy symptoms as your body continues to change.",
      doctorTip: "Stay hydrated and continue with gentle exercise to help with pregnancy discomforts.",
      symptoms: ["Visible bump", "Baby movements", "Round ligament pain", "Breast changes"],
      babyImage: "🥭",
      weight: "8.9g",
      length: "107.5mm"
    },
    {
      week: 20,
      babySize: "115-120 mm",
      babyComparison: "Size of a banana",
      babyDevelopment: "This is the halfway point! The baby's major organs are fully formed.",
      motherChanges: "You're halfway through your pregnancy journey!",
      doctorTip: "Schedule your anatomy scan to check the baby's development and determine gender if desired.",
      symptoms: ["Halfway point!", "Visible bump", "Baby movements", "Growing belly"],
      babyImage: "🍌",
      babyImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      weight: "11.0g",
      length: "117.5mm"
    },
    {
      week: 21,
      babySize: "125-130 mm",
      babyComparison: "Size of a carrot",
      babyDevelopment: "The baby's digestive system is developing and they practice swallowing.",
      motherChanges: "Your pregnancy becomes more comfortable and you may feel more confident.",
      doctorTip: "Continue with healthy eating habits and regular prenatal care.",
      symptoms: ["Visible bump", "Baby movements", "More comfortable", "Growing belly"],
      babyImage: "🥕",
      weight: "13.5g",
      length: "127.5mm"
    },
    {
      week: 22,
      babySize: "135-140 mm",
      babyComparison: "Size of a coconut",
      babyDevelopment: "The baby's sense of balance is developing and they can sense movement.",
      motherChanges: "You may experience Braxton Hicks contractions as your body prepares for labor.",
      doctorTip: "Learn to distinguish between Braxton Hicks contractions and real labor contractions.",
      symptoms: ["Braxton Hicks", "Visible bump", "Baby movements", "Growing belly"],
      babyImage: "🥥",
      weight: "16.2g",
      length: "137.5mm"
    },
    {
      week: 23,
      babySize: "145-150 mm",
      babyComparison: "Size of a grapefruit",
      babyDevelopment: "The baby's hearing is well-developed and they can recognize your voice.",
      motherChanges: "Your pregnancy becomes more visible and you may feel more pregnant.",
      doctorTip: "Continue talking and singing to your baby - they love hearing your voice!",
      symptoms: ["Visible bump", "Baby movements", "Growing belly", "Breast changes"],
      babyImage: "🍊",
      weight: "19.1g",
      length: "147.5mm"
    },
    {
      week: 24,
      babySize: "155-160 mm",
      babyComparison: "Size of an ear of corn",
      babyDevelopment: "The baby's lungs are developing surfactant to help with breathing after birth.",
      motherChanges: "You're entering the third trimester! Your pregnancy becomes more challenging.",
      doctorTip: "Start preparing for the third trimester and discuss birth plans with your healthcare provider.",
      symptoms: ["Third trimester!", "Visible bump", "Baby movements", "Growing belly"],
      babyImage: "🌽",
      weight: "22.3g",
      length: "157.5mm"
    },
    {
      week: 25,
      babySize: "165-170 mm",
      babyComparison: "Size of a cauliflower",
      babyDevelopment: "The baby's brain is growing rapidly and they can respond to light and sound.",
      motherChanges: "You may experience more pregnancy discomforts as your belly grows.",
      doctorTip: "Practice good posture and gentle stretching to help with pregnancy discomforts.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Breast changes"],
      babyImage: "🥦",
      weight: "25.8g",
      length: "167.5mm"
    },
    {
      week: 26,
      babySize: "175-180 mm",
      babyComparison: "Size of a head of lettuce",
      babyDevelopment: "The baby's eyes can open and they can see light filtering through your belly.",
      motherChanges: "Your pregnancy becomes more challenging as your belly continues to grow.",
      doctorTip: "Stay active with gentle exercise and maintain good posture to help with discomfort.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Fatigue"],
      babyImage: "🥬",
      weight: "29.6g",
      length: "177.5mm"
    },
    {
      week: 27,
      babySize: "185-190 mm",
      babyComparison: "Size of a head of cauliflower",
      babyDevelopment: "The baby's brain is developing rapidly and they can dream (REM sleep).",
      motherChanges: "You may experience more pregnancy symptoms as you approach the third trimester.",
      doctorTip: "Continue with regular prenatal care and discuss any concerns with your healthcare provider.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Breast changes"],
      babyImage: "🥦",
      weight: "33.7g",
      length: "187.5mm"
    },
    {
      week: 28,
      babySize: "195-200 mm",
      babyComparison: "Size of an eggplant",
      babyDevelopment: "The baby's brain is growing rapidly and they can respond to your voice and touch.",
      motherChanges: "You're officially in the third trimester! Your pregnancy becomes more challenging.",
      doctorTip: "Start preparing for labor and delivery. Consider taking childbirth classes.",
      symptoms: ["Third trimester!", "Growing belly", "Baby movements", "Pregnancy discomforts"],
      babyImage: "🍆",
      weight: "38.1g",
      length: "197.5mm"
    },
    {
      week: 29,
      babySize: "205-210 mm",
      babyComparison: "Size of a butternut squash",
      babyDevelopment: "The baby's muscles and lungs are developing rapidly for life outside the womb.",
      motherChanges: "You may experience more pregnancy discomforts as your belly continues to grow.",
      doctorTip: "Practice good posture and gentle stretching to help with pregnancy discomforts.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Fatigue"],
      babyImage: "🎃",
      weight: "42.8g",
      length: "207.5mm"
    },
    {
      week: 30,
      babySize: "215-220 mm",
      babyComparison: "Size of a large cabbage",
      babyDevelopment: "The baby's brain is growing rapidly and they can control their body temperature.",
      motherChanges: "You may experience more pregnancy symptoms as you approach your due date.",
      doctorTip: "Continue with regular prenatal care and discuss any concerns with your healthcare provider.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Breast changes"],
      babyImage: "🥬",
      weight: "47.8g",
      length: "217.5mm"
    },
    {
      week: 31,
      babySize: "225-230 mm",
      babyComparison: "Size of a pineapple",
      babyDevelopment: "The baby's five senses are fully developed and they can respond to stimuli.",
      motherChanges: "You may experience more pregnancy discomforts as your belly continues to grow.",
      doctorTip: "Stay active with gentle exercise and maintain good posture to help with discomfort.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Fatigue"],
      babyImage: "🍍",
      weight: "53.1g",
      length: "227.5mm"
    },
    {
      week: 32,
      babySize: "235-240 mm",
      babyComparison: "Size of a large jicama",
      babyDevelopment: "The baby's bones are hardening, except for the skull which remains soft for birth.",
      motherChanges: "You may experience more pregnancy symptoms as you approach your due date.",
      doctorTip: "Continue with regular prenatal care and discuss any concerns with your healthcare provider.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Breast changes"],
      babyImage: "🥔",
      weight: "58.7g",
      length: "237.5mm"
    },
    {
      week: 33,
      babySize: "245-250 mm",
      babyComparison: "Size of a pineapple",
      babyDevelopment: "The baby's immune system is developing and they're gaining weight rapidly.",
      motherChanges: "You may experience more pregnancy discomforts as your belly continues to grow.",
      doctorTip: "Practice good posture and gentle stretching to help with pregnancy discomforts.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Fatigue"],
      babyImage: "🍍",
      weight: "64.6g",
      length: "247.5mm"
    },
    {
      week: 34,
      babySize: "255-260 mm",
      babyComparison: "Size of a cantaloupe",
      babyDevelopment: "The baby's lungs are nearly fully developed and they can breathe on their own.",
      motherChanges: "You may experience more pregnancy symptoms as you approach your due date.",
      doctorTip: "Continue with regular prenatal care and discuss any concerns with your healthcare provider.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Breast changes"],
      babyImage: "🍈",
      weight: "70.8g",
      length: "257.5mm"
    },
    {
      week: 35,
      babySize: "265-270 mm",
      babyComparison: "Size of a honeydew melon",
      babyDevelopment: "The baby's kidneys are fully developed and they're practicing breathing movements.",
      motherChanges: "You may experience more pregnancy discomforts as your belly continues to grow.",
      doctorTip: "Start preparing for labor and delivery. Pack your hospital bag.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Fatigue"],
      babyImage: "🍈",
      weight: "77.3g",
      length: "267.5mm"
    },
    {
      week: 36,
      babySize: "275-280 mm",
      babyComparison: "Size of a romaine lettuce",
      babyDevelopment: "The baby is considered 'early term' and could be born safely now.",
      motherChanges: "You may experience more pregnancy symptoms as you approach your due date.",
      doctorTip: "Continue with regular prenatal care and discuss any concerns with your healthcare provider.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Breast changes"],
      babyImage: "🥬",
      weight: "84.1g",
      length: "277.5mm"
    },
    {
      week: 37,
      babySize: "285-290 mm",
      babyComparison: "Size of a Swiss chard",
      babyDevelopment: "The baby is considered 'early term' and their lungs are fully developed.",
      motherChanges: "You may experience more pregnancy discomforts as your belly continues to grow.",
      doctorTip: "Start preparing for labor and delivery. Know the signs of labor.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Fatigue"],
      babyImage: "🥬",
      weight: "91.2g",
      length: "287.5mm"
    },
    {
      week: 38,
      babySize: "295-300 mm",
      babyComparison: "Size of a leek",
      babyDevelopment: "The baby is considered 'full term' and could be born at any time.",
      motherChanges: "You may experience more pregnancy symptoms as you approach your due date.",
      doctorTip: "Continue with regular prenatal care and discuss any concerns with your healthcare provider.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Breast changes"],
      babyImage: "🧅",
      weight: "98.6g",
      length: "297.5mm"
    },
    {
      week: 39,
      babySize: "305-310 mm",
      babyComparison: "Size of a watermelon",
      babyDevelopment: "The baby is fully developed and ready for birth.",
      motherChanges: "You may experience more pregnancy symptoms as you approach your due date.",
      doctorTip: "Know the signs of labor and when to go to the hospital.",
      symptoms: ["Growing belly", "Baby movements", "Pregnancy discomforts", "Fatigue"],
      babyImage: "🍉",
      weight: "106.3g",
      length: "307.5mm"
    },
    {
      week: 40,
      babySize: "310-320 mm",
      babyComparison: "Size of a watermelon",
      babyDevelopment: "The baby is fully developed and ready for birth.",
      motherChanges: "You may experience more pregnancy symptoms as you approach your due date.",
      doctorTip: "This is your due date! Know the signs of labor and when to go to the hospital.",
      symptoms: ["Due date!", "Growing belly", "Baby movements", "Pregnancy discomforts"],
      babyImage: "🍉",
      babyImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      weight: "114.3g",
      length: "320mm"
    }
  ];

  const calculateDueDate = (lmp: string) => {
    if (!lmp) return '';
    
    const lmpDate = new Date(lmp);
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280); // 40 weeks = 280 days
    
    return dueDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLMPChange = (date: string) => {
    setLmpDate(date);
    const week = calculatePregnancyWeek(date);
    setCurrentWeek(week);
    setSelectedWeek(week);
    setDueDate(calculateDueDate(date));
  };

  const getCurrentWeekInfo = () => {
    return pregnancyWeeks.find(w => w.week === selectedWeek) || pregnancyWeeks[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-blue-600">Loading pregnancy tracker...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const progressPercentage = (currentWeek / 40) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-3">Pregnancy Tracker</h1>
          <p className="text-xl text-blue-600">Your Week-by-Week Journey</p>
        </div>

        {/* LMP Input Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Calculate Your Pregnancy Week</h2>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Last Menstrual Period (LMP)
              </label>
              <input
                type="date"
                value={lmpDate}
                onChange={(e) => handleLMPChange(e.target.value)}
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <button
              onClick={() => handleLMPChange(lmpDate)}
              disabled={!lmpDate}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Progress Section */}
        {currentWeek > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-blue-800 mb-2">
                Week {currentWeek} of 40
              </h2>
              <p className="text-blue-600 mb-4">
                Due Date: {dueDate}
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-blue-600 mb-2">
                <span>Week 1</span>
                <span>Week 40</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="text-center mt-2">
                <span className="text-sm text-blue-600">
                  {Math.round(progressPercentage)}% Complete
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Current Week Information */}
        {currentWeek > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            {(() => {
              const weekInfo = getCurrentWeekInfo();
              return (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-800 mb-2">
                      Week {weekInfo.week} Update
                    </h2>
                    <p className="text-blue-600 mb-4">
                      Baby is the size of a {weekInfo.babyComparison}
                    </p>
                    
                                         {/* Baby Image */}
                     <div className="mb-4">
                       {weekInfo.babyImageUrl ? (
                         <div className="text-center">
                           <img 
                             src={weekInfo.babyImageUrl} 
                             alt={`Baby at week ${weekInfo.week}`}
                             className="w-32 h-32 object-cover rounded-full mx-auto mb-3 shadow-lg"
                           />
                           <p className="text-sm text-blue-600">Real ultrasound image</p>
                         </div>
                       ) : (
                         <div className="text-8xl">
                           {weekInfo.babyImage}
                         </div>
                       )}
                     </div>
                    
                    {/* Baby Stats */}
                    <div className="flex justify-center gap-6 text-sm text-blue-600">
                      <div className="text-center">
                        <div className="font-semibold">Weight</div>
                        <div>{weekInfo.weight}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">Length</div>
                        <div>{weekInfo.length}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Baby Development */}
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                        <i className="fas fa-baby text-blue-500 mr-2"></i>
                        Baby's Development
                      </h3>
                      <p className="text-blue-700 mb-3">{weekInfo.babyDevelopment}</p>
                      <div className="text-sm text-blue-600">
                        <strong>Size:</strong> {weekInfo.babySize} ({weekInfo.babyComparison})
                      </div>
                    </div>

                    {/* Mother's Changes */}
                    <div className="bg-pink-50 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-pink-800 mb-3 flex items-center">
                        <i className="fas fa-heart text-pink-500 mr-2"></i>
                        Your Changes
                      </h3>
                      <p className="text-pink-700 mb-3">{weekInfo.motherChanges}</p>
                      <div className="text-sm text-pink-600">
                        <strong>Common Symptoms:</strong>
                        <ul className="mt-2 space-y-1">
                          {weekInfo.symptoms.map((symptom, index) => (
                            <li key={index} className="flex items-center">
                              <i className="fas fa-circle text-xs text-pink-400 mr-2"></i>
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Doctor's Tip */}
                  <div className="mt-6 bg-green-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                      <i className="fas fa-stethoscope text-green-500 mr-2"></i>
                      Doctor's Tip
                    </h3>
                    <p className="text-green-700">{weekInfo.doctorTip}</p>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Timeline Toggle */}
        {currentWeek > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <i className={`fas fa-chevron-${showTimeline ? 'up' : 'down'} mr-2`}></i>
              {showTimeline ? 'Hide' : 'Show'} Pregnancy Timeline
            </button>
          </div>
        )}

        {/* Timeline/Accordion */}
        {showTimeline && currentWeek > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Pregnancy Timeline</h3>
            <div className="space-y-4">
              {pregnancyWeeks.map((week) => (
                <div
                  key={week.week}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    selectedWeek === week.week
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedWeek(week.week)}
                >
                                     <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       {week.babyImageUrl ? (
                         <img 
                           src={week.babyImageUrl} 
                           alt={`Baby at week ${week.week}`}
                           className="w-8 h-8 object-cover rounded-full"
                         />
                       ) : (
                         <span className="text-2xl">{week.babyImage}</span>
                       )}
                       <h4 className="text-lg font-semibold text-blue-800">
                         Week {week.week}
                       </h4>
                     </div>
                    <span className="text-sm text-blue-600">
                      {week.babyComparison}
                    </span>
                  </div>
                  {selectedWeek === week.week && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-blue-700 text-sm mb-2">{week.babyDevelopment}</p>
                      <div className="flex gap-4 text-xs text-blue-600">
                        <span><strong>Weight:</strong> {week.weight}</span>
                        <span><strong>Length:</strong> {week.length}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Emergency Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => {
              alert('Emergency contact feature coming soon. For immediate medical emergencies, call 10111 or visit your nearest hospital.');
            }}
            className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
            title="Emergency Contact"
          >
            <i className="fas fa-phone text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

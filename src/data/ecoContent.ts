import Ionicons from '@expo/vector-icons/Ionicons';

export type IconName = keyof typeof Ionicons.glyphMap;

export type InfoCard = {
  icon: IconName;
  title: string;
  text: string;
  variant: 'mint' | 'amber' | 'sky' | 'coral';
};

export type Habit = {
  icon: IconName;
  title: string;
  done: boolean;
};

export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Recipe = {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  timeMinutes: number;
  difficulty: 'Оңай' | 'Орташа';
  ingredients: string[];
  steps: string[];
  safetyNote: string;
};

export const dailyHabits: Habit[] = [
  { icon: 'water-outline', title: 'Өз бөтелкеңді алу', done: true },
  { icon: 'restaurant-outline', title: 'Көп рет қолданылатын қасық пайдалану', done: true },
  { icon: 'bag-handle-outline', title: 'Артық пакет алмау', done: false },
];

export const plasticFacts: InfoCard[] = [
  {
    icon: 'hourglass-outline',
    title: '100-500 жыл',
    text: 'Пластик қасық өте ұзақ ыдырайды және микропластикке айналуы мүмкін.',
    variant: 'amber',
  },
  {
    icon: 'water-outline',
    title: 'Суға түседі',
    text: 'Ұсақ пластик өзенді, топырақты ластап, тірі ағзаларға зиян келтіруі мүмкін.',
    variant: 'sky',
  },
  {
    icon: 'people-outline',
    title: 'Әр сынып маңызды',
    text: 'Егер бір параллель бір реттік қасықтарды алмастырса, қоқыс едәуір азаяды.',
    variant: 'mint',
  },
];

export const spoonAlternatives: InfoCard[] = [
  {
    icon: 'leaf-outline',
    title: 'Бамбук қасық',
    text: 'Жеңіл, ұстауға жағымды және мектеп ланчбоксына ыңғайлы.',
    variant: 'mint',
  },
  {
    icon: 'restaurant-outline',
    title: 'Металл қасық',
    text: 'Жылдар бойы қызмет етеді. Оны жуып, қайтадан өзіңмен алуға болады.',
    variant: 'sky',
  },
  {
    icon: 'cube-outline',
    title: 'Жеуге болатын қасық',
    text: 'Жобаға арналған идея: қасықты қамырдан жасап, десертпен бірге жеуге болады.',
    variant: 'amber',
  },
];

export const recipeIngredients = [
  '1 стақан ұн',
  '5-6 қасық су',
  '1 шымшым тұз',
  '1 шай қасық май',
];

export const recipeSteps = [
  {
    title: 'Тығыз қамыр иле',
    text: 'Ұн, су, тұз және майды араластыр. Қамыр пішінін ұстап тұруы керек.',
  },
  {
    title: 'Қасық пішінін жаса',
    text: 'Қамырды жайып, сопақша кес те, шеттерін абайлап көтер.',
  },
  {
    title: 'Пісіріп, суыт',
    text: '160-180 C-та қатайғанша пісір, содан кейін қасықты толық суыт.',
  },
];

export const recipes: Recipe[] = [
  {
    id: 'edible-spoon',
    icon: 'restaurant-outline',
    title: 'Қамыр қасығы',
    description: 'Жоба қорғауға ыңғайлы, десертпен бірге жеуге болатын шағын экоидея.',
    timeMinutes: 35,
    difficulty: 'Орташа',
    ingredients: ['1 стақан ұн', '5-6 қасық су', '1 шымшым тұз', '1 шай қасық май'],
    steps: [
      'Ұн, су, тұз және майды араластырып, тығыз қамыр иле.',
      'Қамырды жайып, сопақша қасық басын кес.',
      'Сабын жасап, шеттерін абайлап көтер.',
      '160-180 C-та қатайғанша пісір.',
      'Толық суытып, нәтижесін сыныпта көрсет.',
    ],
    safetyNote: 'Пешті тек ересек адаммен бірге қолдан.',
  },
  {
    id: 'fruit-cup',
    icon: 'nutrition-outline',
    title: 'Жеміс стақаны',
    description: 'Бір реттік ыдыссыз дайындалатын жеңіл әрі түрлі түсті тіскебасар.',
    timeMinutes: 10,
    difficulty: 'Оңай',
    ingredients: ['Алма', 'Банан', 'Жүзім', 'Йогурт немесе бал'],
    steps: [
      'Жемістерді жу.',
      'Алма мен бананды ұсақ бөліктерге бөл.',
      'Барлығын көп рет қолданылатын ыдысқа сал.',
      'Үстіне аздап йогурт немесе бал қос.',
    ],
    safetyNote: 'Пышақ қолдансаң, ересек адамнан көмек сұра.',
  },
  {
    id: 'lunchbox-wrap',
    icon: 'leaf-outline',
    title: 'Ланчбокс орамасы',
    description: 'Пакетсіз алып жүруге болатын мектепке арналған қарапайым орама.',
    timeMinutes: 15,
    difficulty: 'Оңай',
    ingredients: ['Лаваш', 'Ірімшік', 'Қияр', 'Салат жапырағы'],
    steps: [
      'Лавашты таза тақтайға жай.',
      'Ірімшік, қияр және салатты ортасына қой.',
      'Лавашты тығыздап ора.',
      'Ораманы ланчбоксқа сал.',
    ],
    safetyNote: 'Өнімдердің балғын екенін тексер.',
  },
];

export const questionBank: Question[] = [
  {
    question: 'Пластик қасық шамамен қанша уақытта ыдырайды?',
    options: ['1 күн', '1 ай', '100-500 жыл', '5 минут'],
    correctAnswer: '100-500 жыл',
  },
  {
    question: 'Мектепке бір реттік қасықтың орнына не алған дұрыс?',
    options: ['Металл қасық', 'Жаңа пакет', 'Пластик түтікше', 'Бір реттік шанышқы'],
    correctAnswer: 'Металл қасық',
  },
  {
    question: 'Қай таңдау пластикті азайтуға көмектеседі?',
    options: ['Өз бөтелкең', 'Күн сайын пакет алу', 'Бір реттік ыдысты көбейту', 'Қоқысты көшеге тастау'],
    correctAnswer: 'Өз бөтелкең',
  },
  {
    question: 'Эко-сөмке не үшін керек?',
    options: ['Пакетті аз алу үшін', 'Қоқысты көбейту үшін', 'Суды ластау үшін', 'Дәптерді ауыстыру үшін'],
    correctAnswer: 'Пакетті аз алу үшін',
  },
  {
    question: 'Күніне 2 пластик қасық қолданбасаң, бір жылда қанша қасық үнемделеді?',
    options: ['20', '365', '730', '100'],
    correctAnswer: '730',
  },
  {
    question: 'Неге бір реттік заттар мәселе саналады?',
    options: ['Оларды тез тастайды', 'Олар өздігінен жоғалады', 'Олар табиғатқа әрдайым пайдалы', 'Олар гүлге айналады'],
    correctAnswer: 'Оларды тез тастайды',
  },
  {
    question: 'Қай материалды қайта-қайта қолдануға болады?',
    options: ['Металл', 'Лас пакет', 'Сынған пластик', 'Майлық'],
    correctAnswer: 'Металл',
  },
  {
    question: 'Пластиктің ұсақ бөліктерінен не пайда болуы мүмкін?',
    options: ['Микропластик', 'Таза су', 'Жаңа топырақ', 'Таза ауа'],
    correctAnswer: 'Микропластик',
  },
  {
    question: 'Мектеп жобасын қорғағанда не маңызды?',
    options: ['Идеяны қарапайым сөзбен түсіндіру', 'Өте көп ұсақ мәтін оқу', 'Сұрақтарға жауап бермеу', 'Тек қоқысты көрсету'],
    correctAnswer: 'Идеяны қарапайым сөзбен түсіндіру',
  },
  {
    question: 'Экоәдет неден басталады?',
    options: ['Кішкентай таңдаудан', 'Үлкен қоқыстан', 'Артық сатып алудан', 'Ашық қалған краннан'],
    correctAnswer: 'Кішкентай таңдаудан',
  },
];

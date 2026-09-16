interface LandingHighlight {
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
  additionalImages?: string[];
}

interface LandingPageCopy {
  eyebrow: string;
  hero: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  pricingTitle: string;
  pricingSubheadline: string;
}

interface BenefitsPageCopy {
  eyebrow: string;
  hero: string;
  highlights: LandingHighlight[];
}

interface HowItWorksStep {
  title: string;
  text: string;
}

interface HowItWorksPageCopy {
  eyebrow: string;
  hero: string;
  steps: HowItWorksStep[];
}

export type DirectionIconKey = "beauty" | "tattoo" | "massage" | "practice";

export interface DirectionCard {
  id: string;
  label: string;
  subtitle: string;
  iconKey: DirectionIconKey;
}

interface WhoIsItForSection {
  eyebrow: string;
  heading: string;
  subheadline: string;
  directions: DirectionCard[];
}

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSection {
  eyebrow: string;
  hero: string;
  items: FaqItem[];
}


interface SocialProofMetric {
  value: number;
  suffix?: string;
  label: string;
}

interface SocialProofCopy {
  metrics: SocialProofMetric[];
}

interface MarketingCopyPack {
  landing: LandingPageCopy;
  benefits: BenefitsPageCopy;
  howItWorks: HowItWorksPageCopy;
  whoIsItFor: WhoIsItForSection;
  faq: FaqSection;
  socialProof: SocialProofCopy;
}

export const MARKETING_COPY: MarketingCopyPack = {
  socialProof: {
    metrics: [
      {
        value: 4000,
        suffix: "+",
        label: "бронювань щотижня",
      },
      {
        value: 15,
        suffix: "+",
        label: "нових майстрів щодня",
      },
      {
        value: 15,
        suffix: "+",
        label: "заощаджених годин щомісяця",
      },
    ],
  },
  whoIsItFor: {
    eyebrow: "Кому підійде",
    heading: "BOOKEASY для кожного, хто веде запис",
    subheadline:
      "Якщо ваш день складається з віконець, послуг та постійних клієнтів — сервіс підлаштовується під ваш робочий ритм.",
    directions: [
      {
        id: "beauty",
        label: "Beauty",
        subtitle: "Нігті, волосся, брови та вії, косметологія",
        iconKey: "beauty",
      },
      {
        id: "tattoo",
        label: "Тату",
        subtitle: "Художнє татуювання, пірсинг, перманент",
        iconKey: "tattoo",
      },
      {
        id: "massage",
        label: "Масаж",
        subtitle: "Масаж тіла, SPA, остеопатія, реабілітація",
        iconKey: "massage",
      },
      {
        id: "practice",
        label: "Приватна практика",
        subtitle: "Консультації лікарів, психотерапія, фотографи",
        iconKey: "practice",
      },
    ],
  },
  landing: {
    eyebrow: "Онлайн-запис для б'юті-майстрів",
    hero: "Інструмент, що дбає про майстра.",
    subheadline:
      "Контролюйте кожне віконце у своєму розкладі та дозвольте системі надсилати нагадування клієнтам. Отримуйте заповнений графік без нічних узгоджень у директі.",
    primaryCta: "Спробувати безкоштовно",
    secondaryCta: "Як це працює",
    pricingTitle: "Єдиний тариф — всі можливості.",
    pricingSubheadline:
      "Кожна функція BOOKEASY в прозорому тарифі без прихованих платежів та доплат.",
  },
  benefits: {
    eyebrow: "Що ви отримуєте",
    hero: "Сервіс, який турбується про вас, поки ви турбуєтеся про клієнта.",
    highlights: [
      {
        title: "Контроль графіка",
        text: "Ви відкриваєте запис, коли зручно, — і закриваєте, коли потрібно. Буфер запобігає бронюванням в останню мить. Потік клієнтів підпорядковується вашому ритму, а не навпаки.",
        image: "/day-calendar.png",
        imageAlt: "Екран календаря з розкладом",
        additionalImages: ["/online-section.png"],
      },
      {
        title: "База клієнтів та історія візитів",
        text: "Візити та всі клієнти зібрані в єдиному робочому просторі. Місце, яке захищає від хаосу, подвійних записів та зайвого стресу.",
        image: "/booking-details.png",
        imageAlt: "Екрани профілю клієнта та деталей візиту",
        additionalImages: ["/client-summary.png"],
      },
      {
        title: "Простий запис",
        text: "Клієнт записується самостійно, а ви не витрачаєте час та нерви на узгодження віконця.",
        image: "/master-storefront.png",
        imageAlt: "Публічна сторінка майстра для онлайн-запису",
        additionalImages: ["/master-schedule.png", "/master-services.png"],
      },
      {
        title: "Фінанси під контролем",
        text: "100% обізнаність про стан вашого бізнесу. Контролюйте доходи, витрати та заповненість графіка без складних таблиць.",
        image: "/analytics.png",
        imageAlt: "Екран аналітики доходів та витрат",
        additionalImages: ["/master-expenses.png"],
      },
      {
        title: "Чорний список",
        text: "Безкомпромісний захист ваших кордонів. Дозвольте відхиляти візити небажаних клієнтів, щоб ви працювали тільки з тими, з ким комфортно.",
      },
      {
        title: "Починайте без стресу",
        text: "Допоможемо безкоштовно перенести клієнтську базу та записи з інших застосунків чи таблиць.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Як це працює",
    hero: "Запис стає частиною вашого сервісу, а не нескінченним чатом.",
    steps: [
      {
        title: "Реєструєтеся",
        text: "Створюєте акаунт за лічені секунди.",
      },
      {
        title: "Налаштовуєте",
        text: "Створюєте послуги та відкриваєте віконця.",
      },
      {
        title: "Ділитеся посиланням",
        text: "Розміщуєте своє посилання в соцмережах.",
      },
      {
        title: "Приймаєте записи",
        text: "Клієнти записуються самостійно, а ви отримуєте сповіщення.",
      },
    ],
  },
  faq: {
    eyebrow: "Питання та відповіді",
    hero: "Все, що варто знати перед початком.",
    items: [
      {
        question: "Для кого створений BOOKEASY?",
        answer:
          "BOOKEASY — для професіоналів, які ведуть запис клієнтів у сфері beauty, тату, масажу, приватної медицини чи медіа. Якщо вам потрібен зручний простір для записів, історії візитів та контролю за розкладом без хаосу в блокнотах чи таблицях, — це для вас.",
      },
      {
        question: "Як працює онлайн-запис?",
        answer:
          "Ви додаєте персональне посилання у соціальних мережах. Клієнт обирає послугу та вільний час, заповнює необхідні дані. Ви отримуєте сповіщення, клієнт — підтвердження й нагадування перед візитом.",
      },
      {
        question: "Як встановити застосунок на телефон?",
        answer:
          "Відкрийте bookeasy.com.ua у Safari → «Поділитися» → «На Початковий екран» → «Додати». BOOKEASY встановлюється без App Store і працює як звичайний застосунок.",
      },
      {
        question: "Чи допоможете перенести дані?",
        answer:
          "Так, перенесення безкоштовне. Допоможемо перенести вашу базу клієнтів та послуги з інших застосунків чи таблиць, щоб ви не витрачали на це власний час.",
      },
      {
        question: "Чи можна додати своє портфоліо?",
        answer:
          "Так. Ваша сторінка містить розділ портфоліо — розмістіть роботи і клієнт побачить їх ще до запису.",
      },
      {
        question: "Як вирішується проблема подвійних записів?",
        answer:
          "Кожне заброньоване віконце миттєво зникає для решти клієнтів — подвійні записи виключені.",
      },
      {
        question: "Чи є захист від накладок у графіку?",
        answer:
          "Так. Система не дозволяє створити віконця чи бронювання, які перетинаються. Налаштування буфера запобігає візитам останньої миті.",
      },
      {
        question: "Чи є обмеження на кількість клієнтів?",
        answer: "Ні. База клієнтів і кількість записів не обмежені тарифним планом.",
      },
      {
        question: "Скільки коштують сповіщення/нагадування?",
        answer:
          "Безкоштовно. Усі автоматичні повідомлення включені в підписку без доплат і лімітів.",
      },
      {
        question: "Чи потрібна банківська картка при реєстрації?",
        answer:
          "Ні. Реєструєтесь, налаштовуєте профіль і одразу починаєте приймати записи. Ніяких передоплат — платіжні дані потрібні лише коли ви самі вирішите продовжити підписку.",
      },
      {
        question: "Що відбувається після тестового періоду?",
        answer:
          "Після 7 безкоштовних днів у вас є ще 3 дні, щоб оплатити — і продовжити роботу без перерви. Якщо не оплатити, профіль не зможе працювати повноцінно.",
      },
      {
        question: "Чи можна заблокувати небажаного клієнта?",
        answer:
          "Так. Клієнти з чорного списку не можуть забронювати ваші віконця — їхні спроби автоматично відхиляються.",
      },
      {
        question: "Як працює служба підтримки?",
        answer:
          "Ми на зв'язку в Telegram та Instagram. Відповідаємо особисто, допомагаємо з налаштуванням кабінету та оперативно вирішуємо технічні питання.",
      },
    ],
  },
};

export interface PlanFeature {
  name: string;
  description: string;
}

export interface PricingPlan {
  id: number;
  title: string;
  description: string;
  plan_type: string;
  price: string;
  old_price: string | null;
  currency: string;
  duration: string;
  is_active: boolean;
  is_public: boolean;
  features: PlanFeature[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 2,
    title: "Care",
    description: "Усі можливості BOOKEASY без обмежень",
    plan_type: "basic",
    price: "225.00",
    old_price: "350.00",
    currency: "UAH",
    duration: "P30D",
    is_active: true,
    is_public: true,
    features: [
      {
        name: "Портфоліо",
        description:
          "Результати роботи підкреслюють вашу експертність з першого погляду.",
      },
      {
        name: "Сповіщення",
        description:
          "Нагадування зменшують пропуски та інформують про кожен візит.",
      },
      {
        name: "Статистика",
        description:
          "Ключові метрики та показники вашого бізнесу в одному застосунку.",
      },
      {
        name: "Чорний список",
        description:
          "Небажаним клієнтам буде лаконічно відмовлено у візиті.",
      },
      {
        name: "Історія візитів",
        description:
          "Інформація про минулі візити клієнта зберігаються в одному місці.",
      },
      {
        name: "Онлайн-запис 24/7",
        description:
          "Клієнт самостійно бронює віконце у будь-який час без ручних узгоджень.",
      },
      {
        name: "Нотатки до запису",
        description:
          "Додавайте важливі деталі чи побажання клієнта у його записі.",
      },
      {
        name: "Графік без перетинів",
        description: "Захист від подвійних записів на одине віконце.",
      },
      {
        name: "Самостійне скасування",
        description:
          "Клієнт може скасувати візит в один клік. Ви отримаєте сповіщення.",
      },
    ],
  },
  {
    id: 13,
    title: "Care",
    description: "Усі можливості BOOKEASY без обмежень",
    plan_type: "basic",
    price: "2250.00",
    old_price: "2700.00",
    currency: "UAH",
    duration: "P1Y",
    is_active: true,
    is_public: true,
    features: [
      {
        name: "Портфоліо",
        description:
          "Результати роботи підкреслюють вашу експертність з першого погляду.",
      },
      {
        name: "Сповіщення",
        description:
          "Нагадування зменшують пропуски та інформують про кожен візит.",
      },
      {
        name: "Статистика",
        description:
          "Ключові метрики та показники вашого бізнесу в одному застосунку.",
      },
      {
        name: "Чорний список",
        description:
          "Небажаним клієнтам буде лаконічно відмовлено у візиті.",
      },
      {
        name: "Історія візитів",
        description:
          "Інформація про минулі візити клієнта зберігаються в одному місці.",
      },
      {
        name: "Онлайн-запис 24/7",
        description:
          "Клієнт самостійно бронює віконце у будь-який час без ручних узгоджень.",
      },
      {
        name: "Нотатки до запису",
        description:
          "Додавайте важливі деталі чи побажання клієнта у його записі.",
      },
      {
        name: "Графік без перетинів",
        description: "Захист від подвійних записів на одине віконце.",
      },
      {
        name: "Самостійне скасування",
        description:
          "Клієнт може скасувати візит в один клік. Ви отримаєте сповіщення.",
      },
    ],
  },
];

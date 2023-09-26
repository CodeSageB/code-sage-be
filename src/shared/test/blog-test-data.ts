import { CreateBlogDto } from '../../blogs/dtos/createBlog.dto';
export enum LanguagesEnum {
  CS = 'cs',
  EN = 'en'
}

export const blogTestArray: CreateBlogDto[] = [
  {
    translations: [
      {
        title: 'Exploring Space',
        content: 'The final frontier.',
        language: LanguagesEnum.EN
      },
      {
        title: 'Prozkoumání vesmíru',
        content: 'Poslední hranice.',
        language: LanguagesEnum.CS
      }
    ],
    tags: ['space', 'exploration']
  },
  {
    translations: [
      {
        title: 'Coffee Lovers',
        content: 'All about coffee.',
        language: LanguagesEnum.EN
      }
    ],
    tags: ['coffee', 'lifestyle']
  },
  {
    translations: [
      {
        title: 'The Art of Cooking',
        content: 'Culinary secrets.',
        language: LanguagesEnum.EN
      },
      {
        title: 'Umění vaření',
        content: 'Kulinařská tajemství.',
        language: LanguagesEnum.CS
      }
    ],
    tags: ['cooking', 'food']
  },
  {
    translations: [
      {
        title: 'Travel on a Budget',
        content: 'See the world without breaking the bank.',
        language: LanguagesEnum.EN
      }
    ],
    tags: ['travel', 'budget']
  },
  {
    translations: [
      {
        title: 'Programming 101',
        content: 'Introduction to programming.',
        language: LanguagesEnum.EN
      },
      {
        title: 'Programování 101',
        content: 'Úvod do programování.',
        language: LanguagesEnum.CS
      }
    ],
    tags: ['programming', 'technology']
  },
  {
    translations: [
      {
        title: 'Fitness Goals',
        content: 'Achieve your fitness goals.',
        language: LanguagesEnum.EN
      },
      {
        title: 'Fitness cíle',
        content: 'Dosáhněte svých fitness cílů.',
        language: LanguagesEnum.CS
      }
    ],
    tags: ['fitness', 'health']
  },
  {
    translations: [
      {
        title: 'Mental Health',
        content: 'Taking care of your mind.',
        language: LanguagesEnum.EN
      },
      {
        title: 'Duševní zdraví',
        content: 'Péče o vaši mysl.',
        language: LanguagesEnum.CS
      }
    ],
    tags: ['mental health', 'wellness']
  },
  {
    translations: [
      {
        title: 'Photography Tips',
        content: 'Capture the moment.',
        language: LanguagesEnum.EN
      },
      {
        title: 'Tipy na fotografování',
        content: 'Zachyťte okamžik.',
        language: LanguagesEnum.CS
      }
    ],
    tags: ['photography', 'art']
  },
  {
    translations: [
      {
        title: 'Gaming World',
        content: 'Latest in the gaming world.',
        language: LanguagesEnum.EN
      },
      {
        title: 'Herní svět',
        content: 'Nejnovější v herním světě.',
        language: LanguagesEnum.CS
      }
    ],
    tags: ['gaming', 'entertainment']
  },
  {
    translations: [
      {
        title: 'Sustainable Living',
        content: 'Eco-friendly lifestyle.',
        language: LanguagesEnum.EN
      },
      {
        title: 'Udržitelný život',
        content: 'Ekologický životní styl.',
        language: LanguagesEnum.CS
      }
    ],
    tags: ['sustainability', 'eco-friendly']
  },
  {
    translations: [
      {
        title: 'Music Genres',
        content: 'Exploring different types of music.',
        language: LanguagesEnum.EN
      },
      {
        title: 'Hudební žánry',
        content: 'Prozkoumání různých typů hudby.',
        language: LanguagesEnum.CS
      }
    ],
    tags: ['music', 'genres']
  },
  {
    translations: [
      {
        title: 'Movie Reviews',
        content: 'Latest movie reviews.',
        language: LanguagesEnum.EN
      },
      {
        title: 'Recenze filmů',
        content: 'Nejnovější recenze filmů.',
        language: LanguagesEnum.CS
      }
    ],
    tags: ['movies', 'reviews']
  },
  {
    translations: [
      {
        title: 'Book Recommendations',
        content: 'Books you should read.',
        language: LanguagesEnum.EN
      }
    ],
    tags: ['books', 'recommendations']
  },
  {
    translations: [
      {
        title: 'Pet Care',
        content: 'Taking care of your pets.',
        language: LanguagesEnum.EN
      },
      {
        title: 'Péče o mazlíčky',
        content: 'Péče o vaše mazlíčky.',
        language: LanguagesEnum.CS
      }
    ],
    tags: ['pets', 'care']
  },
  {
    translations: [
      {
        title: 'Investing Basics',
        content: 'Introduction to investing.',
        language: LanguagesEnum.EN
      },
      {
        title: 'Základy investování',
        content: 'Úvod do investování.',
        language: LanguagesEnum.CS
      }
    ],
    tags: ['investing', 'finance']
  }
];

export const blogTest: CreateBlogDto = {
  translations: [
    {
      title: 'Programming 101',
      content: 'Introduction to programming.',
      language: LanguagesEnum.EN
    },
    {
      title: 'Programování 101',
      content: 'Úvod do programování.',
      language: LanguagesEnum.CS
    }
  ],
  tags: ['programming', 'technology']
};

export const blogTest2: CreateBlogDto = {
  translations: [
    {
      title: 'Gaming World',
      content: 'Latest in the gaming world.',
      language: LanguagesEnum.EN
    },
    {
      title: 'Herní svět',
      content: 'Nejnovější v herním světě.',
      language: LanguagesEnum.CS
    }
  ],
  tags: ['gaming', 'entertainment']
};

export const blogTestCs: CreateBlogDto = {
  translations: [
    {
      title: 'Python to je stačka',
      content: 'Neprogramuj v pythonu pokud máš soudnost',
      language: LanguagesEnum.CS
    }
  ],
  tags: ['python', 'shit']
};

export const blogTestEn: CreateBlogDto = {
  translations: [
    {
      title: 'GO for the win',
      content: 'Title is self explaining',
      language: LanguagesEnum.EN
    }
  ],
  tags: ['go', 'supremacy']
};

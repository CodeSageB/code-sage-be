export class BlogDto {
  id: string;
  title: string;
  content: string;
  tags: string[];
  language: string;
  created: Date;
}

export class BlogTranslationDto {
  title: string;
  content: string;
  language: string;
}

export class CreatedBlogDto {
  id: string;
  translations: BlogTranslationDto[];
  tags: string[];
  created: Date;
}

export class UpdatedBlogDto {
  id: string;
  translations: BlogTranslationDto[];
  tags: string[];
  created: Date;
}

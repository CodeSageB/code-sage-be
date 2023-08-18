export interface Blog {
  id: number;
  externalId: string;
  title: string;
  content: string;
  created?: Date;
  updated?: Date;
}

export type CreateBlog = Omit<
  Blog,
  'created' | 'updated' | 'id' | 'externalId'
>;

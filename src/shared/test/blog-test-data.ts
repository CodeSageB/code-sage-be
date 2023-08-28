import { CreateBlogDto } from '../../blogs/dtos/createBlog.dto';

export const blogTestArray: CreateBlogDto[] = [
  {
    title: 'test title 1',
    content: 'test content 1',
    tags: ['test tag 1', 'test tag 2']
  },
  {
    title: 'test title 2',
    content: 'test content 2',
    tags: ['test tag 3', 'test tag 4']
  },
  {
    title: 'test title 3',
    content: 'test content 3',
    tags: ['test tag 5', 'test tag 6']
  },
  {
    title: 'test title 4',
    content: 'test content 4',
    tags: ['test tag 7']
  },
  {
    title: 'test title 5',
    content: 'test content 5',
    tags: ['test tag 8', 'test tag 9']
  },
  {
    title: 'test title 6',
    content: 'test content 6',
    tags: ['test tag 8', 'test tag 9']
  },
  {
    title: 'test title 7',
    content: 'test content 7',
    tags: ['test tag 8', 'test tag 9']
  },
  {
    title: 'test title 8',
    content: 'test content 8',
    tags: ['test tag 8', 'test tag 9']
  },
  {
    title: 'test title 9',
    content: 'test content 9',
    tags: ['test tag 8', 'test tag 9']
  },
  {
    title: 'test title 10',
    content: 'test content 10',
    tags: ['test tag 8', 'test tag 9']
  },
  {
    title: 'test title 11',
    content: 'test content 11',
    tags: ['test tag 8', 'test tag 9']
  }
];

export const blogTest: CreateBlogDto = {
  title: 'test title',
  content: 'test content',
  tags: ['test tag 1', 'test tag 2']
};

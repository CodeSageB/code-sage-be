import { MigrationInterface, QueryRunner } from 'typeorm';
import { BlogEntity } from '../../src/blogs/entities/Blog.entity';
import { BlogTranslationEntity } from '../../src/blogs/entities/BlogTranslation.entity';
import { TagEntity } from '../../src/blogs/entities/Tag.entity';
import { v4 as uuid } from 'uuid';

export class SeedData1697477890236 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const blogs: BlogEntity[] = [];
    const translations: Partial<BlogTranslationEntity>[] = [];
    const tags: TagEntity[] = [];

    // Blog 1
    const blog1 = new BlogEntity();
    blog1.externalId = uuid();
    blog1.created = new Date('2020-03-15T10:00:00Z');
    blog1.updated = new Date('2020-03-15T10:00:00Z');
    blogs.push(blog1);

    const tag1_1 = new TagEntity();
    tag1_1.tag = 'JavaScript';
    tag1_1.blog = blog1;
    tags.push(tag1_1);

    const tag1_2 = new TagEntity();
    tag1_2.tag = 'React';
    tag1_2.blog = blog1;
    tags.push(tag1_2);

    const translation1_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'React Hooks: A Comprehensive Guide',
      content: `In this blog post, we explore React Hooks, a feature introduced in React 16.8 that lets you use state and other React features without writing a class. We'll go through the core hooks like useState and useEffect, and also cover advanced topics like building your own hooks.`,
      blog: blog1
    };
    translations.push(translation1_1);

    // Blog 2
    const blog2 = new BlogEntity();
    blog2.externalId = uuid();
    blog2.created = new Date('2021-05-10T09:00:00Z');
    blog2.updated = new Date('2021-05-10T09:00:00Z');
    blogs.push(blog2);

    const tag2_1 = new TagEntity();
    tag2_1.tag = 'Python';
    tag2_1.blog = blog2;
    tags.push(tag2_1);

    const tag2_2 = new TagEntity();
    tag2_2.tag = 'Django';
    tag2_2.blog = blog2;
    tags.push(tag2_2);

    const translation2_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Building a Simple CRUD App with Django',
      content: `In this tutorial, we'll be creating a simple CRUD (Create, Read, Update, Delete) application using Django, a high-level Python Web framework. We'll cover setting up a new Django project, defining models, creating views, and setting up templates to render HTML.`,
      blog: blog2
    };
    translations.push(translation2_1);

    const translation2_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Vytvoření jednoduché CRUD aplikace s Django',
      content: `V tomto tutoriálu vytvoříme jednoduchou CRUD (Create, Read, Update, Delete) aplikaci pomocí Django, vysokoúrovňového webového frameworku Pythonu. Projdeme si nastavení nového projektu Django, definici modelů, vytvoření pohledů a nastavení šablon pro vykreslování HTML.`,
      blog: blog2
    };
    translations.push(translation2_2);

    // Blog 3
    const blog3 = new BlogEntity();
    blog3.externalId = uuid();
    blog3.created = new Date('2022-01-20T08:00:00Z');
    blog3.updated = new Date('2022-01-20T08:00:00Z');
    blogs.push(blog3);

    const tag3_1 = new TagEntity();
    tag3_1.tag = 'JavaScript';
    tag3_1.blog = blog3;
    tags.push(tag3_1);

    const tag3_2 = new TagEntity();
    tag3_2.tag = 'Node.js';
    tag3_2.blog = blog3;
    tags.push(tag3_2);

    const translation3_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Understanding Async/Await in Node.js',
      content: `The async/await feature in JavaScript is a crucial part of handling promises. In this tutorial, we'll dive into async/await in Node.js, understand its syntax, and see how it can make our asynchronous code cleaner and more readable.`,
      blog: blog3
    };
    translations.push(translation3_1);

    // Blog 4
    const blog4 = new BlogEntity();
    blog4.externalId = uuid();
    blog4.created = new Date('2021-06-15T11:00:00Z');
    blog4.updated = new Date('2021-06-15T11:00:00Z');
    blogs.push(blog4);

    const tag4_1 = new TagEntity();
    tag4_1.tag = 'Ruby';
    tag4_1.blog = blog4;
    tags.push(tag4_1);

    const tag4_2 = new TagEntity();
    tag4_2.tag = 'Rails';
    tag4_2.blog = blog4;
    tags.push(tag4_2);

    const translation4_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Getting Started with Ruby on Rails',
      content: `Ruby on Rails is a powerful framework for building web applications. In this blog, we'll cover the basics of setting up a new Rails project, working with databases, and creating your first controller and view.`,
      blog: blog4
    };
    translations.push(translation4_1);

    // Blog 5
    const blog5 = new BlogEntity();
    blog5.externalId = uuid();
    blog5.created = new Date('2022-08-20T12:00:00Z');
    blog5.updated = new Date('2022-08-20T12:00:00Z');
    blogs.push(blog5);

    const tag5_1 = new TagEntity();
    tag5_1.tag = 'Java';
    tag5_1.blog = blog5;
    tags.push(tag5_1);

    const tag5_2 = new TagEntity();
    tag5_2.tag = 'Spring Boot';
    tag5_2.blog = blog5;
    tags.push(tag5_2);

    const translation5_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Building Microservices with Spring Boot',
      content: `Microservices architecture allows developers to build and maintain modular applications. In this blog post, we'll explore how to create microservices using Spring Boot, a framework that simplifies the development of production-ready applications in Java.`,
      blog: blog5
    };
    translations.push(translation5_1);

    const translation5_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Výstavba mikroslužeb s Spring Boot',
      content: `Architektura mikroslužeb umožňuje vývojářům vytvářet a udržovat modulární aplikace. V tomto blogovém příspěvku prozkoumáme, jak vytvářet mikroslužby pomocí Spring Boot, frameworku, který zjednodušuje vývoj aplikací připravených pro produkci v Javě.`,
      blog: blog5
    };
    translations.push(translation5_2);

    // Blog 6
    const blog6 = new BlogEntity();
    blog6.externalId = uuid();
    blog6.created = new Date('2021-04-07T10:00:00Z');
    blog6.updated = new Date('2021-04-07T10:00:00Z');
    blogs.push(blog6);

    const tag6_1 = new TagEntity();
    tag6_1.tag = 'Angular';
    tag6_1.blog = blog6;
    tags.push(tag6_1);

    const tag6_2 = new TagEntity();
    tag6_2.tag = 'TypeScript';
    tag6_2.blog = blog6;
    tags.push(tag6_2);

    const translation6_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Angular Testing Techniques',
      content: `Testing is a crucial part of the development process. This blog post explores various testing techniques in Angular, covering unit testing, integration testing, and end-to-end testing.`,
      blog: blog6
    };
    translations.push(translation6_1);

    // Blog 7
    const blog7 = new BlogEntity();
    blog7.externalId = uuid();
    blog7.created = new Date('2022-02-15T11:00:00Z');
    blog7.updated = new Date('2022-02-15T11:00:00Z');
    blogs.push(blog7);

    const tag7_1 = new TagEntity();
    tag7_1.tag = 'Python';
    tag7_1.blog = blog7;
    tags.push(tag7_1);

    const tag7_2 = new TagEntity();
    tag7_2.tag = 'Flask';
    tag7_2.blog = blog7;
    tags.push(tag7_2);

    const translation7_1: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Vytváření webových aplikací s Flaskem',
      content: `Flask je mikrorámec pro vytváření webových aplikací v Pythonu. V tomto blogu se podíváme na to, jak vytvořit jednoduchou webovou aplikaci s Flaskem, definovat trasy a pracovat s šablonami.`,
      blog: blog7
    };
    translations.push(translation7_1);

    // Blog 8
    const blog8 = new BlogEntity();
    blog8.externalId = uuid();
    blog8.created = new Date('2020-09-10T09:00:00Z');
    blog8.updated = new Date('2020-09-10T09:00:00Z');
    blogs.push(blog8);

    const tag8_1 = new TagEntity();
    tag8_1.tag = 'Java';
    tag8_1.blog = blog8;
    tags.push(tag8_1);

    const tag8_2 = new TagEntity();
    tag8_2.tag = 'Spring';
    tag8_2.blog = blog8;
    tags.push(tag8_2);

    const translation8_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Securing Spring Boot Applications',
      content: `Security is paramount when developing web applications. This blog post delves into securing Spring Boot applications using Spring Security, covering authentication, authorization, and other security best practices.`,
      blog: blog8
    };
    translations.push(translation8_1);

    // Blog 9
    const blog9 = new BlogEntity();
    blog9.externalId = uuid();
    blog9.created = new Date('2022-07-15T10:00:00Z');
    blog9.updated = new Date('2022-07-15T10:00:00Z');
    blogs.push(blog9);

    const tag9_1 = new TagEntity();
    tag9_1.tag = 'JavaScript';
    tag9_1.blog = blog9;
    tags.push(tag9_1);

    const tag9_2 = new TagEntity();
    tag9_2.tag = 'Vue.js';
    tag9_2.blog = blog9;
    tags.push(tag9_2);

    const translation9_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Vue 3 Composition API: A Primer',
      content: `The Composition API introduced in Vue 3 provides a flexible way to structure your Vue applications. In this post, we'll explore the basics of the Composition API and how it can be used to organize code in a more maintainable and readable manner.`,
      blog: blog9
    };
    translations.push(translation9_1);

    // Blog 10
    const blog10 = new BlogEntity();
    blog10.externalId = uuid();
    blog10.created = new Date('2021-11-21T09:00:00Z');
    blog10.updated = new Date('2021-11-21T09:00:00Z');
    blogs.push(blog10);

    const tag10_1 = new TagEntity();
    tag10_1.tag = 'Ruby';
    tag10_1.blog = blog10;
    tags.push(tag10_1);

    const tag10_2 = new TagEntity();
    tag10_2.tag = 'Rails';
    tag10_2.blog = blog10;
    tags.push(tag10_2);

    const translation10_1: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Optimalizace výkonu aplikací Ruby on Rails',
      content: `Optimalizace výkonu je klíčová pro zajištění hladkého provozu vašich aplikací Ruby on Rails. V tomto příspěvku probereme několik osvědčených postupů pro zlepšení výkonu aplikací Rails, včetně databázové indexace, cachování a pozadí úloh.`,
      blog: blog10
    };
    translations.push(translation10_1);

    // Blog 11
    const blog11 = new BlogEntity();
    blog11.externalId = uuid();
    blog11.created = new Date('2023-03-28T11:00:00Z');
    blog11.updated = new Date('2023-03-28T11:00:00Z');
    blogs.push(blog11);

    const tag11_1 = new TagEntity();
    tag11_1.tag = 'Python';
    tag11_1.blog = blog11;
    tags.push(tag11_1);

    const tag11_2 = new TagEntity();
    tag11_2.tag = 'Django';
    tag11_2.blog = blog11;
    tags.push(tag11_2);

    const translation11_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Deploying Django Applications on AWS',
      content: `Deploying Django applications can be straightforward or complex, depending on the requirements of your project. In this tutorial, we'll walk through the steps of deploying a Django application on AWS, using services like EC2, RDS, and S3.`,
      blog: blog11
    };
    translations.push(translation11_1);

    const translation11_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Nasazení aplikací Django na AWS',
      content: `Nasazení aplikací Django může být jednoduché nebo složité v závislosti na požadavcích vašeho projektu. V tomto tutoriálu projdeme kroky nasazení aplikace Django na AWS pomocí služeb jako jsou EC2, RDS a S3.`,
      blog: blog11
    };
    translations.push(translation11_2);

    // Blog 12
    const blog12 = new BlogEntity();
    blog12.externalId = uuid();
    blog12.created = new Date('2022-10-12T10:00:00Z');
    blog12.updated = new Date('2022-10-12T10:00:00Z');
    blogs.push(blog12);

    const tag12_1 = new TagEntity();
    tag12_1.tag = 'Java';
    tag12_1.blog = blog12;
    tags.push(tag12_1);

    const tag12_2 = new TagEntity();
    tag12_2.tag = 'Spring Boot';
    tag12_2.blog = blog12;
    tags.push(tag12_2);

    const translation12_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Building RESTful Web Services with Spring Boot',
      content: `Spring Boot simplifies the development of stand-alone, production-grade Spring-based applications. In this post, we'll explore how to build RESTful web services using Spring Boot, along with best practices for versioning, error handling, and documentation.`,
      blog: blog12
    };
    translations.push(translation12_1);

    // Blog 13
    const blog13 = new BlogEntity();
    blog13.externalId = uuid();
    blog13.created = new Date('2023-04-25T11:00:00Z');
    blog13.updated = new Date('2023-04-25T11:00:00Z');
    blogs.push(blog13);

    const tag13_1 = new TagEntity();
    tag13_1.tag = 'JavaScript';
    tag13_1.blog = blog13;
    tags.push(tag13_1);

    const tag13_2 = new TagEntity();
    tag13_2.tag = 'Node.js';
    tag13_2.blog = blog13;
    tags.push(tag13_2);

    const translation13_1: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Vývoj serverových aplikací s Node.js',
      content: `Node.js je populární platforma pro vývoj serverových aplikací v JavaScriptu. V tomto příspěvku prozkoumáme základní principy vývoje serverových aplikací s Node.js, včetně práce s moduly, správy závislostí a práce s databázemi.`,
      blog: blog13
    };
    translations.push(translation13_1);

    // Blog 14
    const blog14 = new BlogEntity();
    blog14.externalId = uuid();
    blog14.created = new Date('2021-06-18T09:00:00Z');
    blog14.updated = new Date('2021-06-18T09:00:00Z');
    blogs.push(blog14);

    const tag14_1 = new TagEntity();
    tag14_1.tag = 'Python';
    tag14_1.blog = blog14;
    tags.push(tag14_1);

    const tag14_2 = new TagEntity();
    tag14_2.tag = 'Machine Learning';
    tag14_2.blog = blog14;
    tags.push(tag14_2);

    const translation14_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Machine Learning with Python: A Beginner’s Guide',
      content: `Python is a popular choice for machine learning, with libraries such as TensorFlow and scikit-learn providing powerful tools for data analysis. In this post, we'll explore the basics of machine learning with Python, covering topics such as data preprocessing, model training, and evaluation.`,
      blog: blog14
    };
    translations.push(translation14_1);

    // Blog 15
    const blog15 = new BlogEntity();
    blog15.externalId = uuid();
    blog15.created = new Date('2022-03-10T10:00:00Z');
    blog15.updated = new Date('2022-03-10T10:00:00Z');
    blogs.push(blog15);

    const tag15_1 = new TagEntity();
    tag15_1.tag = 'JavaScript';
    tag15_1.blog = blog15;
    tags.push(tag15_1);

    const tag15_2 = new TagEntity();
    tag15_2.tag = 'React';
    tag15_2.blog = blog15;
    tags.push(tag15_2);

    const translation15_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'React State Management with Redux',
      content: `Managing state in large React applications can be challenging. In this post, we'll explore how to use Redux for state management in React applications, ensuring a predictable state with a consistent API.`,
      blog: blog15
    };
    translations.push(translation15_1);

    // Blog 16
    const blog16 = new BlogEntity();
    blog16.externalId = uuid();
    blog16.created = new Date('2023-01-15T11:00:00Z');
    blog16.updated = new Date('2023-01-15T11:00:00Z');
    blogs.push(blog16);

    const tag16_1 = new TagEntity();
    tag16_1.tag = 'Python';
    tag16_1.blog = blog16;
    tags.push(tag16_1);

    const tag16_2 = new TagEntity();
    tag16_2.tag = 'Flask';
    tag16_2.blog = blog16;
    tags.push(tag16_2);

    const translation16_1: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Autentizace uživatelů ve Flasku',
      content: `Autentizace uživatelů je základním prvkem většiny webových aplikací. V tomto příspěvku se podíváme na několik způsobů, jak implementovat autentizaci uživatelů ve Flasku, včetně použití rozšíření Flask-Login a Flask-Security.`,
      blog: blog16
    };
    translations.push(translation16_1);

    // Blog 17
    const blog17 = new BlogEntity();
    blog17.externalId = uuid();
    blog17.created = new Date('2021-05-20T09:00:00Z');
    blog17.updated = new Date('2021-05-20T09:00:00Z');
    blogs.push(blog17);

    const tag17_1 = new TagEntity();
    tag17_1.tag = 'Java';
    tag17_1.blog = blog17;
    tags.push(tag17_1);

    const tag17_2 = new TagEntity();
    tag17_2.tag = 'Spring Boot';
    tag17_2.blog = blog17;
    tags.push(tag17_2);

    const translation17_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Microservices Architecture with Spring Boot',
      content: `Microservices architecture allows for the development of highly scalable and maintainable software systems. In this post, we'll delve into how to design and implement microservices using Spring Boot, covering topics such as API gateway, configuration server, and service discovery.`,
      blog: blog17
    };
    translations.push(translation17_1);

    // Blog 18
    const blog18 = new BlogEntity();
    blog18.externalId = uuid();
    blog18.created = new Date('2021-08-10T10:00:00Z');
    blog18.updated = new Date('2021-08-10T10:00:00Z');
    blogs.push(blog18);

    const tag18_1 = new TagEntity();
    tag18_1.tag = 'JavaScript';
    tag18_1.blog = blog18;
    tags.push(tag18_1);

    const tag18_2 = new TagEntity();
    tag18_2.tag = 'Node.js';
    tag18_2.blog = blog18;
    tags.push(tag18_2);

    const translation18_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Building a REST API with Node.js and Express',
      content: `In this tutorial, we'll create a simple REST API using Node.js and Express, a fast, unopinionated, and flexible Node.js web application framework. We'll cover routing, middleware, handling requests, and connecting to a database.`,
      blog: blog18
    };
    translations.push(translation18_1);

    const translation18_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Vytvoření REST API s Node.js a Express',
      content: `V tomto tutoriálu vytvoříme jednoduché REST API pomocí Node.js a Express, rychlého, nezávislého a flexibilního webového aplikačního frameworku Node.js. Projdeme si routování, middleware, zpracování požadavků a připojení k databázi.`,
      blog: blog18
    };
    translations.push(translation18_2);

    // Blog 19
    const blog19 = new BlogEntity();
    blog19.externalId = uuid();
    blog19.created = new Date('2022-09-15T11:00:00Z');
    blog19.updated = new Date('2022-09-15T11:00:00Z');
    blogs.push(blog19);

    const tag19_1 = new TagEntity();
    tag19_1.tag = 'Python';
    tag19_1.blog = blog19;
    tags.push(tag19_1);

    const tag19_2 = new TagEntity();
    tag19_2.tag = 'Django';
    tag19_2.blog = blog19;
    tags.push(tag19_2);

    const translation19_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Deploying Django Applications to Heroku',
      content: `Deploying Django applications can be done in several ways. In this post, we'll explore how to deploy a Django application to Heroku, a platform as a service (PaaS) that abstracts away infrastructure so you can focus on your application.`,
      blog: blog19
    };
    translations.push(translation19_1);

    const translation19_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Nasazení aplikací Django na Heroku',
      content: `Nasazení aplikací Django lze provést několika způsoby. V tomto příspěvku prozkoumáme, jak nasadit aplikaci Django na Heroku, platformě jako služba (PaaS), která abstrahuje infrastrukturu, abyste se mohli soustředit na svou aplikaci.`,
      blog: blog19
    };
    translations.push(translation19_2);

    // Blog 20
    const blog20 = new BlogEntity();
    blog20.externalId = uuid();
    blog20.created = new Date('2023-05-30T09:00:00Z');
    blog20.updated = new Date('2023-05-30T09:00:00Z');
    blogs.push(blog20);

    const tag20_1 = new TagEntity();
    tag20_1.tag = 'Java';
    tag20_1.blog = blog20;
    tags.push(tag20_1);

    const tag20_2 = new TagEntity();
    tag20_2.tag = 'Spring Boot';
    tag20_2.blog = blog20;
    tags.push(tag20_2);

    const translation20_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Implementing OAuth 2.0 with Spring Boot',
      content: `OAuth 2.0 is a protocol for authorization that enables third-party applications to obtain limited access to user accounts. In this post, we'll delve into implementing OAuth 2.0 using Spring Boot, covering topics such as setting up an authorization server, configuring a resource server, and securing APIs.`,
      blog: blog20
    };
    translations.push(translation20_1);

    const translation20_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Implementace OAuth 2.0 se Spring Boot',
      content: `OAuth 2.0 je protokol pro autorizaci, který umožňuje aplikacím třetích stran získat omezený přístup k uživatelským účtům. V tomto příspěvku se ponoříme do implementace OAuth 2.0 pomocí Spring Boot, kde probereme nastavení autorizačního serveru, konfiguraci zdrojového serveru a zabezpečení API.`,
      blog: blog20
    };
    translations.push(translation20_2);

    const blog21 = new BlogEntity();
    blog21.externalId = uuid();
    blog21.created = new Date('2021-12-14T10:00:00Z');
    blog21.updated = new Date('2021-12-14T10:00:00Z');
    blogs.push(blog21);

    const tag21_1 = new TagEntity();
    tag21_1.tag = 'JavaScript';
    tag21_1.blog = blog21;
    tags.push(tag21_1);

    const tag21_2 = new TagEntity();
    tag21_2.tag = 'React';
    tag21_2.blog = blog21;
    tags.push(tag21_2);

    const translation21_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Server-Side Rendering with React and Node.js',
      content: `Server-Side Rendering (SSR) can improve the performance and SEO of your React applications. In this tutorial, we'll set up a simple React application with server-side rendering using Node.js and Express.`,
      blog: blog21
    };
    translations.push(translation21_1);

    const translation21_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Server-Side Rendering s React a Node.js',
      content: `Server-Side Rendering (SSR) může zlepšit výkon a SEO vašich aplikací React. V tomto tutoriálu nastavíme jednoduchou aplikaci React s vykreslováním na straně serveru pomocí Node.js a Express.`,
      blog: blog21
    };
    translations.push(translation21_2);

    // Blog 22
    const blog22 = new BlogEntity();
    blog22.externalId = uuid();
    blog22.created = new Date('2022-04-20T11:00:00Z');
    blog22.updated = new Date('2022-04-20T11:00:00Z');
    blogs.push(blog22);

    const tag22_1 = new TagEntity();
    tag22_1.tag = 'Python';
    tag22_1.blog = blog22;
    tags.push(tag22_1);

    const tag22_2 = new TagEntity();
    tag22_2.tag = 'Data Science';
    tag22_2.blog = blog22;
    tags.push(tag22_2);

    const translation22_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Exploratory Data Analysis with Python',
      content: `Exploratory Data Analysis (EDA) is a crucial step in understanding the characteristics of a dataset. In this post, we'll explore various Python libraries and tools such as Pandas, Matplotlib, and Seaborn to perform EDA and gain insights from data.`,
      blog: blog22
    };
    translations.push(translation22_1);

    const translation22_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Průzkumná analýza dat s Pythonem',
      content: `Průzkumná analýza dat (EDA) je zásadním krokem k pochopení charakteristik datasetu. V tomto příspěvku prozkoumáme různé knihovny a nástroje Pythonu, jako jsou Pandas, Matplotlib a Seaborn, abychom provedli EDA a získali vhled do dat.`,
      blog: blog22
    };
    translations.push(translation22_2);

    const blog23 = new BlogEntity();
    blog23.externalId = uuid();
    blog23.created = new Date('2022-06-08T10:00:00Z');
    blog23.updated = new Date('2022-06-08T10:00:00Z');
    blogs.push(blog23);

    const tag23_1 = new TagEntity();
    tag23_1.tag = 'JavaScript';
    tag23_1.blog = blog23;
    tags.push(tag23_1);

    const tag23_2 = new TagEntity();
    tag23_2.tag = 'Angular';
    tag23_2.blog = blog23;
    tags.push(tag23_2);

    const translation23_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Getting Started with Angular Forms',
      content: `Angular provides robust support for handling user inputs through forms. In this post, we'll delve into the basics of Angular Forms, covering topics such as form controls, form groups, and form validation.`,
      blog: blog23
    };
    translations.push(translation23_1);

    const translation23_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Začínáme s formuláři Angular',
      content: `Angular poskytuje robustní podporu pro zpracování uživatelských vstupů prostřednictvím formulářů. V tomto příspěvku se ponoříme do základů formulářů Angular, kde probereme témata jako jsou ovládací prvky formulářů, skupiny formulářů a ověřování formulářů.`,
      blog: blog23
    };
    translations.push(translation23_2);

    // Blog 24
    const blog24 = new BlogEntity();
    blog24.externalId = uuid();
    blog24.created = new Date('2023-02-14T11:00:00Z');
    blog24.updated = new Date('2023-02-14T11:00:00Z');
    blogs.push(blog24);

    const tag24_1 = new TagEntity();
    tag24_1.tag = 'Python';
    tag24_1.blog = blog24;
    tags.push(tag24_1);

    const tag24_2 = new TagEntity();
    tag24_2.tag = 'Web Development';
    tag24_2.blog = blog24;
    tags.push(tag24_2);

    const translation24_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Building a Web Application with Flask',
      content: `Flask is a lightweight WSGI web application framework in Python. In this tutorial, we'll create a simple web application using Flask, covering topics such as routing, templates, and handling user inputs.`,
      blog: blog24
    };
    translations.push(translation24_1);

    const translation24_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Vytvoření webové aplikace s Flask',
      content: `Flask je lehký WSGI webový aplikační framework v Pythonu. V tomto tutoriálu vytvoříme jednoduchou webovou aplikaci pomocí Flasku, kde probereme témata jako jsou routování, šablony a zpracování uživatelských vstupů.`,
      blog: blog24
    };
    translations.push(translation24_2);

    // Blog 25
    const blog25 = new BlogEntity();
    blog25.externalId = uuid();
    blog25.created = new Date('2021-11-30T09:00:00Z');
    blog25.updated = new Date('2021-11-30T09:00:00Z');
    blogs.push(blog25);

    const tag25_1 = new TagEntity();
    tag25_1.tag = 'Java';
    tag25_1.blog = blog25;
    tags.push(tag25_1);

    const tag25_2 = new TagEntity();
    tag25_2.tag = 'Web Development';
    tag25_2.blog = blog25;
    tags.push(tag25_2);

    const translation25_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Introduction to Java Servlets',
      content: `Java Servlets are server-side programs that handle client requests and return responses. In this post, we'll introduce the basics of Java Servlets, discussing their lifecycle, handling HTTP requests, and deploying servlets on a server.`,
      blog: blog25
    };
    translations.push(translation25_1);

    const translation25_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Úvod do Java Servletů',
      content: `Java Servlety jsou serverové programy, které zpracovávají klientovy požadavky a vrací odpovědi. V tomto příspěvku představíme základy Java Servletů, probereme jejich životní cyklus, zpracování HTTP požadavků a nasazení servletů na server.`,
      blog: blog25
    };
    translations.push(translation25_2);

    const blog26 = new BlogEntity();
    blog26.externalId = uuid();
    blog26.created = new Date('2022-07-12T10:00:00Z');
    blog26.updated = new Date('2022-07-12T10:00:00Z');
    blogs.push(blog26);

    const tag26_1 = new TagEntity();
    tag26_1.tag = 'JavaScript';
    tag26_1.blog = blog26;
    tags.push(tag26_1);

    const tag26_2 = new TagEntity();
    tag26_2.tag = 'Vue.js';
    tag26_2.blog = blog26;
    tags.push(tag26_2);

    const translation26_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Vue.js State Management with Vuex',
      content: `Managing state in Vue.js applications can be streamlined using Vuex. In this post, we'll dive into setting up Vuex in a Vue.js project, covering topics such as state, mutations, actions, and getters.`,
      blog: blog26
    };
    translations.push(translation26_1);

    const translation26_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Správa stavu ve Vue.js s Vuex',
      content: `Správa stavu ve Vue.js aplikacích může být zefektivněna pomocí Vuex. V tomto příspěvku se ponoříme do nastavení Vuex ve Vue.js projektu, kde probereme témata jako jsou stav, mutace, akce a získávače.`,
      blog: blog26
    };
    translations.push(translation26_2);

    // Blog 27
    const blog27 = new BlogEntity();
    blog27.externalId = uuid();
    blog27.created = new Date('2023-03-15T11:00:00Z');
    blog27.updated = new Date('2023-03-15T11:00:00Z');
    blogs.push(blog27);

    const tag27_1 = new TagEntity();
    tag27_1.tag = 'Python';
    tag27_1.blog = blog27;
    tags.push(tag27_1);

    const tag27_2 = new TagEntity();
    tag27_2.tag = 'Web Scraping';
    tag27_2.blog = blog27;
    tags.push(tag27_2);

    const translation27_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Web Scraping with Python using Beautiful Soup',
      content: `Web scraping is a technique used to extract data from websites. In this post, we'll explore how to perform web scraping using Python and Beautiful Soup, covering topics such as handling HTML, navigating the DOM, and dealing with dynamic content.`,
      blog: blog27
    };
    translations.push(translation27_1);

    const translation27_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Web Scraping s Pythonem pomocí Beautiful Soup',
      content: `Web scraping je technika používaná k extrakci dat z webových stránek. V tomto příspěvku prozkoumáme, jak provádět web scraping pomocí Pythonu a Beautiful Soup, kde probereme témata jako je zpracování HTML, navigace v DOM a zpracování dynamického obsahu.`,
      blog: blog27
    };
    translations.push(translation27_2);

    // Blog 28
    const blog28 = new BlogEntity();
    blog28.externalId = uuid();
    blog28.created = new Date('2020-11-17T09:00:00Z');
    blog28.updated = new Date('2020-11-17T09:00:00Z');
    blogs.push(blog28);

    const tag28_1 = new TagEntity();
    tag28_1.tag = 'Java';
    tag28_1.blog = blog28;
    tags.push(tag28_1);

    const tag28_2 = new TagEntity();
    tag28_2.tag = 'Spring Framework';
    tag28_2.blog = blog28;
    tags.push(tag28_2);

    const translation28_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Building RESTful Web Services with Spring',
      content: `Spring Framework provides support for building RESTful Web Services. In this post, we'll explore how to create a simple RESTful web service using Spring, covering topics such as configuring a Spring Boot application, defining a resource model, and handling exceptions.`,
      blog: blog28
    };
    translations.push(translation28_1);

    const translation28_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Vytváření RESTful webových služeb se Spring',
      content: `Spring Framework poskytuje podporu pro vytváření RESTful webových služeb. V tomto příspěvku prozkoumáme, jak vytvořit jednoduchou RESTful webovou službu pomocí Spring, kde probereme témata jako jsou konfigurace aplikace Spring Boot, definice modelu zdrojů a zacházení s výjimkami.`,
      blog: blog28
    };
    translations.push(translation28_2);

    // Blog 29
    const blog29 = new BlogEntity();
    blog29.externalId = uuid();
    blog29.created = new Date('2021-02-25T10:00:00Z');
    blog29.updated = new Date('2021-02-25T10:00:00Z');
    blogs.push(blog29);

    const tag29_1 = new TagEntity();
    tag29_1.tag = 'JavaScript';
    tag29_1.blog = blog29;
    tags.push(tag29_1);

    const tag29_2 = new TagEntity();
    tag29_2.tag = 'React Native';
    tag29_2.blog = blog29;
    tags.push(tag29_2);

    const translation29_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Developing Mobile Applications with React Native',
      content: `React Native is a popular framework for building mobile applications. In this tutorial, we'll set up a new React Native project and explore how to build a simple mobile application, covering topics such as setting up the development environment, designing the UI, and handling user interactions.`,
      blog: blog29
    };
    translations.push(translation29_1);

    const translation29_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Vývoj mobilních aplikací s React Native',
      content: `React Native je populární framework pro vývoj mobilních aplikací. V tomto tutoriálu nastavíme nový projekt React Native a prozkoumáme, jak vytvořit jednoduchou mobilní aplikaci, kde probereme témata jako je nastavení vývojového prostředí, návrh uživatelského rozhraní a zacházení s uživatelskými interakcemi.`,
      blog: blog29
    };
    translations.push(translation29_2);

    const blog30 = new BlogEntity();
    blog30.externalId = uuid();
    blog30.created = new Date('2022-05-18T11:00:00Z');
    blog30.updated = new Date('2022-05-18T11:00:00Z');
    blogs.push(blog30);

    const tag30_1 = new TagEntity();
    tag30_1.tag = 'Python';
    tag30_1.blog = blog30;
    tags.push(tag30_1);

    const tag30_2 = new TagEntity();
    tag30_2.tag = 'Machine Learning';
    tag30_2.blog = blog30;
    tags.push(tag30_2);

    const translation30_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Getting Started with Machine Learning in Python',
      content: `Machine Learning (ML) has become a vital part of many industries. In this post, we'll explore the basics of ML using Python, covering topics such as data preparation, model training, evaluation, and deployment.`,
      blog: blog30
    };
    translations.push(translation30_1);

    const translation30_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Začínáme s Machine Learningem v Pythonu',
      content: `Machine Learning (ML) se stal důležitou součástí mnoha odvětví. V tomto příspěvku prozkoumáme základy ML pomocí Pythonu, kde probereme témata jako jsou příprava dat, trénování modelu, hodnocení a nasazení.`,
      blog: blog30
    };
    translations.push(translation30_2);

    // Blog 31
    const blog31 = new BlogEntity();
    blog31.externalId = uuid();
    blog31.created = new Date('2021-01-22T10:00:00Z');
    blog31.updated = new Date('2021-01-22T10:00:00Z');
    blogs.push(blog31);

    const tag31_1 = new TagEntity();
    tag31_1.tag = 'JavaScript';
    tag31_1.blog = blog31;
    tags.push(tag31_1);

    const tag31_2 = new TagEntity();
    tag31_2.tag = 'Node.js';
    tag31_2.blog = blog31;
    tags.push(tag31_2);

    const translation31_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Building Real-Time Applications with Node.js and Socket.io',
      content: `Real-Time applications provide immediate updates and interactions. In this post, we'll explore how to build a simple real-time chat application using Node.js and Socket.io, covering topics such as setting up a WebSocket connection, emitting events, and handling disconnections.`,
      blog: blog31
    };
    translations.push(translation31_1);

    const translation31_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Vytváření aplikací v reálném čase s Node.js a Socket.io',
      content: `Aplikace v reálném čase poskytují okamžité aktualizace a interakce. V tomto příspěvku prozkoumáme, jak vytvořit jednoduchou chatovací aplikaci v reálném čase pomocí Node.js a Socket.io, kde probereme témata jako jsou nastavení WebSocket spojení, vysílání událostí a zacházení s odpojením.`,
      blog: blog31
    };
    translations.push(translation31_2);

    // Blog 32
    const blog32 = new BlogEntity();
    blog32.externalId = uuid();
    blog32.created = new Date('2020-04-08T09:00:00Z');
    blog32.updated = new Date('2020-04-08T09:00:00Z');
    blogs.push(blog32);

    const tag32_1 = new TagEntity();
    tag32_1.tag = 'Ruby';
    tag32_1.blog = blog32;
    tags.push(tag32_1);

    const tag32_2 = new TagEntity();
    tag32_2.tag = 'Rails';
    tag32_2.blog = blog32;
    tags.push(tag32_2);

    const translation32_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Creating a Blogging Platform with Ruby on Rails',
      content: `Ruby on Rails is a powerful framework for building web applications. In this tutorial, we'll create a simple blogging platform using Ruby on Rails, covering topics such as scaffolding, migrations, and working with Active Record.`,
      blog: blog32
    };
    translations.push(translation32_1);

    const translation32_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Vytváření blogovací platformy s Ruby on Rails',
      content: `Ruby on Rails je výkonný framework pro vytváření webových aplikací. V tomto tutoriálu vytvoříme jednoduchou blogovací platformu pomocí Ruby on Rails, kde probereme témata jako jsou scaffolding, migrace a práce s Active Record.`,
      blog: blog32
    };
    translations.push(translation32_2);

    // Blog 33
    const blog33 = new BlogEntity();
    blog33.externalId = uuid();
    blog33.created = new Date('2021-08-10T10:00:00Z');
    blog33.updated = new Date('2021-08-10T10:00:00Z');
    blogs.push(blog33);

    const tag33_1 = new TagEntity();
    tag33_1.tag = 'PHP';
    tag33_1.blog = blog33;
    tags.push(tag33_1);

    const tag33_2 = new TagEntity();
    tag33_2.tag = 'Laravel';
    tag33_2.blog = blog33;
    tags.push(tag33_2);

    const translation33_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Building APIs with Laravel',
      content: `Laravel is an elegant PHP framework for building robust APIs. In this post, we'll explore how to create a RESTful API using Laravel, covering topics like setting up a Laravel project, defining routes, and implementing authentication.`,
      blog: blog33
    };
    translations.push(translation33_1);

    const translation33_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Vytváření API s Laravel',
      content: `Laravel je elegantní PHP framework pro vytváření robustních API. V tomto příspěvku prozkoumáme, jak vytvořit RESTful API pomocí Laravel, kde probereme témata jako je nastavení projektu Laravel, definování tras a implementace autentizace.`,
      blog: blog33
    };
    translations.push(translation33_2);

    // Blog 34
    const blog34 = new BlogEntity();
    blog34.externalId = uuid();
    blog34.created = new Date('2020-10-14T11:00:00Z');
    blog34.updated = new Date('2020-10-14T11:00:00Z');
    blogs.push(blog34);

    const tag34_1 = new TagEntity();
    tag34_1.tag = 'Python';
    tag34_1.blog = blog34;
    tags.push(tag34_1);

    const tag34_2 = new TagEntity();
    tag34_2.tag = 'Django';
    tag34_2.blog = blog34;
    tags.push(tag34_2);

    const translation34_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Developing Web Applications with Django',
      content: `Django is a high-level Python Web framework that encourages rapid development. In this post, we'll dive into creating a web application with Django, covering topics like setting up the project, defining models, and creating views and templates.`,
      blog: blog34
    };
    translations.push(translation34_1);

    const translation34_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Vývoj webových aplikací s Django',
      content: `Django je vysoce úrovňový webový framework Python, který podporuje rychlý vývoj. V tomto příspěvku se ponoříme do vytváření webové aplikace s Django, kde probereme témata jako je nastavení projektu, definování modelů a vytváření pohledů a šablon.`,
      blog: blog34
    };
    translations.push(translation34_2);

    // Blog 35
    const blog35 = new BlogEntity();
    blog35.externalId = uuid();
    blog35.created = new Date('2023-01-15T09:00:00Z');
    blog35.updated = new Date('2023-01-15T09:00:00Z');
    blogs.push(blog35);

    const tag35_1 = new TagEntity();
    tag35_1.tag = 'JavaScript';
    tag35_1.blog = blog35;
    tags.push(tag35_1);

    const tag35_2 = new TagEntity();
    tag35_2.tag = 'React';
    tag35_2.blog = blog35;
    tags.push(tag35_2);

    const translation35_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Implementing Redux in React Applications',
      content: `Redux is a predictable state container for JavaScript apps. In this post, we'll explore how to integrate Redux into a React application, covering topics like actions, reducers, and the Redux store.`,
      blog: blog35
    };
    translations.push(translation35_1);

    const translation35_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Implementace Redux v aplikacích React',
      content: `Redux je předvídatelný kontejner stavů pro aplikace JavaScript. V tomto příspěvku prozkoumáme, jak integrovat Redux do aplikace React, kde probereme témata jako jsou akce, reduktory a úložiště Redux.`,
      blog: blog35
    };
    translations.push(translation35_2);

    // Blog 36
    const blog36 = new BlogEntity();
    blog36.externalId = uuid();
    blog36.created = new Date('2022-03-12T10:00:00Z');
    blog36.updated = new Date('2022-03-12T10:00:00Z');
    blogs.push(blog36);

    const tag36_1 = new TagEntity();
    tag36_1.tag = 'TypeScript';
    tag36_1.blog = blog36;
    tags.push(tag36_1);

    const tag36_2 = new TagEntity();
    tag36_2.tag = 'Angular';
    tag36_2.blog = blog36;
    tags.push(tag36_2);

    const translation36_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Building Single Page Applications with Angular and TypeScript',
      content: `In this post, we'll walk through the steps of building a Single Page Application (SPA) using Angular and TypeScript, covering topics such as routing, data binding, and services to manage data.`,
      blog: blog36
    };
    translations.push(translation36_1);

    const translation36_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Vytváření jednostránkových aplikací s Angular a TypeScript',
      content: `V tomto příspěvku si projdeme kroky vytváření jednostránkové aplikace (SPA) pomocí Angular a TypeScript, kde probereme témata jako jsou směrování, datové vazby a služby pro správu dat.`,
      blog: blog36
    };
    translations.push(translation36_2);

    // Blog 37
    const blog37 = new BlogEntity();
    blog37.externalId = uuid();
    blog37.created = new Date('2020-09-09T11:00:00Z');
    blog37.updated = new Date('2020-09-09T11:00:00Z');
    blogs.push(blog37);

    const tag37_1 = new TagEntity();
    tag37_1.tag = 'Rust';
    tag37_1.blog = blog37;
    tags.push(tag37_1);

    const tag37_2 = new TagEntity();
    tag37_2.tag = 'WebAssembly';
    tag37_2.blog = blog37;
    tags.push(tag37_2);

    const translation37_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Exploring WebAssembly with Rust',
      content: `WebAssembly offers new possibilities for web development. In this post, we'll explore how to use Rust to create a WebAssembly module, discussing topics like compiling Rust to WebAssembly, interfacing with JavaScript, and optimizing performance.`,
      blog: blog37
    };
    translations.push(translation37_1);

    const translation37_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Průzkum WebAssembly s Rust',
      content: `WebAssembly nabízí nové možnosti pro webový vývoj. V tomto příspěvku prozkoumáme, jak používat Rust k vytvoření modulu WebAssembly, kde probereme témata jako kompilace Rust do WebAssembly, rozhraní s JavaScriptem a optimalizace výkonu.`,
      blog: blog37
    };
    translations.push(translation37_2);

    // Blog 38
    const blog38 = new BlogEntity();
    blog38.externalId = uuid();
    blog38.created = new Date('2023-04-20T09:00:00Z');
    blog38.updated = new Date('2023-04-20T09:00:00Z');
    blogs.push(blog38);

    const tag38_1 = new TagEntity();
    tag38_1.tag = 'Kotlin';
    tag38_1.blog = blog38;
    tags.push(tag38_1);

    const tag38_2 = new TagEntity();
    tag38_2.tag = 'Android';
    tag38_2.blog = blog38;
    tags.push(tag38_2);

    const translation38_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Developing Android Apps with Kotlin',
      content: `Kotlin has become a go-to language for Android app development. In this post, we'll explore how to create an Android app using Kotlin, discussing topics like setting up the development environment, working with layouts, and handling user interactions.`,
      blog: blog38
    };
    translations.push(translation38_1);

    const translation38_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Vývoj aplikací pro Android s Kotlin',
      content: `Kotlin se stal jazykem pro vývoj aplikací pro Android. V tomto příspěvku prozkoumáme, jak vytvořit aplikaci pro Android pomocí Kotlin, kde probereme témata jako nastavení vývojového prostředí, práce s rozvržením a zacházení s uživatelskými interakcemi.`,
      blog: blog38
    };
    translations.push(translation38_2);

    // Blog 39
    const blog39 = new BlogEntity();
    blog39.externalId = uuid();
    blog39.created = new Date('2022-07-16T10:00:00Z');
    blog39.updated = new Date('2022-07-16T10:00:00Z');
    blogs.push(blog39);

    const tag39_1 = new TagEntity();
    tag39_1.tag = 'Python';
    tag39_1.blog = blog39;
    tags.push(tag39_1);

    const tag39_2 = new TagEntity();
    tag39_2.tag = 'Data Analysis';
    tag39_2.blog = blog39;
    tags.push(tag39_2);

    const translation39_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Analyzing Data with Python and Pandas',
      content: `Pandas is a powerful library for data analysis in Python. In this post, we'll delve into how to use Pandas for analyzing data, covering topics like reading data from different sources, data cleaning, and data visualization.`,
      blog: blog39
    };
    translations.push(translation39_1);

    const translation39_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Analýza dat s Pythonem a Pandas',
      content: `Pandas je výkonná knihovna pro analýzu dat v Pythonu. V tomto příspěvku se ponoříme do toho, jak používat Pandas pro analýzu dat, kde probereme témata jako čtení dat z různých zdrojů, čištění dat a vizualizace dat.`,
      blog: blog39
    };
    translations.push(translation39_2);

    // Blog 40
    const blog40 = new BlogEntity();
    blog40.externalId = uuid();
    blog40.created = new Date('2023-02-28T09:00:00Z');
    blog40.updated = new Date('2023-02-28T09:00:00Z');
    blogs.push(blog40);

    const tag40_1 = new TagEntity();
    tag40_1.tag = 'Java';
    tag40_1.blog = blog40;
    tags.push(tag40_1);

    const tag40_2 = new TagEntity();
    tag40_2.tag = 'Spring Boot';
    tag40_2.blog = blog40;
    tags.push(tag40_2);

    const translation40_1: Partial<BlogTranslationEntity> = {
      language: 'en',
      title: 'Microservices Architecture with Spring Boot',
      content: `Microservices architecture is a method of developing software systems as a suite of independently deployable, small, modular services. In this post, we'll explore how to build a microservices architecture using Spring Boot, covering topics like service discovery, API Gateway, and centralized configuration.`,
      blog: blog40
    };
    translations.push(translation40_1);

    const translation40_2: Partial<BlogTranslationEntity> = {
      language: 'cs',
      title: 'Architektura mikroslužeb se Spring Boot',
      content: `Architektura mikroslužeb je metoda vývoje softwarových systémů jako sady nezávisle nasaditelných, malých, modulárních služeb. V tomto příspěvku prozkoumáme, jak vytvořit architekturu mikroslužeb pomocí Spring Boot, kde probereme témata jako objevování služeb, API Gateway a centralizovaná konfigurace.`,
      blog: blog40
    };
    translations.push(translation40_2);

    await queryRunner.manager.save(BlogEntity, blogs);
    // Once blogs have been saved, they have generated IDs which will be used to save translations
    await queryRunner.manager.save(BlogTranslationEntity, translations);

    await queryRunner.manager.save(TagEntity, tags);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Logic to revert the seed if needed
    await queryRunner.query('DELETE FROM "BlogTranslation";');
    await queryRunner.query('DELETE FROM "Blog";');
    await queryRunner.query('DELETE FROM "Tag";');
  }
}

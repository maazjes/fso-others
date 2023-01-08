CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('tester', 'test.com', 'test blog', 5);
insert into blogs (url, title) values ('http://blog.com/', 'a blog');
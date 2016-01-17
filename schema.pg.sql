-- -----------------------------------------------------
-- Table public.user
-- -----------------------------------------------------

DROP TABLE IF EXISTS "public".updates;
DROP TABLE IF EXISTS "public".contents_posts;
DROP TABLE IF EXISTS "public".contents;
DROP TABLE IF EXISTS "public".posts;
DROP TABLE IF EXISTS "public".users;

CREATE TABLE "public".users (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  token varchar(255),
  state varchar(255),
  fb_id varchar(255) NOT NULL,
  organization varchar(255) NOT NULL,
  created timestamp DEFAULT(NOW()),
  modified timestamp DEFAULT(NOW())
);

-- -----------------------------------------------------
-- Table public.post
-- -----------------------------------------------------
CREATE TABLE "public".posts (
  id serial PRIMARY KEY,
  user_id int REFERENCES "users"(id)
);

-- -----------------------------------------------------
-- Table public.content
-- -----------------------------------------------------
CREATE TABLE "public".contents (
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL,
  text_body varchar(255) NOT NULL,
  url varchar(255) NOT NULL,
  created timestamp DEFAULT(NOW()),
  post_id int REFERENCES posts(id)
);

-- -----------------------------------------------------
-- Table public.contents_posts
-- -----------------------------------------------------
CREATE TABLE "public".contents_posts (
	id serial PRIMARY KEY,
	content_id int REFERENCES contents(id),
	post_id int REFERENCES posts(id),
	created timestamp DEFAULT(NOW())
);

-- -----------------------------------------------------
-- Table public.updates
-- -----------------------------------------------------
CREATE TABLE "public".updates (
  id serial PRIMARY KEY,
  reach int,
  likes int,
  views int,
  post_id int REFERENCES posts(id),
  content_id int REFERENCES contents(id)
);

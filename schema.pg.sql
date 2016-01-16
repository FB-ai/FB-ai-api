-- -----------------------------------------------------
-- Table public.user
-- -----------------------------------------------------
DROP TABLE IF EXISTS "public".user;

CREATE TABLE "public".user (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT(NOW()),
  modified TIMESTAMP
);

-- -----------------------------------------------------
-- Table public.post
-- -----------------------------------------------------
DROP TABLE IF EXISTS "public".post;

CREATE TABLE "public".post (
  id INT PRIMARY KEY NOT NULL,
  user_id INT REFERENCES "user"(id)
);

-- -----------------------------------------------------
-- Table public.content
-- -----------------------------------------------------
DROP TABLE IF EXISTS "public".content;

CREATE TABLE "public".content (
  id INT PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  text_body VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT(NOW()),
  post_id INT REFERENCES post(id)
);

-- -----------------------------------------------------
-- Table public.updates
-- -----------------------------------------------------
DROP TABLE IF EXISTS "public".update;

CREATE TABLE "public".update (
  id INT PRIMARY KEY NOT NULL,
  reach INT,
  likes INT,
  views INT,
  post_id INT REFERENCES post(id),
  content_id INT REFERENCES content(id)
);

-- -----------------------------------------------------
-- Add foreign key
-- -----------------------------------------------------
ALTER TABLE "public".post
ADD COLUMN current_content_id INT REFERENCES content(id);

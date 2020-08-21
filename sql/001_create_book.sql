CREATE TABLE book (
  book_id INT AUTO_INCREMENT,
  title VARCHAR(400),
  CONSTRAINT pk_book PRIMARY KEY (book_id)
);

INSERT INTO book (title) VALUES
('Harry Potter and the Philosopher''s Stone'),
('Lord of the Rings: The Fellowship of the Ring'),
('Rich Dad Poor Dad');
/*
DROP TABLE stage;
*/
CREATE TABLE stage (
  stage_id INT,
  stage_name VARCHAR(20),
  CONSTRAINT pk_bookstage PRIMARY KEY (stage_id)
);

INSERT INTO stage (stage_id, stage_name) VALUES
(1, 'To Read');

/*
DROP TABLE book_stage;
*/
CREATE TABLE book_stage (
  book_id INT,
  stage_id INT,
  CONSTRAINT fk_bkstg_book FOREIGN KEY (book_id) REFERENCES book (book_id),
  CONSTRAINT fk_bkstg_stage FOREIGN KEY (stage_id) REFERENCES stage (stage_id)
);
/*
INSERT INTO book_stage (book_id, stage_id) VALUES
(1, 1),
(3, 1);
*/
SELECT b.book_id, b.title FROM book b INNER JOIN book_stage bs ON b.book_id = bs.book_id;



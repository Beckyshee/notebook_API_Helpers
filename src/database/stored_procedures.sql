CREATE PROCEDURE notes(@id VARCHAR(100), @title VARCHAR(200),@content VARCHAR(800) ,@createdAt DATETIME)
AS
BEGIN
INSERT INTO notebook(Id,title,content,createdAt)
VALUES(@id,@title,@content,@createdAt)

END
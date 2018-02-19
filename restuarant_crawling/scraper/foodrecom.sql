use foodrecom;
create table crawler(
    url VARCHAR(128) PRIMARY KEY NOT NULL,
    status VARCHAR(8) DEFAULT 'idle',
    priority INT DEFAULT '0',
    marker INT DEFAULT '0',
    available_time DATETIME,
    hashcode VARCHAR(128)
);


select count(*) from crawler;

select * from crawler;
select * from crawler where available_time > now() order by available_time limit 2; 
select * from crawler where available_time > now();
select * from crawler where available_time < now() LIMIT 1;

update crawler set priority = priority + 1, available_time = ADDDATE(available_time, 7) where url = '123';

create index time_index on crawler(available_time);
select * from crawler where url like '%beja%';
delete from crawler where url like '%tiju%';

SET SQL_SAFE_UPDATES = 0;
UPDATE crawler SET status = 'idle', marker = 0, available_time = NOW();

UPDATE crawler SET status = 'idle', marker = 0;

select * from crawler where available_time > date_add(ADDDate(now(), 0), INTERVAL -1 HOUR) and available_time < now();

select * from crawler where available_time < now();
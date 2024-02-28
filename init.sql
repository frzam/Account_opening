Create database account_opening;

Create table account_opening.user_auth(
    username varchar(20) not null,
    password varchar(20),
    primary key(username)
);

Insert into account_opening.user_auth(username,password) values('csrusr','csrpwd');

Insert into account_opening.user_auth(username,password) values('bmgr','bpwd');

Select * from account_opening.user_auth;

	
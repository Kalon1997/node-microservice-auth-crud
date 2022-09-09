---------------Microservice Architecture - CRUD - Authentication - Authorization - node backend app with Mongodb----------


##steps
===========
cd serviceRegistry
npm install
npm start
==========
cd authservice
npm install
npm start
===========
cd postService
npm install
npm start
==============
cd backend
npm install
npm start
======================
database uri is "mongodb://localhost:27017/app"  - local mongodb database in mongodb compass




Postman testcases
=================
=============================
1.  http://localhost:3080/register/       => POST
{
    "email" : "kalon@g.com",
    "password" : "kalon"
}

2.  http://localhost:3080/login/           => POST
{
    "email" : "kalon@g.com",
    "password" : "kalon"
}

3. http://localhost:3080/logout           =>GET

========================================
4. http://localhost:3080/post/all          =>GET 
5. http://localhost:3080/post/create    => POST
{
    "title" : "Test new",
    "desp" : " test new"
}

6. http://localhost:3080/post/edit/631a1a7d0c6670acea7c46be    =>PUT
{
    "title" : "test edited",
    "desp" : "edit test edited"
}

7. http://localhost:3080/post/delete/631a1a7d0c6670acea7c46be   =>DELETE

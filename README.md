## Audify

Audify is a web app where users can record their inner thoughts in a form of a voice journal. In addition, the user can also specify the color, put a name and caption, and edit their information. 

# Tech stack
It used ReactJS as its Frontend with TailwindCSS as the choice for styling the website. In addition, it also has different unit tests and integration tests. In terms of backend, it uses ExpressJS as its backend with KnexJS as a way to communicate with the database of choice, PostgreSQL. Other packages include Mutter (for handling the voice journal and images). The database is isolated in a Docker-compose file alongside Redis. Redis was used to store the cookies of the users currently logged in.
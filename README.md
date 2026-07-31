# BASIC NODE PROJECT TEMPLATE GENERATOR

We've all been in situations where we have to write the same code for multiple projects, so I've created a simple CLI in Go that handles the repetitive setup for you.

Built with Go to provide a lightweight, standalone CLI that can be distributed as a single binary without requiring Go to be installed on the user's machine.
You just have to use a flag `-name` to name your project and this CLI will handle the rest.
It will create a basic starter template code for your project containing :

- `Config/db.js`
- `Controllers/auth.js`
- `Middleware/auth.js`
- `Models/user.js`
- `Router/auth.js`
- `Services/jwt.js`
- `.env`
- `.gitignore`
- `index.js `

After creating these files Successfully, it will execute 2 commands
- `npm init -y `
- `npm install express mongoose jsonwebtoken dotenv bcrypt`

These packages provide the basic building blocks for an Express + MongoDB backend with authentication.

Finally, the CLI runs: `node index.js` to start the server.

That's it! You can now start working on your project without having to create the same boilerplate code from scratch.

## How to Use :-

1. Download the binary from the releases section.
2. Make a new directory where you want to create your new project
3. Copy and Paste the binary into that directory
4. Run `./backend_init_app -name your-project`.
5. That's it now new folder with the name your-project will be created with all template code and required things to start your new project

## Contributing:

This Project is still under development and open to be contributed. So I am thinking to add more features to the project and making it more interactive. Features to be added are choosing the framework of project right now it is only node js, later we will add more. Ability to choose combination of different stacks, like choosing postgres with node or mongodb with django etc.

Future Goals :-
- [ ] Interactive project setup
- [ ] Node.js / Express
- [ ] Django
- [ ] FastAPI
- [ ] PostgreSQL
- [ ] MongoDB
- [ ] MySQL
- [ ] Choose authentication
- [ ] Choose ORM/ODM
- [ ] Combine multiple stacks
- [ ] Configuration file
- [ ] Custom templates.

So first understand the project's code(right now it's only a single file and short code) and goal, then add new features to the project and make PR.
# Property Matcher

A system helps people to find properties than suits them better.

## How to run

### Requirements

- Mongo server installed
- Node js installed

### Steps

1. Seeding DB ... There are 2 ways to seed data

   - From env variable
     Use the combination of `BASIC_ADMIN_PHONE` and other vars to seed them on running the app.

   - From demo-db
     In case you have a backup of the demo-db, you just need to add it to the main project directory then run `npm run seed:db`.

1. Start the app by `npm start`.
1. open swagger > `localhost:{PORT}/docs` to explore the APIs.

## Future work

- Implement a cron job that refresh property requests every 3 days
- Dockerize the app

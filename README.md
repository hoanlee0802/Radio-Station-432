**Note and Disclaimer**: This is a **Demo** application, not reflective of a production-level project. Normally the `.env` file is excluded from commits, but this repository is intended to serve as a more comprehensive illustration for a project behind the scenes.

In real applications (i.e. open source projects on GitHub), the database URL and .env file is not publicly accessible and therefore excluded from commits. Such real applications may rely on the developer setting up their own database for an open source project, or other team projects may rely on each member having individual access to API/database keys. Failing to follow these precautions for production-level applications can lead to the database being exploited or covertly used for unintended schemes, and is especially risky for production database accounts.

Demo databases for demo projects should be hosted on completely free-tier account that is not connected to any sensitive information. And, that account should be used exclusively for demo projects.

# Radio-Station-432

To run the application, use the terminal to execute `npm run start` or `node server.js`. The database will not automatically work unless the demo database is up or you provide your own database link as detailed below.

If the database is offline (or inaccessible), you can still demo some UI interactions. In that case, to run a full demo with a database, you can create a MongoDB Atlas configuration (usually the easiest way). After creating a cluster through Atlas, click Connect > Choose Connection Method > Drivers > Copy Link, then paste this connection link in place of the existing `MONGO_URL` string in the `.env` file. Make sure to enter the password you set for your server in place of the `<db_password>` section of the connection string. After entering `npm run start` in the terminal (connect through the `localhost:port` using port specified in the terminal log).

Note if you create your own database instance: even after creating your own database instance, the demo database will be limited to whitelisted IPs (Atlas might detect and adds yours automatically during setup). So if you run the demo app through a different network, you would need to add its IP as well through Atlas. Make sure you are using your public (outbound) internet IP address. Alternatively, only for demo applications, you can sparingly use `0.0.0.0/0`, but do not use it in production setups.


Git Reference/Collaboration Guidelines: https://vasiluca.notion.site/How-to-Use-Git-118a1e8916a2807fa2fccb71820a29be?pvs=4
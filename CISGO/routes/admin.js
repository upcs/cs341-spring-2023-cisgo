//import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
//const app = express();
// Very basic configuration of AdminJS.
const adminJs = new AdminJS({
    databases: [], // We don’t have any resources connected yet.
    rootPath: '/admin', // Path to the AdminJS dashboard.
});
// Build and use a router to handle AdminJS routes.
const router = AdminJSExpress.buildRouter(adminJs);
module.exports(router);
//app.use(adminJs.options.rootPath, router);
// Run the server.
//app.listen(3000, () =>
  //  console.log(`admin.js`)
//);
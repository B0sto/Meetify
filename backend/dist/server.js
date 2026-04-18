import express, {} from 'express';
const app = express();
app.get("/", (req, res) => {
    res.send("Server is running fine");
});
export default app;
//# sourceMappingURL=server.js.map
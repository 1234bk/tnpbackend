import app from "./src/app.js";
import "dotenv/config";
import connectDB from "./src/db/index.js";
// --- Start server ---
const PORT = process.env.PORT || 3000;
connectDB()

  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(
      "Error connecting to the database. Make sure MongoDB is running",
      err
    );
  });

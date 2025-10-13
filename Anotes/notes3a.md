1. MVC

MVC stands for Model–View–Controller, a software design pattern used to organize code in web and application development. It separates an application into three main components — Model, View, and Controller — each with a clear responsibility.

🧩 1. Model – Data and Logic

Represents the data, database, and business logic.
Responsible for interacting with the database (like fetching, storing, updating data).
Example: A User model defines how user data is structured and interacts with MongoDB or SQL.


🖼️ 2. View – User Interface

Defines how data is presented to the user (the frontend or templates).
Handles what users see in the browser.
Example: EJS, React components, or HTML files that show data from the Model.



🧠 3. Controller – Application Logic / Middleman

Acts as a bridge between Model and View.
Takes user input from the View, processes it using the Model, and returns a response.
Example: Express route handler.


2. What is router.route()?

In Express.js,
router.route(path) lets you chain multiple HTTP methods (GET, POST, PUT, DELETE, etc.) for the same route in a clean and organized way — instead of writing them separately.

3. Image Upload


4. enctype

enctype stands for Encoding Type — it’s an HTML form attribute that tells the browser how to encode the data when sending it to the server.

📌 Syntax:
<form action="/upload" method="POST" enctype="multipart/form-data">
  <!-- form fields here -->
</form>

🧠 Why do we need enctype?
When a form sends text inputs only (like username, email), it uses the default encoding type —
application/x-www-form-urlencoded.
But when your form contains a file input (like an image or PDF), you must use:
👉 enctype="multipart/form-data"
This tells the browser:
“Hey, I’m sending both text and binary (file) data.”

5. Multer

Multer is a Node.js middleware used for handling multipart/form-data, which is primarily used for uploading files. It is widely used with Express.js applications to handle image, video, and document uploads efficiently. When a form includes file input, the data is sent in multiple parts (binary + text), and Multer processes that data, making the file available in req.file or req.files. Multer doesn’t handle cloud uploads by itself—it only handles the local uploading and parsing of files from the client side to your Node.js server. It works with storage engines that define where and how the uploaded files are stored. By default, Multer stores files in memory or on the disk, but it can also be configured to upload directly to services like Cloudinary, AWS S3, or Google Cloud Storage using third-party storage engines. Multer is used as middleware in routes and can handle single or multiple file uploads using methods like upload.single(fieldname), upload.array(fieldname), and upload.fields(). The most common use case is handling images uploaded from forms using multipart/form-data. The uploaded file’s details like filename, path, and mimetype can be accessed through req.file (for single upload) or req.files (for multiple uploads). In MVC structure, Multer is usually configured in routes, used with controller methods, and its configuration may be stored separately for cleaner code.

Code:

const multer = require("multer");

// Set storage destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize multer
const upload = multer({ storage });

// Route example
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("File uploaded successfully!");
});
import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  // Check the request method.
  if (req.method === "POST") {
    // Extract the email from the req.body.
    // The req.body is a build-in function to bring request data to the backend.
    // Convert the JSON string to Javascript Object.
    const requestBodyJsonObj = JSON.parse(req.body);
    // Extract email information.
    const userEmail = requestBodyJsonObj.email;
    // Validate the email format.
    if (!userEmail || !userEmail.includes("@")) {
      // Send the JSON response to the client from backend.
      // The .json() method is typically used to extract the JSON data from an HTTP response object.
      res.status(422).json({ message: "Invalid email address" });
      // The return here means to cancel the function excution.
      return;
    }

    let client;

    try {
      // Declare the connection instance.
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed." });
      return;
    }

    try {
      // Insert document.
      await insertDocument(client, "newsletter", { email: userEmail });
      // Close the connection.
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed." });
      return;
    }

    // Send response to the client with a http status and Javascript object.
    res.status(201).json({ message: `Signed up as ${userEmail}` });
  }
}

export default handler;

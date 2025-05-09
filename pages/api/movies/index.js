import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests allowed" });
  }
  try {
    const client = await clientPromise;
    const db = client.db();
    const movies = await db.collection("movies").find({}).toArray();
    res.status(200).json(movies);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
}
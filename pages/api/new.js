import Users from "../../database/users";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { name, vilage, pageno, pic } = req.body;
    if ((name, vilage, pageno, pic)) {
      const entry = new Users({
        name,
        vilage,
        pageno,
        pic,
        date: Date.now(),
      });

      try {
        await entry.save();
        res.send({ status: true });
      } catch (error) {
        res.send({ error });
      }
    } else {
      res.status(200).send({ message: "Insufficient data" });
    }
  } else {
    res.send({ error: "Invalid Request" });
  }
}

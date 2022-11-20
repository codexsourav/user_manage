// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Users from "../../database/users";
export default function handler(req, res) {
  Users.find()
    .then((result) => {
      if (result == null) {
        res.send({ error: "No Data Found" });
      } else {
        res.send({ data: result });
      }
    })
    .catch((err) => {
      res.send({ error: err.message });
    });
}

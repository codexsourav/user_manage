import Users from "../../database/users";
export default function handler(req, res) {
  const find = req.body.find;
  var redux = new RegExp(find, "i");

  if (find) {
    Users.find({ name: redux }).then((d) => {
      if (d != "") {
        res.send(d);
      } else {
        res.send({ error: "No Result Found" });
      }
    });
  } else {
    res.send({ error: "No Result Found" });
  }
}

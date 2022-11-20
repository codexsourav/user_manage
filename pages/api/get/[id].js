import Users from "../../../database/users";

export default function handler(req, res) {
  const { id } = req.query;
  if (id) {
    // for show data
    if (req.method == "GET") {
      Users.findOne({ _id: id })
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
    // for update data
    if (req.method == "PUT") {
      const { name, vilage, pageno, pic } = req.body;

      if ((name, vilage, pageno, pic)) {
        Users.updateOne(
          { _id: id },
          {
            name,
            vilage,
            pageno,
            pic,
            date: Date.now(),
          }
        )
          .then(() => {
            res.send({ status: true });
          })
          .catch((err) => {
            res.send({ erroe: err });
          });
      } else {
        res.send({ error: "Invalid Request" });
      }
    }

    // for delete data
    if (req.method == "DELETE") {
      Users.deleteOne({ _id: id })
        .then(() => {
          res.send({ status: true });
        })
        .catch((err) => {
          res.send({ erroe: err });
        });
    }
  } else {
    res.send({ error: "Invalid Request" });
  }
}

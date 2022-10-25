const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: "10mb" }));
const cors = require("cors");
app.use(cors());
const md5 = require("js-md5");
const uuid = require("uuid");
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "viesasis",
});

//////////////////// LOGIN START /////////////////

const handleAuth = function (req, res, next) {
  if (req.url.indexOf("/server") === 0) {
    // admin
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length || results[0].role !== 10) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  } else if (
    req.url.indexOf("/login-check") === 0 ||
    req.url.indexOf("/login") === 0 ||
    req.url.indexOf("/register") === 0
  ) {
    next();
  } else {
    // front
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  }
};

app.use(handleAuth);

// AUTH;
app.get("/login-check", (req, res) => {
  const sql = `
         SELECT
         name, role
         FROM users
         WHERE session = ?
        `;
  con.query(sql, [req.headers["authorization"] || ""], (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: "error", status: 1 }); // user not logged
    } else {
      if (req.query.role === "admin") {
        if (result[0].role !== 10) {
          res.send({ msg: "error", status: 2 }); // not an admin
        } else {
          res.send({ msg: "ok", status: 3 }); // is admin
        }
      } else {
        res.send({ msg: "ok", status: 4 }); // is user
      }
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: "error", key: "" });
    } else {
      res.send({ msg: "ok", key });
    }
  });
});

/////////////////// LOGIN   END ////////////////////

//  CREATE SAVIVALDYBE for admin

app.post("/home/savivaldybes", (req, res) => {
  const sql = `
    INSERT INTO savivaldybes (title, image)
    VALUES (?, ?)
    `;
  con.query(sql, [req.body.title, req.body.image], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ SAVIVALDYBES for admin and users

app.get("/home/savivaldybes", (req, res) => {
  const sql = `
    SELECT *
    FROM savivaldybes
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// UPDATE SAVIVALDYBE for admin

app.put("/home/savivaldybes/:id", (req, res) => {
  const sql = `
    UPDATE savivaldybes
    SET title = ?, image = ?
    WHERE id = ?
    `;
  con.query(
    sql,
    [req.body.title, req.body.image, req.params.id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// DELETE SAVIVALDYBE for admin

app.delete("/home/savivaldybes/:id", (req, res) => {
  const sql = `
    DELETE FROM savivaldybes
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//  CREATE SRITIS for admin

app.post("/home/sritys", (req, res) => {
  const sql = `
    INSERT INTO sritys (title)
    VALUES (?)
    `;
  con.query(sql, [req.body.title], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ SRITYS for admin and users

app.get("/home/sritys", (req, res) => {
  const sql = `
    SELECT *
    FROM sritys
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// UPDATE SRITIS for admin

app.put("/home/sritys/:id", (req, res) => {
  const sql = `
    UPDATE sritys
    SET title = ?
    WHERE id = ?
    `;
  con.query(sql, [req.body.title, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// DELETE SAVIVALDYBE for admin

app.delete("/home/sritys/:id", (req, res) => {
  const sql = `
    DELETE FROM sritys
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE KOMENTARAS

app.post("/home/komentarai", (req, res) => {
  const sql = `
    INSERT INTO komentarai (post, savivaldybe_id, sritis_id)
    VALUES (?, ?, ?)
    `;
  con.query(
    sql,
    [req.body.post, req.body.savivaldybe, req.body.sritis],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// READ KOMENTARAI

app.get("/home/komentarai", (req, res) => {
  const sql = `
  SELECT k.*, s.title AS savivaldybeTitle, s.id AS sid
  FROM komentarai AS k
  INNER JOIN savivaldybes AS s
  ON k.savivaldybe_id = s.id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// // CREATE an ORDER (for users (at homepage))

// app.post("/home/orders/:id", (req, res) => {
//   const sql = `
//     INSERT INTO orders (size, comment, clothe_id)
//     VALUES (?, ?, ?)
//     `;
//   con.query(
//     sql,
//     [req.body.size, req.body.comment, req.params.id],
//     (err, result) => {
//       if (err) throw err;
//       res.send(result);
//     }
//   );
// });

// // READ ITEMS of clothes FOR ADMIN

// app.get("/server/clothes", (req, res) => {
//   const sql = `
//     SELECT *
//     FROM clothes
//     ORDER BY id DESC
//     `;
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // READ ITEMS of clothes FOR CUSTOMERS (HOME PAGE)

// app.get("/home/clothes", (req, res) => {
//   const sql = `
//   SELECT *
//   FROM clothes
//   ORDER BY id DESC
//     `;
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // READ ORDERS FOR ADMIN AND USERS

// app.get("/home/orders/", (req, res) => {
//   const sql = `
//   SELECT o.*, c.type, c.color, c.price
//     FROM orders AS o
//     LEFT JOIN clothes AS c
//     ON o.clothe_id = c.id
//     ORDER BY o.id
//     `;
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // UPDATE ITEM of clothes FOR ADMIN

// app.put("/server/clothes/:id", (req, res) => {
//   let sql;
//   let r;
//   if (req.body.deletePhoto) {
//     sql = `
//         UPDATE clothes
//         SET type = ?, color = ?, price = ?, image = null
//         WHERE id = ?
//         `;
//     r = [req.body.type, req.body.color, req.body.price, req.params.id];
//   } else if (req.body.image) {
//     sql = `
//         UPDATE clothes
//         SET type = ?,  color = ?, price = ?, image = ?
//         WHERE id = ?
//         `;
//     r = [
//       req.body.type,
//       req.body.color,
//       req.body.price,
//       req.body.image,
//       req.params.id,
//     ];
//   } else {
//     sql = `
//         UPDATE clothes
//         SET type = ?, color = ?, price = ?
//         WHERE id = ?
//         `;
//     r = [req.body.type, req.body.color, req.body.price, req.params.id];
//   }
//   con.query(sql, r, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // UPDATE ORDER FOR ADMIN - APPROVE

// app.put("/server/orders/:id", (req, res) => {
//   const sql = `
//     UPDATE orders
//     SET status = ?
//     WHERE id = ?
//     `;
//   con.query(sql, [req.body.status, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // DELETE ITEM of clothes FOR ADMIN

// app.delete("/server/clothes/:id", (req, res) => {
//   const sql = `
//     DELETE FROM clothes
//     WHERE id = ?
//     `;
//   con.query(sql, [req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // DELETE ORDER FOR ADMIN

// app.delete("/server/orders/:id", (req, res) => {
//   const sql = `
//     DELETE FROM orders
//     WHERE id = ?
//     `;
//   con.query(sql, [req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

app.listen(port, () => {
  console.log(`Siuvykla per ${port} portą!`);
});

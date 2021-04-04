// node index.js
// nodemon --watch index.js

const express = require('express')
const app = express()
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'qkdgkahr7365',
    database: 'employeesystem'
}); 


////// 게시물부분 //////

app.post('/create', (req, res) => {
    const email = req.body.email;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        'INSERT INTO employees (email, age, country, position, wage) VALUES(?, ?, ?, ?, ?)', 
        [email, age, country, position, wage], 
        (err, result) => {
            if(err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        }
    );
});

app.get('/read', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
}) 

app.get('/readOne/:id', (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM employees WHERE id = ?", id, 
  (err, result) => {
      if (err) {
          console.log(err)
      } else {
          res.send(result)
      }
  })
}) 

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET age = ?,  country = ?, position = ?, wage = ? WHERE id = ?",
    [age, country, position, wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );

});

  
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//////////////////////////////////



//////// 댓글부분 ///////////


app.post('/createComment', (req, res) => {
  const poId = req.body.poId;
  const email = req.body.email;
  const context = req.body.context;
  const time = req.body.time;

  db.query(
      'INSERT INTO comments (po_id, email, context, time) VALUES(?, ?, ?, ?)', 
      [poId, email, context, time], 
      (err, result) => {
          if(err) {
              console.log(err)
          } else {
              res.send("Values Inserted")
          }
      }
  );
});


app.get('/readComment/:id', (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM comments WHERE po_id = ?", id, 
  (err, result) => {
      if (err) {
          console.log(err)
      } else {
          res.send(result)
      }
  })
}) 

app.delete("/deleteComment/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM comments WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.put("/updateComment/:updateTargetCommentId", (req, res) => {
  const updateTargetCommentId = req.params.updateTargetCommentId;
  const context = req.body.newContext;
  const time = req.body.time;
  
  db.query(
    "UPDATE comments SET context = ?,  time = ? WHERE id = ?",
    [context, time, updateTargetCommentId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});



////////////////////////////


app.listen(5000, () => {
    console.log("yey, server is running on port 5000");
})
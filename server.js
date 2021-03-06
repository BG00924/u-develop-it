const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
// const sqlite3 = require('sqlite3').verbose()
const inputCheck = require('./utils/inputCheck');
const db = require('./db/database')
const apiRoutes = require('./routes/apiRoutes');


//express middleware
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.use('/api', apiRoutes);
// // connects to database
// const db = new sqlite3.Database('./db/election.db', err => {
//     if (err) {
//         return console.error(err.message)
//     }
//     console.log('Connected to the election database')
// })

// returns all data in candidates table
// db.all(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows)
// })
// Get all candidates
// app.get('/api/candidates', (req, res) => {
//     const sql = `SELECT candidates.*, parties.name
//                     AS party_name
//                     FROM candidates
//                     LEFT Join parties
//                     ON candidates.party_id = parties.id`;
//     const params = [];
//     // GET a single candidate sql code
//     db.all(sql, params, (err, rows) => {
//         if (err) {
//           res.status(500).json({ error: err.message });
//           return;
//         }
    
//         res.json({
//           message: 'success',
//           data: rows
//         });
//     });
// });

// // GET a single candidate
// db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if(err) {
//         console.log(err)
//     }
//     console.log(row)
// })
// // Get single candidate
// app.get('/api/candidate/:id', (req, res) => {
//     const sql = `SELECT candidates.*, parties.name
//                     AS party_name
//                     FROM candidates 
//                     LEFT JOIN parties
//                     ON candidates.party_id = parties.id
//                     WHERE candidates.id = ?`;
//     const params = [req.params.id];
//     db.get(sql, params, (err, row) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
  
//       res.json({
//         message: 'success',
//         data: row
//       });
//     });
// });

// delete a candidate
// db.run(`DELETE FROM candidates WHERE id = ?`, 1, function(err, result) {
//     if (err) {
//         console.log(err)
//     }
//     console.log(result, this, this.changes)
// })
// // Delete a candidate
// app.delete('/api/candidate/:id', (req, res) => {
//     const sql = `DELETE FROM candidates WHERE id = ?`;
//     const params = [req.params.id];
//     db.run(sql, params, function(err, result) {
//       if (err) {
//         res.status(400).json({ error: res.message });
//         return;
//       }
  
//       res.json({
//         message: 'successfully deleted',
//         changes: this.changes
//       });
//     });
//   });

// create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`
// const params = [1, 'Ronald', 'Firbank', 1]
// // ES5 function, not arrow function, to use this
// db.run(sql, params, function(err, result) {
//     if (err) {
//         console.log(err)
//     }
//     console.log(result, this.lastID)
// })
// // Create a candidate
// app.post('/api/candidate', ({ body }, res) => {
//     const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
//     if (errors) {
//       res.status(400).json({ error: errors });
//       return;
//     }
//     const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
//     const params = [body.first_name, body.last_name, body.industry_connected];
//     // ES5 function, not arrow function, to use `this`
//     db.run(sql, params, function(err, result) {
//         if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//         }

//         res.json({
//             message: 'success',
//             data: body,
//             id: this.lastID
//         });
//     });
// });

// app.put('/api/candidate/:id', (req, res) => {
//     const errors = inputCheck(req.body, 'party_id');

//     if (errors) {
//         res.status(400).json({ error: errors });
//         return;
//     }
//     const sql = `UPDATE candidates SET party_id = ? 
//                  WHERE id = ?`;
//     const params = [req.body.party_id, req.params.id];
  
//     db.run(sql, params, function(err, result) {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
  
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: this.changes
//       });
//     });
//   });

// app.get('/api/parties', (req, res) => {
//     const sql = `SELECT * FROM parties`;
//     const params = [];
//     db.all(sql, params, (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
  
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });

// app.get('/api/party/:id', (req, res) => {
//     const sql = `SELECT * FROM parties WHERE id = ?`;
//     const params = [req.params.id];
//     db.get(sql, params, (err, row) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
  
//       res.json({
//         message: 'success',
//         data: row
//       });
//     });
//   });

// app.delete('/api/party/:id', (req, res) => {
//     const sql = `DELETE FROM parties WHERE id = ?`;
//     const params = [req.params.id];
//     db.run(sql, params, function(err, result) {
//       if (err) {
//         res.status(400).json({ error: res.message });
//         return;
//       }
  
//       res.json({ message: 'successfully deleted', changes: this.changes });
//     });
//   });

// Default response for any other request(Not Found) Catch all; needs to be last as it will override others
app.use((req, res) => {
    res.status(404).end();
});

// start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})

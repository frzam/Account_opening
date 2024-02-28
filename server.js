const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');



dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection:', err);
    }
    console.log('MySQL connection closed gracefully');
    process.exit();
  });
});

const app = express();

app.use(express.json());

// Supress CORS Error
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

// /login endpoint
app.post('/login',(req,res)=>{
  var username = req.body.username
  var password = req.body.password
  console.log(username, 'is trying to login!')
  data = {
    status : 'Failed'
  }
  q = 'Select * from '+ dbConfig.database + '.user_auth where username = ' + mysql.escape(username) + 'and password = ' + mysql.escape(password);
  connection.query(q, (err, result) =>{
    if(err){
      console.log('Error during Auth query: ', err)
      return
    }
  if (result && result.length == 1){
    data.status = "Successful"
    console.log(username, 'is logged in successfully')
  }
  console.log('data: ', data)
  res.send(data)
  return
  })
});

app.post('/submit-application', (req, res) => {
  const formData = req.body;

  // Validate the formData here if needed

  const insertQuery = 'INSERT INTO applications SET ?';

  connection.query(insertQuery, formData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ message: 'Application submitted successfully', result });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


console.log('Starting the server...');

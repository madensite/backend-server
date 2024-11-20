const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// JSON 요청을 처리하기 위한 미들웨어
app.use(express.json());

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qpwoei1@3-',
    database: 'reservation_db',
});

// MySQL 연결 확인
db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 오류:', err);
        return;
    }
    console.log('MySQL 연결 성공');
});

// 기본 라우트
app.get('/', (req, res) => {
    res.send('백엔드 서버 실행 중');
});

// 서버 실행
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중`);
});

app.post('/reservations', (req, res) => {
    const { name, phone, date, time, guests } = req.body;
    const query = 'INSERT INTO reservations (name, phone, date, time, guests) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [name, phone, date, time, guests], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('예약 생성 중 오류 발생');
            return;
        }
        res.status(201).send('예약 생성 성공');
    });
});

app.get('/reservations', (req, res) => {
    const query = 'SELECT * FROM reservations';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('예약 목록 조회 중 오류 발생');
            return;
        }
        res.status(200).json(results);
    });
});

app.delete('/reservations/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM reservations WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('예약 삭제 중 오류 발생');
            return;
        }
        res.status(200).send('예약 삭제 성공');
    });
});

app.post('/orders', (req, res) => {
    const { menu_item, quantity, price } = req.body;
    const query = 'INSERT INTO orders (menu_item, quantity, price) VALUES (?, ?, ?)';

    db.query(query, [menu_item, quantity, price], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('주문 생성 중 오류 발생');
            return;
        }
        res.status(201).send('주문 생성 성공');
    });
});

app.get('/orders', (req, res) => {
    const query = 'SELECT * FROM orders';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('주문 목록 조회 중 오류 발생');
            return;
        }
        res.status(200).json(results);
    });
});

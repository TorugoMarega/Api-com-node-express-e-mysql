const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const mysql = require('../mysql').pool

// retorna todos os produtos
router.get('/', (req, res, next)=>{  
    mysql.getConnection((error, conn) => {
        if (error){ return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM produtos',
            (error, resultado, fields)=>{
                if (error){ return res.status(500).send({error:error})}
                res.status(200).send({response: resultado})
            }
        )
    })
});

// insere (posta) um novo produto
router.post('/', (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if (error){ return res.status(500).send({error:error})}

        conn.query(
            `INSERT INTO produtos (nome, preco) 
                VALUES (?,?)`,
            [req.body.nome, req.body.preco],
            (error, resultado, field) =>{
                conn.release();
                if (error){ return res.status(500).send({error:error})}               
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    })
})




// retorna os dados de um produto
router.get('/:id_produto',(req, res, next)=>{
    mysql.getConnection((error, conn) => {
        if (error){ return res.status(500).send({error:error})}
        conn.query(
            `SELECT * 
                FROM produtos 
                WHERE idProdutos = ?`,
            [req.params.id_produto],
            (error, resultado, fields)=>{
                if (error){ return res.status(500).send({error:error})}
                res.status(200).send({response: resultado})
            }
        )
    });
});

//altera um produto
router.patch('/', (req, res, next)=>{
    mysql.getConnection((error, conn) => {
        if (error){ return res.status(500).send({error:error})}

        conn.query(
            `UPDATE produtos
                SET nome = ?,
                    preco = ?
             WHERE idProdutos = ?`,
            [
                req.body.nome, 
                req.body.preco,
                req.body.idProdutos
            ],
            (error, resultado, fields)=>{
                if (error){ return res.status(500).send({error:error})}

                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso'})
            }
        )

    });
})

//deleta um produto
router.delete('/', (req, res, next)=>{
    mysql.getConnection((error, conn) => {
        if (error){ return res.status(500).send({error:error})}

        conn.query(
            `DELETE FROM produtos
             WHERE idProdutos = ?`,
            [
                req.body.idProdutos
            ],
            (error, resultado, fields)=>{
                if (error){ return res.status(500).send({error:error})}

                res.status(202).send({
                    mensagem: 'Produto removido com sucesso'})
            }
        )

    });
})

module.exports = router;
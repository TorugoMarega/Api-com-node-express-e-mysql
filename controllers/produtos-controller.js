const mysql = require('../mysql').pool;

exports .getProdutos = (req, res, next)=>{  
    mysql.getConnection((error, conn) => {
        if (error){ return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM produtos',
            (error, result, fields)=>{
                if (error){ return res.status(500).send({error:error})}
                const response = {
                    quantidade: result.lenght,
                    produtos: result.map(prod=>{
                        return{
                            idProdutos: prod.idProdutos,
                            nome: prod.nome,
                            preco: prod.preco,
                            imagem_produto: prod.imagem_produto,
                            request:{
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um produto específico',
                                url: 'http://localhost:3000/produtos/' + prod.idProdutos
                            }
            
                        }
                    })
                } 
                res.status(200).send({response})
            }
        )
    })
}

exports.postProdutos = (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if (error){ return res.status(500).send({error:error})}

        conn.query(
            `INSERT INTO produtos (nome, preco, imagem_produto) VALUES (?,?,?)`,
            [req.body.nome, 
             req.body.preco,
             req.file.path
            ],
            (error, result, field) =>{
                conn.release();
                if (error){ return res.status(500).send({error:error})}      
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado:{
                        idProdutos: result.idProdutos,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        imagem_produto: req.file.path,
                        request:{
                            tipo: 'POST',
                            descricao: 'Retorna todos os produtos',
                            url: 'http://localhost:3000/produtos/'
                        }
                    } 
                }         
                return res.status(201).send(response);
            }
        )
    })
}

exports.getUmProduto = (req, res, next)=>{
    mysql.getConnection((error, conn) => {
        if (error){ return res.status(500).send({error:error})}
        conn.query(
            `SELECT * 
                FROM produtos 
                WHERE idProdutos = ?`,
            [req.params.id_produto],
            (error, result, fields)=>{
                if (error){ return res.status(500).send({error:error})}

                if(result.lenght ==0){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado produto com este ID'
                    })
                }

                const response = {
                    produto:{
                        idProdutos: result[0].idProdutos,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        imagem_produto: result[0].imagem_produto,
                        request:{
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url: 'http://localhost:3000/produtos/'
                        }
                    } 
                } 
                return res.status(200).send(response)
            }
        )
    });
}

exports.patchProduto = (req, res, next)=>{
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
            (error, result, fields)=>{
                if (error){ return res.status(500).send({error:error})}

                const response = {
                    mensagem: 'Produto alterado com sucesso',
                    produtoAtualizado:{
                        idProdutos: req.body.idProdutos,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request:{
                            tipo: 'POST',
                            descricao: 'Retorna os detalhes de um produto específico',
                            url: 'http://localhost:3000/produtos/' + req.body.idProdutos
                        }
                    } 
                }         
                return res.status(202).send(response);
            }
        )

    });
}

exports.deleteProduto = (req, res, next)=>{
    mysql.getConnection((error, conn) => {
        if (error){ return res.status(500).send({error:error})}

        conn.query(
            `DELETE FROM produtos
             WHERE idProdutos = ?`,
            [
                req.body.idProdutos
            ],
            (error, result, fields)=>{
                conn.release();
                if (error){ return res.status(500).send({error:error})}
                const response = {
                    mensagem: 'Produto removido com sucesso',
                    request:{
                        tipo: 'POST',
                        descricao: 'Insere um produto',
                        url: 'http://localhost:3000/produtos',
                        body: {
                            nome: 'String',
                            preco: 'Number'
                        }
                    }
                }
                return res.status(202).send(response)
        })        
    });
}
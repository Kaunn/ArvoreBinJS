class BinaryTree {
    //Inicia a raiz como nula
    constructor() {
        this.root = null
    }

    //Exibe o menor valor da árvore
    min() {
        //current recebe o valor de root 
        let current = this.root
        //Compara se current é nulo
        if (current == null)
             //retorna nulo
            return null
        //Enquanto o valor da esquerda for diferente de nulo
        while (current.left != null)
            //current recebe o valor da esquerda
            current = current.left
        //Retorna o conteúdo de current
        return current.content
    }

    //Exibe o maior valor da árvore
    max() {
        //current recebe o valor de root
        let current = this.root
        //Compara se current é nulo
        if (current == null)
            //Caso current for nulo, retorna nulo
            return null
        //Enquanto current.right for diferente de nulo
        while (current.right != null)
            //current recebe o valor da direita
            current = current.right
        //Retorna o conteúdo de current
        return current.content
    }

    //Insere o elemento da árvores
    insert(element) {
        //root recebe o valor que foi inserido
        this.root = this.insertNode(this.root, element)
    }
    
    //Insere o nó na árvore
    insertNode(rootNode, element) {
        //Compara se o valor do nó é nulo
        if (rootNode == null)
            //Se caso o nó for nulo retorna o elemento inserido
            return new Node(element)
        //Se caso o elemento for maior do que o nó de referência, insere o elemento na direita
        if (element > rootNode.content)
            rootNode.right = this.insertNode(rootNode.right, element)
        //Se caso o elemento for menor do que o nó de referência, insere o elemento na esquerda
        else
            rootNode.left = this.insertNode(rootNode.left, element)
        return rootNode
    }

    //Executa a função callback para cada nó, em ordem
    inOrderTraverse(callback) {
        //Mostra primeiro a esquerda
        this.inOrderVisitor(this.root, callback)
    }

    inOrderVisitor(node, callback) {
        //Se caso o nó for nulo
        if (node == null)
        //Retorna o valor do nó da esquerda
        return
        this.inOrderVisitor(node.left, callback)
        //Executa a função callback e mostra o nó no conteúdo
        callback(node.content)
        this.inOrderVisitor(node.right, callback)
    }

    //Executa a função callback para cada nó, em pré-ordem
    preOrderTraverse(callback) {
         //Retorna o valor da raiz
        this.preOrderVisitor(this.root, callback)
    }

    preOrderVisitor(node, callback) {
         //Compara se o nó é nulo 
        if (node == null)
            return
        //Primeiro mostra o conteúdo da raiz 
        callback(node.content)
        //Depois mostra o conteúdo da esquerda
        this.preOrderVisitor(node.left, callback)
        //Por último mostra o conteúdo da direita
        this.preOrderVisitor(node.right, callback)
    }

    //Executa a função callback para cada nó, em pós-ordem
    postOrderTraverse(callback) {
        this.postOrderVisitor(this.root, callback)
    }

    postOrderVisitor(node, callback) {
        //Compara se o nó é nulo
        if (node == null)
            return
        //Mostra o valor da direita
        this.postOrderVisitor(node.left, callback)
        //Mostras o valor da esquerda
        this.postOrderVisitor(node.right, callback)
        //Executa a função callback e mostra o conteúdo do nó
        callback(node.content)
    }

    //retorna true se o valor já existe na arvore 
    //     Busca na árvore binária
    //    1. É nulo? o elemento não existe
    //    2. É igual ao conteúdo? achou
    //    3. É maior que o conteúdo?
    //       3.1 busca de direita
    //       3.2 busca na esquerda

    //Busca se o valor que foi inserido está na árvore
    search(value) {
        return this.searchVisitor(this.root, value)
    }

    searchVisitor(node, element) {
        //Se é nulo o elemento não existe e retorna falso
        if (node == null)
            return false
        //Se é igual ao conteúdo, achou o elemento 
        if (node.content == element)
            return true;
        //Se for maior que o conteúdo, procure na direita, caso não ache, procure na esquerda
        if (element > node.content)
            return this.searchVisitor(node.right, element)
        else
            return this.searchVisitor(node.left, element)
    }

    //Remove um elemento existente na árvore e o retorna
    remove(value) {
        this.root = this.removeVisitor(this.root, value)
    }

    //Remove um elemento da árvore
    removeVisitor(node, value) {
        //Verifica se o conteúdo é igual ao valor que foi foi escolhido para ser removido
        if (node.content == value) {
            //Verifica se o valor do nó da esquerda é igual ao valor do nó da direita
            if (node.left == node.right) {
                //Não tem filhos - Grau 0
                //Retorna nulo
                return null
            //Verifica se o valor do nó da direita é nulo
            } else if (node.right == null) {
                //Não tem filhos na direita e tem nó na esqueda - Grau 1
                //Retorna o nó da esquerda
                return node.left
                //Verifica se o valor do nó da direita é nulo
            } else if (node.left == null) {
                //Não tem filhos da esquerda e tem nó da direita - Grau 1
                //Retorna o nó da direita
                return node.right
            } else {
                //Tem os dois ramos - Grau 2
                //newRoot recebe o nó da direita
                const newRoot = node.right
                //current recebe o nó da direita
                let current = node.right;
                //enquanto current.left for diferente de nulo current recebe o nó da direita
                while (current.left != null)
                    current = current.left
                current.left = node.left
                 //retorna newRoot
                return newRoot;
            }
         //Verifica se o valor é menor do que o conteúdo do nó
        } else if (value < node.content) {
             //Remove o valor do nó da esquerda
            node.left = this.removeVisitor(node.left, value)
        } else {
            //Remove o valor do nó da direita
            node.right = this.removeVisitor(node.right, value)
        }
        return node;
    }

    //Exibe a altura da árvore
    height() {
        return this.heightVisitor(this.root)
    }

    heightVisitor(node) {
        if (!node)
            return -1
        //Visita a esquerda e retorna a altura dela
        let leftHeight = this.heightVisitor(node.left),
            //Visita a direita e retorna a altura dela
            rightHeight = this.heightVisitor(node.right)
        //Diz quem é maior, se é a esquerda ou a direita
        return Math.max(leftHeight, rightHeight) + 1
    }

    //Informa quantos nós existem na arvore
    size() {
        return this.sizeVisitor(this.root)
    }

    //Navega todos os nós da árvore e retorna quantos nós tem
    sizeVisitor(node) {
        if (!node)
            return 0
        return this.sizeVisitor(node.left) + this.sizeVisitor(node.right) + 1
    }
}

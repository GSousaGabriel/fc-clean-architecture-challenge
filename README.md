## Desafio DDD - Módulo 9 - Clean Architecture

## 1. Use cases para Product


**Descrição:** Da mesma forma que fizemos a criação dos use cases realizando as operações: "create", "find", "list", "update" para "Customer", faça:

* Crie as operações mencionadas acima para nossa entidade: "Product".
* Implemente os testes de unidade e integração nos use cases.


**Descrição desafio 2:** Da mesma forma que fizemos a listagem dos nossos Customers em nossa API, repita o mesmo processo e realize a listagem de Products. Não deixe de realizar o teste automatizado end-to-end.

* A linguagem de programação para este desafio é TypeScript


**Descrição desafio 3:** Aprendemos que o notification pattern nos auxilia como um container acumulador de erros para que possamos de uma forma mais simples retornarmos nossos erros todos de uma vez evitando assim a geração excessiva de exceções.

Nesse desafio você deverá utilizar o padrão notification em nossa entidade Products. Não deixe de realizar os testes automatizados.

Adicione um teste que acumule dois erros ao mesmo tempo. 

* A linguagem de programação para este desafio é TypeScript


**Descrição desafio 4:** Agora que aprendemos a criar o processo de validação, bem como minimizar o acoplamento em nosso domínio, você deverá realizar o processo de validação na entidade Product seguindo o mesmo processo.

OBS: Não deixe de verificar se todos os testes ainda estão passando.

* A linguagem de programação para este desafio é TypeScript


**Como executar: ** Uma diferença na execução do projeto é que foi usado o vitest para realização dos testes e o comando para executa-lo é:

'npx vitest': para rodar todos os testes;
'npx vitest --dir path': para rodar os testes por pasta;

* A linguagem de programação para este desafio é TypeScript
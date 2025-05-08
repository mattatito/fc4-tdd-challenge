# Desafio Técnico: Desenvolvimento Orientado a Testes (TDD)

## Objetivo:

Implementar testes utilizando TDD no sistema de reservas de propriedades. Os testes devem cobrir os mappers, criação de usuários (guests) e propriedades via REST, validação de políticas de reembolso, e o serviço de cancelamento de reservas.

## 0. Clone o repositório

Utilize o repositório como base para o projeto na branch main: https://github.com/devfullcycle/fc4-tdd

## 1. Testes Unitários nos Mappers

Arquivos de teste a criar:

src/infrastructure/persistence/mappers/property_mapper.test.ts
src/infrastructure/persistence/mappers/booking_mapper.test.ts

### Tarefas:

Crie testes para validar as funções toDomain e toPersistence dos mappers de Property e Booking.
Valide se os mappers convertem os objetos corretamente.
Adicione cenários onde os campos obrigatórios estão ausentes e valide se a exceção correta é lançada.

### Especificações dos testes no arquivo property_mapper.test.ts:

it("deve converter PropertyEntity em Property corretamente")
it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity")
it("deve converter Property para PropertyEntity corretamente")

### Especificações dos testes no arquivo booking_mapper.test.ts:

it("deve converter BookingEntity em Booking corretamente")
it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity")
it("deve converter Booking para BookingEntity corretamente")

## 2. Testes E2E de Criação de Usuário (Guest)

Arquivo de teste a criar:

src/infrastructure/web/user_controller_e2e.test.ts

### Tarefas:

Crie testes end-to-end para o endpoint POST /users.
Implemente o método createUser em src/application/services/user_service.ts
Valide que o endpoint cria o usuário corretamente e retorna as mensagens de erro apropriadas com o código HTTP correto.

### Especificações dos testes:

it("deve criar um usuário com sucesso")
it("deve retornar erro com código 400 e mensagem 'O campo nome é obrigatório.' ao enviar um nome vazio")

## 3. Testes E2E de Criação de Propriedade

Arquivo de teste a criar:

src/infrastructure/web/property_controller_e2e.test.ts

### Tarefas:

Crie testes end-to-end para o endpoint POST /properties.
Implemente o método createProperty em src/application/services/property_service.ts
Implemente a validação do atributo basePricePerNight que obrigatoriamente deve ter um valor maior que 0 src/domain/entities/property.ts
Valide que o endpoint cria a propriedade corretamente e retorna as mensagens de erro apropriadas com o código HTTP correto.

### Especificações dos testes:

it("deve criar uma propriedade com sucesso")
it("deve retornar erro com código 400 e mensagem 'O nome da propriedade é obrigatório.' ao enviar um nome vazio")
it("deve retornar erro com código 400 e mensagem 'A capacidade máxima deve ser maior que zero.' ao enviar maxGuests igual a zero ou negativo")
it("deve retornar erro com código 400 e mensagem 'O preço base por noite é obrigatório.' ao enviar basePricePerNight ausente")

## 4. Testes de Políticas de Reembolso (RefundRuleFactory)

Arquivo de teste a criar:

src/domain/cancelation/refund_rule_factory.test.ts

### Tarefas:

Crie testes unitários para validar o comportamento da fábrica RefundRuleFactory.
Valide os diferentes cenários de decisão baseados no número de dias até o check-in.

### Especificações dos testes:

it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência")
it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência")
it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência") 5. Testes de Cancelamento de Reserva
Arquivo de teste existente:

src/application/services/booking_service.test.ts

### Tarefas:

Adicione um teste para garantir que o sistema retorne um erro ao tentar cancelar uma reserva inexistente.
Especificação do teste:

it("deve retornar erro ao tentar cancelar uma reserva que não existe")
Resultado esperado:

Mensagem de erro: "Reserva não encontrada."
Submissão:
Suba seu código em um repositório público no GitHub com instruções claras para execução do projeto.
Insira a URL do repositório no campo abaixo.

![BrightCoders Logo](img/logo.png)

- [El Juego de boliche](#el-juego-de-boliche)
  - [Objetivos](#objetivos)
  - [Instrucciones](#instrucciones)
  - [Entregables](#entregables)
  - [Puntos](#puntos)
  - [Tecnologías](#tecnologías)
  - [Requerimientos funcionales](#requerimientos-funcionales)
  - [Recursos](#recursos)
  
# El Juego de boliche

  Atributo |  Valor
 --- | --- |
 Tipo | Colaborativo
 Estrategia | Mob Programming
 Modo | Síncrono
 Dedicación | 6 horas
 Duración | 2 días

## Objetivos

- Nivelar habilidades para la programación con Javascript / Typescript
- Introducir el uso de Linters
- Introducir en el desarrollo basado en pruebas
- Introducir el concepto de commits significativos

## Instrucciones

- Deberán trabajar en equipo de manera colaborativa y aplicando la dinámica de mob programming para desarrollar el algoritmo de acuerdo a los requerimientos que en las siguientes secciones se indican.
- En la actividad de Github (commits) se deberá observar la participación de todos los participantes
- En cada commit se deben registrar todos los participantes activos (co-author commits)
- En los commits se debe observar a rotación de los participantes, es decir, quien hace el commit no es siempre la misma persona

## Entregables

- Código fuente en este repositorio
- Solución orientada a objetos
- Archivo README.md actualizado
- El código debe incluir pruebas unitarias
- La puntuación obtenida por Codacy, CodeClimate o similar debe ser A o lo equivalente
- Se deben incluir los badges de los analizadores de código estáticos (codacy, codeclimate, etc.)
- La versión final de tu código deberá estar en la rama master

## Puntos

- Número de commits como primer autor
- Número de commits como co-author
- Frecuencia de los commits (# de commits realizados en días diferentes)
- Tamaño de los commits (líneas de código agregadas)

## Tecnologías

- Javascript ó Typescript
- ESLint
- Jest
- Codacy, CodeClimate, CodeCov

## Requerimientos funcionales

![Bowling score](img/bowling.png)

- The game consists of 10 frames as shown above. In each frame the player has two opportunities to knock down 10 pins. The score for the frame is the total number of pins knocked down, plus bonuses for strikes and spares.
- A spare is when the player knocks down all 10 pins in two tries. The bonus for that frame is the number of pins knocked down by the next roll. So in frame 3 above, the score is 10 (the total number knocked down) plus a bonus of 5 (the number of pins knocked down on the next roll.)
- A strike is when the player knocks down all 10 pins on his first try. The bonus for that frame is the value of the next two balls rolled.
- In the tenth frame a player who rolls a spare or strike is allowed to roll the extra balls to complete the frame. However no more than three balls can be rolled in tenth frame.

## Recursos

- Javascript
  - [Learn Javascript - Interactive tutorial](https://www.learn-js.org/)
  - [Learn JavaScript (Step-By-Step)](https://learnjavascript.online/)
  - [JavaScript Garden](https://bonsaiden.github.io/JavaScript-Garden/)
  - [Eloquent JavaScript](https://eloquentjavascript.net/)
  - [Try JavaScript](https://www.javascript.com/try)
  - [JavaScript (ES2015+) Enlightenment](https://frontendmasters.com/books/javascript-enlightenment/)
  - [JavaScript Fundamentals for ES6](https://www.pluralsight.com/courses/javascript-fundamentals-es6)
- Programación orientada a objetos
  - - [An intro to object-oriented programming in JavaScript: objects, prototypes, and classes](https://www.freecodecamp.org/news/an-intro-to-object-oriented-programming-in-javascript-objects-prototypes-and-classes-5d135e7361b1/)
  - [JavaScript — Principios SOLID](https://medium.com/@mauriciogc/javascript-principios-solid-e93a17e950bb)
- ESLINT
  - [Documentación](https://eslint.org/)
- Desarrollo basado en pruebas
  - [The Absolute Beginner’s Guide to Test Driven Development, with a Practical Example](https://medium.com/@bethqiang/the-absolute-beginners-guide-to-test-driven-development-with-a-practical-example-c39e73a11631) 
  - [Learn Test Driven Development (TDD)](https://github.com/dwyl/learn-tdd)
  - [Fundamentals of TDD](https://thoughtbot.com/upcase/fundamentals-of-tdd)
  - [Getting Started](https://jestjs.io/docs/en/getting-started)
  - [Getting Started With Jest](https://www.valentinog.com/blog/jest/) 
  - [Testing JavaScript with Jest](https://flaviocopes.com/jest/)
- Analizadores de código estático
  - [CodeClimate](https://codeclimate.com/)
  - [Codacy](https://www.codacy.com/)
  - [CodeCov](https://about.codecov.io/)
- Git & Github
  - [Pro Git Book](https://git-scm.com/book/en/v2)
  - [Creating a commit with multiple authors](https://docs.github.com/en/enterprise-cloud@latest/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors)
  - [Writing Meaningful Git Commit Messages](https://betterprogramming.pub/you-need-meaningful-commit-messages-d869e44e98d4)
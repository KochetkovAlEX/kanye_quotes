# Kanye quotes
Kanye quotes is a website, where you can generate random quotes of your favourite singer and save it in your personal list.

![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)	![Rails](https://img.shields.io/badge/rails-%23CC0000.svg?style=for-the-badge&logo=ruby-on-rails&logoColor=white)  ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)   ![Ruby](https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white)   ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)	![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

[![CI](https://github.com/KochetkovAlEX/kanye_quotes/actions/workflows/ci.yml/badge.svg)](https://github.com/KochetkovAlEX/kanye_quotes/actions/workflows/ci.yml) [![Dependabot Updates](https://github.com/KochetkovAlEX/kanye_quotes/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/KochetkovAlEX/kanye_quotes/actions/workflows/dependabot/dependabot-updates)
## Installation
1. **Clone the repository**
   ```shell
   git clone https://github.com/KochetkovAlEX/kanye_quotes.git
   ```

2. **Navigate to the project directory**
   ```shell
   cd kanye_quotes
   ```

3. **Install dependencies**
   ```shell
   bundle install
   ```

4. **Set up the database**
   Create the database and run migrations to build the schema:
   ```shell
   bin/rails db:create
   bin/rails db:migrate
   ```
   
5. **Tests**
   Run tests:
   ```shell
   bin/rails db:test:prepare
   bin/rails test
   ```

6. **Start the application**
   Launch the Rails built-in server:
   ```shell
   bin/rails server
   ```

## Preview

<p align="center">
  <img src="assets/login.png">
</p>

<p align="center">
  <b>Login page</b>
</p>

-----

<p align="center">
  <img src="assets/reg.png">
</p>

<p align="center">
  <b>Registration page</b>
</p>

-----
<p align="center">
  <img src="assets/main.png">
</p>

<p align="center">
  <b>Main page</b>
</p>

----
<p align="center">
  <img width="460" height="300" src="assets/list.png">
</p>

<p align="center">
  <b>Quote list</b>
</p>

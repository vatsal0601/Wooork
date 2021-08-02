# Database Tables

### User

- **user_id**
- name
- username
- email
- avatar
- phone
- social_links [array] (app_name, url)
- education [array] (institute_name, year_of_graduation, qualification, graduation_field)
- experience [array] (company_name, role, duration, work_description)
- skills [array]

### Project

- **project_id**
- _user_id_
- owner_name
- project_name
- description
- url
- tag [array]
- collaborators [array] (user_id, role)
- image
- project_status

### Notification

- _user_id_
- notification [array] (_project_id_, description, status)

### Saved

- _user_id_
- project_id [array]

# Routes

**Base URL: https://wooork0601.herokuapp.com/**

### User

| Method | Route                    | Description                          |
| ------ | ------------------------ | ------------------------------------ |
| POST   | /user                    | Create new user                      |
| GET    | /user                    | Get all users                        |
| GET    | /user/:id                | Get user by id                       |
| GET    | /user/username=:username | Get user by username                 |
| PATCH  | /user/update=:id         | Update user by id                    |
| DELETE | /user/delete=:id         | Delete user by id                    |
| GET    | /user/random             | Get three random users               |
| GET    | /user/skills             | Get array of skills from all users   |
| GET    | /user/search/:array      | Get users from given array of skills |

### Project

| Method | Route                              | Description                            |
| ------ | ---------------------------------- | -------------------------------------- |
| POST   | /project                           | Create new project                     |
| GET    | /project                           | Get all projects                       |
| GET    | /project/:id                       | Get project by id                      |
| PATCH  | project/update=:id                 | Update project by id                   |
| DELETE | /project/delete=:id                | Delete project by id                   |
| GET    | project/project_name=:project_name | Get project by project name            |
| GET    | /project/user_id=:user_id          | Get projects by user id                |
| GET    | /project/project_id=:project_id    | Get project id's for a particular user |
| GET    | /project/random                    | Get four random projects               |
| GET    | /project/tags                      | Get array of tags from all projects    |
| GET    | /project/search/:array             | Get projects from given array of tags  |

### Saved

| Method | Route                  | Description                          |
| ------ | ---------------------- | ------------------------------------ |
| GET    | /saved/:user_id        | Get saved projects id's by user id   |
| POST   | /saved/:user_id        | Creating and updating saved projects |
| POST   | /saved/remove=:user_id | Removed saved project id by user id  |

### Notification

| Method | Route     | Description                                   |
| ------ | --------- | --------------------------------------------- |
| GET    | /:user_id | Get notification by user id                   |
| POST   | /:user_id | Creating and updating notification by user id |

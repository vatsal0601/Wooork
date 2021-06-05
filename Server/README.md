### Developer Note

- [ ] Add GitHub OAuth
- [ ] Searching user with skills
- [ ] Separate controller logic from routes
- [ ] Get project by user_id
- [ ] Add or remove collaborators in projects
- [ ] Change remove project method to patch in saved

# Database Tables

### User

- **user_id**
- name
- username
- email
- password
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

### User

| Method | Route                      | Description   |
| ------ | -------------------------- | ------------- |
| GET    | http://localhost:5000/user | Get all users |

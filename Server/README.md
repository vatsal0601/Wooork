### Developer Note

- [ ] Searching user with skills is left
- [ ] Separate controller logic from routes
- [ ] Updated notification is not sent back

# Database Tables

## User

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

## Project

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

## Notification

- _user_id_
- notification [array] (_project_id_, description, status)

## Saved

- _user_id_
- project_id [array]

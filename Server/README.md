# Database Tables

## User

- **user_id**
- name
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
- _project_id_
- description
- status

## Bookmark

- _user_id_
- project_id [array]

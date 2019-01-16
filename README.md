# Node Capstone Project - Contact-a-roo

Heroku live link - https://floating-bayou-15598.herokuapp.com/

## Apps Purpose

**High level statement about what your users will do with the app:**

A Client Relationship Manager (CRM) where you can keep track of your clients, including when you should follow up with them.

## User stories:

**As a user I should be able to track my many clients and keep track of when I should follow up with them, so that I can increse engagement with my business**

MVP important:

- [x] **View list of my clients**
- [x] **Create a new client**
- [x] **Delete a client**
- [x] **Update client details**
- [x] **Add notes to client**
- [x] **Sign up**
- [x] **Log in**
- [x] View details of a client

Future features to implement:

- [ ] **Create or setup a reminder to follow up with a client**
- [ ] Log calls/interactions with client
- [ ] Reset password
- [ ] See a record of when I contacted client
- [ ] Connect e-mail to log and create e-mails
- [ ] Connect phone to log and call client
- [ ] Add ability to add/change user image

## Client information that I will need:

- Name
- Company
- Address
- Phone Number
- Email
- Notes
- Reminders (future implementation)

## Schemas

Users - id
email,
password,
list of client

company -
name,
phone number,
address

Notes -
name,
description,
id of user/client/company

(Future release) Reminders -
name,
id of user/client,
created time,
time to be sent

## Screens the user will interact with:

MVP Important:

- [ ] Landing page to describe what the app is (requirement for project)
- [x] List or Directory of clients
- [x] Add client contact, look up pre-existing client or add new client
- [x] Notes: enter notes
- [x] Sign-up or log-in screen

Future Feature screens:

- [ ] way to reset password
- [ ] After login, see any alerts for contact reminders
- [x]  Click on their name to go to their record
  Possibly click on call/text/email to do the action and automatically create log of communication
- [ ] Once the correct client is found or created, add point of contact 
- [ ] Choose type: Phone Call/Text/Email/In Person
- [ ] Followup Needed? Yes/No
- [ ] Date/Time for reminder to follow up
- [ ] Recurring reminder?
- [ ] Click to view recent contacts with this client

## User flow

| Landing Page    | List of Clients            | Client Details         |
| --------------- | -------------------------- | ---------------------- |
| app info        | view brief details         | view all details       |
| sign up/ log in | click to open more details | create or set reminder |
|                 | delete client              | add notes to client    |
|                 | create a new client        |                        |

## Timeline

- [x] Design MVP - 2 hours
- [x] Setup CI, tests, and first deployment - 2 hours
- [x] Setup routes
- [ ] ...and add tests - 2 hours
- [x] Define Your API by Building Your Client - 5 hours
- [x] Provision your database - 1 hour
- [x] Complete GET endpoint and test - 6 hours
- [x] Complete POST endpoint and test - 6 hours
- [x] Complete PUT endpoint and test - 6 hours
- [x] Complete DELETE endpoint and test - 6 hours
- [ ] Code the front end of the app - 8 hours
- [ ] Gather user feedback and Write up your findings - 3 hours
- [ ] Complete any revisions needed - 5 hours
- [ ] Polish - 6 hours
- [ ] Comment and clean up code - 3 hours
- [ ] Cross-browser test your client and fix any bugs - 6 hours

68 hours total

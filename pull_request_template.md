## Description

Frontend

Added event handler to the approve button that makes a [PUT] call to the backend when an admin approves an application.

Added the handleReject function with functionality to [PUT] call to the mentee_intake and mentor_intake database to update the validateStatus from pending to rejected.

Added a onSubmit={rejectApplication} for rejecting an application on the reject button and an onSubmit={approveApplication} for approving an application on approve button.

#### Video Link

[Loom Video](https://www.loom.com/share/648ac3034888426f8c79ec5abc1463b6)

#### Trello Link


<blockquote class="trello-card"><a href="https://trello.com/c/SvN4johy/130-as-an-administrator-i-can-approve-or-reject-an-application-from-a-mentee-or-mentor-so-that-i-can-get-approved-users-onboarded
">Build: Added PUT call to backend for approving and rejecting applications of Mentee_Intake and Mentor_Intake while updating the status of approve and validateStatus.</a></blockquote>

## Type of change

- [x] New feature (non-breaking change which adds Application approval or rejection on applicationmodel.js)

## Checklist:

- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my own code
- [x] I have removed unnecessary comments/console logs from my code
- [x] My changes generate no new warnings
- [x] I have checked my code and corrected any misspellings
- [x] No duplicate code left within changed files
- [x] Size of pull request kept to a minimum
- [x] Pull request description clearly describes changes made & motivations for said changes


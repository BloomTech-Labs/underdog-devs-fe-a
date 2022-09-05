## Description
 Features:
 Converted Axios Fetch API calls to Dispatch state calls for:
1. NavBar.js
2. PendingApplications.js
3. ApplicationModal.js
4. UserManagement.js

New State Slices Added:

Applications Files:
1. setApplicationApprove.js (Approve application for Mentor or Mentee)
2. setApplicationReject.js (Reject application for Mentor or Mentee)

Mentor Files:
1. postMentorInfo.js (Adds Mentor Information to profile using ProfileID parameter)
2. postNewMentees.js (Changes mentor status to accepting new Mentees to either True or False)

userProfile Files:
1. getApplication.js (Gets all pending applications of Mentors and Mentees)
2. getCurrentUser.js (Gets Current LoggedIn User)
3. setApplicationProfile.js (Receives Payload response of getApplication.js after a successful axios call)
4. setCurrentUser.js (Receives Payload response of getCurrentUser.js after a successful axios call)
4. updateProfile.js (Updates profile with put dispatch using profile_id of profile to update and a request body of the desired changes a user wants)


Connected props to Pending application and added 2 state props to NavBar.js for CurrentUser and UserProfile,

Fixes # (issue):

Fixed PrivateRoute Component rendering and prop passing
Fixed Pending Application form review and removed notes from modal

## Loom Video

https://www.loom.com/share/57efd4ab032140ba8ab8b8683ee6d8f3

## Type of change

Please delete options that are not relevant.

- [x] Bug fix (non-breaking change which fixes an issue)
- [x] New feature (non-breaking change which adds functionality)

## Checklist:

- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my own code
- [x] I have removed unnecessary comments/console logs from my code
- [x] I have made corresponding changes to the documentation if necessary (optional)
- [x] My changes generate no new warnings
- [x] I have checked my code and corrected any misspellings
- [x] No duplicate code left within changed files
- [x] Size of pull request kept to a minimum
- [x] Pull request description clearly describes changes made & motivations for said changes



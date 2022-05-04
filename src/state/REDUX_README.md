===== REDUX GUIDELINES ===== 
A redux store was added to the project and connected to multiple components. Below is a simple set of guidelines for future dev teams to keep in mind when creating components in the future, and whether or not to use local state or global via Redux:

(1) Ask yourself, is the slice of state accessed across multiple components in the application?

(2) If it's accessed across multiple components, how many levels down of props drilling is required?

(3) When dispatching actions, please use dispatch instead of importing them using Connect for consistency and clarity (i.e., to mitigate confusion if another engineer was looking at a component, they can see that the action is getting dispatch).

(4) The project is leveraging a rootReduce file to help manage the number of reducer files.  If a new reducer is necessary, after adding the file, be sure to import that reducer into rootReduce (index.js) file to keep files clean and organized.
# LLC Assignment

I completed this assignment to the best of my abilities given the time. I took approximately 8 hours but
was quite mentally exhausted towards the end.

I was able to achieve all the tasks. The UI isn't beautiful, as I focused on function first.

Functionality:

- Implemented a file upload page so that the user can upload the field data and species data csv files.
- Fetched the 5 tallest trees for a given year.
- Fetched the best growing method based on tree health for a given species.
- Rendered a bar chart to display the average height per species given an input growing method.

Improvements:

- Could have made the website adhere more to responsive design principles.
- Memoized certain memory intense operations like running through the dataset.
- Converted the tree_health variable to an enum.
- Adding scrolling to element functionality so that the bar-chart scrolls into focus when the user selects a method.

## Installation instructions

You can download this folder as a zip file, or clone it as I have made the repo public.

### Steps

1. (Optional) If you don't have `node.js` installed, follow a node setup guide for your operating system.
2. Open a terminal and cd into the tree_dashboard folder within the folder you cloned the project in.
3. Run the command `npm install` to install the dependencies.
4. Run the command `npm start` to start a development server to run the project.

On the first page, click on the "Choose files" button to select the `field_data.csv` and `species.csv` files located in the `./data` folder of the project, and upload them. If this is successful, the proceed button will be enabled and you can continue to the dashboard.

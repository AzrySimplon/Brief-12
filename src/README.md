# Project Ibis


## Description

The Ibis project is designed to assist users in discovering and selecting meals based on their preferences and needs. 
It offers an intuitive and accessible interface, ensuring a seamless experience. The platform dynamically integrates 
with APIs to provide accurate and up-to-date meal options, making it a versatile tool for meal discovery. Users can 
explore detailed meal information, such as names, images, and recipes, with features that enhance usability and accessibility.


## Conception Choices

### 1. **Themes**
The project must include 2 themes:
A classic theme with the color chosen by the company
A secondary monochromatic theme to improve the accessibility of the project

### 2. **User Experience**
The goal is to have a responsive and user-friendly website which is easy to use and doesn't require the user to adapt
himself to the site but the opposite.


## Implementation Choices

### 1. **Themes**
- **CSS Variables**: Themes are defined with custom CSS properties for consistent and maintainable styling.
- **Switching Mechanism**: A simple JavaScript function dynamically updates the theme by applying a class to the
  `document` element.

### 2. **User Experience**
- **Dynamic Population**
To ensure a good responsiveness and flexibility, dropdown options are dynamically populated from API. It avoids
hardcoding values and all constraints related.

- **Input Formatting**
Input strings are automatically formatted (spaces replaced with underscores) to match API requirements, ensuring a
smooth experience without requiring user adaptation.

- **Responsive Design**
Mobile-friendly layout that adapts to different screen sizes using responsive layout using flexbox and media queries.

### 3. **Code Structure**
#### 3.1 **Object-Oriented Principles**
Created a `Meal` class to encapsulate data and related behaviors to make its usage easier.

#### 3.2 **Function Separation**
Divided functionality into different functions:
- **changeTheme**: Facilitates dynamic theme switching for improved accessibility and user choice.

- **API Integration Functions**: Fetches and integrates meal data dynamically from the API.

- **formatInput**: Prepares user inputs to match API query requirements.

- **initializeSelectOptions**: Initialize options of dropdown using the API.

- **Meal Class-Related Functions**: Encapsulates and manages meal attributes and behaviors.

- **Event Listener Setup**: Binds and responds to user interactions with the UI.

- **DOM Manipulation Utilities**: Updates the UI dynamically based on actions and data.

#### 3.3 **Documented Code**
Added comments to explain logic and improve maintainability
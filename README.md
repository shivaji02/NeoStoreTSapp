# NeoStoreTSapp

NeoStoreTSapp is an e-commerce mobile application built using React Native and TypeScript. It showcases elegant UI/UX, complete e-commerce flows, and a cross-platform design that works seamlessly on both iOS and Android devices. The app offers a variety of features, including user authentication, product catalog browsing, cart management, order processing, and user profile settings.

## Features

- Authentication: User login and signup functionality with secure credential handling.
- Product Listing: Displays a wide variety of furniture products with detailed descriptions.
- Cart Management: Add/remove items from the shopping cart, adjust quantities, and proceed to checkout.
- Order History: Review past orders with detailed breakdowns, including item information and cost.
- Profile Management: Update personal details such as name, email, phone number, and more.
- Notification System: Provides users with updates about new features, app updates, and special offers.
- Navigation Drawer: Easy navigation across different sections like Account, Cart, Orders, and more.
- Cross-platform: Fully functional on both iOS and Android devices.

## Screenshots

The app features a sleek and modern design. Below are a few screenshots to showcase the app's core screens:

### SignIn & SignUp Screens
User authentication screens designed for simplicity and ease of use on both platforms.

<p align="center">
  <img width="400" alt="SignIn Screen" src="https://github.com/user-attachments/assets/9980e272-c653-4d0d-bb1d-8f1469d753a0">
  <img width="400" alt="SignUp Screen" src="https://github.com/user-attachments/assets/25e1cc56-ebb5-4a4c-9621-abd2679e0a37">
</p>

### Home Screen
An engaging landing page highlighting furniture categories, special offers, and new arrivals.

<p align="center">
  <img width="400" alt="Home Screen" src="https://github.com/user-attachments/assets/bb764888-c19a-422d-b931-a6f02a7e711e">
</p>

### Cart Screen
A clear and concise cart layout with item quantities, pricing, and the ability to remove items.

<p align="center">
  <img width="400" alt="Cart Screen" src="https://github.com/user-attachments/assets/402a26e8-b5d4-40bd-a1bd-423a171492be">
</p>

### Order History Screen
Review all past orders with comprehensive details about each order.

<p align="center">
  <img width="380" alt="Order History Screen 1" src="https://github.com/user-attachments/assets/ae811ffa-aa38-48ea-9411-444af16c36e9">
  <img width="380" alt="Order History Screen 2" src="https://github.com/user-attachments/assets/f9fcb787-5a16-4a78-85e1-3a53b8ccc36b">
</p>

### Profile Management
Users can manage their personal information, including gender, phone number, and more.

<p align="center">
  <img width="380" alt="Profile Management 1" src="https://github.com/user-attachments/assets/dc6988b2-930c-4a13-a579-678358341372">
  <img width="380" alt="Profile Management 2" src="https://github.com/user-attachments/assets/59dce92d-9274-4902-a983-c9b9db4d059d">
</p>

---

## Installation

To run the app locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/shivaji02/NeoStoreTSapp.git
```

### 2. Navigate to the Project Directory

```bash
cd NeoStoreTSapp
```

### 3. Install Dependencies

```bash
npm install
```

or using Yarn:

```bash
yarn install
```

## Running the App

### iOS

To run the iOS version of the app:

```bash
npx react-native run-ios
```

Ensure that you have Xcode and necessary CLI tools installed.

### Android

To run the Android version of the app:

```bash
npx react-native run-android
```

Make sure you have Android Studio, the necessary SDKs, and an Android emulator or physical device set up.

---

## Project Structure

- `src/components`: Reusable components across the application.
- `src/screens`: Different screens for user interaction like SignIn, SignUp, Home, Cart, etc.
- `src/navigation`: React Navigation setup for handling in-app navigation.
- `src/redux`: API calls and business logic, actions, and payloads.
- `assets`: Images, icons, fonts, and static assets used in the app.

---

## Tech Stack

- React Native: Framework for building native apps using React.
- TypeScript: Superset of JavaScript that adds static types to ensure type safety.
- React Navigation: Navigation solution for routing and navigating between screens.
- Redux Toolkit: For state management across the application.
- Axios: For handling API requests and responses.

---

## Prerequisites

- Node.js >= 12.x
- npm >= 6.x or Yarn >= 1.22.x
- React Native CLI or Expo CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

---

## Contribution Guidelines

We welcome contributions to improve the project! To contribute:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a Pull Request to the `main` branch of the original repository.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### Notes

- Can share postman collection if needed please reach out to me.
- Some custom components are highly dynamic that adds more flexibility, high reusability and robust in render.
- Some api is called dynamically throughout app level and results improvements in ux.

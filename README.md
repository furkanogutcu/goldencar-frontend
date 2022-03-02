# <p align="center">GoldenCar</p>

GoldenCar is a car rental web application. It allows users to view, review and rent vehicles in the system.

**NOTE: The data in the project images are fake data. The data in this picture are sample content prepared to promote the web application.**


## Contents
- [Pages](#pages)
- [Features](#features)
- [Getting Started](#getting-started)
  * [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Associated Project](#associated-project)
- [Contributions](#contributions)

## Pages

  <h3 align="center">LOGIN PAGE</h3>
  
  ---   

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/1-login.PNG)

  <br>
  
  <h3 align="center">LOGIN PAGE WITH REMEMBERED EMAIL</h3>
  
  ---  

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/2-login-with-remembered-email.PNG)

  <br>
  
  <h3 align="center">REGISTER PAGE</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/3-register.PNG)

  <br>
  
  <h3 align="center">HOMEPAGE - NOT LOGGED IN</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/4-homepage-not-logged-in.PNG)

  <br>
  
  <h3 align="center">HOMEPAGE - LOGGED IN</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/5-homepage-logged-in.PNG)

  <br>
  
  <h3 align="center">CAR FILTER</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/6-car-filter.PNG)

  <br>
  
  <h3 align="center">FILTERED CARS</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/7-filtered-cars.PNG)

  <br>
  
  <h3 align="center">CARS</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/8-cars.PNG)

  <br>
  
  <h3 align="center">CAR DETAILS</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/9-car-details.PNG)

  <br>
  
  <h3 align="center">OTHER CARS OF THE BRAND</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/10-other-cars-of-the-brand.PNG)

  <br>
  
  <h3 align="center">ADD TO CART</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/11-add-to-cart.PNG)

  <br>
  
  <h3 align="center">PROFILE</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/12-profile.PNG)

  <br>
  
  <h3 align="center">CART</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/13-cart.PNG)

  <br>
  
  <h3 align="center">PAYMENT WITH SAVED CARD - VISA</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/14-payment-with-saved-card-visa.PNG)

  <br>
  
  <h3 align="center">PAYMENT WITH SAVED CARD - MASTERCARD</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/15-payment-with-saved-card-mastercard.PNG)

  <br>
  
  <h3 align="center">PAYMENT WITH UNSAVED CARD - VISA</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/16-payment-with-unsaved-card-visa.PNG)

  <br>
  
  <h3 align="center">PAYMENT WITH UNSAVED CARD - MASTERCARD</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/17-payment-with-unsaved-card-mastercard.PNG)

  <br>
  
  <h3 align="center">PAYMENT CONFIRMATION BY SAVED CREDIT CARD</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/18-payment-confirmation-by-saved-credit-card.PNG)

  <br>
  
  <h3 align="center">ORDER CONFIRMATION</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/19-order-confirmation.PNG)

  <br>
  
  <h3 align="center">PAYMENT IS IN PROGRESS</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/20-payment-is-in-progress.PNG)

  <br>
  
  <h3 align="center">PAYMENT SUCCESSFUL</h3>
  
  ---

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/21-payment-successful.PNG)

  <br>
  
  <h3 align="center">BRAND MANAGEMENT</h3> 
  
  ---
  
  <h4 align="center">Note: Only admin can access</h4>
  
  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/22-brand-management.PNG)

  <br>
  
  <h3 align="center">COLOR MANAGEMENT</h3>
  
  ---
  
  <h4 align="center">Note: Only admin can access</h4>

  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/23-color-management.PNG)

  <br>
  
  <h3 align="center">CAR MANAGEMENT</h3>
  
  ---
  
  <h4 align="center">Note: Only admin can access</h4>
  
  ![](https://raw.githubusercontent.com/furkanogutcu/goldencar-frontend/master/project-images/24-car-management.PNG)

## Features

+ If the user requests, the logged in e-mail is remembered
+ If the user's token period has expired, the system is automatically logged out
+ Users can view and update their information
+ 5 different vehicles randomly selected are introduce on the homepage
+ Total brand, vehicle and color information in the system is displayed on the homepage
+ Vehicles can be filtered by vehicle properties
+ Other cars of the brand are shown on the car detail page
+ Access to unauthorized pages is blocked with role-based authorization
+ While adding the vehicle to the cart, it is questioned whether the vehicle has been rented before and if the vehicle is suitable, it is added to the cart
+ Users can register their credit cards in the system and pay with saved credit cards
+ Automatic visa or mastercard identification when credit card number is entered
+ Users can review and confirm the order while completing the order
+ When the user confirms the order, it is checked in the backend whether they have enough findex points to rent that vehicle. If the user's findex score is sufficient, he can rent the vehicle

## Getting Started

The project needs a backend to run properly. So first of all, review and install [GoldenCar-backend](https://github.com/furkanogutcu/GoldenCar).

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/furkanogutcu/goldencar-frontend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Publish locally
   ```sh
   ng serve
   ```

## Tech Stack
| Technology / Library | Version |
| ------------- | ------------- |
| Angular | 12.2.4 |
| Angular Material | 12.2.6 |
| Bootstrap | 5.1.0 |
| Jquery | 3.6.0 |
| rxjs | 6.6.0 |
| auth0/angular-jwt | 5.0.2 |
| ngx-mask | 12.0.0 |
| ngx-spinner | 12.0.0 |
| ngx-toastr | 14.1.3 |

## Associated Project

The backend of this project [GoldenCar-backend](https://github.com/furkanogutcu/GoldenCar)

## Contributions

Thanks to dear [Engin Demiroğ](https://github.com/engindemirog) for his contributions.

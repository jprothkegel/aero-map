# Aero Map

## Stack

---

For the front end of this test I used:
 - React
 - Leaflet and React Leaflet
 - Leaflet Geosearch
 - Zustand
 - Cypress

For the back end of this test I used:
 - Express
 - Typescript
 - Jest

## How to run the app
> Note: This test was made using yarn, but it is possible to use npm as well

---

 - First of all is important to all the dependencies in both front and back:
   1. Go to the root folder and run `yarn install`
   2. Then do `cd api` and `yarn install`
 - It's important to create a build from the back before running the application, so the following is necessary:
   - `cd api`, or be in the api folder and run `yarn build`
 - To run both applications simultaneously, is needed to run the following command on the root folder
   - `yarn start:dev`

## How to run the tests

---

### Front
- To run the tests in the front run the following command:
    - `yarn cypress:open`
      This will open a Chrome Browser where you can run all the tests.

### Back
- To run the tests in the back run the following commands:
    - `cd api`
    - `yarn test`

## Juan Pablo Rothkegel Ide


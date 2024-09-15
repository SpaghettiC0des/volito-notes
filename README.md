# Volito Notes

<!--toc:start-->

- [Volito Notes](#volito-notes)
  - [Running with Expo GO (Recommended)](#running-with-expo-go-recommended)
  - [Running locally](#running-locally)
  - [Folder Structure](#folder-structure)
  - [Known bugs](#known-bugs)
  <!--toc:end-->

## Running with Expo GO (Recommended)

1. Download the Expo GO app
2. Open the app and scan the QR code below.

![QR Code](https://qr.expo.dev/eas-update?slug=exp&projectId=e8e67eaf-718b-45c7-be24-0bce85d334d4&groupId=ebbf5913-f408-4f71-bb95-9932c1c8228b)

## Running locally

1. Download the Expo GO app
1. Run `yarn set version stable`
1. Run `yarn install`
1. Run `yarn start` in the terminal.
1. Open the Expo Go app and scan the QR code.

## Folder Structure

- app - this contains the app's navigators using expo-router
- assets - this contains the app's assets like images, fonts, etc
- constants - anything that is constant in the app like colors, fonts, etc
- features - this contains the app's features. I used this feature based structure to make the app more scalable and maintainable. Allowing multiple developers to work on different features without conflicts.
- providers - this contains the app's providers like theme provider, etc
- shared - anything that is shared across the app like components, hooks, etc

## Known bugs

1. When updating a note with a geolocation data. Saving it will overwrite the previous geolocation data with the current location. This is a bug because the user might want to update the note without updating the geolocation data. In the future, there should be an extra form control to only update he note without affecting the coordinates.
1. No visual indicators when saving a note, only disabling the `save` button, but remains on the red bg.

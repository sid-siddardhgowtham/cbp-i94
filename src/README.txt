CBP I-94 Frontend Demo — I-94 and Travel History editing flow

Flow
1. The site opens with the Need Help choices over a blurred I-94 page.
2. Choose Edit I-94/I-95 and enter the admission and traveler details. There are no prefilled sample values.
3. Save the I-94 form. The app opens Edit Travel History.
4. Enter Document Number, Document Country of Issuance, and 1–5 travel-history rows.
   Each row has DATE, TYPE (Arrival/Departure), and LOCATION. Add Row and Remove controls are available.
5. Save Travel History. The app stores both forms in this browser's localStorage and opens the Terms of Service screen.
6. Agree and Continue to open the View Travel History search page.
7. The View Travel History search page can display the saved travel-history result. The Get Most Recent I-94/I-95 tab can display the saved I-94 result.
8. I-94 result values are displayed normally with no red strike-through.

Local storage keys
- cbp-user-i94-record-v2
- cbp-user-travel-history-v1

Run
Replace the matching files in your Vite project's src folder, then run:
  npm install
  npm run dev

Note
This is a frontend demonstration. It stores entered values in the current browser only. It does not connect to, retrieve records from, or submit information to U.S. Customs and Border Protection or any government system. Do not enter real passport or immigration details into a public demo.


Latest UI refinements
- The yellow vertical Need Help tab is visible by default and opens the two edit choices when clicked.
- The help choices include an X close control.
- Clicking the top navigation tab "Get Most Recent I-94/I-95" opens Terms of Service; after agreement, the recent I-94 search form is shown.
- Terms backdrop uses a uniform dim/blur overlay.
- Edit I-94 Arrival/Issued Date and Travel History DATE use the same custom calendar control as the main page.


Navigation fix (v7)
- From I-94 results, both "View Travel History" and "Get Traveler History" open the Travel History Terms of Service first.
- From Travel History results, "Get Most Recent I-94/I-95" opens the I-94 Terms of Service first.
- The corresponding top navigation tabs on both result pages use the same Terms-first navigation.
- After agreement, the matching search page opens. Existing edit forms, saved browser data, result layouts, and terms styling are unchanged.

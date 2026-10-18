# TindaKita

Family store app for beverage sales. It works on phones, tablets, laptops, and desktops, and it can be installed like an app. Data is saved in your own Google Sheet.

## What is in this folder

Upload these to the root of your GitHub repository:

1. index.html (the whole app)
2. manifest.json (makes it installable)
3. sw.js (lets it open like an app, even on weak signal)
4. icon-192.png, icon-512.png, icon-maskable-512.png, icon-180.png (app icons)
5. The whole lib folder (lib/pdf.min.js and lib/pdf.worker.min.js, the PDF reader for GCash statements)

Keep these on your computer or paste them into Google (they do not go to GitHub):

6. apps-script/Code.gs (the server code, goes into Google Apps Script)
7. apps-script/appsscript.json (optional settings for Apps Script)

## Part 1. Google Sheet and Apps Script (the server)

1. Open Google Sheets with your own Google account and create a blank sheet. Name it "TindaKita Store".
2. Click Extensions, then Apps Script.
3. Delete everything in Code.gs, paste the whole content of apps-script/Code.gs, and click Save.
4. In the function list at the top, choose setup, then click Run. Google asks for permission. Click Review permissions, choose your account, then Advanced, then Go to the project, then Allow. The app needs Sheets (to save data) and Drive (to save drink photos).
5. When the run finishes, look at the Sheet tabs. You should now see Accounts, Items, Sales, SalesLog, Logins, and Settings. The Gcash, GcashLog, and Imports tabs appear the first time a GCash transaction is saved.
6. Click Deploy, then New deployment. Click the gear beside Select type and choose Web app.
7. Set Execute as to Me and Who has access to Anyone. Click Deploy.
8. Copy the Web app URL. It ends with /exec. You need it in Part 2.

After you change Code.gs later: Deploy, Manage deployments, click the pencil, choose New version, then Deploy. The URL stays the same.

## Part 2. GitHub (the app people open)

1. The Web app URL is already inside index.html. You do not need to paste anything. If you ever create a new deployment with a different URL, change the API_URL line near the top of the script.
2. On GitHub, click New repository. Name it TindaKita and make it Public.
3. Click Add file, then Upload files. Upload the files listed under "Upload these" above, then click Commit changes.
4. Go to Settings, then Pages. Under Build and deployment choose Deploy from a branch, pick main and / (root), then Save.
5. Wait a minute or two. Your app link is https://YOUR-GITHUB-NAME.github.io/TindaKita/

Send that link to Yda and Mamang Judy. They do not need a Google account.

## Part 3. Install it as an app

Android (Chrome): open the link, tap the menu, then Install app. Or tap the Install button inside the app.

iPhone and iPad (Safari): open the link, tap the Share button, then Add to Home Screen.

Windows or Mac (Chrome or Edge): open the link and click the install icon at the right end of the address bar.

Tablets follow the same steps as phones.

## First login

Everyone starts with PIN 102026. After the first correct login the app asks for a new PIN of 4 to 6 digits. The default PIN cannot be reused.

1. Mark is the Admin.
2. Yda is the User.
3. Mamang Judy is the Viewer.

## What each role can do

Admin: everything a User and Viewer can do, plus the Admin tab. There you can see every PIN, reset a PIN back to 102026, add or remove accounts, change roles, choose who shares the income, see every edit and void, see the login history, and set the capital.

User: add and edit drinks with photos, record sales, edit or void the sales they recorded, and see the shares.

Viewer: see the drinks, prices, sales, and their own share. A Viewer cannot record or change anything.

## How sale edits are protected

1. When a sale is recorded, its original quantity, amount, cost, profit, and shares are saved and never overwritten.
2. A User can edit the quantity and the amount of a sale, but must write a reason.
3. The edit is stamped with the time from the server (Manila time) and the name of the person. The phone or computer clock cannot change it.
4. Everyone can tap the sale to see the original entry next to the new one, with each reason.
5. A voided sale stays on record. It only stops counting in the totals and shares.
6. The admin sees every edit and void in Admin, then Edits. The same history is in the SalesLog tab of the Sheet.
7. A User can only change sales they recorded. The Admin can change any sale.

## GCash cash in and cash out

1. Open the GCash tab and tap Add. Choose Cash in (the customer gives cash, you send GCash) or Cash out (the customer gets cash, you receive GCash). Type the amount. The fee is filled in from the rate card and counts as your income.
2. If you charge a different fee, tap Change and write the reason. Amounts above the rate card (over 10,000) need a fee typed in by hand.
3. The fee income of GCash is added to the drinks profit and split equally among the partners. Home and Profile show the combined share.
4. Edit and void work like sales: a reason is required, the time and name are stamped, and the original stays visible.
5. Admin, Settings has two rate tables: the GCash rate card and the Load charge matrix. Each line has three boxes: starting amount, end amount and charge. The table is locked. Tap Edit to change it, Add another range for more lines, then Save. When saved it locks again and the app reads it automatically. Check every line against your printed card.
6. The Load table shows the total the customer pays for each range (for example 1 to 50 costs 6 to 55). For amounts above the last range, the app adds the extra charge for every step (default: 5 for every 50).

## Working without internet

1. The app opens at once from the copy saved on the phone, so it does not wait for the internet when a customer is waiting.
2. The top of the screen always shows the date, the time, and whether the phone is Online or Offline, with the last sync time. Screenshots show the time too.
3. Without internet you can still record sales, GCash, load, top ups, and purchases. They are saved on the phone, listed as waiting to send, and sent by themselves when the signal returns. The time you entered is kept, and the server also stamps when it received the entry.
4. Edits and voids need internet.

## Top ups and where the money came from

Every top up asks: Where did this money come from?
- Capital: money from the starting capital. The capital left goes down.
- Drawer cash: cash already in the store drawer from customers. Use this when you top up again at 7-Eleven, M Lhuillier or any outlet. The capital does not change. The cash that should be in the drawer goes down.
- My own money: your personal money. Neither the capital nor the drawer changes.
The Load wallet works the same way as the GCash wallet. Load is not bought from the GCash wallet, so GCash statement lines named Buy Load are skipped. If you add more capital later, choose Capital when you top up.
The first top up is set to Capital and later ones to Drawer cash, but you can tap another choice. Top ups found from texts or statements are set to Drawer cash. Open any top up in the Money tab to change its source. The Money tab shows the total for each source.

## Changing the rates (Mark and Yda)

Mark changes the GCash and Load tables in Admin, Settings. Yda changes the same tables in her Profile. Each change is saved with the name and time. It counts only for new entries from that moment. Entries already recorded keep their old fee and their old split, and if one of them is edited later it still uses the rates that were in force when it was recorded.

## Recording from messages

A phone does not let a website read messages or notifications, so there is no permission to switch on. Use one of these:
- Share: install TindaKita on an Android phone. Open the GCash or Maribank message, tap Share, then choose TindaKita.
- Paste: in the GCash tab tap Paste message, paste the text and tap Read this message.
- Automatic: Mark sets up a free forwarder app using the steps in Admin, Settings.
A short pop up explains this the first time someone opens the app on a phone. Choose Do not show again to hide it.

## Logo

The logo has no box behind it now. Replace icon-192.png, icon-512.png, icon-180.png, icon-maskable-512.png, favicon.svg and manifest.json in GitHub. Installed copies of the app may keep the old icon until the app is removed from the phone and installed again.

## Home money tiles

Home shows Capital left, Total income and Cash in the drawer. Total income is the drink profit plus the GCash and Load fees. Capital left goes down when you buy drinks or top up GCash or Load, and goes up when drinks are sold. Cash in the drawer is Capital left plus Total income.

## The Sales page

The Sales page has three tabs: Drinks, GCash and Load. Drinks shows the drink sales. GCash and Load show every transaction of that kind for the month, with the amount handled, the number of entries and the fee income. Tap a row to open it.

## Instant and live

When you save a sale, GCash, load, top up or purchase, it shows in the lists and in every total at once. A small Sending tag shows until the server confirms. Every few seconds each phone does a very small check, and if someone else saved something it refreshes by itself. The Home page shows Capital left, Cash in the drawer, the GCash wallet and the Load wallet, and the profit cards show the income (drink profit plus GCash and Load fees).

## If entries or fees do not show

The wallet and capital numbers come from every saved row, while the lists and the profit cards show the months you are viewing. The app now works out each row's month from its saved time, so a row cannot be hidden if Google Sheets changes the month cell. The first time the new Code.gs runs it also puts the month column back to plain text. After updating, open the app twice.

## Reference numbers

Every GCash cash in, cash out and Load sale needs a reference number. Type it, or copy it from the GCash or load receipt and tap Paste. A reference number can only be used once. When a statement is checked, rows are matched by reference number first, and if the amount differs the row is shown as Different amount so it can be corrected.

## Photos of Mark, Yda and Mamang Judy

Make a folder named photos in your GitHub repository (Add file, Create new file, type photos/ in the name). Upload three pictures there with exactly these names: mark.jpg, yda.jpg and mamang-judy.jpg. They show on the login screen, Home and Profile automatically. A person can still change their own photo in Profile, and that photo is used instead. Use square pictures if you can.

## Printing reports

Tap Print report on Home or Sales. It prints the month you are viewing: totals, each person's share, drinks sold, GCash and Load lines, and the money now. On a phone choose Save as PDF or your printer.

## Who shares what

Drinks profit is split evenly. When it cannot split evenly to the centavo, the extra centavos go to Yda so her share is the highest.



Drinks profit is split among the people marked Shares drinks (Mark, Yda, Mamang Judy). GCash and Load fee income is split among the people marked Shares GCash and Load (Mark and Yda). Admin, Accounts has both tick boxes for every person. A change only affects entries recorded after it.

## Reading GCash and bank texts

A web page cannot read text messages, so a small free app on the phone forwards them. Admin, Settings, Read GCash and bank texts shows the secret key, the link to use, and the Android and iPhone steps. Each text is read for the amount, the reference number, and whether money came in or went out. Cash in, cash out, and top ups are added by themselves when Add automatically is ticked, or wait for a tap under New messages in the GCash tab. A text that matches an entry already typed in is linked to it instead of being added twice. Check the first few days to make sure your texts are read correctly.

## Money, wallets, and load

1. Money tab: shows the capital, what was spent on drinks and other things, what was put into the GCash and Load wallets, and the capital left. Everything updates by itself.
2. GCash and Load each have a wallet. Cash in lowers the GCash wallet, cash out raises it, and each load sale lowers the Load wallet. A cash in or load sale is refused when the wallet does not have enough, so add a top up first.
3. Top up GCash or Load from the Money tab or the wallet card in the GCash tab. A top up counts as money used from the capital. A top up that was already spent cannot be voided.
4. Record drink purchases in Money, Bought. The cost comes from the cost you set for the drink and can be changed. Stock on hand is bought bottles minus sold bottles. Other expenses such as ice or bags can be recorded too.
5. Load fee: for every 50 of load amount the fee is 5 (1 to 50 is 5, 51 to 100 is 10, and so on, matching the charge matrix). Admin, Settings can change the step and the fee.
6. The expected cash in the drawer is the capital left, plus drink sales, plus cash in with fees, minus cash given for cash out, plus load sales with fees. It is before profit payouts.

## Checking with the GCash statement

1. In the GCash app, download the transaction history as PDF (or take a clear screenshot of it).
2. In the GCash tab tap Upload statement and choose the file. If the PDF has a password, type it. It is only used on the phone or computer to open the file.
3. Review the rows. The app guesses which are Cash in, Cash out, or Skip (load, bills, bank cash in). Change any that are wrong.
4. The app compares with what was typed in. It shows what is missing in the app, amounts that differ, and entries that are not on the statement.
5. Tap Apply. Missing rows are added with the statement time, wrong amounts are corrected and stamped, and reference numbers are saved so the same transaction is never added twice. The original entry stays visible. The statement file is saved in a Drive folder called TindaKita Statements.
6. Pictures are read with an online text reader and are less exact than PDFs. Always check the review screen.

## Keep it safe

1. Keep the Google Sheet private. Do not share it with anyone but yourself. PINs are saved in the Accounts tab so the Admin can reset them, and the SalesLog tab is the proof of every edit.
2. Do not edit the Sales, SalesLog, or Logins tabs by hand.
3. Drink photos are saved in a Drive folder called TindaKita Photos. They are set to anyone with the link can view so they can show in the app.
4. After 8 wrong PIN tries the account is locked for 10 minutes.
5. Each login lasts 30 days on a device. Resetting a PIN logs that person out everywhere.

## Troubleshooting

The app says it cannot reach the server: check that the URL in index.html ends with /exec and that the deployment has Who has access set to Anyone.

You changed Code.gs but nothing changed: make a New version under Manage deployments.

The Install button does not show: it only shows on https links such as your github.io link. On iPhone use Share, then Add to Home Screen.

A photo shows a bottle icon: the Drive photo is still loading, or Drive sharing was blocked by a school or work account. Use a personal Google account.

The app looks old after an update: close and open it again. If you replaced the icons, change the number in CACHE inside sw.js (for example from v2 to v3).

## Coming later

Stock counts and Load selling can be added as new tabs in the same app and Sheet.

## Moving money between GCash and Load

For emergencies, money can be moved from the GCash wallet to the Load wallet, or from the Load wallet to GCash.

- Open the GCash or Load tab and tap Move money on the wallet card, or open the Money tab and tap Move GCash to Load or Move Load to GCash.
- Choose the direction, type the amount, and add a short reason if you like. The screen shows both wallets before and after.
- You cannot move more than the source wallet has.
- The capital left, the cash in the drawer, and the income do not change, because the money only moves between the two wallets.
- The Money tab shows the total moved each way and a history. Tap a move to see it. The person who made it, or the admin, can void it with a reason. A move cannot be voided if the money was already used.

## Screenshot upload (GCash and Load)

Yda and Mark can add transactions from screenshots. There is one upload button in the GCash tab and one in the Load tab, because the GCash app and the Maribank app show different receipts. The button for the tab you are in decides which list the entries go to.

1. Tap Upload GCash screenshots (or Upload Load screenshots). Choose one photo or many.
2. The app reads each photo: amount, reference number, name, contact number, and date and time. Anything it cannot read is left blank or marked, and the amount must be filled in before the entry can be added.
3. The fee is set automatically from the rate tables that applied on that date. Edit it if it is different.
4. A summary shows every photo with its details. Tap Edit on any line to fix a detail, or Remove to leave it out. Nothing is added until you tap Add.
5. Each added entry keeps its photo. A small photo icon shows on the row, and tapping it shows the picture. The entry also shows a Screenshot label.

Reading photos needs the internet the first time, because the reader loads from the web. Photos are saved in a Google Drive folder called TindaKita Receipts.

### Duplicates

- Same reference number and same amount in the same tab (already recorded, or twice in the same upload): only one is kept. The other is shown as already recorded and skipped.
- Same reference number but a different amount: the entry is highlighted. Choose Keep both or Delete this one. Adding is blocked until you choose.
- Same reference number already in the other tab (a GCash photo uploaded in Load, or the other way round): the entry is highlighted with the details of the first one. Choose Continue to add it here too, or Review to hold it back and not add it yet.
- The server checks again when you tap Add, so a duplicate cannot slip in even if two people upload at the same time.


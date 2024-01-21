<img width="100" alt="Logo Rounded" src="https://github.com/gitnasr/WhatsApp-Sticker-Maker-Bot/assets/42423651/a00fbd99-18c7-4c25-887f-68fd95bc30a2">

# WhatsApp Sticker Maker Bot

WhatsApp Sticker Maker Bot is a Node.js application designed to receive input from users on WhatsApp, process it, and send it back as a sticker. The project utilizes two major components: the WhatsApp JS Library for WhatsApp interaction and the Telegram API for enhanced functionality.

## How It Works

The implementation of the WhatsApp Sticker Maker Bot is straightforward:

1. **Registration and Connection:**
   - The bot owner registers a phone number on WhatsApp for the bot.
   - WhatsApp JS Library uses web scraping. Upon uploading the app to a server, the QR code needs to be accessed. Since the QR code is dynamic and cannot be relied upon for direct download, the Telegram API is used to connect it to a Telegram bot. The bot owner can then scan the QR code from their phone to establish a connection with the project's number.

2. **Receiving and Processing Images:**
   - The bot seamlessly receives images from users via the WhatsApp JS Library.
   - The received images are processed and sent back as stickers without complications.

3. **Handling Challenges:**
   - To address potential challenges, such as crashes or downtimes caused by the WhatsApp JS Library (which uses Chrome Driver), the project incorporates a mechanism to check and partially rerun itself autonomously. The Telegram Bot is then updated with the current state.

4. **User Management:**
   - The bot actively blocks users engaged in spamming activities.

## Project Status

Please note that the bot is currently not operational due to financial constraints. The project requires a stable, paid server. If you wish to support the project, feel free to contact the developer.

## Technical Details

The WhatsApp Sticker Maker Bot is built using the following technologies:

- Node.js
- Next.js for the simple web page
- PM2 for server monitoring and management
- Telegram API
- Agenda.js for scheduling tasks

## Contact

For any inquiries or if you wish to contribute to the project, please contact Me at [gitnasr@proton.me](mailto:gitnasr@proton.me).

## ⚠️ Disclaimer

This repository and its associated code, including the WhatsApp Sticker Maker Bot, are provided as a showcase of the developer's work. The developer, M.Nasr, is not responsible for any misuse or abuse of the bot.

Users are advised to be cautious and use advanced techniques to avoid violating WhatsApp's policies. The developer is not liable for any consequences, including potential blocking of WhatsApp accounts.

The source code is intended for educational and demonstration purposes only. It is strongly discouraged to use this bot's source code without taking precautions and employing advanced methods to bypass WhatsApp systems.

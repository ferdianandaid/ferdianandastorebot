/*
  * Created by Christian ID
  * Base Ori : rtwone / Irfan
  * Buy Sc No Enc Chat https://wa.me/6285921165857
*/

"use strict";
const {
	default: makeWASocket,
	BufferJSON,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
        makeInMemoryStore,
	useSingleFileAuthState,
	delay
} = require("@adiwajshing/baileys")
const figlet = require("figlet");
const fs = require("fs");
const moment = require('moment')
const chalk = require('chalk')
const logg = require('pino')
const clui = require('clui')
const { Spinner } = clui
const { serialize, getBuffer } = require("./lib/myfunc");
const { color, mylog, infolog } = require("./lib/color");
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
let setting = JSON.parse(fs.readFileSync('./config.json'));
let session = `./${setting.sessionName}.json`
const { state, saveState } = useSingleFileAuthState(session)
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));

function title() {
	  console.log(chalk.bold.blue(figlet.textSync(`${setting.botName}`, {
		font: 'Standard',
		horizontalLayout: 'default',
		verticalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	})))
	console.log(chalk.yellow(`\n ${chalk.green('[ Created By Ferdi Ananda ]')}\n\n${chalk.yellow('[ Thanks To ]')}\n${chalk.yellow('• Allah S.W.T')}\n${chalk.yellow('• Christian ID')}\n${chalk.yellow('• -')}\n${chalk.yellow('• -')}\n${chalk.yellow(`• ${setting.ownerName}`)}\n`))
}

function randomNomor(min, max = null) {
		  if (max !== null) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		  } else {
			return Math.floor(Math.random() * min) + 1
		  }
		}
		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}

/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
	console.log(`Module ${module} sedang diperhatikan terhadap perubahan`) 
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}
/**
* Uncache a module
* @param {string} module Module name or path;
*/
function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}

const status = new Spinner(chalk.cyan(` Booting WhatsApp Bot`))
const starting = new Spinner(chalk.cyan(` Preparing After Connect`))
const reconnect = new Spinner(chalk.redBright(` Reconnecting WhatsApp Bot`))

const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })

const connectToWhatsApp = async () => {
	const conn = makeWASocket({
            printQRInTerminal: true,
            logger: logg({ level: 'fatal' }),
            auth: state,
            browser: [`${setting.botName}`, "Safari", "3.0"]
        })
	title()
        store.bind(conn.ev)
	
	/* Auto Update */
	require('./message/help')
	require('./lib/myfunc')
	require('./message/msg')
	nocache('./message/help', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./lib/myfunc', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./message/msg', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	
	conn.multi = true
	conn.nopref = false
	conn.prefa = 'anjing'
	conn.ev.on('messages.upsert', async m => {
		if (!m.messages) return;
		var msg = m.messages[0]
		msg = serialize(conn, msg)
		msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
		require('./message/msg')(conn, msg, m, setting, store, welcome)
	})
	conn.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			status.stop()
			reconnect.stop()
			starting.stop()
			console.log(mylog('Server Ready ✓'))
			lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut 
			? connectToWhatsApp()
			: console.log(mylog('Wa web terlogout...'))
		}
	})
	conn.ev.on('creds.update', () => saveState)
	
        conn.ev.on('group-participants.update', async (data) => {
          const isWelcome = welcome.includes(data.id) ? true : false
          if (isWelcome) {
            try {
            	let metadata = await conn.groupMetadata(data.id)
	  for (let i of data.participants) {
		try {
		  var pp_user = await conn.profilePictureUrl(i, 'image')
		} catch {
                  var pp_user = 'https://i.ibb.co/YZdzhGt/522cd54e9767.jpg'
                }
                try {
    var ppgc = await conn.profilePictureUrl(data.id, 'image')
    } catch {
    var ppgc = 'https://i.ibb.co/YZdzhGt/522cd54e9767.jpg'
    }
                var kode = randomNomor(200, 300)
                var bg = ["https://bit.ly/walpamikel","https://i.ibb.co/D5NSCgf/ff07020871c1.jpg","https://i.ibb.co/sCTMJ1B/53c1c23ac65e.jpg","https://i.ibb.co/wRF0p7x/27084fd0064e.jpg","https://i.ibb.co/7R5vRBL/a63d167d6f3f.jpg","https://i.ibb.co/4YBNyvP/images-76.jpg"]
                if (data.action == "add") {
                	/*var buff = await getBuffer(`https://hadi-api.herokuapp.com/api/card/Welcome?nama=${i.split("@")[0]}&descriminator=${kode}&memcount=${metadata.participants.length}&gcname=${metadata.subject}&pp=${pp_user}&bg=${pickRandom(bg)}`)
                    var cpt = `Hallo @${i.split("@")[0]} 👋\nSelamat Datang Di Group *${metadata.subject}*`*/
                    var welnya = [{buttonId: `#`, buttonText: { displayText: "WELCOME" }, type: 1 }]
                  conn.sendMessage(data.id, { image: {url: pp_user}, caption: `Hallo @${i.split("@")[0]} 👋\nSelamat Datang Di Group *${metadata.subject}*\n\n*Deskripsi :* ${metadata.desc}`, buttons: welnya, footer: `© Welcome Message By ${setting.ownerName}`, mentions: [i] })
                  /*conn.sendMessage(data.id, {caption: cpt, image: buff, mentions: [i]})*/
                } else if (data.action == "remove") {
                	/*var img = await getBuffer(`https://api.lolhuman.xyz/api/welcomeimage?apikey=HitomiBot&img=${pp_user}&text=Selamat Datang Di Group ${metadata.subject}`)
                    var capt = `Good Bye @${i.split("@")[0]} 👋\nMeninggalkan Group *${metadata.subject}*`*/
                    var leavenya = [{buttonId: `#`, buttonText: { displayText: "GOODBYE" }, type: 1 }]
                  conn.sendMessage(data.id, { image: {url: pp_user}, caption: `Good Bye @${i.split("@")[0]} 👋\nMeninggalkan Group *${metadata.subject}*`, buttons: leavenya, footer: `© Leave Message By ${setting.ownerName}`, mentions: [i] })
                  /*conn.sendMessage(data.id, {caption: capt, image: img, mentions: [i]})*/
                }
              }
            } catch (e) {
              console.log(e)
            }
          }
        })

	conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })

	return conn
}

connectToWhatsApp()
.catch(err => console.log(err))

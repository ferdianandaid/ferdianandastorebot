/*
  * Created by Christian ID
  * Base Ori : rtwone / Irfan
  * Thanks To :
  - Irfan
  - Christian ID
  - Nc Tech
*/

"use strict";
const {
	downloadContentFromMessage
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('../lib/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("../lib/myfunc");
const { webp2mp4File } = require("../lib/convert")
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('../lib/respon-list');
const { TelegraPh, UploadFileUgu } = require("../lib/uploader")
const { addBanned, unBanned, BannedExpired, cekBannedUser } = require("../lib/banned");
const _sewa = require("../lib/sewa");
const _prem = require("../lib/premium");
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("../lib/game");
const { addLogin, deleteLogin, checkLogins } = require("../lib/login");
const { y2mateA, y2mateV } = require('../lib/y2mate')

const fs = require ("fs");
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const xfar = require('xfarr-api');
const axios = require("axios");
const hxz = require("hxz-api");
const ra = require("ra-api");
const kotz = require("kotz-api");
const yts = require("yt-search");
const speed = require("performance-now");
const request = require("request");
const ms = require("parse-ms");
const imgbb = require("imgbb-uploader");

// Exif
const Exif = require("../lib/exif")
const exif = new Exif()

// Setting
let mode = 'public'
let own2 = '6285155088506@s.whatsapp.net'
let fakenya = '*Bot By Ferdi Ananda*'
let footernya = '*MEGUMIN BOT BY FERDI ANANDA*'
const imgbbapi = "15406aacb1c760c28233e81aa9ec8e6e"
let typemenu = 'button'

// DB Game
let siapaaku = []
let susun = []
let pancing = []

// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./message/response.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let ban = JSON.parse(fs.readFileSync('./database/ban.json'));
let mute = JSON.parse(fs.readFileSync('./database/mute.json'));
let _cmd = JSON.parse(fs.readFileSync('./database/command.json'));
let _cmdUser = JSON.parse(fs.readFileSync('./database/commandUser.json'));
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
const loginnya = JSON.parse(fs.readFileSync('./database/logins.json'))

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async(conn, msg, m, setting, store, welcome) => {
	try {
		let { ownerNumber, ownerName, botName, gamewaktu, limitCount } = setting
		let { allmenu } = require('./help')
		const { type, quotedMsg, mentioned, now, fromMe } = msg
		if (msg.isBaileys) return
		const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/20YY')
		let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const content = JSON.stringify(msg.message)
		const from = msg.key.remoteJid
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
                const toJSON = j => JSON.stringify(j, null,'\t')
		if (conn.multi) {
			var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
		} else {
			if (conn.nopref) {
				prefix = ''
			} else {
				prefix = conn.prefa
			}
		}
		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
		const isCmd = command.startsWith(prefix)
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = ownerNumber == sender ? true : [`${ownerNumber}`, "6282372797559@s.whatsapp.net", `${own2}`].includes(sender) ? true : false
		const pushname = msg.pushName
		const q = chats.slice(command.length + 1, chats.length)
		const body = chats.startsWith(prefix) ? chats : ''
		const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
		const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.id : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender)
		const isUser = pendaftar.includes(sender)
		const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
        const isWelcome = isGroup ? welcome.includes(from) ? true : false : false
        const isAntiLink = isGroup ? antilink.includes(from) : false
        const isMuted = isGroup ? mute.includes(from) : false
        const isBan = cekBannedUser(sender, ban)
        const isSewa = _sewa.checkSewaGroup(from, sewa)
		const pp_bot = fs.readFileSync(setting.pathimg)
		const gcounti = setting.gcount
		const gcount = isPremium ? gcounti.prem : gcounti.user
		
        const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: `6283136505591-1614953337@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': `${pushname}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': pp_bot, thumbnail: pp_bot,sendEphemeral: true}}}
        const fimage = {key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) },message: { "imageMessage": { "title":`${ownerName}`, "h": `Hmm`,'seconds': '359996400', 'caption': `*${ucapanWaktu} ${pushname} 👋*\n© ${fakenya}`, 'jpegThumbnail': pp_bot}}}
		const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
                const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
                const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
                mention != undefined ? mention.push(mentionByReply) : []
                const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
		const sendStickerFromUrl = async (to, url) => {
      var names = Date.now() / 10000;
      var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, chats) {
          request(uri)
            .pipe(fs.createWriteStream(filename))
            .on("close", callback);
        });
      };
      download(url, "./stik" + names + ".png", async function () {
        console.log("selesai");
        let filess = "./stik" + names + ".png";
        let asw = "./stik" + names + ".webp";
        exec(
          `ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`,
          (err) => {
            let media = fs.readFileSync(asw);
            conn.sendMessage(to, {sticker: fs.readFileSync(media)}, {quoted: msg})
            fs.unlinkSync(filess);
            fs.unlinkSync(asw);
          }
        );
      });
    };
		
		async function downloadAndSaveMediaMessage (type_file, path_file) {
			if (type_file === 'image') {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'video') {
				var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'sticker') {
				var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'audio') {
				var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			}
		}
		const sendFileFromUrl = async (from, url, caption, options = {}) => {
		    let mime = '';
		    let res = await axios.head(url)
		    mime = res.headerd["content-type"]
		    let type = mime.split("/")[0]+"Message"
		    if (mime.split("/")[0] === "image") {
		       var img = await getBuffer(url)
		       return conn.sendMessage(from, { image: img, caption: caption }, options)
		    } else if (mime.split("/")[0] === "video") {
		       var vid = await getBuffer(url)
		       return conn.sendMessage(from, { video: vid, caption: caption }, options)
		    } else if (mime.split("/")[0] === "audio") {
		       var aud = await getBuffer(url)
		       return conn.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
		    } else {
		       var doc = await getBuffer(url)
		       return conn.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
		    }
		}
        async function sendPlay(from, query) {
           var url = await yts(query)
           url = url.videos[0].url
           hxz.youtube(url).then(async(data) => {
             var button = [{ buttonId: `!ytmp3 ${url}`, buttonText: { displayText: `🎵 Audio (${data.size_mp3})` }, type: 1 }, { buttonId: `!ytmp4 ${url}`, buttonText: { displayText: `🎥 Video (${data.size})` }, type: 1 }]
             conn.sendMessage(from, { caption: `*Title :* ${data.title}\n*Quality :* ${data.quality}\n*Url :* https://youtu.be/${data.id}`, image: {url: data.thumb}, buttons: button, footer: 'Pilih Salah Satu Button Dibawah⬇️', mentions: [sender] }, { quoted: fimage })
           }).catch((e) => {
             conn.sendMessage(from, { text: mess.error.api }, { quoted: msg })
               ownerNumber.map( i => conn.sendMessage(from, { text: `Send Play Error : ${e}` }))
           })
        }
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
		}
		function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
		function monospace(string) {
            return '```' + string + '```'
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
		function mentions(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = conn.sendMessage(from, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
		      return res
 		    }
		}
		const reply = (teks) => {
			conn.sendMessage(from, { text: teks }, { quoted: msg })
		}
		const textImg = (teks) => {
			return conn.sendMessage(from, { text: teks, jpegThumbnail: pp_bot }, { quoted: msg })
		}
		const sendMess = (hehe, teks) => {
			conn.sendMessage(hehe, { text, teks })
		}
		const buttonWithText = (from, text, footer, buttons) => {
			return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
		}
		const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
		}
		
		const buttonsDefault = [
		    { urlButton: { displayText: `${setting.buttonName}`, url : `${setting.buttonLink}` } },
		    { urlButton: { displayText: `${setting.buttonName2}`, url : `${setting.buttonLink2}` } },
			{ quickReplyButton: { displayText: `Owner 🤵', id: `${prefix}owner` } },
			{ quickReplyButton: { displayText: `Runtime ⚡`, id: `${prefix}runtime` } }
		]
		const buttonsDefa = [{buttonId: `${prefix}owner`, buttonText: { displayText: `Owner 🤵` }, type: 2 }, {buttonId: `${prefix}runtime`, buttonText: { displayText: `Runtime ⚡` }, type: 2 }, {buttonId: `${prefix}donasi`, buttonText: { displayText: "Donasi 💸" }, type: 2 }]
        
        const login = [{buttonId: `${prefix}login`, buttonText: { displayText: "LOGIN" }, type: 1 }]
        
		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

        // Functions
if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
    var get_data_respon = getDataResponList(from, chats, db_respon_list)
    if (get_data_respon.isImage === false) {
        conn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
            quoted: fimage
        })
    } else {
       conn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
            quoted: fimage
        })
    }
}

        // Mode
        if (mode === 'self'){
            if (!fromMe) return
        }
        
        // Mute
        if (isMuted){
            if (!isGroupAdmins && !isOwner) return
            if (chats.toLowerCase().startsWith(prefix+'unmute')){
                let anu = mute.indexOf(from)
                mute.splice(anu, 1)
                fs.writeFileSync('./database/mute.json', JSON.stringify(mute))
                reply(`Bot telah diunmute di group ini`)
            }
        }

        // Banned
        if (isBan) return
        BannedExpired(ban)
        
        // Login 
				for (var i = 0; i < loginnya.length ; i++) {
				}
        
        // Sewa
             _sewa.expiredCheck(conn, sewa)
             
        // Premium
		_prem.expiredCheck(conn, premium)

		// Auto Read & Presence Online
        conn.readMessages([msg.key])
		conn.sendPresenceUpdate('available', from)
		
		// Auto Registrasi
		if (isCmd && !isUser) {
		  pendaftar.push(sender)
		  fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
		}
		// Anti link
        if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (chats.includes(`https://chat.whatsapp.com`)) {
                reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                let number = sender
      conn.groupParticipantsUpdate(from, [number], "remove")
            }
        }
        //dashboard
        async function addCountCmdUser(nama, sender, u) {
         var posi = null
         var pos = null
         Object.keys(u).forEach((i) => {
            if (u[i].jid === sender) {
               posi = i
            }
          })
         if (posi === null) {
            u.push({jid: sender, db: [{nama: nama, count: 0}]})
            fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
          Object.keys(u).forEach((i) => {
             if (u[i].jid === sender) {
               posi = i
             }
          })
         }
         if (posi !== null) {
         Object.keys(u[posi].db).forEach((i) => {
            if (u[posi].db[i].nama === nama) {
               pos = i
            }
          })
         if (pos === null) {
           u[posi].db.push({nama: nama, count: 1})
           fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
          } else {
           u[posi].db[pos].count += 1
           fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
          }
         }
        }

        async function getPosiCmdUser(sender, _db) {
         var posi = null
         Object.keys(_db).forEach((i) => {
          if (_db[i].jid === sender) {
             posi = i
          }
         })
          return posi
        }
        async function addCountCmd(nama, sender, _db) {
         addCountCmdUser(nama, sender, _cmdUser)
          var posi = null
            Object.keys(_db).forEach((i) => {
               if (_db[i].nama === nama) {
                 posi = i
               }
            })
            if (posi === null) {
              _db.push({nama: nama, count: 1})
              fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2));
            } else {
            _db[posi].count += 1
            fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2));
          }
        }
        
        // Game
		cekWaktuGame(conn, susun)
		if (isPlayGame(from, susun) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, susun)) {
		    var htgm = randomNomor(50, 250)
			addBalance(sender, htgm, balance)
		    var texttg = `*Selamat ${pushname} 🎉 Jawaban Kamu Benar*\n\nJawaban : ${getJawabanGame(from, susun)}\nHadiah : ${htgm} balance\nKode Game : ${makeid(15)}\nIngin bermain lagi? Pencet Tombol Dibawah`
			var kus = [
			{ quickReplyButton: { displayText: `Main Lagi`, id: `${prefix}susunkata` } },
		]
			 conn.sendMessage(from, { text: texttg, templateButtons: kus, footer: 'SUSUN KATA', mentions: [sender]} )  
		    susun.splice(getGamePosi(from, susun), 1)
		  }
		}
		cekWaktuGame(conn, siapaaku)
		if (isPlayGame(from, siapaaku) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, siapaaku)) {
		    var htgm = randomNomor(50, 250)
			addBalance(sender, htgm, balance)
		    var texttg = `*Selamat ${pushname} 🎉 Jawaban Kamu Benar*\n\nJawaban : ${getJawabanGame(from, siapaaku)}\nHadiah : ${htgm} balance\nKode Game : ${makeid(15)}\nIngin bermain lagi? Pencet Tombol Dibawah`
			var kus = [
			{ quickReplyButton: { displayText: `Main Lagi`, id: `${prefix}siapakahaku` } },
		]
			 conn.sendMessage(from, { text: texttg, templateButtons: kus, footer: 'TEBAK AKU', mentions: [sender]} )  
		    siapaaku.splice(getGamePosi(from, siapaaku), 1)
		  }
		}
		
		if (chats.startsWith("> ") && isOwner) {
		console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
		  const ev = (sul) => {
            var sat = JSON.stringify(sul, null, 2)
            var bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return textImg(bang)
          }
          try {
           textImg(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
          } catch (e) {
           textImg(util.format(e))
          }
		} else if (chats.startsWith("$ ") && isOwner) {
        console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
          exec(chats.slice(2), (err, stdout) => {
		    if (err) return reply(`${err}`)
		    if (stdout) reply(`${stdout}`)
		  })
        } else if (chats.startsWith("x ") && isOwner) {
	    console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
		 try {
	       let evaled = await eval(chats.slice(2))
		   if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
			reply(`${evaled}`)
		 } catch (err) {
		   reply(`${err}`)
		 }
		}
		if (sender.startsWith('212') && _0x2f34d9.autoblok === true) {
      return conn.updateBlockStatus(_0x3a495e.sender, 'block')
    }
		
		// Logs;
		if (!isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(50), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(50), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}

		switch(command) {
			case '#': case '!': case '.': case '/':
			var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Menu`
			if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, footer: `© Jangan Lupa Login`, mentions: [sender]}, { quoted: fimage })
			break
			// Main Menu
			/*case prefix+'menu':
			case prefix+'help':
			    var teks = allmenu(sender, prefix, pushname, isOwner)
			    conn.sendMessage(from, { caption: teks, image: {url: `${pickRandom(setting.randommenu)}`}, templateButtons: buttonsDefault, footer: `${setting.footer}`, mentions: [sender] })
				break*/
			case prefix+'runtime':
			    reply(runtime(process.uptime()))
			    break
			case prefix+'speed':
			    let timestamp = speed();
                            let latensi = speed() - timestamp
                            textImg(`${latensi.toFixed(4)} Second`)
		            break
            case prefix+'tes':
            case prefix+'test':
            let timestampnya = speed();
                            let latensinya = speed() - timestampnya
                            reply(`*STATUS BOT ONLINE*\n\n_Speed : ${latensinya.toFixed(4)}_\n_Runtime : ${runtime(process.uptime())}_`)
                            break
            case prefix+'login':
case prefix+'daftar':
case prefix+'sign-in':
if (isGroup) return reply(`Hanya Bisa Di Gunakan Di Private Message!`)
if (checkLogins(sender, loginnya) === true) return reply(`Kamu Sudah Login Hari Ini!\nKembalilah Esok hari!`)
addLogin(pushname, sender, loginnya)
var kodelogin = randomNomor(50, 250)
var seri = makeid(7)
var verif = ["https://bit.ly/walpamikel","https://i.ibb.co/D5NSCgf/ff07020871c1.jpg","https://i.ibb.co/sCTMJ1B/53c1c23ac65e.jpg","https://i.ibb.co/wRF0p7x/27084fd0064e.jpg","https://i.ibb.co/7R5vRBL/a63d167d6f3f.jpg"]
var buttonLogin = [{buttonId: `${prefix}menu`, buttonText: { displayText: `MENU` }, type: 2 }]
try {
    var profile = await conn.profilePictureUrl(`${sender}`, 'image')
    } catch {
    var profile = 'https://i.ibb.co/YZdzhGt/522cd54e9767.jpg'
    }
    var buff = await getBuffer(`http://hadi-api.cf/api/card/verify?nama=${pushname}&member=${kodelogin}&seri=${seri}&pp=${profile}&bg=${pickRandom(verif)}`)
var randomLimit = randomNomor(0, 10)
var rndmLimit = randomNomor(0, 5)
var blnc = randomNomor(100, 500)
addBalance(sender, parseInt(blnc), balance)
giveLimit(sender, parseInt(rndmLimit), limit)
givegame(sender, parseInt(randomLimit), glimit)
mentions(`Mengambil Data @${sender.split("@")[0]}`, [sender])
var cpt = `*「 PENDAFTARAN USER 」*\n\n*Nama :* ${pushname}\n*Nomor :* ${sender.split("@")[0]}\n*Kode Pendaftar :* ${seri}\n*Tag :* @${sender.split("@")[0]}\n\n*「 GIVE LOGIN 」*\n\n*Balance :* $${blnc} Balance\n*Limit :* ${randomLimit}\n*Game Limit :* ${rndmLimit}`
conn.sendMessage(sender, {caption: cpt, image: buff, buttons: buttonLogin, footer: `© ${footernya}`, mentions: [sender]}, {quoted: fimage})
console.log(color('[Verification]', 'yellow'))
break
case prefix+'listuser':
case prefix+'listpengguna':
case prefix+'listlogin':
if (!isOwner)return reply(mess.OnlyOwner)
var teks = `「 *_Pengguna ${botName}_* 」\n\nTotal : *${loginnya.length}*\n\n`
for (let i = 0; i < loginnya.length; i ++){
teks += `*Nama :* ${loginnya[i].nama}\n`
teks += `*Nomer :* ${loginnya[i].nomer.split("@")[0]}\n\n`
}
reply(teks)
break
            case prefix+'delete':
  case prefix+'d':
    case prefix+'del':
    addCountCmd('#delete', sender, _cmd)
  conn.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
  break
			case prefix+'owner':
			    for (let x of ownerNumber) {
			      sendContact(from, x.split('@s.whatsapp.net')[0], `${setting.ownerName}`, msg)
			    }
			    break
            case prefix+'sc':
case prefix+'sourcecode':
var no = '6282373797559'
sendContact(from, no.split('@s.whatsapp.net')[0], 'FERDI ANANDA', msg)
reply(`Jika kamu ingin membeli Script bot ini, silahkan chat ke nomor dibawah\n_wa.me/6282373797559_`)
addCountCmd('#sc', sender, _cmd)
break
            case prefix+'donasi':
            case prefix+'donate':
var teks = `*-------「 DONATE 」 -------*

Hai kak ☺️ 
Kalian bisa mendukung saya agar bot ini tetap up to date dengan cara donasi

Berapapun donasi kalian akan sangat berarti 👍

Thanks!

Contact person Owner:
https://wa.me/${setting.ownerNumber}`
 conn.sendMessage(from, { caption: teks, image: fs.readFileSync('media/qris.jpg') }, { quoted: fimage })
 addCountCmd('#donasi', sender, _cmd)
			    break
case prefix+'tqto':
            case prefix+'thanksto':
var teks = `*-------「 THANKS TO 」 -------*

*- Irfan ( Base )*
*- Christian ID ( Creator )*
*- ${ownerName} ( Owner )*`
 conn.sendMessage(from, { caption: teks, image: pp_bot }, { quoted: fimage })
 addCountCmd('#thanksto', sender, _cmd)
			    break
case prefix+'textchat':
case prefix+'menfess':
  case prefix+'kirim':{
if (isGroup) return reply(`Hanya Bisa Di Gunakan Di Private Message!`)
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
			if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
    if (args.length < 2) return reply(`Kirim perintah ${command} nama|nomer|pesan\nContoh ${command} ${setting.ownerName}|6285921165857|Hai\n\nAWALI DENGAN 62!`)
    var butMen = [{buttonId: `${prefix}balasan ${sender.split("@")[0]}`, buttonText: { displayText: `Konfirmasi Menfess` }, type: 1 }]
    var nama = q.split('|')[0] ? q.split('|')[0] : q
                var number = q.split('|')[1] ? q.split('|')[1] : ''
                var text = q.split('|')[2] ? q.split('|')[2] : ''
                reply(`Berhasil Mengirim Menfess Ke ${number}`)
                                var caption = `*「 Pesan Dari ${nama} 」*\nNama : ${nama}\nNomor : wa.me/${sender.split("@")[0]}\nPesan : *${text}*`
if (isImage || isQuotedImage) {
let media = await downloadAndSaveMediaMessage("image", `${pushname}.jpeg`)
var njay = await imgbb(imgbbapi, media)
conn.sendMessage(`${number}@s.whatsapp.net`, {caption: caption, image: {url: `${njay.display_url}`}, buttons: butMen, footer: `*Ada Menfess Dari ${pushname}*`}, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
} else {
	var nama = q.split('|')[0] ? q.split('|')[0] : q
                var number = q.split('|')[1] ? q.split('|')[1] : ''
                var text = q.split('|')[2] ? q.split('|')[2] : ''
                reply(`Berhasil Mengirim Menfess Ke ${number}`)
                var caption = `*「 Pesan Dari ${nama} 」*\nNama : ${nama}\nNomor : wa.me/${sender.split("@")[0]}\nPesan : *${text}*`
conn.sendMessage(`${number}@s.whatsapp.net`, {caption: caption, image : fs.readFileSync('./media/surat.jpg'), buttons: butMen, footer: `*Ada Menfess Dari ${pushname}*`}, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#menfess', sender, _cmd)
}
}
break
case prefix+'balasan':{
	if (args.length < 2) return reply(`Kirim perintah ${command} ${setting.ownerName}`)
reply(`_Menfess Telah Diterima_`)
var capt = `*_Sudah Di Confirmasi Nih Menfess nyaa_*`
conn.sendMessage(`${q}@s.whatsapp.net`, {text: capt}, {quoted: msg})
}
break
            case prefix+'menu':
			case prefix+'help':
			  case prefix+'m':
			    case prefix+'start':
			var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Menu`
			if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
			addCountCmd('#menu', sender, _cmd)
if (typemenu === 'button') {
	var teks = allmenu(sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount)
			    conn.sendMessage(from, { caption: teks, image : pp_bot, buttons: buttonsDefa, footer: `© ${footernya}`, mentions: [sender]}, { quoted: fimage })
}
if (typemenu === 'buttons5') {
	            var teks = allmenu(sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount)
			    conn.sendMessage(from, { caption: teks, image: pp_bot, templateButtons: buttonsDefault, footer: `${setting.footer}`, mentions: [sender] })
}
if (typemenu === 'text') {
			    var teks = allmenu(sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount)
			    conn.sendMessage(from, {text: teks, mentions: [sender]}, {quoted: fimage})
}
if (typemenu === 'image') {
			    var teks = allmenu(sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount)
			    conn.sendMessage(from, {caption: teks, image: pp_bot, mentions: [sender]}, {quoted: fimage})
}
break
case prefix+'setmenu':
  if (!args[1])return reply(`*Silakan Pilih Typenya*\n\n-button\n-buttons5\n-text\n-image\n\nContoh Penggunaan :\n${prefix}setmenu image`)
  if (!isOwner)return reply(mess.OnlyOwner)
  // Button
  if (args[1] == "button") {
  typemenu = 'button'
  reply(`Sukses Mengubah Menu Menjadi ${q}`)
  }
  // Buttons 5
  else if (args[1] == "buttons5") {
  typemenu = 'buttons5'
  reply(`Sukses Mengubah Menu Menjadi ${q}`)
  }
  // Text Ajah anjing
  if (args[1] == "text") {
  typemenu = 'text'
  reply(`Sukses Mengubah Menu Menjadi ${q}`)
  }
  // Image
  if (args[1] == "image") {
  typemenu = 'image'
  reply(`Sukses Mengubah Menu Menjadi ${q}`)
  }
  break
case prefix+'sewabot':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋

*HARGA SEWA BOT PERBULAN*

*- Sewa Bot 30 Hari(1 Bulan)*
*- Rp ~25.000~ > Rp 20.000*
_*Sudah Termasuk User Premium*_

*HANYA BERLAKU HARI INI SAJA!!!*
*MINAT? HUBUNGI OWNER*`
conn.sendMessage(from, {caption: teks, image: {url: `/media/anime-path.jpg`}, mentions: [sender]}, {quoted: fimage})
break
case prefix+'cekprem':
            case prefix+'cekpremium':
                if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
                if (isOwner) return reply(`Kamu Adalah Owner Bot!`)
                if (_prem.getPremiumExpired(sender, premium) == "PERMANENT") return reply(`PERMANENT`)
                let cekvipp = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                let premiumnyaa = `*Expire :* ${cekvipp.days} day(s) ${cekvipp.hours} hour(s) ${cekvipp.minutes} minute(s) ${cekvipp.seconds} second(s)`
                reply(premiumnyaa)
                addCountCmd('#cekprem', sender, _cmd)
                break
            case prefix+'listprem':
                let txt = `List Prem\nJumlah : ${premium.length}\n\n`
                let men = [];
                for (let i of premium) {
                    men.push(i.id)
                    txt += `*ID :* @${i.id.split("@")[0]}\n`
                  if (i.expired === 'PERMANENT') {
                    let cekvip = 'PERMANENT'
                    txt += `*Expire :* PERMANENT\n\n`
                  } else {
                    let cekvip = ms(i.expired - Date.now())
                    txt += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                  }
                }
                mentions(txt, men, true)
                addCountCmd('#listprem', sender, _cmd)
                break
case prefix+'iklan':
case prefix+'iklanbot':
  var sections = [
    {
	title: `Iklan ${setting.botName}`,
	rows: [
	    {title: `Iklan Bot 1`, rowId: `${prefix}iklan1`, description: `Iklan Bot ${setting.botName} Dari Buyer ${setting.botName}`},
	    {title: `Iklan Bot 2`, rowId: `${prefix}iklan2`, description: `Iklan Bot ${setting.botName} Dari Owner ${setting.botName}`},
	]
    },
]
var listMessage = {
  text: `${ucapanWaktu} @${sender.split("@")[0]} 👋\nSilakan Pilih Iklannya Kak\n\n*📝 Iklan : ${setting.botName}*`,
  footer: `⌚ Jam : ${jam}\n📆 Tanggal : ${tanggal}`,
  mentions: [sender],
  title: `Iklan Bot ${setting.botName}`,
  buttonText: "Click Here!",
  sections
}
conn.sendMessage(from, listMessage, { quoted: fimage })
addCountCmd('#iklanbot', sender, _cmd)
  break
case prefix+'iklan1':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
var but = [{buttonId: `${prefix}mrzxstore`, buttonText: { displayText: "Nomor Penjual" }, type: 1 }]
var capt = `DIAMOND FREEFIRE BY MRZXSTORE
100% LEGAL ,MURAH,DAN AMAN
HANYA MENGUNAKAN NICNAME DAN ID

*STOK✅*
5 Diamond = 1.000
20 Diamond = 2.980
50 Diamond = 7.500
70 Diamond = 9.500
100 Diamond = 13.500
140 Diamond = 18.400
210 Diamond = 27.400
280 Diamond = 35.890
355 Diamond = 44.425
425 Diamond = 53.400
500 Diamond = 62.981
720 Diamond = 89.000

 M.Mingguan  27.500
 M.Bulanan   82.000
 Mm+Mb   107.000

OWNER 
http://Wa.me/6288708224082`
conn.sendMessage(from, { caption: capt, image: {url: `https://i.ibb.co/zhFRHSk/Iklan1.jpg` }, buttons: but, footer: `© *Iklan Bot Dari Mrzx Store*`, mentions: [sender]}, { quoted: fimage })
break
case prefix+'mrzxstore':
var no = '6288708224082'
sendContact(from, no.split('@s.whatsapp.net')[0], 'Mrzx Store', msg)
break
case prefix+'iklan2':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
var but = [{buttonId: `${prefix}owner`, buttonText: { displayText: "Owner" }, type: 1 }]
var capt = `*── 「 SEWABOT 」 ──*

*Harga Sewa*
7 Hari = 5.000
30 Hari = 15.000
Permanen = 25.000

*Keuntungan :*
- Bot Masuk Sesuai Waktu Sewa
- Antilink
- On 24 Jam
- Fitur Banyak
- Welcome
- Addlist
- Dellist
- Cocok Buat Store
- Dan Lainnya`
conn.sendMessage(from, { caption: capt, image: {url: `https://i.ibb.co/CnK8RgV/Thumb.jpg` }, buttons: but, footer: `© *Iklan Bot Dari Owner Christian ID*`, mentions: [sender]}, { quoted: fimage })
break
	        // Converter & Tools Menu
			case prefix+'sticker': case prefix+'stiker': case prefix+'s':
			var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
			if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
			if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (isImage || isQuotedImage) {
		           var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
			       var buffer = Buffer.from([])
			       for await(const chunk of stream) {
			          buffer = Buffer.concat([buffer, chunk])
			       }
			       var rand1 = 'sticker/'+getRandom('.jpg')
			       var rand2 = 'sticker/'+getRandom('.webp')
			       fs.writeFileSync(`./${rand1}`, buffer)
			       ffmpeg(`./${rand1}`)
				.on("error", console.error)
				.on("end", () => {
				  exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				    conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
					fs.unlinkSync(`./${rand1}`)
			            fs.unlinkSync(`./${rand2}`)
			          })
				 })
				.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				.toFormat('webp')
				.save(`${rand2}`)
			    } else if (isVideo || isQuotedVideo) {
				 var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				 var buffer = Buffer.from([])
				 for await(const chunk of stream) {
				   buffer = Buffer.concat([buffer, chunk])
				 }
			     var rand1 = 'sticker/'+getRandom('.mp4')
				 var rand2 = 'sticker/'+getRandom('.webp')
			         fs.writeFileSync(`./${rand1}`, buffer)
			         ffmpeg(`./${rand1}`)
				  .on("error", console.error)
				  .on("end", () => {
				    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				      conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
					  fs.unlinkSync(`./${rand1}`)
				      fs.unlinkSync(`./${rand2}`)
				    })
				  })
				 .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				 .toFormat('webp')
				 .save(`${rand2}`)
                } else {
			       reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
			    }
			limitAdd(sender, limit)
			reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
			addCountCmd('#sticker', sender, _cmd)
                break
			case prefix+'toimg': case prefix+'toimage':
                case prefix+'tovid': case prefix+'tovideo':
                var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
			if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (!isQuotedSticker) return reply(`Reply stikernya!`)
                   var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                   var buffer = Buffer.from([])
                   for await(const chunk of stream) {
                     buffer = Buffer.concat([buffer, chunk])
                   }
                   var rand1 = 'sticker/'+getRandom('.webp')
                   var rand2 = 'sticker/'+getRandom('.png')
                   fs.writeFileSync(`./${rand1}`, buffer)
                   if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
                     reply(mess.wait)
                     exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
                       fs.unlinkSync(`./${rand1}`)
                       if (err) return reply(mess.error.api)
                       conn.sendMessage(from, {caption: `*Nih Kak ${pushname}*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                       fs.unlinkSync(`./${rand2}`)
                     })
                   } else {
                     reply(mess.wait)
                     webp2mp4File(`./${rand1}`).then(async(data) => {
                       fs.unlinkSync(`./${rand1}`)
                       conn.sendMessage(from, {caption: `*Nih Kak ${pushname}*`, video: await getBuffer(data.data) }, { quoted: msg })
                     })
                   }
                   limitAdd(sender, limit)
                   reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
                   addCountCmd('#toimg', sender, _cmd)
                   break
               case prefix+'attp':
               var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
			if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Example :\n${command} text\n\nContoh :\n${command} ${setting.ownerName}`)
var textNya = q
reply(mess.wait)
var img = await getBuffer(`https://xteam.xyz/attp?file&text=${textNya}`)
conn.sendMessage(from, { sticker: img }, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#attp', sender, _cmd)
break
case prefix+'ttp':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Example :\n${command} text\n\nContoh :\n${command} ${setting.ownerName}`)
var ttpnya = q
reply(mess.wait)
var img = await getBuffer(`https://api.lolhuman.xyz/api/ttp?apikey=HitomiBot&text=${ttpnya}`)
conn.sendMessage(from, { sticker: img }, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#ttp', sender, _cmd)
break
case prefix+'smeme':
case prefix+'stickermeme':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (!isQuotedImage && !isImage)return reply(`Reply Imagenya!`)
var text1 = q.split('|')[0] ? q.split('|')[0] : q
var text2 = q.split('|')[1] ? q.split('|')[1] : ''
if (!q)return reply( `Mana textnya?\nContoh : ${command} Hai|Bot`)
reply(mess.wait)
if ( isImage || isQuotedImage ) {
var media = await downloadAndSaveMediaMessage("image", `memegen.jpeg`)
var njay = await imgbb(imgbbapi, media)
var img = await getBuffer(`https://api.lolhuman.xyz/api/stickermeme?apikey=HitomiBot&texttop=${text1}&textbottom=${text2}&img=${njay.display_url}`)
conn.sendMessage(from, { sticker: img }, {quoted: fimage})
fs.unlinkSync(`memegen.jpeg`)
}
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#smeme', sender, _cmd)
break
case prefix+'gaminglogo':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Kirim perintah ${command} ${setting.ownerName}`)
reply(mess.wait)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/ephoto1/logogaming?apikey=HitomiBot&text=${q}`}}, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#gaminglogo', sender, _cmd)
break
case prefix+'fpslogo':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Kirim perintah ${command} ${setting.ownerName}`)
reply(mess.wait)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/ephoto1/logogaming?apikey=HitomiBot&text=${q}`}}, {quoted: fimage})
limitAdd(sender, limit)
addCountCmd('#fpslogo', sender, _cmd)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
break
case prefix+'tahta':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Kirim perintah ${command} ${setting.ownerName}`)
reply(mess.wait)
const tahta = args.join(" ")
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://leyscoders-api.herokuapp.com/api/harta-tahta?text=${args[1]}&apikey=IkyOgiwara`}}, {quoted: fimage})
limitAdd(sender, limit)
addCountCmd('#tahta', sender, _cmd)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
break
case prefix+'ffbanner':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Kirim perintah ${command} ${setting.ownerName}`)
reply(mess.wait)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/ephoto1/freefire?apikey=HitomiBot&text=${q}`}}, {quoted: fimage})
limitAdd(sender, limit)
addCountCmd('#ffbanner', sender, _cmd)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
break
case prefix+'removebg':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (!isQuotedImage && !isImage)return reply(`Kirim/Reply Gambar Dengan Caption ${command}`)
reply(mess.wait)
if ( isImage || isQuotedImage ) {
var media = await downloadAndSaveMediaMessage("image", `removebg.jpeg`)
var njay = await imgbb(imgbbapi, media)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/removebg?apikey=HitomiBot&img=${njay.display_url}`}}, {quoted: fimage})
limitAdd(sender, limit)
}
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#removebg', sender, _cmd)
break
case prefix+'wanted':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (!isQuotedImage && !isImage)return reply(`Kirim/Reply Gambar Dengan Caption ${command}`)
reply(mess.wait)
if ( isImage || isQuotedImage ) {
var media = await downloadAndSaveMediaMessage("image", `wanted.jpeg`)
var njay = await imgbb(imgbbapi, media)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/creator1/wanted?apikey=HitomiBot&img=${njay.display_url}`}}, {quoted: fimage})
limitAdd(sender, limit)
}
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#wanted', sender, _cmd)
break
case prefix+'wasted':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (!isQuotedImage && !isImage)return reply(`Kirim/Reply Gambar Dengan Caption ${command}`)
reply(mess.wait)
if ( isImage || isQuotedImage ) {
var media = await downloadAndSaveMediaMessage("image", `wasted.jpeg`)
var njay = await imgbb(imgbbapi, media)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/editor/wasted?apikey=HitomiBot&img=${njay.display_url}`}}, {quoted: fimage})
limitAdd(sender, limit)
}
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#wasted', sender, _cmd)
break
case prefix+'triggered':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (!isQuotedImage && !isImage)return reply(`Kirim/Reply Gambar Dengan Caption ${command}`)
reply(mess.wait)
if ( isImage || isQuotedImage ) {
var media = await downloadAndSaveMediaMessage("image", `triggered.jpeg`)
var njay = await imgbb(imgbbapi, media)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/creator1/trigger?apikey=HitomiBot&img=${njay.display_url}`}}, {quoted: fimage})
limitAdd(sender, limit)
}
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#triggered', sender, _cmd)
break
case prefix+'tiktok':
case prefix+'tt':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
                 if (args.length < 2) return reply(`Kirim perintah ${command} link`)
                 if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                 reply(mess.wait)
                 var but = [{buttonId: `${prefix}tiktoknowm ${q}`, buttonText: { displayText: "No Watermark" }, type: 1 }, {buttonId: `${prefix}tiktokaudio ${q}`, buttonText: { displayText: "Audio" }, type: 2 }]
                 conn.sendMessage(from, { caption: `*_Done By ${setting.botName} ✅_*`, video: {url: `https://api.lolhuman.xyz/api/tiktokwm?apikey=HitomiBot&url=${q}`}, buttons: but, footer: "© Tiktok Downloader" }, { quoted: fimage })
                 addCountCmd('#tiktok', sender, _cmd)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
                 break
case prefix+'ssweb':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (args.length < 2) return reply(`Kirim perintah ${command} link`)
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
reply(`_Sedang Screenshot Gambar..._`)
var ssweb = q
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `http://hadi-api.cf/api/ssweb2?url=${ssweb}`}}, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#ssweb', sender, _cmd)
break
case prefix+'nulis':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Kirim perintah ${command} ${setting.ownerName}`)
reply(mess.wait)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `http://hadi-api.cf/api/canvas/nulis?text=${q}`}}, {quoted: fimage})
limitAdd(sender, limit)
addCountCmd('#nulis', sender, _cmd)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
break
case prefix+'nulis2':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Kirim perintah ${command} ${setting.ownerName}`)
reply(mess.wait)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `http://hadi-api.cf/api/canvas/nulis2?text=${q}`}}, {quoted: fimage})
limitAdd(sender, limit)
addCountCmd('#nulis2', sender, _cmd)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
break
// Download Menu
case prefix+'play':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} query\nContoh : ${command} monokrom`)
                reply(mess.wait)
                await sendPlay(from, q)
				limitAdd(sender, limit)
				addCountCmd('#play', sender, _cmd)
				reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
                break
			case prefix+'ytmp4': case prefix+'mp4':
			var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
			        if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    y2mateV(args[1]).then ( data => {
			      var capt = monospace(`Title : ${data[0].judul}`)
			      conn.sendMessage(from, {caption: capt, video: {url: data[0].link}}, {quoted: fimage})
			    }).catch(() => reply(mess.error.api))
			reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
			addCountCmd('#ytmp4', sender, _cmd)
			    break
/*case prefix+'ytmp3': case prefix+'mp3':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Youtube(args[1]).then( data => {
			      var teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[7].quality}\n*≻ Size :* ${data.medias[7].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      conn.sendMessage(from, { audio: { url: data.medias[7].url }, mimetype: 'audio/mp4' }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break*/
				///SCRAPER YTMP3 BY FERDI ANANDA 
case prefix+'ytmp3':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
      if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)

			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
				y2mateA(q).then( data => {
					var capt = `📛 *Title :* ${data[0].judul}\n🔰 *Size Audio :* ${data[0].size}\n\n_Tunggu sebentar audio akan di kirim...._`
					conn.sendMessage(from, {caption: capt, image: {url: data[0].thumb}}, {quoted: fimage}) 
					
					conn.sendMessage(from, { document: { url: data[0].link }, fileName: `${data[0].judul}.mp3`, mimetype: 'audio/mp3' }, { quoted: fimage })
					  }
					  )
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#ytmp3', sender, _cmd)
              break
			  case prefix+'ytmp3vn':
			var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
				    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
				y2mateA(q).then( data => {
					var capt = `� *Title :* ${data[0].judul}\n� *Size Video :* ${data[0].size}\n� *Download :* ${data[0].link}\n\n_Tunggu sebentar audio akan di kirim...._`
					conn.sendMessage(from, {caption: capt, image: {url: data[0].thumb}}, {quoted: msg}) 
					
					conn.sendMessage(from, {audio: {url: data[0].link}, mimetype: 'audio/mp4', ptt: true}, {quoted: fimage})
					  }
					  )
				limitAdd(sender, limit)
				reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
				addCountCmd('#ytmp3vn', sender, _cmd)
				  break
case prefix+'yts': case prefix+'ytsearch':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} query`)
				reply(mess.wait)
			    yts(q).then( data => {
				  let yt = data.videos
				  var jumlah = 15
				  if (yt.length < jumlah) jumlah = yt.length
				  var no = 0
				  let txt = `*YOUTUBE SEARCH*

 *Data berhasil didapatkan*
 *Hasil pencarian dari ${q}*
 
 *${prefix}getmusic <no urutan>*
 *${prefix}getvideo <no urutan>*
 Untuk mengambil Audio/Video dari hasil pencarian`
                for (let i = 0; i < jumlah; i++) {
				  no += 1
				  txt += `\n─────────────────\n\n*No Urutan : ${no.toString()}*\n*▢ Judul :* ${yt[i].title}\n*▢ ID :* ${yt[i].videoId}\n*▢ Channel :* ${yt[i].author.name}\n*▢ Upload :* ${yt[i].ago}\n*▢ Ditonton :* ${yt[i].views}\n*▢ Duration :* ${yt[i].timestamp}\n*▢ URL :* ${yt[i].url}\n`
				}
				conn.sendMessage(from, { image: { url: yt[0].image }, caption: txt }, { quoted: fimage })
				limitAdd(sender, limit)
				addCountCmd('#ytsearch', sender, _cmd)
				reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
				}).catch(() => reply(mess.error.api))
			    break
case prefix+'getvideo': case prefix+'getvidio':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
				if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				var kuoted = await quotedMsg.chats
                var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
			    reply(mess.wait)
			    y2mateV(`https://youtube.com/watch?v=${arrey[args[1] -1]}`).then( data => {
			      var capt = monospace(`Judul : ${data[0].judul}`)
			      conn.sendMessage(from, { video: { url: data[0].link }, caption: capt }, { quoted: fimage })
			       limitAdd(sender, limit)
			addCountCmd('#getvideo', sender, _cmd)
				reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
				}).catch(() => reply(mess.error.api))
		        break
			case prefix+'getmusik': case prefix+'getmusic':
			var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
				if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				var kuoted = await quotedMsg.chats
                var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
			    reply(mess.wait)
			    y2mateA(`https://youtube.com/watch?v=${arrey[args[1] -1]}`).then( data => {
			      conn.sendMessage(from, {document: {url: data[0].link}, fileName: `${data[0].judul}.mp3`, mimetype: 'audio/mp3'}, {quoted: fimage})
			      limitAdd(sender, limit)
			addCountCmd('#getmusik', sender, _cmd)
				reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
				}).catch(() => reply(mess.error.api))
			    break
case prefix+'tiktoknowm':
case prefix+'ttnowm':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (args.length < 2) return reply(`Kirim perintah ${command} link`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply(mess.wait)
  const ttnowm = args.join(" ")
  var data = await fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=HitomiBot&url=${args[1]}`)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, video: {url: data.result.link}}, {quoted: fimage})
addCountCmd('#tiktoknowm', sender, _cmd)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
break
case prefix+'tiktokaudio':
case prefix+'ttaudio':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (args.length < 2) return reply(`Kirim perintah ${command} link`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply(mess.wait)
  const ttaudio = args.join(" ")
conn.sendMessage(from, { audio: { url: `https://api.lolhuman.xyz/api/tiktokmusic?apikey=${setting.lolkey}&url=${args[1]}` }, mimetype: 'audio/mp4' }, { quoted: fimage })
addCountCmd('#tiktokaudio', sender, _cmd)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
break
case prefix+'pinterest':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Kirim perintah ${command} Waifu`)
reply(mess.wait)
var gmbrnya = await fetchJson(`https://api.lolhuman.xyz/api/pinterest?apikey=HitomiBot&query=${q}`)
var but = [{buttonId: `${prefix}pinterest ${q}`, buttonText: { displayText: "Next Gambar" }, type: 1 }]
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: gmbrnya.result}, buttons: but, footer: "© *Pinterest*" }, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#pinterest', sender, _cmd)
break
// Meme Menu
case prefix+'meme1':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Kirim perintah ${command} ${setting.ownerName}`)
var meme = q
reply(mess.wait)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/meme1?apikey=HitomiBot&text=${meme}`}}, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#meme1', sender, _cmd)
break
case prefix+'meme2':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Example :\n${command} text\n\nContoh :\n${command} ${setting.ownerName}|Ganteng Banget`)
var text1 = q.split('|')[0] ? q.split('|')[0] : q
var text2 = q.split('|')[1] ? q.split('|')[1] : ''
reply(mess.wait)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/meme2?apikey=HitomiBot&text1=${text1}&text2=${text2}`}}, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#meme2', sender, _cmd)
break
case prefix+'meme3':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Example :\n${command} text\n\nContoh :\n${command} ${setting.ownerName}|Ganteng Banget`)
var text1 = q.split('|')[0] ? q.split('|')[0] : q
var text2 = q.split('|')[1] ? q.split('|')[1] : ''
var text3 = q.split('|')[2] ? q.split('|')[2] : ''
reply(mess.wait)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/meme3?apikey=HitomiBot&text1=${text1}&text2=${text2}&text3=${text3}`}}, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#meme3', sender, _cmd)
break
case prefix+'meme4':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Kirim perintah ${command} ${setting.ownerName}`)
var meme4 = q
reply(mess.wait)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/meme4?apikey=HitomiBot&text=${meme4}`}}, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#meme4', sender, _cmd)
break
case prefix+'meme5':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Kirim perintah ${command} ${setting.ownerName}`)
var meme5 = q
reply(mess.wait)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/meme5?apikey=HitomiBot&text=${meme}`}}, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#meme5', sender, _cmd)
break
case prefix+'meme6':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Example :\n${command} text\n\nContoh :\n${command} ${setting.ownerName}|Ganteng Banget`)
var text1 = q.split('|')[0] ? q.split('|')[0] : q
var text2 = q.split('|')[1] ? q.split('|')[1] : ''
var text3 = q.split('|')[2] ? q.split('|')[2] : ''
reply(mess.wait)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/meme6?apikey=HitomiBot&text1=${text1}&text2=${text2}&text3=${text3}`}}, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#meme6', sender, _cmd)
break
case prefix+'meme7':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Example :\n${command} text\n\nContoh :\n${command} ${setting.ownerName}|Ganteng Banget`)
var text1 = q.split('|')[0] ? q.split('|')[0] : q
var text2 = q.split('|')[1] ? q.split('|')[1] : ''
reply(mess.wait)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/meme7?apikey=HitomiBot&text1=${text1}&text2=${text2}`}}, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#meme7', sender, _cmd)
break
case prefix+'meme8':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if (args.length < 2) return reply(`Example :\n${command} text\n\nContoh :\n${command} ${setting.ownerName}|Ganteng Banget`)
var text1 = q.split('|')[0] ? q.split('|')[0] : q
var text2 = q.split('|')[1] ? q.split('|')[1] : ''
reply(mess.wait)
conn.sendMessage(from, {caption: `*_Done By ${setting.botName} ✅_*`, image: {url: `https://api.lolhuman.xyz/api/meme8?apikey=HitomiBot&text1=${text1}&text2=${text2}`}}, {quoted: fimage})
limitAdd(sender, limit)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
addCountCmd('#meme8', sender, _cmd)
break
// Store Menu
case prefix+'list': case prefix+'ceklist':
case prefix+'store':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
            var arr_rows = [];
            for (let x of db_respon_list) {
                if (x.id === from) {
                    arr_rows.push({
                        title: x.key,
                        rowId: x.key
                    })
                }
            }
            var listMsg = {
                text: `${ucapanWaktu} @${sender.split("@")[0]}\n\n*📝 List : ${groupName}*`,
                buttonText: 'Pilih Disini!',
                footer: `⌚ Jam : ${jam}\n📆 Tanggal : ${tanggal}`,
                mentions: [sender],
                sections: [{
                    title: groupName, rows: arr_rows
                }]
            }
            conn.sendMessage(from, listMsg)
            addCountCmd('#ceklist', sender, _cmd)
            break
case prefix+'addlist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]                
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage("image", `${pushname}.jpeg`)
                 var njay = await imgbb(imgbbapi, media)
                        addResponList(from, args1, args2, true, `${njay.display_url}`, db_respon_list)
                        reply(`Sukses menambahkan list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
            } else {
                addResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses menambahkan list message dengan key : *${args1}*`)
            }
            addCountCmd('#addlist', sender, _cmd)
            break
        case prefix+'dellist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
            if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
            delResponList(from, q, db_respon_list)
            reply(`Sukses delete list message dengan key *${q}*`)
            addCountCmd('#dellist', sender, _cmd)
            break
        case prefix+'updatelist': case prefix+'update':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage("image", `${pushname}.jpeg`)
                 var njay = await imgbb(imgbbapi, media)
                        updateResponList(from, args1, args2, true, `${njay.display_url}`, db_respon_list)
                        reply(`Sukses update list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
            } else {
                updateResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses update respon list dengan key *${args1}*`)
            }
            addCountCmd('#updatelist', sender, _cmd)
            break
case prefix+'p': case prefix+'proses': case 'p': case 'proses':
if (!isGroup) return reply(mess.OnlyGrup)
		if (!isBotGroupAdmins) return reply(mess.BotAdmin)
		                            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isQuotedMsg) return
            let proses = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan :\n${quotedMsg.chats}\n\nPesanan @${quotedMsg.sender.split("@")[0]} sedang di proses!`
            mentions(proses, [quotedMsg.sender], true)
            break
        case prefix+'d': case prefix+'done': case 'd': case 'done':
if (!isGroup) return reply(mess.OnlyGrup)
		if (!isBotGroupAdmins) return reply(mess.BotAdmin)
		                            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isQuotedMsg) return
            let sukses = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih @${quotedMsg.sender.split("@")[0]} Next Order ya🙏`
            mentions(sukses, [quotedMsg.sender], true)
            break
// Stalk Menu
case prefix+'stalkml':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
addCountCmd('#stalkml', sender, _cmd)
if (args.length < 2) return reply(`Kirim perintah ${command} Userid/Serverid\nContoh : ${command} 84830127/2169`)
reply(mess.wait)
var data = await fetchJson(`https://api.lolhuman.xyz/api/mobilelegend/${q}?apikey=HitomiBot`)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
reply(`➸ *User ID* : ${q}\n➸ *Nickname* : ${data.result}`)
limitAdd(sender, limit)
break
case prefix+'stalkff':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
addCountCmd('#stalkff', sender, _cmd)
if (args.length < 2) return reply(`Kirim perintah ${command} userid\nContoh : ${command} 318843279`)
reply(mess.wait)
var data = await fetchJson(`https://api.lolhuman.xyz/api/freefire/${q}?apikey=HitomiBot`)
reply(`➸ *User ID* : ${q}\n➸ *Nickname* : ${data.result}`)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
limitAdd(sender, limit)
break
case prefix+'stalkgenshin':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
addCountCmd('#stalkgenshin', sender, _cmd)
if (args.length < 2) return reply(`Kirim perintah ${command} userid\nContoh : ${command} 811235076`)
reply(mess.wait)
var data = await fetchJson(`https://api.lolhuman.xyz/api/genshin/username/${q}?apikey=HitomiBot`)
reply(`➸ *User ID* : ${q}\n➸ *Nickname* : ${data.result}`)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
limitAdd(sender, limit)
break
case prefix+'stalkcod':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
addCountCmd('#stalkcod', sender, _cmd)
if (args.length < 2) return reply(`Kirim perintah ${command} userid\nContoh : ${command} 6290150021186841472`)
reply(mess.wait)
var data = await fetchJson(`https://api.lolhuman.xyz/api/codm/${q}?apikey=HitomiBot`)
reply(`➸ *User ID* : ${q}\n➸ *Nickname* : ${data.result}`)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
limitAdd(sender, limit)
break
case prefix+'stalkdomino':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
addCountCmd('#stalkdomino', sender, _cmd)
if (args.length < 2) return reply(`Kirim perintah ${command} userid\nContoh : ${command} 291756557`)
reply(mess.wait)
var data = await fetchJson(`https://api.lolhuman.xyz/api/higghdomino/${q}?apikey=HitomiBot`)
reply(`➸ *User ID* : ${q}\n➸ *Nickname* : ${data.result}`)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
limitAdd(sender, limit)
break
case prefix+'stalkpubg':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
addCountCmd('#stalkpubg', sender, _cmd)
if (args.length < 2) return reply(`Kirim perintah ${command} userid\nContoh : ${command} 5119961143`)
reply(mess.wait)
var data = await fetchJson(`https://api.lolhuman.xyz/api/pubg/${q}?apikey=HitomiBot`)
reply(`➸ *User ID* : ${q}\n➸ *Nickname* : ${data.result}`)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
limitAdd(sender, limit)
break
case prefix+'stalksausage':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
addCountCmd('#stalksausage', sender, _cmd)
if (args.length < 2) return reply(`Kirim perintah ${command} userid\nContoh : ${command} 40vimt`)
reply(mess.wait)
var data = await fetchJson(`https://api.lolhuman.xyz/api/sausageman/40vimt?apikey=HitomiBot`)
reply(`➸ *User ID* : ${q}\n➸ *Nickname* : ${data.result}`)
reply(`_Limit Terpakai 1_\n*Sisa Limit Anda : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*`)
limitAdd(sender, limit)
break
			// Owner Menu
			case prefix+'setexif':
			case prefix+'exif':
			    if (!isOwner) return reply(mess.OnlyOwner)
			    var namaPack = q.split('|')[0] ? q.split('|')[0] : q
                var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
                exif.create(namaPack, authorPack)
				reply(`Sukses membuat exif`)
				break
case prefix+'bc': case prefix+'broadcast':
			    if (!isOwner) return reply(mess.OnlyOwner)
			if (!q && !isImage && !isQuotedImage) return reply(`Kirim Gambar Dengan Caption ${command} text\nExample : ${command} Hallo`)
if ( isImage || isQuotedImage ) {
var media = await downloadAndSaveMediaMessage("image", `brotkes.jpeg`)
var data = await store.chats.all()
var buttonBc = [{buttonId: `${prefix}menu`, buttonText: { displayText: `📝 MENU` }, type: 2 }]
for (let i of data) {
conn.sendMessage(i.id, { caption: `「 _*BROADCAST ${botName.toUpperCase()}*_ 」\n\nTeks : ${q}`, image: fs.readFileSync(`brotkes.jpeg`), buttons: buttonBc, footer: `© ${footernya}`, mentions: [sender]}, {quoted: fimage})
}
await sleep(1000)
} else {
		            if (args.length < 2) return reply(`Kirim Perintah ${command} teks\nContoh : ${command} ${setting.ownerName}`)
                            var data = await store.chats.all()
                            for (let i of data) {
                            	
                               conn.sendMessage(i.id, { text: `「 _*BROADCAST ${botName.toUpperCase()}*_ 」\n\n${q}` }, {quoted: fimage})
                               await sleep(1000)
                                  }
                                  }
                           break
			case prefix+'setpp': case prefix+'setppbot':
		        if (!isOwner) return reply(mess.OnlyOwner)
		        if (isImage || isQuotedImage) {
				  var media = await downloadAndSaveMediaMessage('image', 'ppbot.jpeg')
				  var data =  await conn.updateProfilePicture(botNumber, { url: media })
			      fs.unlinkSync(media)
				  reply(`Sukses`)
				} else {
				  reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
				}
				break
case prefix+'setthumb':
if (!isOwner)return reply(mess.OnlyOwner)
if (!isImage && !isQuotedImage)return reply(`Reply Gambar atau kirim gambar dengan caption ${prefix}setthumb`)
if (isImage || isQuotedImage) {
  var media = downloadAndSaveMediaMessage('image', './media/hitomi.jpg')
  reply(`Sukses Mengganti Thumbnail Bot`)
}
  break
case prefix+'setdonasi':
if (!isOwner)return reply(mess.OnlyOwner)
if (!isImage && !isQuotedImage)return reply(`Reply Gambar atau kirim gambar dengan caption ${prefix}setdonasi`)
if (isImage || isQuotedImage) {
  var media = downloadAndSaveMediaMessage('image', './media/qris.jpg')
  reply(`Sukses Mengganti Gambar Donasi Bot`)
}
  break
            case prefix+'join':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
				if (!isUrl(args[1])) return reply(mess.error.Iv)
				var url = args[1]
			    url = url.split('https://chat.whatsapp.com/')[1]
				var data = await conn.groupAcceptInvite(url)
				reply(jsonformat(data))
				break
            case prefix+'self':
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                mode = 'self'
                reply('Sukses Ganti Ke Mode Self\n\nUntuk mengubah ke mode public silahkan gunakan nomor bot')
                break
            case prefix+'publik': case prefix+'public':
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                mode = 'public'
                reply('Berhasil berubah ke mode public')
                break
            case prefix+'mode':
            case prefix+'set':
   if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
 var teks = `*SELF OR PUBLIC*`
 var but = [{buttonId: `${prefix}self`, buttonText: { displayText: "⬡ SELF" }, type: 1 }, {buttonId: `${prefix}public`, buttonText: { displayText: "⬡ PUBLIC" }, type: 2 }]
 conn.sendMessage(from, { text: teks, footer: "Silakan Pilih Salah Satu", buttons: but, mentions: [sender]} )  
 break
            case prefix+'block':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah *${command} nomer`)
                const block = args.join(" ")
                await conn.updateBlockStatus(args[1] + '@s.whatsapp.net', "block")
                reply(`Sukses Block Target`)
                break
            case prefix+'unblock':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah *${command} nomer`)
                const unblock = args.join(" ")
                await conn.updateBlockStatus(args[1] + '@s.whatsapp.net', "unblock")
                reply(`Sukses Unblock Target`)
                break
            case prefix+'leave':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (!isGroup) return reply(mess.OnlyGrup)
				conn.groupLeave(from)
			    break
            case prefix+'setown':
              case prefix+'setowner':
              addCountCmd('#setowner', sender, _cmd)
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah ${command} Nomor\nExample : ${command} 6288213292687`)
                var text = args[1] + '@s.whatsapp.net'
                
                own2 = text
                 mentions(`Sukses Mengganti Nomor Owner Ke Nomor : @${text.split("@")[0]}`, [text])
                break
case prefix+'setfake':
              addCountCmd('#setfake', sender, _cmd)
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah ${command} Teks\nExample : ${command} Bot By Christian ID`)
                var textnya = q
                
                fakenya = textnya
                 reply(`Sukses Mengganti Fake Menjadi : *${q}*`)
                break
case prefix+'setfooter':
              addCountCmd('#setfooter', sender, _cmd)
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah ${command} Teks\nExample : ${command} Bot By Christian ID`)
                var textnya = q
                
                footernya = textnya
                 reply(`Sukses Mengganti Fake Menjadi : *${q}*`)
                break
            case prefix+'ban':
            addCountCmd('#ban', sender, _cmd)
                if (!isOwner) return reply(mess.OnlyOwner)
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                        addBanned(mentioned[0], args[2], ban)
                    }
                    reply('Sukses')
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber) return reply(`Tidak bisa ban Owner`)
                    addBanned(quotedMsg.sender, args[1], ban)
                    reply(`Sukses ban target`)
                } else if (!isNaN(args[1])) {
                    addBanned(args[1] + '@s.whatsapp.net', args[2], ban)
                    reply('Sukses')
                } else {
                    reply(`Kirim perintah ${prefix}ban @tag atau nomor atau reply pesan orang yang ingin di ban`)
                }
                break
            case prefix+'unban':
            addCountCmd('#unban', sender, _cmd)
                if (!isOwner) return reply(mess.OnlyOwner)
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                        unBanned(mentioned[i], ban)
                    }
                    reply('Sukses')
                }if (isQuotedMsg) {
                    unBanned(quotedMsg.sender, ban)
                    reply(`Sukses unban target`) 
                } else if (!isNaN(args[1])) {
                    unBanned(args[1] + '@s.whatsapp.net', ban)
                    reply('Sukses')
                } else {
                    reply(`Kirim perintah ${prefix}unban @tag atau nomor atau reply pesan orang yang ingin di unban`)
                }
                break
            case prefix+'listban':
            addCountCmd('#listban', sender, _cmd)
                let txtx = `List Banned\nJumlah : ${ban.length}\n\n`
                let menx = [];
                for (let i of ban){
                    menx.push(i.id)
                    txtx += `*ID :* @${i.id.split("@")[0]}\n`
                    if (i.expired === 'PERMANENT'){
                        let cekvip = 'PERMANENT'
                        txtx += `*Expire :* PERMANENT\n\n`
                    } else {
                        let cekvip = ms(i.expired - Date.now())
                        txtx += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                    }
                }
                mentions(txtx, menx, true)
                break
            case prefix+'addbalance':
if (!isOwner) return reply(mess.OnlyOwner)
if (args.length < 2) return reply(`Kirim perintah ${command} *nomor@jumlah*`)
var text1 = q.split('@')[0] ? q.split('@')[0] : q

var text2 = q.split('@')[1] ? q.split('@')[1] : ''
var addbal = addBalance(`${text1}@s.whatsapp.net`, parseInt(`${text2}`), balance)
reply(`*Sukses Menambahkan Balance User Sebanyak* : \n*$${text2}*`)
break
case prefix+'addlimit':
if (!isOwner) return reply(mess.OnlyOwner)
if (args.length < 2) return reply(`Kirim perintah ${command} *nomor@jumlah*`)
var text1 = q.split('@')[0] ? q.split('@')[0] : q

var text2 = q.split('@')[1] ? q.split('@')[1] : ''
var addlimit = giveLimit(`${text1}@s.whatsapp.net`, parseInt(`${text2}`), limit)
reply(`*Sukses Menambahkan Limit User Sebanyak* : \n*${text2}*`)
break
case prefix+'addglimit':
if (!isOwner) return reply(mess.OnlyOwner)
if (args.length < 2) return reply(`Kirim perintah ${command} *nomor@jumlah*`)
var text1 = q.split('@')[0] ? q.split('@')[0] : q

var text2 = q.split('@')[1] ? q.split('@')[1] : ''
var addglimit = givegame(`${text1}@s.whatsapp.net`, parseInt(`${text2}`), glimit)
reply(`*Sukses Menambahkan Limit User Sebanyak* : \n*${text2}*`)
break
            case prefix+'dashboard':
	case 'dashboard':
	  if (!isOwner)return reply(mess.OnlyOwner)
	  addCountCmd('#dashboard', sender, _cmd)
		var posi = await getPosiCmdUser(sender, _cmdUser)
		_cmdUser[posi].db.sort((a, b) => (a.count < b.count) ? 1 : -1)
		_cmd.sort((a, b) => (a.count < b.count) ? 1 : -1)
		var posi = await getPosiCmdUser(sender, _cmdUser)
		var jumlah = _cmdUser[posi].db.length
		if (jumlah > 5) jumlah = 5
		var totalUser = 0
		for (let x of _cmdUser[posi].db) {
			totalUser = total + x.count
		}
		var total = 0
		for (let o of _cmd) {
			total = total + o.count
		}
  var teks = `*[ ${botName} ]*\n\n`
	teks += `*Seluruh Command*\n`
		for (let o = 0; o < 10; o ++) {
			teks += `*=>* ${_cmd[o].nama} : ${_cmd[o].count}\n`
		}
		teks += `\n*Hanya Command Pengguna*\n`
		for (let x = 0; x < jumlah; x ++) {
			teks += `*-* ${_cmdUser[posi].db[x].nama} : ${_cmdUser[posi].db[x].count}\n`
		}
		reply(teks)
		break
            case prefix+'sewa':
              if (!isGroup) return reply(mess.OnlyGrup)
              if (!isOwner)return reply(mess.OnlyOwner)
              if (args.length < 2) return reply(`Penggunaan :\n*${prefix}sewa* add/del waktu`)
              if (!args[2]) return reply(`Mau yang berapa hari?`)
              if (args[1].toLowerCase() === 'add'){
            _sewa.addSewaGroup(from, args[2], sewa)
              reply(`Success`)
              } else if (args[1].toLowerCase() === 'del'){
              sewa.splice(_sewa.getSewaPosition(from, sewa), 1)
              fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa))
              reply(mess.success)
              }
              addCountCmd('#sewa', sender, _cmd)
              break
       case prefix+'sewalist': 
       case prefix+'listsewa':
              let txtnyee = `List Sewa\nJumlah : ${sewa.length}\n\n`
              for (let i of sewa){
              let cekvipp = ms(i.expired - Date.now())
              txtnyee += `*ID :* ${i.id} \n*Expire :* ${cekvipp.days} day(s) ${cekvipp.hours} hour(s) ${cekvipp.minutes} minute(s) ${cekvipp.seconds} second(s)\n\n`
}
              reply(txtnyee)
              addCountCmd('#listsewa', sender, _cmd)
              break
            case prefix+'addprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addprem* @tag waktu\n*${prefix}addprem* nomor waktu\n\nContoh : ${command} @tag 30d`)
                if (!args[2]) return reply(`Mau yang berapa hari?`)
                if (mentioned.length !== 0) {
                    _prem.addPremiumUser(mentioned[0], args[2], premium)
                    reply('Sukses')
                } else {
                 var cekap = await conn.onWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    _prem.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], premium)
                    reply('Sukses')
                }
                break
            case prefix+'delprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
                if (mentioned.length !== 0){
                    premium.splice(_prem.getPremiumPosition(mentioned[0], premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                } else {
                 var cekpr = await conn.oWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekpr.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                }
                break
			// Group Menu
			case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
			    url = 'https://chat.whatsapp.com/'+url
				reply(url)
				break
			case prefix+'setppgrup': case prefix+'setppgc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (isImage || isQuotedImage) {
				  var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
			      await conn.updateProfilePicture(from, { url: media })
				  .then( res => {
					reply(`Sukses`)
					fs.unlinkSync(media)
				  }).catch(() => reply(mess.error.api))
				} else {
			      reply(`Kirim/balas gambar dengan caption ${command}`)
				}
				break
			case prefix+'setnamegrup': case prefix+'setnamegc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await conn.groupUpdateSubject(from, q)
			    .then( res => {
				  reply(`Sukses`)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'setdesc': case prefix+'setdescription':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await conn.groupUpdateDescription(from, q)
			    .then( res => {
			      reply(`Sukses`)
				}).catch(() => reply(mess.error.api))
				break
			case prefix+'group': case prefix+'grup':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
				if (args[1] == "close") {
				  conn.groupSettingUpdate(from, 'announcement')
				  reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
				} else if (args[1] == "open") {
				  conn.groupSettingUpdate(from, 'not_announcement')
				  reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
				} else {
				  reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
				}
			    break
			case prefix+'revoke':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				await conn.groupRevokeInvite(from)
			    .then( res => {
				  reply(`Sukses menyetel tautan undangan grup ini`)
				}).catch(() => reply(mess.error.api))
				break
			case prefix+'hidetag':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
			    let mem = [];
		        groupMembers.map( i => mem.push(i.id) )
				conn.sendMessage(from, { text: q ? q : '', mentions: mem })
				addCountCmd('#hidetag', sender, _cmd)
			    break
            case prefix+'imgtag':
            var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
				if (!isQuotedImage && !isImage)return reply(`Reply Imagenya!`)
				if ( isImage || isQuotedImage ) {
var media = await downloadAndSaveMediaMessage("image", `imgtag.jpeg`)
var data = await store.chats.all()
                 var teks = `${q !== undefined ? q : `Pesan Tidak Ada`}`
			    let mem = [];
		        groupMembers.map( i => mem.push(i.id) )
				conn.sendMessage(from, { caption: teks, image: fs.readFileSync(`imgtag.jpeg`), mentions: mem})
				}
				addCountCmd('#imgtag', sender, _cmd)
			    break
            case prefix+'tagall':
      if (!isGroup) return reply(mess.OnlyGrup)
      if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
      if (args.length < 2) return reply(`Kirim perintah ${command} Pesan nya yang ingin disampaikan`)
     var mems = []
      var teks = `╔══ *TAGALL*\n╠ Pesan : ${q !== undefined ? q : `Pesan Tidak Ada`}\n║\n`
      for (let i of groupMembers) {
        teks += `╠ ≻ @${i.id.split("@")[0]}\n`
        mems.push(i.id)
      }
      conn.sendMessage(from, { text: teks, mentions: mems}, { quoted: msg })
      addCountCmd('#tagall', sender, _cmd)
      break
                        case prefix+'welcome':
                            if (!isGroup) return reply(mess.OnlyGrup)
                            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                            var teks = `*MODE WELCOME ON/OFF*`
                var but = [{buttonId: `${prefix}welcome enable`, buttonText: { displayText: "⬡ ENABLE" }, type: 1 }, {buttonId: `${prefix}welcome disable`, buttonText: { displayText: "⬡ DISABLE" }, type: 2 }]
                if (args.length === 1) return conn.sendMessage(from, { text: teks, footer: "Silakan Pilih Salah Satu Dibawah", buttons: but, mentions: [sender]} )  
                            if (args[1].toLowerCase() === "enable") {
                              if (isWelcome) return reply(`Welcome sudah aktif`)
                              welcome.push(from)
                              fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                              reply(`Sukses mengaktifkan welcome di grup ini`)
                            } else if (args[1].toLowerCase() === "disable") {
                              if (!isWelcome) return reply(`Welcome sudah nonaktif`)
                              var posi = welcome.indexOf(from)
                              welcome.splice(posi, 1)
                              fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                              reply(`Sukses menonaktifkan welcome di grup ini`)
                            } else {
                              conn.sendMessage(from, { text: teks, footer: "Silakan Pilih Salah Satu Dibawah", buttons: but, mentions: [sender]} )  
                            }
                            addCountCmd('#welcome', sender, _cmd)
                            break
            case prefix+'antilink':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                var teks = `*MODE ANTILINK ON/OFF*`
                var but = [{buttonId: `${prefix}antilink enable`, buttonText: { displayText: "⬡ ENABLE" }, type: 1 }, {buttonId: `${prefix}antilink disable`, buttonText: { displayText: "⬡ DISABLE" }, type: 2 }]
                if (args.length === 1) return conn.sendMessage(from, { text: teks, footer: "Silakan Pilih Salah Satu Dibawah", buttons: but, mentions: [sender]} )  
                if (args[1].toLowerCase() === 'enable'){
                    if (isAntiLink) return reply(`Antilink sudah aktif`)
                    antilink.push(from)
					fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
					reply('Sukses mengaktifkan antilink di grup ini')
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = antilink.indexOf(from)
                    antilink.splice(anu, 1)
                    fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
                    reply('Sukses menonaktifkan antilink di grup ini')
                } else {
                conn.sendMessage(from, { text: teks, footer: "Silakan Pilih Salah Satu Dibawah", buttons: but, mentions: [sender]} )  
                }
                addCountCmd('#antilink', sender, _cmd)
                break
            case prefix+'kick':
    if (!isGroup) return reply(mess.OnlyGrup)
    if (!isGroupAdmins) return reply(mess.GrupAdmin)
    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
    var number;
    if (mentioned.length !== 0) {
      number = mentioned[0]
      conn.groupParticipantsUpdate(from, [number], "remove")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else if (isQuotedMsg) {
      number = quotedMsg.sender
      conn.groupParticipantsUpdate(from, [number], "remove")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else {
      reply(`Tag atau balas pesan member yang ingin dikeluarkan dari grup`)
    }
    break
case prefix+'mute':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (isMuted) return reply(`udah mute`)
                mute.push(from)
                fs.writeFileSync('./database/mute.json', JSON.stringify(mute))
                reply(`Bot berhasil dimute di chat ini`)
                break
case prefix+'add':
    if (!isGroup) return reply(mess.OnlyGrup)
    if (!isGroupAdmins) return reply(mess.GrupAdmin)
    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
    var number;
    if (args[1]) {
      number = mentioned[0]
      var cek = await conn.onWhatsApp(number)
      if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
      conn.groupParticipantsUpdate(from, [number], "add")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else if (isQuotedMsg) {
      number = quotedMsg.sender
      var cek = await conn.onWhatsApp(number)
      if (cek.length == 0) return reply(`Member yang kamu balas pesannya sudah tidak terdaftar di WhatsApp`)
      conn.groupParticipantsUpdate(from, [number], "add")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else {
      reply(`Kirim perintah ${command} nomer atau balas pesan orang yang ingin dimasukkan kedalam grup`)
    }
    break
case prefix+'sewacheck':
       case prefix+'ceksewa': 
              if (!isGroup) return reply(mess.OnlyGrup)
              if (!isSewa) return reply(`Group ini tidak terdaftar dalam list sewabot. Ketik ${prefix}sewabot untuk info lebih lanjut`)
              let cekvip = ms(_sewa.getSewaExpired(from, sewa) - Date.now())
              let premiumnya = `*「 SEWA EXPIRE 」*\n\n➸ *ID*: ${from}\n➸ *Expired :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)`
              reply(premiumnya)
              addCountCmd('#ceksewa', sender, _cmd)
              break
case prefix+'infogc':
  case prefix+'infogrup':
    case prefix+'grupinfo':
      case prefix+'infogroup':
        case prefix+'groupinfo':
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  if (!isGroup)return reply(mess.OnlyGrup)
  var owngc = groupMetadata.owner
  var caption = `*[ ${groupMetadata.subject} ]*\n\n*Nama Grup :* ${groupMetadata.subject}\n*Pemilik Grup :* @${owngc.split("@")[0]}\n*Di Buat Pada :* ${moment(`${groupMetadata.creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n*Jumlah Member :* ${groupMembers.length}\n*Jumlah Admin :* ${groupAdmins.length}\n*Antilink :* ${isAntiLink ? 'Aktif' : 'Gak Aktif'}\n*Deskripsi :* ${groupMetadata.desc}`
  conn.profilePictureUrl(from, 'image').then( res => conn.sendMessage(from, {caption: caption, image: { url: res }, mentions: [owngc]}, {quoted: fgif})).catch(() => conn.sendMessage(from, {caption: caption, image: {url: `https://i.ibb.co/YZdzhGt/522cd54e9767.jpg`}, mentions: [owngc]}, {quoted: fimage}))
  limitAdd(sender, limit)
  break
case prefix+'promote':
  case prefix+'admin':
    if (!isGroup) return reply(mess.OnlyGrup)
    if (!isGroupAdmins) return reply(mess.GrupAdmin)
    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
    var number;
    if (mentioned.length !== 0) {
      number = mentioned[0]
      conn.groupParticipantsUpdate(from, [number], "promote")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else if (isQuotedMsg) {
      number = quotedMsg.sender
      conn.groupParticipantsUpdate(from, [number], "promote")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else {
      reply(`Tag atau balas pesan member yang ingin dijadikan admin grup`)
    }
    break
case prefix+'demote':
  case prefix+'unadmin':
    if (!isGroup) return reply(mess.OnlyGrup)
    if (!isGroupAdmins) return reply(mess.GrupAdmin)
    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
    var number;
    if (mentioned.length !== 0) {
      number = mentioned[0]
      conn.groupParticipantsUpdate(from, [number], "demote")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else if (isQuotedMsg) {
      number = quotedMsg.sender
      conn.groupParticipantsUpdate(from, [number], "demote")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else {
      reply(`Tag atau balas pesan admin yang ingin diturunkan menjadi member`)
    }
    break
// Game Menu
case prefix+'siapakahaku':
  case prefix+'siapaaku':
  var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
		        if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, siapaaku)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, siapaaku[getGamePosi(from, siapaaku)].msg)
			    
				var tebaknya = JSON.parse(fs.readFileSync('./database/siapakahaku.json'))
				var hayo = pickRandom(tebaknya)
				  hayo.jawaban = hayo.jawaban.split('Jawaban ').join('')
				  var teks = `*Siapa Aku?*\n\n`+monospace(`Soal : ${hayo.soal}\nNomor Soal Ke : ${hayo.index}\nPetunjuk : ${hayo.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
				  conn.sendMessage(from, {text: teks}, {quoted: msg})
				  .then( res => {
					var jawab = hayo.jawaban.toLowerCase()
					addPlayGame(from, 'Siapa Aku?', jawab, gamewaktu, res, siapaaku)
					gameAdd(sender, glimit)
				  })
				addCountCmd('#siapakahaku', sender, _cmd)
			    break
case prefix+'susunkata':
var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
		        if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, susun)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, susun[getGamePosi(from, susun)].msg)
				var ngen = JSON.parse(fs.readFileSync('./database/susunkata.json'))
				var kukus = pickRandom(ngen)
				  kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
				  var teks = `*SUSUN KATA*\n\n`+monospace(`Susunlah Kalimat Berikut :\n${kukus.soal}\nPetunjuk : ${kukus.tipe}\nWaktu : ${gamewaktu}s`)
				  conn.sendMessage(from, {text: teks}, {quoted: msg})
				  .then( res => {
					var jawab = kukus.jawaban.toLowerCase()
					addPlayGame(from, 'Susun Kalimat', jawab, gamewaktu, res, susun)
					gameAdd(sender, glimit)
				  })
				addCountCmd('#susunkata', sender, _cmd)
			    break
case prefix+'mancing':
  case prefix+'mancingikan':
    case prefix+'memancing':
    if (!isOwner) return reply(`*Fitur Ini Dihentikan Oleh Owner Karena Menyebabkan Kecurangan Dalam Push Balance*`)
    var teks = `${ucapanWaktu} @${sender.split('@')[0]} 👋\nKamu Belum Terdaftar Di Database Silakan Klik Button Dibawah Untuk Mengakses Fitur Ini`
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: teks, footer: `© ${footernya}`, buttons: login, mentions: [sender]}, { quoted: fimage })
  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
  if (isPlayGame(from, pancing)) return conn.reply(from, `Ada Yg lagi Mancing!!`, pancing[getGamePosi(from, pancing)].msg)
  var duid = randomNomor(50, 250)
   var fishing = ["Yah Kamu Hanya Mendapatkan 🗑️","Yah Kamu Hanya Mendapatkan 🔌","Yah Kamu Hanya Mendapatkan 🧷","Yah Kamu Hanya Mendapatkan 🧤","Yah Kamu Hanya Mendapatkan 👙","Yah Kamu Hanya Mendapatkan 📯","Yah Kamu Hanya Mendapatkan 💣","Yah Kamu Hanya Mendapatkan 🥄","Yah Kamu Hanya Mendapatkan 🐜","Yah Kamu Hanya Mendapatkan 🦗","Yah Kamu Hanya Mendapatkan 🐌","Yah Kamu Hanya Mendapatkan ⚓","Yah Kamu Hanya Mendapatkan 🚽","Yah Kamu Hanya Mendapatkan 🛁","Yah Kamu Hanya Mendapatkan 🎩","Yah Kamu Hanya Mendapatkan 🏓","Yah Kamu Hanya Mendapatkan 🎲","Yah Kamu Hanya Mendapatkan 🎗️","Yah Kamu Hanya Mendapatkan 🎃","Yey Kamu mendapatkan 🐟","Yey Kamu mendapatkan 🐠","Yey Kamu mendapatkan 🐡","Yey Kamu mendapatkan 🐬","Yey Kamu mendapatkan 🐳","Yey Kamu mendapatkan 🦈","Yey Kamu mendapatkan 🦐","Yey Kamu mendapatkan 🐙","Yey Kamu mendapatkan 🐋","Yey Kamu mendapatkan 🦑","Yey Kamu mendapatkan 💎","Yey Kamu mendapatkan 🏅"]
  var random1 = pickRandom(fishing)
  reply(`_Siap Memancing!_`)
  addBalance(sender, duid, balance)
  setTimeout( () => {
   reply(monospace(random1) + `\nDan Kamu Mendapatkan $${duid} balance`) // ur cods
   }, 18000) // 1000 = 1s,
   setTimeout( () => {
   reply('_Menunggu Ikan Datang..._ 💤') // ur cods
   }, 12000) // 1000 = 1s,
   setTimeout( () => {
   reply('_Melempar Kail_ 🎣') // ur cods
   }, 5000) // 1000 = 1s,
   setTimeout( () => {
   reply('_Memasang Umpan_ 🐛') // ur cods
   }, 2500) // 1000 = 1s,
   addPlayGame(from, 'Mancing Ikan', pancing)
   gameAdd(sender, glimit)
   addCountCmd('#mancing', sender, _cmd)
  break
// Bank & Payment Menu
			case prefix+'topbalance':{
                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let top = '*── 「 TOP BALANCE 」 ──*\n\n'
                let arrTop = []
				var total = 10
				if (balance.length < 10) total = balance.length
                for (let i = 0; i < total; i ++){
                    top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
                mentions(top, arrTop, true)
            }
            addCountCmd('#topbalance', sender, _cmd)
                break
            case prefix+'buylimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nHarga 1 limit = $150 balance`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                let ane = Number(parseInt(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                giveLimit(sender, parseInt(args[1]), limit)
                reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            }
                break
			case prefix+'transfer':
            case prefix+'tf':{
                 if (args.length < 2) return reply(`Kirim perintah *${command}* @tag nominal\nContoh : ${command} @6285791458996 2000`)
                 if (mentioned.length == 0) return reply(`Tag orang yang ingin di transfer balance`)
                 if (!args[2]) return reply(`Masukkan nominal nya!`)
                 if (isNaN(args[2])) return reply(`Nominal harus berupa angka!`)
                 if (args[2].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                 if (args[2].includes("-")) return reply(`Jangan menggunakan -`)
                 var anu = getBalance(sender, balance)
                 if (anu < args[2] || anu == 'undefined') return reply(`Balance Kamu Tidak Mencukupi Untuk Transfer Sebesar $${args[2]}, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
                 kurangBalance(sender, parseInt(args[2]), balance)
                 addBalance(mentioned[0], parseInt(args[2]), balance)
                 reply(`Sukses transfer balance sebesar $${args[2]} kepada @${mentioned[0].split("@")[0]}`)
            }
                 break
            case prefix+'buygamelimit':
            case prefix+'buyglimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nHarga 1 game limit = $150 balance\nPajak $1 / $10`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                let ane = Number(parseInt(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                givegame(sender, parseInt(args[1]), glimit)
                reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
                break
			case prefix+'limit': case prefix+'balance':
			case prefix+'ceklimit': case prefix+'cekbalance':
			    if (mentioned.length !== 0){
					var Ystatus = ownerNumber.includes(mentioned[0])
					var isPrim = Ystatus ? true : _prem.checkPremiumUser(mentioned[0], premium)
				    var ggcount = isPrim ? gcounti.prem : gcounti.user
                    var limitMen = `${getLimit(mentioned[0], limitCount, limit)}`
                    textImg(`‣ _⏱️ Limit : ${_prem.checkPremiumUser(mentioned[0], premium) ? 'Unlimited' : limitMen}/${limitCount}_\n‣ _🎮 Limit Game : ${cekGLimit(mentioned[0], ggcount, glimit)}/${ggcount}_\n‣ _💰 Balance : $${getBalance(mentioned[0], balance)}_\n\n*Kamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit*`)
                } else {
                    var limitPrib = `${getLimit(sender, limitCount, limit)}/${limitCount}`
                    textImg(`‣ _⏱️ Limit : ${isPremium ? 'Unlimited' : limitPrib}_\n‣ _🎮 Limit Game : ${cekGLimit(sender, gcount, glimit)}/${gcount}_\n‣ _💰 Balance : $${getBalance(sender, balance)}_\n\n*Kamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit*`)
                }
                addCountCmd('#ceklimit', sender, _cmd)
				break
			default:
		}
	} catch (err) {
		console.log(color('[ERROR]', 'red'), err)
	}
}

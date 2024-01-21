module.exports = {
  apps : [{
    name   : "WhatsappStickerMakerBot",
    script : "./server.js",
    autorestart: true,
    exp_backoff_restart_delay: 1000,
    instances: 1,
    "exec_mode": "fork",
    max_restarts:200
  }]
}
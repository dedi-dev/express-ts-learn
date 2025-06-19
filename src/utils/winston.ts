import winston from 'winston'
import 'winston-daily-rotate-file'

const filterOnlyInfo = winston.format((info) => {
  return info.level === 'info' ? info : false
})

const transportInfo = new winston.transports.DailyRotateFile({
  filename: './logs/app-info-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '4m',
  maxFiles: '14d',
  format: winston.format.combine(
    filterOnlyInfo(), // ⬅️ hanya simpan log level 'info'
    winston.format.printf(
      (info) => `${info.timestamp} ${info.label} ${info.level}: ${info.message}`
    )
  )
})

const transportError = new winston.transports.DailyRotateFile({
  filename: './logs/app-error-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '4m',
  maxFiles: '14d',
  level: 'error',
  handleExceptions: true
})

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS A'
    }),
    winston.format.json({ space: 2 }),
    winston.format.label({ label: '[LOGGER]' }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.label} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    transportInfo,
    transportError,
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
      level: 'silly',
      handleExceptions: true
    })
  ]
})

// Override console.info
console.info = (...args) => {
  logger.info(args.join(' '))
}

// Override console.error (optional, log error ke file juga)
console.error = (...args) => {
  logger.error(args.join(' '))
}

export default logger

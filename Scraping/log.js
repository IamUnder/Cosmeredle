import pc from 'picocolors'

const symbol = {
    info: pc.blue('ℹ'),
    success: pc.green('✔'),
    warning: pc.yellow('⚠'),
    error: pc.red('✖')
}

export const logInfo = (...args) => `${symbol.info} ${pc.blue(...args)}`
export const logError = (...args) => `${symbol.error} ${pc.red(...args)}`
export const logSuccess = (...args) => `${symbol.success} ${pc.green(...args)}`
export const logWarning = (...args) => `${symbol.warning} ${pc.yellow(...args)}`
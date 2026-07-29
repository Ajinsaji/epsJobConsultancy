export function parseUserAgent(uaString = '') {
  let browser = 'Unknown'
  let os = 'Unknown'
  let deviceType = 'Desktop'

  const ua = uaString.toLowerCase()

  // Browser Detection
  if (ua.includes('firefox')) browser = 'Firefox'
  else if (ua.includes('edg')) browser = 'Edge'
  else if (ua.includes('chrome')) browser = 'Chrome'
  else if (ua.includes('safari')) browser = 'Safari'
  else if (ua.includes('opera') || ua.includes('opr')) browser = 'Opera'

  // OS Detection
  if (ua.includes('iphone') || ua.includes('ipad')) os = 'iOS'
  else if (ua.includes('android')) os = 'Android'
  else if (ua.includes('win')) os = 'Windows'
  else if (ua.includes('mac')) os = 'macOS'
  else if (ua.includes('linux')) os = 'Linux'

  // Device Type
  if (ua.includes('mobi') || ua.includes('android') || ua.includes('iphone')) {
    deviceType = 'Mobile'
  } else if (ua.includes('ipad') || ua.includes('tablet')) {
    deviceType = 'Tablet'
  }

  return { browser, os, deviceType }
}

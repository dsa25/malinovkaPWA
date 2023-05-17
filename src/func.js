export { getTime, deepClone, myFetch }

const myFetch = async (url, data = [], alertRun = true, method = "POST") => {
  try {
    let response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    if (response != undefined) {
      let result = await response.json()
      return result
    } else {
      let msg = "Ошибка подключения к _серверу!"
      return alertRun ? alert(msg) : console.log(msg)
    }
  } catch (error) {
    let msg = `Ошибка подключения к серверу (${url})!  Error: ${error}`
    return alertRun ? alert(msg) : console.log(msg)
  }
}

const getTime = (date = "now", format = "d.m.y") => {
  if (date == "") return ""
  let time = date == "now" ? new Date() : new Date(date)
  let dd = time.getDate()
  let mo = time.getMonth() + 1
  let yy = time.getFullYear().toString()
  let hh = time.getHours()
  let mm = time.getMinutes()
  let ss = time.getSeconds()
  if (mo < 10) mo = "0" + mo
  if (dd < 10) dd = "0" + dd
  if (hh < 10) hh = "0" + hh
  if (mm < 10) mm = "0" + mm
  if (ss < 10) ss = "0" + ss
  if (format == "h:m d.m.y") return `${hh}:${mm} ${dd}.${mo}.${yy}`
  if (format == "h:m:s d.m.y") return `${hh}:${mm}:${ss} ${dd}.${mo}.${yy}`
  if (format === "y-m-d") return `${yy}-${mo}-${dd}`
  else return `${dd}.${mo}.${yy}`
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

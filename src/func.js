function getTime(type = "dd.mm.yyyy") {
  let time = new Date()
  let dd = time.getDate()
  let mm = time.getMonth() + 1
  let yy = time.getFullYear().toString()
  if (mm < 10) mm = "0" + mm
  if (dd < 10) dd = "0" + dd

  if (type === "yyyy-mm-dd") return `${yy}-${mm}-${dd}`
  else return `${dd}.${mm}.${yy}`
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export { getTime, deepClone }

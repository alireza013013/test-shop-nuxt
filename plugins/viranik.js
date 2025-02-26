export default async ({$axios, store, route, app}, inject) => {
  inject('price', (num) => {
    let str = num.toString().split('.')

    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    
    return str.join('.')
  })

  inject('priceToNumber', (str) => {
    if (![null, undefined].includes(str)) {
      str = str.toString().replace(/,/g, '')
    }

    return str
  })

  inject('onlyNumbers', (num) => {
    let str = num

    if (![null, undefined].includes(str)) {
      str = app.$priceToNumber(num).toString().split('.')

      if (str.length > 2) {
        str.splice(2, (str.length - 2))
      }

      str[0] = str[0].replace(/[^\d\u0660-\u0669\u06F0-\u06F9]*/g, '')

      if (![undefined, null, false].includes(str[1])) {
        str[1] = str[1].replace(/[^\d\u0660-\u0669\u06F0-\u06F9]*/g, '')
      }

      str = str.join('.')
    }

    return str
  })

  inject('replaceDigits', (digits) => {
    const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    const a2e = s => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))

    digits = p2e(digits.toString())
    digits = a2e(digits)

    return digits
  })

  inject('queries', () => {
    let query = {}

    if (![null, '', undefined].includes(window.location.search)) {
      let str = window.location.search.substring(1)

      str = str.split('&')

      str.forEach((item, i) => {
        let q = str[i].split('=')

        query[q[0]] = q[1]
      })
    }

    return query
  })
}

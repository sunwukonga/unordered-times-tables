var Papa = require('papaparse')
var fs = require('fs')

let limit = 12
function isOddInteger(n) {
 return isInteger(n) && (n % 2 !== 0);
}

function isInteger(n) {
   return n === parseInt(n, 10);
}

function printHelp() {
  console.log("----------------------------------------------------------------------")
  console.log("Unordered Times Table Question Generator")
  console.log("----------------------------------------------------------------------")
  console.log("Purpose: Saves to csv ('unordered-tt.csv') a list of all times table combinations below a given number")
  console.log("usage: npm start [<#>] [minimal] [help]")
  console.log("\tWhere:\n\t\t`#` may be an integer between 2 and 100; default: 12\n\t\t`minimal` removes all commutative duplicates\n\t\t`help` prints this helpful notice")
  console.log("Example: npm start 10 minimal\n\tSaves non-duplicate times tables below 10 x 10 to `unordered-tt.csv`")
  console.log("----------------------------------------------------------------------")
}
let args = process.argv.slice(2)
if (args.includes("help")) {
  printHelp()
  process.exitCode = 0;
}
let limitArg = args.reduce( (acc, cur) => {
  if (acc.exists) {
    return acc
  }
  let curNumber = Number(cur)
  if (curNumber == curNumber) {
    return {limit: Number(cur), exists: true}
  }
  return acc
}, {limit: 0, exists: false})
if (limitArg.exists) {
  limit = limitArg.limit
}
let multiplicand = Array(limit).fill(0).map((e,i)=>i+1)
let multiplier = Array(limit).fill(0).map((e,i)=>i+1)

var timesTable
if (args.includes('minimal')) {
  console.log("Minimal mode")
  timesTable = multiplicand.map( cand => {
    return multiplier.reduce( (acc, lier) => {
      if (lier >= cand) {
        acc.push(cand + " x " + lier + " =")
      }
      return acc
    }, [])
  })
} else {
  timesTable = multiplicand.map( cand => {
    return multiplier.map( lier => {
      return cand + " x " + lier + " ="
    })
  })
}

let timesTableList = timesTable.reduce( (acc, cur) => acc.concat(cur), [])

let randomOutput = []
let random = 0
let ttLength = timesTableList.length
for (i = 0; i < ttLength; i++) {
  random = Math.floor(Math.random() * timesTableList.length);
  randomOutput.push(timesTableList.splice(random, 1))
}
let formattedRandomOutput = randomOutput.reduce( (acc, cur) => {
  if (acc.length > 0 && acc[acc.length - 1].length < 12) {
    acc[acc.length - 1].push(cur)
    acc[acc.length - 1].push('')
  } else {
    if (acc.length > 0) {
      acc.push(Array(12).fill(''))
    }
    acc.push([cur, ''])
  }
  return acc
}, [])

fs.writeFileSync('unordered-tt.csv', Papa.unparse(formattedRandomOutput), 'utf8')

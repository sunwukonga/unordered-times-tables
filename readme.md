# Unordered Times Tables

### Use cases
* You want to teach or test your child's times tables, but don't want to write out hundreds and hundreds of sums by hand (a table is faster, but it is too easy to count the answers rather than rely on memory).
* Your child already uses a resource such as [zetamac.com](zetamac.com) and has a good recall in front of a computer, but seems incapable of achieving the same ease using pen and paper, or when quizzed orally.

### Workflow
1. Run with `npm start`
2. Open created csv file in LibreOffice Calc or MS Excel.
3. Adjust column widths. I prefer 2cm sum columns and 1cm empty answer columns.
4. Print.

### Features
* Results are written to CSV (unordered-tt.csv)
* Each invocation produces a different random order of sums
* A number between 2 - 100 can be supplied at the command line to specify the limit of the times tables, i.e. 12x12, 15x15. Beware that 15x15 -> 225 sums (120 sums in minimal mode)
* Minimal (`minimal`) command line option to produce only one permutation of each combination of multiplicand and multiplier, i.e. only one of 4x5 or 5x4, not both
* Help (`help`) command line option

### Help
To view command line help:

`npm start help`

Produces:
```
----------------------------------------------------------------------
Unordered Times Table Question Generator
----------------------------------------------------------------------
Purpose: Saves to csv ('unordered-tt.csv') a list of all times table combinations below a given number
usage: npm start [#] [minimal] [help]
	Where:
		`#` may be an integer between 2 and 100; default: 12
		`minimal` removes all commutative duplicates
		`help` prints this helpful notice
Example: npm start 10 minimal
	Saves non-duplicate times tables below 10 x 10 to `unordered-tt.csv`
----------------------------------------------------------------------
```

### Planned Enhancements
* Command line option to remove extra line-spacing if undesired
* Command line option to supply output filename

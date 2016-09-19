- problem with decimals - can currently do 4......

- Memory value tacks on to end of current display - might not be an issue - need to decide
	- this definitely becomes an issue if current display is #--  and memory value is -#.
	- we end up with #---#, which is not right.
	- can either make it #--# or #-, depending on how we want to interpret it
	- this can be solved in mr function
	add condition to check last index of display and second to last index of display, check memoryValue.
	if last two are - and memory value is negative, deal with accordingly

- clearing and then recalling from memory
	- solution:
	upon recall, check last index of display. If #, unblock all. If operator, unblock only numbers



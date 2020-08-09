/*
 ** Helpers Sorting Function
 **	@params arr = array
 */

const sort = (arr) => {
	let tmp;
	let isString = typeof arr === 'string';
    let conditions = "arr[i].length > arr[j].length"; // conditions for comparing size of array
  
	if (isString) {
		arr = arr.split('');
        conditions = "arr[i] > arr[j]";
	}

	for(let i = 0; i < arr.length; i++){
		for(let j = i + 1; j < arr.length; j++){
          if(eval(conditions)){
            tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
          }
		}
	}
	return isString ? arr : arr.reverse();
}

const words = ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua'];

const groupAnagramWords = (words) => {
	const groups = {};

	for (let i = 0; i < words.length; i++) {
		let sortedWords = sort(words[i]);

		if (groups[sortedWords]) {
			groups[sortedWords].push(words[i]);
		} else {
			groups[sortedWords] = [words[i]];
		}
	}

	return sort(Object.values(groups));
}

console.log(groupAnagramWords(words));